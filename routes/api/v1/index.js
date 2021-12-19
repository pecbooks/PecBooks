const express = require('express');
const Router = express.Router();

Router.use('/posts',require('./posts'));
Router.use('/users',require('./users'));

module.exports = Router;
