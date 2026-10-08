import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import { connectDB } from './configs/database.js';

import './models/userModel.js';
import './models/bookModel.js';
import './models/authorModel.js';
import './models/categoryModel.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json('API da livraria rodando com sucesso!');
});

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

await connectDB();

app.listen(port, () => {
    console.log(`Server rodando na porta: ${port}`);
});