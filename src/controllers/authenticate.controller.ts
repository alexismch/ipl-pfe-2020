import Connectable from '@database/models/Connectable.model';
import {connect, verifySession} from '@modules/connectable';
import {sendError} from '@modules/error';
import {NextFunction, Request, Response} from 'express';

const createError = require('http-errors');
const express = require('express');
const authenticateController = express.Router();

/**
 * Handle request to login
 * Delegated to ConnectableUtility connect method
 * @return response with the connectable that asked to connect, or with an error
 */
authenticateController.post(
	'/',
	(req: Request, res: Response, next: NextFunction) => {
		return connect(req, res, next);
	}
);

/**
 * Middleware to check if a session has been sent
 * Delegated to ConnectableUtility verifySession method
 * @return response delegated to the next endpoint, or with an error
 */
authenticateController.use(verifySession);

authenticateController.get(
	'/',
	(req: Request, res: Response, next: NextFunction) => {
		Connectable.findById(res.locals.session.id)
			.then(con => {
				if (!con) return next(createError(401, 'unauthorized'));

				res.json({
					type: con.institution_name ? 'institution' : 'doctor',
				});
			})
			.catch(() => sendError(next));
	}
);

export default authenticateController;
