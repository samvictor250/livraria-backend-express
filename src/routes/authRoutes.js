import express from 'express';
import {
    register,
    login,
    refresh,
    logout
} from '../controllers/authController.js';

const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.post('/refresh', refresh);
authRoutes.delete('/logout', logout);

export default authRoutes;
