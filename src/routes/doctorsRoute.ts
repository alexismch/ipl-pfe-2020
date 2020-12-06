import Connectable from '@models/Connectable/ConnectableSchema';
import IConnectableDoc from '@models/Connectable/IConnectableDoc';
import {register, verifySession} from '@modules/connectable';
import {sendError} from '@modules/error';
import * as EmailValidator from 'email-validator';
import {NextFunction, Request, Response} from 'express';

const createError = require('http-errors');
const express = require('express');
const router = express.Router();

/**
 * Handle request to create a doctor
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
	const body = req.body;
	if (!body) return next(createError(422, 'body missing'));
	if (!body.firstName)
		return next(createError(422, "field 'firstName' missing"));
	if (!body.lastName)
		return next(createError(422, "field 'lastName' missing"));
	if (!body.email || !EmailValidator.validate(body.email))
		return next(createError(422, "field 'email' missing or invalid"));
	if (!body.password)
		return next(createError(422, "field 'password' missing"));
	if (!body.inami) return next(createError(422, "field 'inami' missing"));

	const connectable: IConnectableDoc = new Connectable({
		email: body.email,
		password: body.password,
		doctor_firstName: body.firstName,
		doctor_lastName: body.lastName,
		doctor_inami: body.inami,
	});

	register(
		req,
		res,
		next,
		connectable,
		"field 'email' or 'inami' already used"
	);
});

/**
 * Middleware to check if a session has been sent
 * Delegated to ConnectableUtility verifySession method
 * @return response delegated to the next endpoint, or with an error
 */
router.use(verifySession);

/**
 * Handle request to get public infos of a doctor
 */
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
	const id = req.params.id;
	if (id === 'me') return next();
	if (id.length !== 24) next(createError(400, "param 'id' incorrect"));

	Connectable.findById(id)
		.then(doc => {
			if (!doc || !doc.doctor_inami)
				return next(createError(404, 'unknown doctor'));
			res.json({
				id: doc._id,
				firstName: doc.doctor_firstName,
				lastName: doc.doctor_lastName,
			});
		})
		.catch(() => sendError(next));
});

/**
 * Handle request to get infos of a doctor
 */
router.get('/me', (req: Request, res: Response, next: NextFunction) => {
	Connectable.findById(res.locals.session.id)
		.then(doc => {
			if (!doc || !doc.doctor_inami)
				return next(createError(404, 'unknown doctor'));
			res.json(doc);
		})
		.catch(() => sendError(next));
});

module.exports = router;
