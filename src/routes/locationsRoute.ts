import Connectable from '@models/Connectable/ConnectableSchema';
import ISession from '@models/Connectable/ISession';
import ILocationDoc from '@models/Location/ILocationDoc';
import Location from '@models/Location/LocationSchema';
import {verifySession} from '@modules/connectable';
import {sendError} from '@modules/error';
import {NextFunction, Request, Response} from 'express';

const createError = require('http-errors');
const express = require('express');
const router = express.Router();

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
	const id = req.params.id;
	if (id.length !== 24) next(createError(400, "param 'id' incorrect"));

	Location.findById(id)
		.then(loc => {
			if (!loc) return next(createError(404, 'unknown location'));
			res.json({
				id: loc._id,
				name: loc.name,
				description: loc.description,
				ownerName: loc.owner_name,
			});
		})
		.catch(() => sendError(next));
});

/**
 * Middleware to check if a session has been sent
 * Delegated to ConnectableUtility verifySession method
 * @return response delegated to the next endpoint, or with an error
 */
router.use(verifySession);

/**
 * Handle request to create a location
 * @return response with the new location, or with an error
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
	const body = req.body;
	const session = <ISession>(<unknown>res.locals.session);
	const id = session.id;

	if (!body) return next(createError(422, 'body missing'));
	if (!body.name) return next(createError(422, "field 'name' missing"));
	if (!body.description)
		return next(createError(422, "field 'description' missing"));

	Connectable.findById(id)
		.then(con => {
			if (!con) return next(createError(401, 'unauthorized'));

			const location: ILocationDoc = new Location({
				owner_id: id,
				owner_name:
					con.institution_name ||
					con.doctor_firstName + con.doctor_lastName,
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
								"location's name already used for this institution"
							)
						);
					sendError(next);
				});
		})
		.catch(() => sendError(next));
});

/**
 * Handle request to get the connectable locations
 * @return response with the list of locations, or a no content
 */
router.get('/', (req: Request, res: Response) => {
	const session = <ISession>(<unknown>res.locals.session);
	const id = session.id;

	Location.find({owner_id: id}).then(locs => {
		if (!locs || locs.length === 0) return res.status(204).send();
		res.json(locs);
	});
});

module.exports = router;
