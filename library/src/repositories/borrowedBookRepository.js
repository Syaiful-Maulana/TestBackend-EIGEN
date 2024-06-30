const BorrowedBook = require('../models/borrowedbooks');

class BorrowedBookRepository {
  async countActiveBorrowings(memberId, transaction) {
    return await BorrowedBook.count({
      where: {
        memberId,
        returnedAt: null,
      },
      transaction,
    });
  }

  async findActiveBorrowing(memberId, bookId, transaction) {
    return await BorrowedBook.findOne({
      where: {
        memberId,
        bookId,
        returnedAt: null,
      },
      transaction,
    });
  }

  async create(data, transaction) {
    return await BorrowedBook.create(data, { transaction });
  }

  async update(borrowedBook, transaction) {
    return await borrowedBook.save({ transaction });
  }
}

module.exports = new BorrowedBookRepository();
