import Connectable from '@models/Connectable/ConnectableSchema';
import IConnectableDoc from '@models/Connectable/IConnectableDoc';
import {register} from '@modules/connectable';
import * as EmailValidator from 'email-validator';
import {NextFunction, Request, Response} from 'express';

const createError = require('http-errors');
const express = require('express');
const router = express.Router();

/**
 * Handle request to create an institution
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
	const body = req.body;
	console.log(body);
	if (!body) return next(createError(422, 'body missing'));
	if (!body.name) return next(createError(422, "field 'name' missing"));
	if (!body.no || !/^(\s*?\.*?-*?)(\d\s*\.*-*){10}$/.test(body.no))
		return next(createError(422, "field 'no' missing or invalid"));
	if (!body.email || !EmailValidator.validate(body.email))
		return next(createError(422, "field 'email' missing or invalid"));
	if (!body.password)
		return next(createError(422, "field 'password' missing"));

	const institution: IConnectableDoc = new Connectable({
		institution_name: body.name,
		institution_no: body.no,
		email: body.email,
		password: body.password,
	});

	register(req, res, next, institution, "field 'email' or 'no' already used");
});

module.exports = router;
