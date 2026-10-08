import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/database.js';

class AuthorModel extends Model {}

AuthorModel.init(
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
        modelName: 'Author',
        tableName: 'authors',
        timestamps: true,
    }
);

export default AuthorModel;