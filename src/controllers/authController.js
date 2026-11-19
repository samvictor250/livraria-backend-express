import crypto from 'node:crypto';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import sequelize from '../configs/database.js';
import UserModel from '../models/userModel.js';
import RevokedToken from '../models/revokedTokenModel.js';
import RefreshTokenModel from '../models/refreshTokenModel.js';

const ACCESS_TOKEN_TTL = '15m';
const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const createAccessToken = (user) => jwt.sign(
    {
        id: user.id,
        email: user.email,
        role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_TTL }
);

const createRefreshToken = () => crypto.randomBytes(40).toString('hex');

const refreshTokenExpiration = () => new Date(Date.now() + REFRESH_TOKEN_TTL_MS);

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Campos obrigatórios' });
        }

        const existe = await UserModel.findOne({ where: { email } });
        if (existe) {
            return res.status(409).json({ error: 'Email já cadastrado' });
        }

        const hash = await argon2.hash(password, {
            type: argon2.argon2id
        });

        const newUser = await UserModel.create({
            name,
            email,
            password: hash,
            role: 'user'
        });

        return res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        });
    } catch (error) {
        console.error('Erro no cadastro:', error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Campos obrigatórios' });
        }

        const user = await UserModel.findOne({ where: { email } });

        if (!user || !(await argon2.verify(user.password, password))) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = createAccessToken(user);
        const refreshToken = createRefreshToken();

        await RefreshTokenModel.create({
            token: refreshToken,
            userId: user.id,
            expiresAt: refreshTokenExpiration()
        });

        return res.status(200).json({
            token,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};

export const refresh = async (req, res) => {
    const { refreshToken } = req.body;

    if (typeof refreshToken !== 'string' || refreshToken.length !== 80) {
        return res.status(401).json({
            error: 'Refresh token inválido ou expirado'
        });
    }

    try {
        const result = await sequelize.transaction(async (transaction) => {
            const storedToken = await RefreshTokenModel.findOne({
                where: { token: refreshToken },
                transaction,
                lock: transaction.LOCK.UPDATE
            });

            if (!storedToken || storedToken.expiresAt <= new Date()) {
                return null;
            }
            
            const user = await UserModel.findByPk(storedToken.userId, {
                transaction
            });
            
            if (!user) {
                return null;
            }
            
            const nextAccessToken = createAccessToken(user);
            const nextRefreshToken = createRefreshToken();

            await storedToken.destroy({ transaction });

            await RefreshTokenModel.create({
                token: nextRefreshToken,
                userId: user.id,
                expiresAt: refreshTokenExpiration()
            }, { transaction });

            return {
                token: nextAccessToken,
                refreshToken: nextRefreshToken,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            };
        });

        if (!result) {
            return res.status(401).json({
                error: 'Refresh token inválido ou expirado'
            });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao renovar sessão:', error);
        return res.status(500).json({ error: 'Erro ao renovar sessão' });
    }
};

export const logout = async (req, res) => {
    const { refreshToken } = req.body;

    if (typeof refreshToken !== 'string' || refreshToken.length !== 80) {
        return res.status(400).json({
            error: 'Refresh token é obrigatório para encerrar a sessão'
        });
    }

    const authorization = req.headers.authorization;
    const accessToken = authorization?.startsWith('Bearer ')
        ? authorization.slice(7)
        : null;

    try {
        const revoked = await sequelize.transaction(async (transaction) => {
            const storedRefreshToken = await RefreshTokenModel.findOne({
                where: { token: refreshToken },
                transaction,
                lock: transaction.LOCK.UPDATE
            });

            if (!storedRefreshToken) {
                return false;
            }

            await storedRefreshToken.destroy({ transaction });

            if (accessToken) {
                try {
                    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

                    if (String(decoded.id) === String(storedRefreshToken.userId)) {
                        await RevokedToken.findOrCreate({
                            where: { token: accessToken },
                            defaults: {
                                token: accessToken,
                                expiresAt: new Date(decoded.exp * 1000)
                            },
                            transaction
                        });
                    }
                } catch {
                    // Access Token ausente, expirado ou inválido:
                    // a revogação do Refresh Token ainda encerra a sessão.
                }
            }

            return true;
        });

        if (!revoked) {
            return res.status(401).json({
                error: 'Refresh token inválido ou já revogado'
            });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Erro no logout:', error);
        return res.status(500).json({ error: 'Erro ao encerrar sessão' });
    }
};
