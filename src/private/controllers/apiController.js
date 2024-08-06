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
        next(err);
    }
}

const registeredUser = async (req, res, next) => {
    let idReference = Math.trunc(Math.random() * 4000 + 1);
    try {
        const { username, password, email } = req.body;
        const nick = username;
        const isUserExist = await isUser.getUser(username);
        const isEmailExist = await isUser.getEmail(email);
        let isIdReferenceUsed = await isUser.getIdRef(idReference);

        if (isUserExist) {
            req.session.failedReg = true;
            res.redirect('/registerFailedU');
        } else if (isEmailExist) {
            req.session.failedReg = true;
            res.redirect('/registerFailedM');
        }
        else if (isIdReferenceUsed) {
            while (isIdReferenceUsed) {
                idReference = Math.trunc(Math.random() * 4000 + 1);
                isIdReferenceUsed = await isUser.getIdRef(idReference);
            }
            const newUser = new User({ username, password, email, nick, idReference });
            await newUser.save();
            req.session.regSuc = true;
            res.redirect('/success');
        }
        else {
            const newUser = new User({ username, password, email, nick, idReference });
            await newUser.save();
            req.session.regSuc = true;
            res.redirect('/success');
        }
    } catch (err) {
        next(err);
    }
}

const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const isUserExist = await isUser.getUser(username);
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
        next(err);
    }
}

const registeredFailedU = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../../public/html/registerFailedU.html'));
        req.session.failedReg = false;

    }
    catch (err) {
        next(err);
    }
}


const registeredFailedM = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../../public/html/registerFailedM.html'));
        req.session.failedReg = false;
    }
    catch (err) {
        next(err);
    }
}

const success = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../../public/html/registerSuccess.html'));
        req.session.regSuc = false;
    }
    catch (err) {
        next(err);
    }
}

module.exports = { homeGET, testError, registerUser, registeredUser, login, loginUserNotFound, registeredFailedU, registeredFailedM, success };

