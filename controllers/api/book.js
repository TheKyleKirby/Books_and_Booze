const express = require('express');
const app = express();
const axios = require('axios');
const port = 3001;

const getBooks = async (searchTerm) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
    const books = response.data.items.map(book => ({
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      publisher: book.volumeInfo.publisher,
    })).slice(0, 10);
    return books;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

app.get('/books/:searchTerm', async (req, res) => {
  const books = await getBooks(req.params.searchTerm);
  res.json(books);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});