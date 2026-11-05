import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const { name, email, password } = req.body;
        const update = {};

        if (name !== undefined) {
            update.name = name;
        }

        if (email !== undefined) {
            update.email = email;
        }

        if (password !== undefined) {
            update.password = await bcrypt.hash(password, 10);
        }

        if (Object.keys(update).length === 0) {
            return res.status(400).json({ message: 'Nenhum campo informado para atualização' });
        }
        await user.update(update);

        return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        await user.destroy();

        return res.status(200).json({ message: 'Usuário excluído com sucesso' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao excluir usuário' });
    }
};