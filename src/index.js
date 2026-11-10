import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import authorBookRoutes from './routes/authorBookRoutes.js';
import categoryBookRoutes from './routes/categoryBookRoutes.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { connectDB } from './configs/database.js';

import './models/userModel.js';
import './models/bookModel.js';
import './models/authorModel.js';
import './models/categoryModel.js';
import './models/revokedTokenModel.js';

import './models/associations.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', authMiddleware, (req, res) => {
    res.json('API da livraria rodando com sucesso!');
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/categories', categoryRoutes);

app.use('/authors', authorBookRoutes);
app.use('/categories', categoryBookRoutes);

await connectDB();

app.listen(port, () => {
    console.log(`Server rodando na porta: ${port}`);
});