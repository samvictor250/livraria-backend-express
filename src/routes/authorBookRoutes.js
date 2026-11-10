import express from 'express';
import { getBooksByAuthor } from '../controllers/authorBookController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:authorId/books', authMiddleware, getBooksByAuthor);

export default router;