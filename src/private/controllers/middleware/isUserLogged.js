'use strict';
//checking if user logged
const isUserAuthLogged = (req, res, next) => {
    if (req.session.logged) {
        return next();
    }
    else {
        return res.redirect('/');
    }
};

module.exports = isUserAuthLogged;