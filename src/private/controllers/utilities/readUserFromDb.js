'use strict';
const path = require('path');
const User = require(path.join(__dirname, '../models/user'));

//reading users data from db
const getUser = async (username) => {
    const user = await User.findOne({ username });
    return user
}

module.exports = getUser;