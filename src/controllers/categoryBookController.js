import CategoryModel from '../models/categoryModel.js';
import BookModel from '../models/bookModel.js';

export const getBooksByCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        if (!Number.isInteger(Number(categoryId)) || Number(categoryId) <= 0) {
            return res.status(400).json({ message: 'ID da categoria inválido' });
        }

        const category = await CategoryModel.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        const books = await BookModel.findAll({
            where: { categoryId }
        });

        return res.status(200).json(books);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
};
