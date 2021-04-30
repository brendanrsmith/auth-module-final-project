'use strict';

const express = require('express');
const pages = express.Router();

const path = require('path');
const clientPath = path.join(__dirname + "../../../../front-end");

pages.get('/', (req, res) => {
    res.sendFile("index.html", { root: clientPath });
})

pages.get('/signin', (req, res) => {
    res.sendFile("signin.html", { root: clientPath });
})

pages.get('/dashboard', (req, res) => {
    res.sendFile("dashboard.html", { root: clientPath });
})

module.exports = pages;