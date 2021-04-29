'use strict';

module.exports = (err, req, res, next) => {
    res.statusCode = 500;
    res.statusMessage = "Internal Server Error";
    res.send(err);
    res.end();
}