import Citizen from '@models/Citizen/CitizenSchema';
import ICitizenDoc from '@models/Citizen/ICitizenDoc';
import Connectable from '@models/Connectable/ConnectableSchema';
import History from '@models/History/HistorySchema';
import IHistoryDoc from '@models/History/IHistoryDoc';
import Location from '@models/Location/LocationSchema';
import {generateSessionToken, verifySession} from '@modules/connectable';
import {sendError} from '@modules/error';
import {NextFunction, Request, Response} from 'express';
import * as admin from 'firebase-admin';

const createError = require('http-errors');
const express = require('express');
const router = express.Router();

/**
 * Handle request to create a citizen
 * Verify if the citizen's device already has logged in before and return a citizen in all cases
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
	const body = req.body;
	if (!body) return next(createError(422, 'body missing'));
	if (!body.notifToken)
		return next(
			createError(422, "field 'notifToken' missing or incorrect")
		);
	const device = req.body?.device;
	const citizen: ICitizenDoc = new Citizen({
		notifToken: body.notifToken,
		device,
	});

	const sendCitizen = (status, id) => {
		res.status(status).json({
			session: generateSessionToken(id, ''),
			type: 'citizen',
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
				if (cit) {
					cit.notifToken = body.notifToken;
					cit.save()
						.then(cit => sendCitizen(200, cit._id))
						.catch(() => sendError(next));
				} else save(citizen);
			})
			.catch(() => sendError(next));
	else save(citizen);
});

/**
 * Test send notif wia API
 */
router.get('/sendNotif', (req: Request, res: Response) => {
	//Get ID form session
	//Get corresponding token
	//Huy
	//etwM22wLrywUB--1-apXpS:APA91bGU3QTch3yqUILh7fzgDWjfrKH0POftSgI1iJHiHRlhD4lH-oVMy0o3jyVXcyq70kGPc071KxexiUWN3hngSwVIDAM1MfaCq7AHslQuu7s98aqrwL1wfMnNFggNXSe8qfabX5Mi
	//Bruno
	//epxR-mvbRDKuaIUI0a9-sD:APA91bFHopq8Xe0UGTIHerdw5rpze4jYeyhgMXSBAVi28rVJ1UXekNoC1h5SLMsEOi5HlWw95j6zKZQQ4eat-yK0wDbYCB-BIom7Q7aoleWDS7swFlcvuC3B6HB2MvdpANU6Jmpq0Nmj
	let registrationToken =
		'dJxaI6gttnEiwPNtXMW1Bv:APA91bEKwtUwzNaH3Bez2PAWgzyW1sKg9tnX9TH-_zXLzGoLTChp6bffiIXHh8UqfRvw6RntXT-YbeViiyzbC5YIPShCxqThOb8d-xuVSpOZ31DParpsDZYRFbDGTuTWskFAY_EHRs5n';
	let message = {
		notification: {
			title: 'Test notification via API',
			body: 'Essai pour gsm',
		},
		token: registrationToken,
	};
	// Send a message to the device corresponding to the provided
	// registration token.
	admin
		.messaging()
		.send(message)
		.then(response => {
			// Response is a message ID string.
			console.log('Successfully sent message:', response);
		})
		.catch(error => {
			console.log('Error sending message:', error);
		});

	res.json({
		test: 'reussi',
	});
});

/**
 * Middleware to check if a session has been sent
 * Delegated to ConnectableUtility verifySession method
 * @return response delegated to the next endpoint, or with an error
 */
router.use(verifySession);

/**
 * Handle request to get the citizen history
 * @return response with the history, or a no content
 */
router.get('/history', (req: Request, res: Response, next: NextFunction) => {
	const id = res.locals.session.id;

	Citizen.findById(id)
		.then(cit => {
			if (!cit) return next(createError(401, 'unknown citizen'));
		})
		.catch(() => sendError(next));

	History.find({citizen: id})
		.then(hist => {
			res.json(hist);
		})
		.catch(() => sendError(next));
});

/**
 * Handle request to add an scan event to the history
 */
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
	const nowDate = new Date();
	const maxPastDate = new Date();
	maxPastDate.setDate(nowDate.getDate() - 2);

	if (nowDate.valueOf() - scanDate.valueOf() < 0)
		return next(createError(422, "field 'scanDate' is in the future"));
	if (maxPastDate.valueOf() - scanDate.valueOf() > 0)
		return next(
			createError(422, "field 'scanDate' is too far in the past")
		);
	const citizen_id = res.locals.session.id;

	Citizen.findById(citizen_id)
		.then(cit => {
			if (!cit) return next(createError(401, 'unknown citizen'));
			const history = new History({
				citizen: citizen_id,
				scanDate,
			});

			console.log(history);
			switch (body.type) {
				case 'location':
					locationCase(body.id, history, res, next);
					break;
				case 'doctor':
					doctorCase(body.id, history, res, next);
					break;
				default:
					next(createError(422, "field 'type' incorrect"));
			}
		})
		.catch(e => {
			console.log(e);
			sendError(next);
		});
});

function saveHistory(history: IHistoryDoc, res: Response, next: NextFunction) {
	history
		.save()
		.then(hist => res.json(hist))
		.catch(e => {
			console.log(e);
			sendError(next);
		});
}

function locationCase(
	id,
	history: IHistoryDoc,
	res: Response,
	next: NextFunction
) {
	Location.findById(id)
		.then(loc => {
			if (!loc) return next(createError(422, "field 'id' incorrect"));
			history.location_id = loc._id;
			history.location_name = loc.name;
			history.location_description = loc.description;
			history.owner_id = loc.owner_id;
			history.owner_name = loc.owner_name;
			saveHistory(history, res, next);
		})
		.catch(e => {
			console.log(e);
			sendError(next);
		});
}

function doctorCase(
	id,
	history: IHistoryDoc,
	res: Response,
	next: NextFunction
) {
	Connectable.findById(id)
		.then(doc => {
			if (!doc || !doc.doctor_inami)
				return next(createError(422, "field 'id' incorrect"));
			history.doctor_id = doc._id;
			history.doctor_firstName = doc.doctor_firstName;
			history.doctor_lastName = doc.doctor_lastName;
			saveHistory(history, res, next);
			//TODO: process contacts
			console.log(doc);
		})
		.catch(e => {
			console.log(e);
			sendError(next);
		});
}

module.exports = router;
