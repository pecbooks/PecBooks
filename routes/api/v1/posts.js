const express = require('express');
const Router = express.Router();
const postApi = require('../../../controllers/api/v1/post_api');
const passport = require('passport');

Router.get('/',postApi.index);
Router.delete('/:id',passport.authenticate('jwt',{session: false}),postApi.destroy);

module.exports = Router;