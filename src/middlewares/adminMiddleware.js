import UserModel from '../models/userModel.js';

export const adminMiddleware = async (req, res, next) => {
    try {
        const user = await UserModel.findByPk(req.user.id);

        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Acesso permitido apenas para administradores' });
        }

        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
};