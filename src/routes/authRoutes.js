import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.post('/logout', authMiddleware, logout);

export default authRoutes;