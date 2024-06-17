const axios = require("axios");

const getBooks = async (searchTerm) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
    );
    const books = response.data.items
      .map((book) => ({
        id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        publisher: book.volumeInfo.publisher,
      }))
      .slice(0, 10);
    return books;
  } catch (error) {
    console.error(`Error fetching books: ${error}`);
    return [];
  }
};

module.exports = { getBooks };
