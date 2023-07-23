const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage for books (replace this with a database in a production environment)
let books = [];

// Create a new book
app.post('/api/books', (req, res) => {
  const { title, author, no_of_pages, published_at } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    no_of_pages,
    published_at,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Get a single book by id
app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Update a book by id
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    const { title, author, no_of_pages, published_at } = req.body;
    books[bookIndex] = {
      id: bookId,
      title,
      author,
      no_of_pages,
      published_at,
    };
    res.json(books[bookIndex]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Delete a book by id
app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    const deletedBook = books.splice(bookIndex, 1);
    res.json(deletedBook[0]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
