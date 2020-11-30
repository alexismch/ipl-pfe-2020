import 'module-alias/register';

require('dotenv').config();
require('@models/db');

/**
 * Web server
 */
const express = require('express');
const app = express();
const server = require('http').Server(app);
const morgan = require('morgan');

/**
 * Routes imports
 */
const doctor = require('@routes/doctor');
const qrcode = require('@routes/qrcode');

/**
 * Middlewares
 */
morgan.token('body', (req) => {
    return JSON.stringify(req.body);
});

server.listen(process.env.PORT || 4000);

app.use(
    express.json()
);

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.use(express.static('front_end/build'));

/**
 * Routes definition
 */
app.use("/api/doctor", doctor);

app.use("/api/qrcode", qrcode);