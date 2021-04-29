'use strict';

//3rd party libs
const express = require('express');
const cors = require('cors');

//Internal files
const notFound = require('./error-handlers/404.js');
const error = require('./error-handlers/500.js');
const userRoutes = require('./routes/users.js');

//App Configuration
const app = express();
app.use(express.json());
app.use(cors());


// app.use(userRoutes);

app.use("*", notFound);
app.use(error);

module.exports = {
    server: app,
    start: port => {
        app.listen(port, () => console.log(`Server up: ${port}`));
    }
}

