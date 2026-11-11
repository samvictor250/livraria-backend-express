import argon2 from 'argon2';

import UserModel from '../models/userModel.js';
import AuthorModel from '../models/authorModel.js';
import CategoryModel from '../models/categoryModel.js';
import BookModel from '../models/bookModel.js';

export const seedDatabase = async () => {
    try {
        console.log('Iniciando cadastro dos dados iniciais...');

        // USERS
        const adminPassword = await argon2.hash(
            process.env.SEED_ADMIN_PASSWORD || 'Admin@123456',
            { type: argon2.argon2id }
        );

        const userPassword = await argon2.hash(
            process.env.SEED_USER_PASSWORD || 'Usuario@123456',
            { type: argon2.argon2id }
        );

        await UserModel.findOrCreate({
            where: { email: 'admin@livraria.com' },
            defaults: {
                name: 'Administrador',
                email: 'admin@livraria.com',
                password: adminPassword,
                role: 'admin'
            }
        });

        await UserModel.findOrCreate({
            where: { email: 'usuario@livraria.com' },
            defaults: {
                name: 'Usuário Teste',
                email: 'usuario@livraria.com',
                password: userPassword,
                role: 'user'
            }
        });

        // AUTHORS
        const [machado] = await AuthorModel.findOrCreate({
            where: { name: 'Machado de Assis' },
            defaults: { name: 'Machado de Assis' }
        });

        const [clarice] = await AuthorModel.findOrCreate({
            where: { name: 'Clarice Lispector' },
            defaults: { name: 'Clarice Lispector' }
        });

        // CATEGORIES
        const [romance] = await CategoryModel.findOrCreate({
            where: { name: 'Romance' },
            defaults: { name: 'Romance' }
        });

        const [ficcao] = await CategoryModel.findOrCreate({
            where: { name: 'Ficção' },
            defaults: { name: 'Ficção' }
        });

        // BOOKS
        await BookModel.findOrCreate({
            where: { title: 'Dom Casmurro' },
            defaults: {
                title: 'Dom Casmurro',
                description: 'Obra clássica da literatura brasileira.',
                authorId: machado.id,
                categoryId: romance.id
            }
        });

        await BookModel.findOrCreate({
            where: { title: 'A Hora da Estrela' },
            defaults: {
                title: 'A Hora da Estrela',
                description: 'Romance de Clarice Lispector.',
                authorId: clarice.id,
                categoryId: ficcao.id
            }
        });

        console.log('Dados iniciais cadastrados com sucesso!');

    } catch (error) {
        console.error('Erro ao cadastrar dados iniciais:', error);
        throw error;
    }
};
