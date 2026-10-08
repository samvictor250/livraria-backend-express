import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/database.js';

class CategoryModel extends Model {}

CategoryModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        sequelize,
        modelName: 'Category',
        tableName: 'categories',
        timestamps: true,
    }
);

export default CategoryModel;