import BookModel from '../models/bookModel.js';
import AuthorModel from '../models/authorModel.js';
import CategoryModel from '../models/categoryModel.js';

export const createBook = async (req, res) => {
    try {
        const { title, authorId, categoryId, description } = req.body;

        if (
            !title ||
            !description ||
            !Number.isInteger(Number(authorId)) ||
            Number(authorId) <= 0 ||
            !Number.isInteger(Number(categoryId)) ||
            Number(categoryId) <= 0
        ) {
            return res.status(400).json({ error: 'Dados inválidos ou campos obrigatórios ausentes' });
        }
        
        const author = await AuthorModel.findByPk(authorId);
        
        if (!author) {
            return res.status(404).json({ message: 'Autor não encontrado' });
        }

        const category = await CategoryModel.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
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

export const getBookById = async (req, res) => {
    const { id } = req.params;

    try {
        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const book = await BookModel.findByPk(id);

        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        return res.status(200).json(book);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};

export const getAllBooks = async (req, res) => {
    try{

        const books = await BookModel.findAll();
        return res.status(200).json(books);
        
    } catch(error){
        console.log(error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, authorId, categoryId, description } = req.body;    
    try {
        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const book = await BookModel.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        if (
            title === undefined &&
            authorId === undefined &&
            categoryId === undefined &&
            description === undefined
        ) { 
            return res.status(400).json({ message: 'Informe ao menos um campo para atualização' });
        }

        if (authorId !== undefined) {
            const author = await AuthorModel.findByPk(authorId);

            if (!author) {
                return res.status(404).json({ message: 'Autor não encontrado' });
            }
        }

        if (categoryId !== undefined) {
            const category = await CategoryModel.findByPk(categoryId);

            if (!category) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
        }

        await book.update({
            title: title ?? book.title,
            authorId: authorId ?? book.authorId,
            categoryId: categoryId ?? book.categoryId,
            description: description ?? book.description
        });

        return res.status(200).json({ message: 'Livro atualizado com sucesso', book });

    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro no servidor' })
    }
};

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        
        const book = await BookModel.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        await book.destroy();
        return res.status(200).json({ message: 'Livro excluído com sucesso' });

    } catch (error){
        console.log(error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
};