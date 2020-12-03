import {NextFunction} from "express";

const createError = require('http-errors');

export default class ErrorUtils {
    /**
     * Send an error to the response
     * @param next the next middleware
     * @param code the error code
     * @param msg the error message
     */
    public static sendError(next: NextFunction, code: number = 500, msg: string = 'a server error occurred'): void {
        next(createError(code, msg));
    }
}