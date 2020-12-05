import {NextFunction, Request, Response} from 'express';
import 'module-alias/register';

require('dotenv').config();
require('@models/dbInit');

/**
 * Web server
 */
const createError = require('http-errors');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const morgan = require('morgan');
const cors = require('cors');
server.listen(process.env.PORT || 4000);

/**
 * Routes imports
 */
const authenticateRoute = require('@routes/authenticateRoute');
const doctorsRoute = require('@routes/doctorsRoute');
const institutionsRoute = require('@routes/institutionsRoute');
const citizensRoute = require('@routes/citizensRoute');
const locationsRoute = require('@routes/locationsRoute');

/**
 * Middlewares
 */
app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static('front_end/build'));

/**
 * Routes definition
 */
app.use('/api/authenticate', authenticateRoute);
app.use('/api/doctors', doctorsRoute);
app.use('/api/institutions', institutionsRoute);
app.use('/api/citizens', citizensRoute);
app.use('/api/locations', locationsRoute);

// Handle if no route found
app.use((req: Request, res: Response, next: NextFunction) => {
	next(createError(404, 'unsupported request'));
});

// Handle if error
app.use((error, req: Request, res: Response, next: NextFunction) => {
	res.status(error.status).json({error: error.message});
	next();
});