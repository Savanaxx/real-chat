'use strict';
const express = require("express");
const session = require('express-session');
const path = require("path");
const http = require("http");
const db = require(path.join(__dirname, '../db', 'dbStart'));
const app = express();
const port = 3000;
const apiRouter = require(path.join(__dirname, '../controllers/routers/apiRouter'))
const errorHandler = require(path.join(__dirname, '../controllers/middleware/errorHandlerer'))
const notFoundHandlerer = require(path.join(__dirname, '../controllers/middleware/notFoundHandlerer'))
const socketIo = require('socket.io');
const getCurrentTimestamp = require("../controllers/utilities/timestamp");
// http server
const server = http.createServer(app);


//io operation
const io = socketIo(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//session
app.use(session({
    secret: 'ac7b827f91f3c30baf78bb278ef7c188',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
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

app.set('socketio', io);


io.on('connection', (socket) => {
    console.log(getCurrentTimestamp() + ` user with id connected`);

    socket.on('disconnect', () => {
        console.log(getCurrentTimestamp() + ` user with id disconnected`);
    });
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
})

module.exports = app;