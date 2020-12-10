import ConnectableDoc from '@database/docs/Connectable.doc';
import Connectable from '@database/models/Connectable.model';
import {register, verifySession} from '@modules/connectable';
import {sendError} from '@modules/error';
import * as EmailValidator from 'email-validator';
import {NextFunction, Request, Response} from 'express';

const createError = require('http-errors');
const express = require('express');
const institutionsController = express.Router();

/**
 * Handle request to create an institution
 */
institutionsController.post(
	'/',
	(req: Request, res: Response, next: NextFunction) => {
		const body = req.body;
		if (!body) return next(createError(422, 'body missing'));
		if (!body.name) return next(createError(422, "field 'name' missing"));
		if (!body.no || !/^(\s*?\.*?-*?)(\d\s*\.*-*){10}$/.test(body.no))
			return next(createError(422, "field 'no' missing or invalid"));
		if (!body.email || !EmailValidator.validate(body.email))
			return next(createError(422, "field 'email' missing or invalid"));
		if (!body.password)
			return next(createError(422, "field 'password' missing"));

		const institution: ConnectableDoc = Connectable.createInstitution(
			body.email,
			body.password,
			body.name,
			body.no
		);

		register(
			req,
			res,
			next,
			institution,
			"field 'email' or 'no' already used"
		);
	}
);

/**
 * Middleware to check if a session has been sent
 * Delegated to ConnectableUtility verifySession method
 * @return response delegated to the next endpoint, or with an error
 */
institutionsController.use(verifySession);

/**
 * Handle request to get infos of an institution
 */
institutionsController.get(
	'/me',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const inst = await Connectable.getById(res.locals.session.id);
			if (!inst || !inst.institution_no)
				return next(createError(401, 'unknown institution'));
			res.json(inst);
		} catch (e) {
			console.log(e);
			sendError(next);
		}
	}
);

export default institutionsController;
