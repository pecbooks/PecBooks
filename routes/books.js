const express = require('express');
const passport = require('passport');
const Router = express.Router();

const booksController = require('../controllers/books_controller');

Router.get('/add',passport.checkAuthentication,booksController.addBook);
Router.post('/post',passport.checkAuthentication,booksController.postBook);
Router.get('/home',booksController.home);
Router.get('/all-books',passport.checkAuthentication,booksController.allBooks);
Router.get('/remove/:id',passport.checkAuthentication,booksController.remove);
Router.get('/search',passport.checkAuthentication,booksController.searchBooks);

module.exports = Router;