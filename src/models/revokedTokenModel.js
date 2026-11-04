import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/database.js';

const RevokedToken = sequelize.define('RevokedToken', {
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

export default RevokedToken;