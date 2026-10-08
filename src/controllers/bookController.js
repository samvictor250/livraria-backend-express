import BookModel from '../models/bookModel.js';

export const createBook = async (req, res) => {
    try {
        const { title, authorId, categoryId, description } = req.body;

        if (!title || !authorId || !categoryId || !description) {
            return res.status(400).json({ error: 'Campos obrigatórios' });
        }

        const newBook = await BookModel.create({
            title,
            authorId,
            categoryId,
            description
        });

        return res.status(201).json({
            id: newBook.id,
            title: newBook.title,
            authorId: newBook.authorId,
            categoryId: newBook.categoryId,
            description: newBook.description
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};