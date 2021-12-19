const express = require('express');
const Router = express.Router();
const usersApi = require('../../../controllers/api/v1/users_api');

Router.post('/create-session',usersApi.createSession);

module.exports = Router;
