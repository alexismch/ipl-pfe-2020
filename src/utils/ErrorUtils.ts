import {Response} from "express";

export default class ErrorUtils {
    /**
     * Send an error to the response
     * @param res the response to which send the error
     * @param code the error code
     * @param msg the error message
     */
    public static sendError(res: Response, code: number = 500, msg: string = 'a server error occurred'): void {
        res.status(code).json({error: msg});
    }
}