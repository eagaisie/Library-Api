const express = require('express');
const router = express.Router();
let books = require('../data/booksData');

router.get('/', (req, res) => {
    res.json(books);
});
router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
});
router.post('/', (req, res) => {
    const { id, title, author, year } = req.body;
    if (!title || !author || !year) {
        return res.status(400).json({ message: 'All fields required' });
    }
    const newBook = { id, title, author, year };
    books.push(newBook);
    res.status(201).json(newBook);
});
router.put('/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const { title, author, year } = req.body;
    if (!title || !author || !year){
        return res.status(400).json({ message: 'All fields are required' });
    }
    book.title = title;
    book.author = author;
    book.year = year;
    res.json(book);
});
router.delete('/:id', (req, res) => {
    const index = books.findIndex(b => b.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Book not found' });

    const deletedBook = books.splice(index, 1);
    res.json(deletedBook[0]);
});
module.exports = router;