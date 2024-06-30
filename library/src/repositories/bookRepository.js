const Book = require('../models/book');
const { Op } = require('sequelize');

class BookRepository {
  async findById(id, transaction) {
    return await Book.findByPk(id, { transaction });
  }

  async findAll(transaction) {
    return await Book.findAll({ transaction });
  }
  async findAvailableStock(transaction) {
    return await Book.findAll({ transaction, where: { stock: { [Op.gt]: 0 } } });
  }

  async update(book, transaction) {
    return await book.save({ transaction });
  }
}

module.exports = new BookRepository();
