import 'module-alias/register';

require('dotenv').config();
require('@models/dbInit');

/**
 * Web server
 */
const express = require('express');
const app = express();
const server = require('http').Server(app);
const morgan = require('morgan');
server.listen(process.env.PORT || 4000);

/**
 * Routes imports
 */
const doctorRoute = require('@routes/doctorRoute');
const establishmentRoute = require('@routes/establishmentRoute');
const qrcodeRoute = require('@routes/qrcodeRoute');

/**
 * Middlewares
 */
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static('front_end/build'));

/**
 * Routes definition
 */
app.use("/api/doctor", doctorRoute);
app.use("/api/establishment", establishmentRoute);
app.use("/api/qrcode", qrcodeRoute);