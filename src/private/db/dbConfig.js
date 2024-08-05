'use strict';
const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://localhost:27017/mydatabase';
//db config
const dbConfig = {
    url: MONGO_URL,
};

module.exports = dbConfig;