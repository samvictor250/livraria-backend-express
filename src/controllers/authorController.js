import AuthorModel from '../models/authorModel.js';

export const createAuthor = async (req, res) => {
    try {
        const { name } = req.body;

        if (typeof name !== 'string' || !name.trim()) {
            return res.status(400).json({
                error: 'Informe um nome válido para o autor'
            });
        }

        const newAuthor = await AuthorModel.create({
            name: name.trim()
        });

        return res.status(201).json(newAuthor);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};

export const getAuthorById = async (req, res) => {
    const { id } = req.params;

    try {
        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const author = await AuthorModel.findByPk(id);

        if (!author) {
            return res.status(404).json({ message: 'Autor não encontrado' });
        }

        return res.status(200).json(author);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};

export const getAllAuthors = async (req, res) => {
    try {
        const authors = await AuthorModel.findAll();

        return res.status(200).json(authors);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};

export const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const author = await AuthorModel.findByPk(id);

        if (!author) {
            return res.status(404).json({ message: 'Autor não encontrado' });
        }

        if (typeof name !== 'string' || !name.trim()) {
            return res.status(400).json({
                message: 'Informe um nome válido para o autor'
            });
        }

        await author.update({
            name: name.trim()
        });

        return res.status(200).json({
            message: 'Autor atualizado com sucesso',
            author
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};

export const deleteAuthor = async (req, res) => {
    const { id } = req.params;

    try {
        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const author = await AuthorModel.findByPk(id);

        if (!author) {
            return res.status(404).json({ message: 'Autor não encontrado' });
        }

        await author.destroy();

        return res.status(200).json({
            message: 'Autor excluído com sucesso'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};
