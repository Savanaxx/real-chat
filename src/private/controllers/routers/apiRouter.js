'use strict';
const express = require('express');
const apiRouter = express.Router();
const path = require('path');
const apiController = require(path.join(__dirname, '../apiController'));
const isUserAuth = require(path.join(__dirname, '../middleware/isUserFailedLog'));
const isUserAuthReg = require(path.join(__dirname, '../middleware/isUserFailedRegister'));
const isUserReg = require(path.join(__dirname, '../middleware/isUserRegisteredSuccess'));
const isUserLogged = require(path.join(__dirname, '../middleware/isUserLogged'));
//api routers
apiRouter.get('/', apiController.homeGET);
apiRouter.get('/register', apiController.registerUser);
apiRouter.post('/register', apiController.registerUser);
apiRouter.post('/registered', apiController.registeredUser);
apiRouter.post('/login', apiController.login);
apiRouter.get('/registerFailedU', isUserAuthReg, apiController.registeredFailedU)
apiRouter.get('/registerFailedM', isUserAuthReg, apiController.registeredFailedM)
apiRouter.get('/loginUserNotFound', isUserAuth, apiController.loginUserNotFound)
apiRouter.get('/success', isUserReg, apiController.success);
apiRouter.get('/main', isUserLogged, apiController.mainGET);

module.exports = apiRouter;