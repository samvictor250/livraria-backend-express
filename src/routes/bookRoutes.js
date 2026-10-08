import express from 'express';
import { createBook } from '../controllers/bookController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createBook);

export default router;