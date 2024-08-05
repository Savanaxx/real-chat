'use strict';
const path = require("path");
const mongoose = require('mongoose');
const config = require(path.join(__dirname, 'dbConfig'));
//start db
const db = {
    start: mongoose.connect(config.url)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Failed to connect to MongoDB', err)),
}

module.exports = db;