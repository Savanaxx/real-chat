'use strict';
const express = require("express");
const session = require('express-session');
const path = require("path");
const db = require(path.join(__dirname, '../db', 'dbStart'));
const app = express();
const port = 3000;
const apiRouter = require(path.join(__dirname, '../controllers/routers/apiRouter'))
const errorHandler = require(path.join(__dirname, '../controllers/middleware/errorHandlerer'))
const notFoundHandlerer = require(path.join(__dirname, '../controllers/middleware/notFoundHandlerer'))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//session
app.use(session({
    secret: 'ac7b827f91f3c30baf78bb278ef7c188',
    resave: false,
    saveUninitialized: true
}));
// static folder
app.use(express.static(path.join(__dirname, '../../public')));

// data base start
db.start;

// router init
app.use(apiRouter);

//error handlerer
app.use(errorHandler);

//404 handlerer
app.use(notFoundHandlerer);


app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})

module.exports = app;