'use strict';

const { format } = require('date-fns');

const getCurrentTimestamp = () => {
    return format(new Date(), 'yyyy-MM-dd HH:mm:ss');
};

module.exports = getCurrentTimestamp;