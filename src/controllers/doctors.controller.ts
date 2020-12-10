import ConnectableDoc from '@database/docs/Connectable.doc';
import Connectable from '@database/models/Connectable.model';
import {register, verifySession} from '@modules/connectable';
import {sendError} from '@modules/error';
import * as EmailValidator from 'email-validator';
import {NextFunction, Request, Response} from 'express';

const createError = require('http-errors');
const express = require('express');
const doctorsController = express.Router();

/**
 * Handle request to create a doctor
 */
doctorsController.post(
	'/',
	(req: Request, res: Response, next: NextFunction) => {
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

		const connectable: ConnectableDoc = Connectable.createDoctor(
			body.email,
			body.password,
			body.firstName,
			body.lastName,
			body.inami
		);

		register(
			req,
			res,
			next,
			connectable,
			"field 'email' or 'inami' already used"
		);
	}
);

/**
 * Middleware to check if a session has been sent
 * Delegated to ConnectableUtility verifySession method
 * @return response delegated to the next endpoint, or with an error
 */
doctorsController.use(verifySession);

/**
 * Handle request to get public infos of a doctor
 */
doctorsController.get(
	'/:id',
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		if (id === 'me') return next();
		if (id.length !== 24) next(createError(400, "param 'id' incorrect"));

		try {
			const doc = await Connectable.getById(id);
			if (!doc || !doc.doctor_inami)
				return next(createError(404, 'unknown doctor'));
			res.json({
				id: doc._id,
				firstName: doc.doctor_firstName,
				lastName: doc.doctor_lastName,
			});
		} catch (e) {
			console.log(e);
			sendError(next);
		}
	}
);

/**
 * Handle request to get infos of a doctor
 */
doctorsController.get(
	'/me',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const doc = await Connectable.getById(res.locals.session.id);
			if (!doc || !doc.doctor_inami)
				return next(createError(401, 'unknown doctor'));
			res.json(doc);
		} catch (e) {
			console.log(e);
			sendError(next);
		}
	}
);

export default doctorsController;
