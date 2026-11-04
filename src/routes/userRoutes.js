import express from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/userController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.get('/me', authMiddleware, getUser);
userRoutes.put('/me', authMiddleware, updateUser);
userRoutes.delete('/me', authMiddleware, deleteUser);

export default userRoutes;