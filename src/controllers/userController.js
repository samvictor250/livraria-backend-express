import UserModel from '../models/userModel.js';

export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({
                message: 'Usuário não encontrado'
            });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Erro ao buscar usuário'
        });
    }
};

export const updateUser = async (req, res) => {
    // TODO: Atualização do próprio usuário
}

export const deleteUser = async (req, res) => {
  // TODO: Exclusão do próprio usuário
}