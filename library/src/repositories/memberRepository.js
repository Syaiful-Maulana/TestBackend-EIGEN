const { QueryTypes } = require('sequelize');
const sequelize = require('../config/model');
const Member = require('../models/member');

class MemberRepository {
  async findAll(id, transaction) {
    return await Member.findAll({ transaction });
  }
  async findById(id, transaction) {
    return await Member.findByPk(id, { transaction });
  }

  async updatePenaltyUntil(memberId, penaltyUntil, transaction) {
    const member = await this.findById(memberId, transaction);
    member.penaltyUntil = penaltyUntil;
    return await member.save({ transaction });
  }

  async findAllWithBorrowedBooks(transaction) {
    const query = `
        SELECT
            members.id as memberId,
            members.code,
            members.name,
            members.penaltyUntil,
            borrowed_books.id as borrowedBookId,
            borrowed_books.bookId,
            borrowed_books.borrowedAt AS borrowedAt,
            borrowed_books.returnedAt AS returnedAt,
            books.code AS bookCode,
            books.title AS bookTitle,
            books.author AS bookAuthor
        FROM members
        LEFT JOIN borrowed_books ON members.id = borrowed_books.memberId
        LEFT JOIN books ON borrowed_books.bookId = Books.id
        ORDER BY members.id, borrowed_books.id;
    `;

    const results = await sequelize.query(query, {
      type: QueryTypes.SELECT,
      transaction,
    });

    const formattedResults = [];
    let currentMemberId = null;
    let currentMember = null;

    for (const result of results) {
      if (result.memberId !== currentMemberId) {
        if (currentMember) {
          formattedResults.push(currentMember);
        }
        currentMemberId = result.memberId;
        currentMember = {
          memberId: result.memberId,
          code: result.code,
          name: result.name,
          penalty_until: result.penaltyUntil,
          borrow: [],
        };
      }

      if (result.borrowedBookId) {
        currentMember.borrow.push({
          borrow_id: result.borrowedBookId,
          book_id: result.bookId,
          borrowed_at: result.borrowedAt,
          returned_at: result.returnedAt,
          book: {
            code: result.bookCode,
            title: result.bookTitle,
            author: result.bookAuthor,
          },
        });
      }
    }

    if (currentMember) {
      formattedResults.push(currentMember);
    }

    return formattedResults;
  }

  // async findAllWithBorrowedBooks(transaction) {
  //   return await Member.findAll({
  //     include: ['borrow'],
  //     transaction,
  //   });
  // }
}

module.exports = new MemberRepository();
