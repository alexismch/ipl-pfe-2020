import Citizen from '@models/Citizen/CitizenSchema';
import ICitizenDoc from '@models/Citizen/ICitizenDoc';
import {generateSessionToken, verifySession} from '@modules/connectable';
import {sendError} from '@modules/error';
import {NextFunction, Request, Response} from 'express';

const createError = require('http-errors');
const express = require('express');
const router = express.Router();

/**
 * Handle request to create a citizen
 * Verify if the citizen's device already has logged in before and return a citizen in all cases
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
	const device = req.body?.device;
	const body = device ? {device} : {};
	const citizen: ICitizenDoc = new Citizen(body);

	const sendCitizen = (status, id) => {
		res.status(status).json({
			session: generateSessionToken(id, ''),
		});
	};

	const save = citizen =>
		citizen
			.save()
			.then(cit => sendCitizen(201, cit._id))
			.catch(() => sendError(next));

	if (device)
		Citizen.findOne({device: device})
			.then(cit => {
				if (cit) return sendCitizen(200, cit._id);
				save(citizen);
			})
			.catch(() => sendError(next));
	else save(citizen);
});

/**
 * Middleware to check if a session has been sent
 * Delegated to ConnectableUtility verifySession method
 * @return response delegated to the next endpoint, or with an error
 */
router.use(verifySession);

router.post('/history', (req: Request, res: Response, next: NextFunction) => {
	const id = res.locals.session.id;

	Citizen.findById(id)
		.then(cit => {
			if (!cit) return next(createError(404, 'unknown citizen'));

			//TODO
		})
		.catch(() => sendError(next));
});

module.exports = router;
