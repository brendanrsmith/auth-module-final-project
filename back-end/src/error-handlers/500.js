'use strict';

module.exports = (err, req, res, next) => {
    let error = { error: err.message || err };
    res.statusCode = 500;
    res.statusMessage = "Internal Server Error";
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(error));
    res.end();
}