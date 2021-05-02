'use strict';

const express = require('express');
const users = express.Router();
const User = require('../auth/models/users.js');
const capability = require(('../auth/middleware/acl.js'));
const cookieParser = require('../auth/middleware/cookie.js');


//Get All Users
users.get('/users', cookieParser, capability('read'), async (req, res) => {

    try {
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch {
        res.json({ err: "Error Fetching Users!" });
    }
})

//Get Single User
users.get('/users/:id', cookieParser, capability('read'), async (req, res) => {

    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id });
        res.status(200).json(user);
        // res.send(user); //added this, Dan
    }
    catch {
        res.status(500).json({ err: "Error Fetching User!" });
    }

})

//Get All Users
users.get('/users', cookieParser, capability('create'), async (req, res) => {

    try {
        const id = req.params.id;
        const users = await User.map();
        console.log(users);
        res.status(200).json(users);
    }
    catch {
        res.status(500).json({ err: "Error Fetching User!" });
    }

})

//Create New User
users.post('/users', cookieParser, capability('create'), async (req, res) => {

    try {
        const newUser = new User(req.body);
        const userRecord = await newUser.save();
        res.status(201).json(userRecord);
    }
    catch {
        res.status(500).json({ err: "Error Creating User!" });
    }


})

//Update user
users.put('/users:/id', cookieParser, capability('update'), async (req, res) => {

    try {
        const id = req.params.id;
        const updateObj = req.body;

        const user = await User.findByIdAndUpdate({ _id: id }, updateObj, { new: true });
        res.status(200).json(user);
        res.render(user);
    }
    catch {
        res.status(500).json({ err: "Error Updating User!" });
    }
})

//Delete user
users.delete('/users:/id', cookieParser, capability('delete'), async (req, res) => {

    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete({ _id: id });
        res.status(200).json(user);
    }
    catch {
        res.status(500).json({ err: "Error Deleting User!" });
    }
})

module.exports = users;