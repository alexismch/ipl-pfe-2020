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
const establishmentsRoute = require('@routes/establishmentsRoute');
const locationsRoute = require('@routes/locationsRoute');
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
app.use("/api/establishments", establishmentsRoute);
app.use("/api/locations", locationsRoute);
app.use("/api/qrCodes", qrCodesRoute);

app.use((req: Request, res: Response) => {
    res.status(404).json({error: 'unknown request'})
});