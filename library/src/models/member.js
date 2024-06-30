// models/member.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/model');

class Member extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Member.hasMany(models.BorrowedBooks, {
      foreignKey: 'memberId',
      as: 'borrow',
    });
  }
}

Member.init(
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    penaltyUntil: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Member',
  }
);

module.exports = Member;
