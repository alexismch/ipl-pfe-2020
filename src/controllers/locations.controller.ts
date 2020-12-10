import LocationDoc from '@database/docs/Location.doc';
import Connectable from '@database/models/Connectable.model';
import Location from '@database/models/Location.model';
import {verifySession} from '@modules/connectable';
import {sendError} from '@modules/error';
import {NextFunction, Request, Response} from 'express';

const createError = require('http-errors');
const express = require('express');
const locationsController = express.Router();

/**
 * Middleware to check if a session has been sent
 * Delegated to ConnectableUtility verifySession method
 * @return response delegated to the next endpoint, or with an error
 */
locationsController.use(verifySession);

locationsController.get(
	'/:id',
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		if (id.length !== 24) next(createError(400, "param 'id' incorrect"));

		try {
			const loc = await Location.getById(id);
			if (!loc) return next(createError(404, 'unknown location'));
			res.json(loc);
		} catch (e) {
			console.log(e);
			sendError(next);
		}
	}
);

/**
 * Handle request to create a location
 * @return response with the new location, or with an error
 */
locationsController.post(
	'/',
	async (req: Request, res: Response, next: NextFunction) => {
		const body = req.body;
		const id = res.locals.session.id;

		if (!body) return next(createError(422, 'body missing'));
		if (!body.name) return next(createError(422, "field 'name' missing"));
		if (!body.description)
			return next(createError(422, "field 'description' missing"));

		try {
			const connectable = await Connectable.getById(id);
			if (!connectable) return next(createError(401, 'unauthorized'));

			const location: LocationDoc = Location.create(
				id,
				connectable.institution_name ||
					connectable.doctor_firstName +
						' ' +
						connectable.doctor_lastName,
				body.name,
				body.description
			);
			const loc = await Location.save(location);
			res.status(201).send(loc);
		} catch (e) {
			console.log(e);
			if (e.code === 11000)
				return next(
					createError(
						409,
						"location's name already used for this institution or doctor"
					)
				);
			sendError(next);
		}
	}
);

/**
 * Handle request to get the connectable locations
 * @return response with the list of locations, or a no content
 */
locationsController.get(
	'/',
	async (req: Request, res: Response, next: NextFunction) => {
		const id = res.locals.session.id;

		try {
			const doc = await Connectable.getById(id);
			if (!doc) return next(createError(401, 'unknown connectable'));

			const locs = await Location.getByOwnerId(id);
			res.json(locs);
		} catch (e) {
			console.log(e);
			sendError(next);
		}
	}
);

export default locationsController;
