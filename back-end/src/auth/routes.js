'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./models/users.js');
const basicAuth = require('./middleware/basic.js');
const bearerAuth = require('./middleware/bearer.js');
const permissions = require('./middleware/acl.js');


authRouter.post('/signup', async (req, res, next) => {

  try {
    let user = new User(req.body);
    const userRecord = await user.save();
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    // TODO redirect to HTML
    res.json({
      status: "success",
      output
    });
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  try {
    const user = {
      user: req.user,
      token: req.user.token
    };
    // TODO redirect to HTML
    // res.redirect("/dashboard");

    
    // Sets cookie "token" as user token
    res.cookie('token', `${req.user.token}`, {
      secure: true,
      httpOnly: true
    });

    res.json({
      status: "success",
      user
    });

  } catch (e) {
    next(e.message);
  }
});

module.exports = authRouter;