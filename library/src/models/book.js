const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/model');

class Book extends Model {}

Book.init(
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Book',
  }
);

module.exports = Book;
