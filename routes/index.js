const express = require('express');
const Router = express.Router();
const homeController = require('../controllers/home_controller');

console.log("Router Loaded");


Router.get('/',homeController.home);
Router.use('/users',require('./users'));
Router.use('/books',require('./books'));
// Router.get('/users/posts',require("./users"));
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = Router;