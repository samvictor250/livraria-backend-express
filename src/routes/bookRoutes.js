import express from 'express';
import { createBook } from '../controllers/bookController.js';
import { getBook } from '../controllers/bookController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createBook);
router.get('/', getBook);

export default router;