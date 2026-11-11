import jwt from 'jsonwebtoken';
import RevokedToken from '../models/revokedTokenModel.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'Token não informado' });
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
            return res.status(401).json({ message: 'Token revogado. Faça login novamente.' });
        }

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};