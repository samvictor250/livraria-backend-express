import UserModel from '../models/userModel.js';
import argon2 from 'argon2';

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
            if (typeof name !== 'string' || name.trim() === '') {
                return res.status(400).json({
                    message: 'O nome não pode ser vazio'
                });
            }

            update.name = name.trim();
        }

        if (email !== undefined) {
            if (typeof email !== 'string' || email.trim() === '') {
                return res.status(400).json({
                    message: 'O email não pode ser vazio'
                });
            }

            const emailExiste = await UserModel.findOne({
                where: { email: email.trim() }
            });

            if (emailExiste && emailExiste.id !== user.id) {
                return res.status(409).json({
                    message: 'Email já cadastrado'
                });
            }

            update.email = email.trim();
        }

        if (password !== undefined) {
            if (typeof password !== 'string' || password.trim() === '') {
                return res.status(400).json({
                    message: 'A senha não pode ser vazia'
                });
            }

            if (password.length < 8) {
                return res.status(400).json({
                    message: 'A senha deve possuir pelo menos 8 caracteres'
                });
            }

            update.password = await argon2.hash(password, {
                type: argon2.argon2id
            });
        }

        if (Object.keys(update).length === 0) {
            return res.status(400).json({
                message: 'Nenhum campo informado para atualização'
            });
        }

        await user.update(update);

        return res.status(200).json({
            message: 'Usuário atualizado com sucesso'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Erro ao atualizar usuário'
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: 'Usuário não encontrado'
            });
        }

        await user.destroy();

        return res.status(200).json({
            message: 'Usuário excluído com sucesso'
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Erro ao excluir usuário'
        });
    }
};
