import 'module-alias/register';
import {Request, Response} from "express";

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
const doctorsRoute = require('@routes/doctorsRoute');
const institutionsRoute = require('@routes/institutionsRoute');
const citizensRoute = require('@routes/citizensRoute');
const qrCodesRoute = require('@routes/qrCodesRoute');

/**
 * Middlewares
 */
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static('front_end/build'));

/**
 * Routes definition
 */
app.use("/api/doctors", doctorsRoute);
app.use("/api/institutions", institutionsRoute);
app.use("/api/citizens", citizensRoute);
app.use("/api/qrCodes", qrCodesRoute);

// Handle if no route found
app.use((req: Request, res: Response) => {
    res.status(404).json({error: 'unknown request'})
});