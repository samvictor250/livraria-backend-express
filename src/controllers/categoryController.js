import CategoryModel from '../models/categoryModel.js';

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (typeof name !== 'string' || !name.trim()) {
            return res.status(400).json({
                error: 'Informe um nome válido para a categoria'
            });
        }

        const newCategory = await CategoryModel.create({
            name: name.trim()
        });

        return res.status(201).json(newCategory);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};

export const getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const category = await CategoryModel.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        return res.status(200).json(category);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.findAll();

        return res.status(200).json(categories);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const category = await CategoryModel.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        if (typeof name !== 'string' || !name.trim()) {
            return res.status(400).json({
                message: 'Informe um nome válido para a categoria'
            });
        }

        await category.update({
            name: name.trim()
        });

        return res.status(200).json({
            message: 'Categoria atualizada com sucesso',
            category
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const category = await CategoryModel.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        await category.destroy();

        return res.status(200).json({
            message: 'Categoria excluída com sucesso'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};
