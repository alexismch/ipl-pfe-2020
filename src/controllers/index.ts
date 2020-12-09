import authenticateController from '@controllers/authenticate.controller';
import citizensController from '@controllers/citizens.controller';
import doctorsController from '@controllers/doctors.controller';
import institutionsController from '@controllers/institutions.controller';
import locationsController from '@controllers/locations.controller';
import {NextFunction, Request, Response} from 'express';

const createError = require('http-errors');
const express = require('express');
const api = express.Router();

/**
 * Routes definition
 */
api.use('/authenticate', authenticateController);
api.use('/citizens', citizensController);
api.use('/doctors', doctorsController);
api.use('/institutions', institutionsController);
api.use('/locations', locationsController);

// Handle if no route found
api.use((req: Request, res: Response, next: NextFunction) => {
	next(createError(404, 'unsupported request'));
});

// Handle if error
api.use((error, req: Request, res: Response, next: NextFunction) => {
	res.status(error.status).json({error: error.message});
});

export default api;
