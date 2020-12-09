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
	(req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		if (id.length !== 24) next(createError(400, "param 'id' incorrect"));

		Location.findById(id)
			.then(loc => {
				if (!loc) return next(createError(404, 'unknown location'));
				res.json(loc);
			})
			.catch(() => sendError(next));
	}
);

/**
 * Handle request to create a location
 * @return response with the new location, or with an error
 */
locationsController.post(
	'/',
	(req: Request, res: Response, next: NextFunction) => {
		const body = req.body;
		const id = res.locals.session.id;

		if (!body) return next(createError(422, 'body missing'));
		if (!body.name) return next(createError(422, "field 'name' missing"));
		if (!body.description)
			return next(createError(422, "field 'description' missing"));

		Connectable.findById(id)
			.then(con => {
				if (!con) return next(createError(401, 'unauthorized'));

				const location: LocationDoc = new Location({
					owner_id: id,
					owner_name:
						con.institution_name ||
						con.doctor_firstName + ' ' + con.doctor_lastName,
					name: body.name,
					description: body.description,
				});

				location
					.save()
					.then(loc => res.status(201).send(loc))
					.catch(e => {
						if (e.code === 11000)
							return next(
								createError(
									409,
									"location's name already used for this institution or doctor"
								)
							);
						sendError(next);
					});
			})
			.catch(() => sendError(next));
	}
);

/**
 * Handle request to get the connectable locations
 * @return response with the list of locations, or a no content
 */
locationsController.get(
	'/',
	(req: Request, res: Response, next: NextFunction) => {
		const id = res.locals.session.id;

		Connectable.findById(id)
			.then(doc => {
				if (!doc) return next(createError(401, 'unknown connectable'));
			})
			.catch(() => sendError(next));

		Location.find({owner_id: id})
			.then(locs => {
				res.json(locs);
			})
			.catch(() => sendError(next));
	}
);

export default locationsController;
