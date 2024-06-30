const BookRepository = require('../repositories/bookRepository');
const MemberRepository = require('../repositories/memberRepository');
const BorrowedBookRepository = require('../repositories/borrowedBookRepository');
const sequelize = require('../config/model');

class LibraryService {
  async borrowBook(memberId, bookId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const borrowedBooksCount = await BorrowedBookRepository.countActiveBorrowings(memberId, transaction);
      if (borrowedBooksCount >= 2) {
        throw new Error('Member has reached maximum borrow limit.');
      }

      const book = await BookRepository.findById(bookId, transaction);
      if (!book || book.stock <= 0) {
        throw new Error('Book not available for borrowing.');
      }

      await BorrowedBookRepository.create(
        {
          memberId,
          bookId,
          borrowedAt: new Date(),
        },
        transaction
      );

      book.stock -= 1;
      await BookRepository.update(book, transaction);

      await transaction.commit();
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }

  async returnBook(memberId, bookId) {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const borrowedBook = await BorrowedBookRepository.findActiveBorrowing(memberId, bookId, transaction);
      if (!borrowedBook) {
        throw new Error('Member has not borrowed this book.');
      }

      // Hitung denda jika pengembalian terlambat lebih dari 7 hari
      const borrowedAt = borrowedBook.borrowedAt;
      const returnDate = new Date();
      const daysLate = Math.ceil((returnDate - borrowedAt) / (1000 * 60 * 60 * 24));

      if (daysLate > 7) {
        // Member dikenai denda, tidak bisa meminjam buku selama 3 hari
        const penaltyUntil = new Date();
        penaltyUntil.setDate(penaltyUntil.getDate() + 3);
        await MemberRepository.updatePenaltyUntil(memberId, penaltyUntil, transaction);
      }

      borrowedBook.returnedAt = returnDate;
      await BorrowedBookRepository.update(borrowedBook, transaction);

      const book = await BookRepository.findById(bookId, transaction);
      book.stock += 1;
      await BookRepository.update(book, transaction);

      await transaction.commit();
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }

  async findAllAvailableBooks() {
    try {
      return await BookRepository.findAvailableStock();
    } catch (error) {
      throw error;
    }
  }

  async getAllMembersWithBorrowedBooks() {
    try {
      return await MemberRepository.findAllWithBorrowedBooks();
    } catch (error) {
      throw error;
    }
  }
  async getAllBooks() {
    try {
      return await BookRepository.findAll();
    } catch (error) {
      throw error;
    }
  }
  async getAllMember() {
    try {
      return await MemberRepository.findAll();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new LibraryService();
