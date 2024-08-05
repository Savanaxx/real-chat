'use strict';
const express = require('express');
const apiRouter = express.Router();
const path = require('path');
const apiController = require(path.join(__dirname, '../apiController'));
const isUserAuth = require(path.join(__dirname, '../middleware/isUserAuth'));
//api routers
apiRouter.get('/', apiController.homeGET);
apiRouter.get('/error', apiController.testError);
apiRouter.get('/register', apiController.registerUser);
apiRouter.post('/register', apiController.registerUser);
apiRouter.post('/registered', apiController.registeredUser);
apiRouter.post('/login', apiController.login);
apiRouter.get('/loginUserNotFound', isUserAuth, apiController.loginUserNotFound)

module.exports = apiRouter;