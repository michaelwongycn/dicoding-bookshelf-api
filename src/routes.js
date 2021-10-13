/* eslint-disable max-len */
const {addBookHandler, getAllBooksHandler, getBookHandler, putBookHandler, deleteBookHandler} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: putBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookHandler,
  },
  // {
  //   method: 'GET',
  //   path: '/users/{username}',
  //   handler: (request, h) => {
  //     const {username} = request.params;
  //     return `Hello, ${username}!`;
  //   },
  // },
];

module.exports = routes;
