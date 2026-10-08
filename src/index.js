import 'dotenv/config';
import express from 'express';
import router from './routes/authRoutes.js';
import { connectDB } from './configs/database.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json('API da livraria rodando com sucesso!');
});

app.use('/auth', router);

await connectDB();

app.listen(port, () => {
    console.log(`Server rodando na porta: ${port}`);
});