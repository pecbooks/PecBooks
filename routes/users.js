const express = require('express');
const Router = express.Router();
const usersController = require("../controllers/users_controller");
const passport = require('passport');

// Router.get('/users',usersController.profile);
Router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
Router.post('/update/:id',passport.checkAuthentication,usersController.update);
Router.get('/posts',usersController.posts);
Router.get('/sign-in',usersController.signIn);
Router.get('/sign-up',usersController.signUp);
Router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));
Router.get('/auth/google/callback',passport.authenticate(
    'google',
    {failureRedirect: 'users/sign-in'}
), usersController.createSession);
Router.post('/create',usersController.create);
// Router.post('/create-session',usersController.createSession);
// using passport as a middleware to authenticate
Router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
),usersController.createSession);
Router.get('/sign-out',usersController.destroySession);
Router.post('/forgot-password',usersController.resetPassword);
// Router.get('/set-password',usersController.setPassword);
Router.post('/set-new-password',usersController.setNewPassword);
Router.get('/delete',usersController.deleteAccount);

module.exports = Router;