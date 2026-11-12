import jwt from 'jsonwebtoken';
import RevokedToken from '../models/revokedTokenModel.js';
import UserModel from '../models/userModel.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: 'Token não informado'
            });
        }

        const [scheme, token] = authHeader.split(' ');

        if (scheme !== 'Bearer' || !token) {
            return res.status(401).json({
                message: 'Formato de token inválido'
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const revokedToken = await RevokedToken.findOne({
            where: { token }
        });

        if (revokedToken) {
            return res.status(401).json({
                message: 'Token revogado. Faça login novamente.'
            });
        }

        const user = await UserModel.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: 'Usuário não encontrado ou conta excluída.'
            });
        }

        req.user = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Token inválido ou expirado'
        });
    }
};
