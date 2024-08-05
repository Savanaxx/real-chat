'use strict';
//checking if user can see register failed post
const userReg = (req, res, next) => {
    if (req.session.regSuc) {
        return next();
    }
    else {
        return res.redirect('/');
    }
};

module.exports = userReg;