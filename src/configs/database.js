import * as pg from 'pg';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        dialectModule: pg,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false,
    }
);

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conectado a database PostgreSQL com sucesso.');

        await sequelize.sync();
        console.log('Tabelas sincronizadas com sucesso.');

    } catch (error) {
        console.error('Não foi possivel conectar a database:', error);
        process.exit(1);
    }
};

export default sequelize;