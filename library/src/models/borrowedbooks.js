// models/borrowedBooks.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/model');

class BorrowedBooks extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    BorrowedBooks.belongsTo(models.Member, {
      foreignKey: 'memberId',
      as: 'member',
    });
  }
}

BorrowedBooks.init(
  {
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    borrowedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'borrowed_books',
  }
);

module.exports = BorrowedBooks;
