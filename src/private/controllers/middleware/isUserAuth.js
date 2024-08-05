'use strict';
//checking if user can see login failed
const isUserAuth = (req, res, next) => {
    if (req.session.failedLog) {
        return next();
    }
    else {
        return res.redirect('/');
    }
};

module.exports = isUserAuth;