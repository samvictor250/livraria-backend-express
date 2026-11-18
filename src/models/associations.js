import UserModel from './userModel.js';
import RefreshTokenModel from './refreshTokenModel.js';
import AuthorModel from './authorModel.js';
import BookModel from './bookModel.js';
import CategoryModel from './categoryModel.js';

UserModel.hasMany(RefreshTokenModel, {
    foreignKey: 'userId',
    as: 'refreshTokens',
    onDelete: 'CASCADE'
});

RefreshTokenModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user'
});

AuthorModel.hasMany(BookModel, {
    foreignKey: 'authorId'
});

BookModel.belongsTo(AuthorModel, {
    foreignKey: 'authorId'
});

CategoryModel.hasMany(BookModel, {
    foreignKey: 'categoryId'
});

BookModel.belongsTo(CategoryModel, {
    foreignKey: 'categoryId'
});
