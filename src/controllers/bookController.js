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

export const getBook = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({ message: 'ID do livro não informado' });
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
        if (!id) {
            return res.status(400).json({ error: 'ID do livro não informado'});
        }

        const book = await BookModel.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado' });
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
        if(!id){
            return res.status(400).json({ message: 'ID não fornecido' });
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