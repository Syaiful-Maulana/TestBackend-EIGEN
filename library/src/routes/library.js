const express = require('express');
const router = express.Router();
const LibraryService = require('../services/libraryService');

// Welcome endpoint
router.get('/', (req, res) => {
  res.status(200).json({ code: 200, message: 'Welcome to the new app!', data: null });
});

// Endpoint untuk meminjam buku
router.post('/borrow', async (req, res) => {
  const { memberId, bookId } = req.body;

  try {
    const books = await LibraryService.borrowBook(memberId, bookId);

    res.status(200).json({ code: 200, message: 'Book borrowed successfully.', data: null });
  } catch (error) {
    res.status(500).json({ code: 500, error: error.message });
  }
});

// Endpoint untuk mengembalikan buku
router.post('/return', async (req, res) => {
  const { memberId, bookId } = req.body;

  try {
    await LibraryService.returnBook(memberId, bookId);
    res.status(200).json({ code: 200, message: 'Book returned successfully.', data: null });
  } catch (error) {
    res.status(500).json({ code: 500, error: error.message });
  }
});

// Endpoint untuk menampilkan semua buku yang tersedia
router.get('/books', async (req, res) => {
  try {
    const books = await LibraryService.findAllAvailableBooks();
    res.status(200).json({ code: 200, message: 'Books retrieved successfully.', data: books });
  } catch (error) {
    res.status(500).json({ code: 500, error: error.message });
  }
});

// Endpoint untuk menampilkan semua buku
router.get('/books/all', async (req, res) => {
  try {
    const books = await LibraryService.getAllBooks();
    res.status(200).json({ code: 200, message: 'All books retrieved successfully.', data: books });
  } catch (error) {
    res.status(500).json({ code: 500, error: error.message });
  }
});

// Endpoint untuk menampilkan semua anggota beserta jumlah buku yang dipinjam
router.get('/members', async (req, res) => {
  try {
    const members = await LibraryService.getAllMembersWithBorrowedBooks();
    res.status(200).json({ code: 200, message: 'Members retrieved successfully.', data: members });
  } catch (error) {
    res.status(500).json({ code: 500, error: error.message });
  }
});

// Endpoint untuk menampilkan semua anggota
router.get('/members/all', async (req, res) => {
  try {
    const members = await LibraryService.getAllMember();
    res.status(200).json({ code: 200, message: 'All members retrieved successfully.', data: members });
  } catch (error) {
    res.status(500).json({ code: 500, error: error.message });
  }
});

module.exports = router;
