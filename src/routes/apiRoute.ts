import {NextFunction, Request, Response} from 'express';

const createError = require('http-errors');
const express = require('express');
const router = express.Router();

/**
 * Routes imports
 */
const authenticateRoute = require('@routes/authenticateRoute');
const doctorsRoute = require('@routes/doctorsRoute');
const institutionsRoute = require('@routes/institutionsRoute');
const citizensRoute = require('@routes/citizensRoute');
const locationsRoute = require('@routes/locationsRoute');

/**
 * Routes definition
 */
router.use('/authenticate', authenticateRoute);
router.use('/doctors', doctorsRoute);
router.use('/institutions', institutionsRoute);
router.use('/citizens', citizensRoute);
router.use('/locations', locationsRoute);

// Handle if no route found
router.use((req: Request, res: Response, next: NextFunction) => {
	next(createError(404, 'unsupported request'));
});

// Handle if error
router.use((error, req: Request, res: Response, next: NextFunction) => {
	res.status(error.status).json({error: error.message});
});

module.exports = router;
