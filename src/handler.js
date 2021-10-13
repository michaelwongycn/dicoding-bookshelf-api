/* eslint-disable max-len */
const {nanoid}= require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  };

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  };

  const id = nanoid(16);
  let finished = false;
  if (pageCount === readPage) {
    finished = true;
  } else {
    finished = false;
  }
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt};

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  } else {
    const response = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  }
};


const getAllBooksHandler = (request, h) => {
  const {name, reading, finished} = request.query;
  let result;
  if (name !== undefined) {
    result = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase())).map((book) => {
      return {id: book.id, name: book.name, publisher: book.publisher};
    });
  } else if (reading !== undefined) {
    result = books.filter((book) => book.reading == reading).map((book) => {
      return {id: book.id, name: book.name, publisher: book.publisher};
    });
  } else if (finished !== undefined) {
    result = books.filter((book) => book.finished == finished).map((book) => {
      return {id: book.id, name: book.name, publisher: book.publisher};
    });
  } else {
    result = books.map((book) => {
      return {id: book.id, name: book.name, publisher: book.publisher};
    });
  }

  const response = h.response({
    status: 'success',
    data: {
      books: result,
    },
  });
  response.code(200);
  return response;
};

const getBookHandler = (request, h) => {
  const {bookId} = request.params;
  const result = books.filter((book) => book.id === bookId)[0];
  if (result === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  } else {
    const response = h.response({
      status: 'success',
      data: {
        book: result,
      },
    });
    response.code(200);
    return response;
  }
};

const putBookHandler = (request, h) => {
  const {bookId} = request.params;
  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
  const updatedAt = new Date().toISOString();
  const bookIndex = books.findIndex((book) => book.id === bookId);

  let finished = false;
  if (pageCount === readPage) {
    finished = true;
  } else {
    finished = false;
  }

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  };

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  };

  if (bookIndex === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  } else {
    books[bookIndex] = {
      ...books[bookIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
};

const deleteBookHandler = (request, h) => {
  const {bookId} = request.params;
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  } else {
    books.splice(bookIndex, 1);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
};

module.exports = {addBookHandler, getAllBooksHandler, getBookHandler, putBookHandler, deleteBookHandler};
