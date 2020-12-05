import {NextFunction} from 'express';

const createError = require('http-errors');

/**
 * Send an error to the response
 * @param next the next middleware
 * @param code the error code
 * @param msg the error message
 */
export function sendError(
	next: NextFunction,
	code: number = 500,
	msg: string = 'a server error occurred'
): void {
	next(createError(code, msg));
}
