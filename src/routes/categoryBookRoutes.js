import express from 'express';
import { getBooksByCategory } from '../controllers/categoryBookController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:authorId/books', authMiddleware, getBooksByCategory);

export default router;