import AuthorModel from '../models/authorModel.js';
import BookModel from '../models/bookModel.js';

export const getBooksByAuthor = async (req, res) => {
    const { authorId } = req.params;

    try {
        if (!Number.isInteger(Number(authorId)) || Number(authorId) <= 0) {
            return res.status(400).json({ message: 'ID do autor inválido' });
        }

        const author = await AuthorModel.findByPk(authorId);

        if (!author) {
            return res.status(404).json({ message: 'Autor não encontrado' });
        }

        const books = await BookModel.findAll({
            where: { authorId }
        });

        return res.status(200).json(books);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
};
