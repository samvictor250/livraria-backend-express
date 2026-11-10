import express from 'express';

import {
    createAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor
} from '../controllers/authorController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllAuthors);
router.get('/:id', authMiddleware, getAuthorById);

router.post('/', authMiddleware, adminMiddleware, createAuthor);
router.put('/:id', authMiddleware, adminMiddleware, updateAuthor);
router.delete('/:id', authMiddleware, adminMiddleware, deleteAuthor);

export default router;
