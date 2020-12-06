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
	const body = req.body;
	if (!body) return next(createError(422, 'body missing'));
	if (!body.type) return next(createError(422, "field 'type' missing"));
	if (!body.id || body.id.length !== 24)
		return next(createError(422, "field 'id' missing or incorrect"));
	if (
		!body.scanDate ||
		!/^\d\d\d\d-(0[1-9]|1[012])-([012]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(Z)$/.test(
			body.scanDate
		)
	)
		return next(createError(422, "field 'scanDate' missing or incorrect"));
	const scanDate = new Date(body.scanDate);
	const citizen_id = res.locals.session.id;

	Citizen.findById(citizen_id)
		.then(cit => {
			if (!cit) return next(createError(401, 'unknown citizen'));
			//TODO
		})
		.catch(() => sendError(next));
});

module.exports = router;
