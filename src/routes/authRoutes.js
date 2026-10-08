import express from 'express';
import { register, login } from '../controllers/authController.js';

const authRoutes = express.Router();

authRoutes.get('/', (req, res) => {
    res.json('API de autenticação!');
});

authRoutes.post('/register', register);
authRoutes.post('/login', login);

export default authRoutes;