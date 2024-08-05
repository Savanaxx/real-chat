'use strict';
const express = require('express');
const apiRouter = express.Router();
const path = require('path');
const apiController = require(path.join(__dirname, '../apiController'));
const isUserAuth = require(path.join(__dirname, '../middleware/isUserAuth'));
const isUserAuthReg = require(path.join(__dirname, '../middleware/userFailedRegister'));
const isUserReg = require(path.join(__dirname, '../middleware/userRegistered'));
//api routers
apiRouter.get('/', apiController.homeGET);
apiRouter.get('/register', apiController.registerUser);
apiRouter.post('/register', apiController.registerUser);
apiRouter.post('/registered', isUserAuthReg, apiController.registeredUser);
apiRouter.post('/login', apiController.login);
apiRouter.get('/registerFailedU', isUserAuth, apiController.registeredFailedU)
apiRouter.get('/registerFailedM', isUserAuth, apiController.registeredFailedM)
apiRouter.get('/loginUserNotFound', isUserAuth, apiController.loginUserNotFound)
apiRouter.get('/success', isUserReg, apiController.success);

module.exports = apiRouter;