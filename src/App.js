import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BooksPortal = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [noOfPages, setNoOfPages] = useState('');
  const [publishedAt, setPublishedAt] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books'); // Replace this with your backend API endpoint for fetching books
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleCreateBook = async () => {
    try {
      await axios.post('/api/books', {
        title,
        author,
        no_of_pages: parseInt(noOfPages),
        published_at: publishedAt,
      }); // Replace this with your backend API endpoint for creating books

      // Clear form fields and update the book list
      setTitle('');
      setAuthor('');
      setNoOfPages('');
      setPublishedAt('');
      fetchBooks();
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  const handleUpdateBook = async (bookId) => {
    try {
      await axios.Update(`/api/books/${bookId}`); // Replace this with your backend API endpoint for deleting books
      fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`/api/books/${bookId}`); // Replace this with your backend API endpoint for deleting books
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <h1>Books Portal</h1>

      <div>
        <h2>Add a Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number of Pages"
          value={noOfPages}
          onChange={(e) => setNoOfPages(e.target.value)}
        />
        <input
          type="date"
          placeholder="Published At"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
        />
        <button onClick={handleCreateBook}>Add Book</button>
      </div>

      <div>
        <h2>Books List</h2>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <p>Title: {book.title}</p>
              <p>Author: {book.author}</p>
              <p>Number of Pages: {book.no_of_pages}</p>
              <p>Published At: {book.published_at}</p>
              <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
              <button onClick={() => handleUpdateBook(book.id)}>Update</button>
             
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BooksPortal;
