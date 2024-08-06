'use strict';
const path = require('path');
const User = require(path.join(__dirname, '../models/user'));

//reading users data from db
const getUser = async (username) => {
    return await User.findOne({ username });
}

const getEmail = async (email) => {
    return await User.findOne({ email });
}

const getIdRef = async (idReference) => {
    return await User.findOne({ idReference })
}
module.exports = { getUser, getEmail, getIdRef };