import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/database.js';

class BookModel extends Model {}

BookModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'authors',
                key: 'id',
            },
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id',
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'Book',
        tableName: 'books',
        timestamps: true,
    }
);

export default BookModel;