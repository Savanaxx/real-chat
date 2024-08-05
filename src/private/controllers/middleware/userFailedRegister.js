'use strict';
//checking if user can see register failed post
const isUserAuthReg = (req, res, next) => {
    if (!req.session.failedLog) {
        return next();
    }
    else {
        return res.redirect('/register');
    }
};

module.exports = isUserAuthReg;