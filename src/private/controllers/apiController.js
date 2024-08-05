'use strict';
const path = require('path');
const bcrypt = require('bcrypt');
const User = require(path.join(__dirname, "/models/user"))
const isUser = require(path.join(__dirname, '/utilities/readUserFromDb'));
//api controllers
const homeGET = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../../public/html/login.html'));
    }
    catch (err) {
        next(err);
    }
}

const testError = async (req, res, next) => {
    const error = new Error("Forced Error");
    error.status = 500;
    next(error);
}

const registerUser = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../../public/html/register.html'));
    }
    catch (err) {
        next(err)
    }
}

const registeredUser = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const newUser = new User({ username, password, email });
        await newUser.save();
        res.redirect('/')
    } catch (err) {
        next(err);
    }
}

const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const isUserExist = await isUser(username);
        if (!isUserExist) {
            req.session.failedLog = true;
            res.redirect('/loginUserNotFound');
        }
        else {
            const isMatch = await bcrypt.compare(password, isUserExist.password);
            if (isMatch) {
                res.redirect('/main');
            }
            else {
                req.session.failedLog = true;
                res.redirect('/loginUserNotFound');
            }

        }
    }
    catch (err) {
        next(err);
    }
}

const loginUserNotFound = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../../public/html/loginUserNotFound.html'));
        req.session.failedLog = false;
    }
    catch (err) {
        next(err)
    }
}

module.exports = { homeGET, testError, registerUser, registeredUser, login, loginUserNotFound };

