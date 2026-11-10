import AuthorModel from './authorModel.js';
import BookModel from './bookModel.js';
import CategoryModel from './categoryModel.js';

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