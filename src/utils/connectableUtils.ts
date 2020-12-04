import {Schema} from "mongoose";
import IConnectableDoc from "@models/Connectable/IConnectableDoc";
import {NextFunction, Request, Response} from "express";
import {sendError} from "@utils/errorUtils";
import Connectable from "@models/Connectable/ConnectableSchema";
import * as EmailValidator from "email-validator";
import {getSessionConnectableId, sign} from "@utils/jwtUtils";

const createError = require('http-errors');
const bcrypt = require('bcrypt');

// Format that removes password to connectable toJson method
const jsonFormat = {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
};
const saltRounds = 10;
const expIn = '24h';

/**
 * Set properties to a Connectable Schema
 * @param schema to whom to set properties
 */
export function setProperties(schema: Schema): void {
    schema.method('verifyPassword', function (password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    });

    schema.method('hashPassword', function (): void {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    });

    schema.set('toJSON', jsonFormat);

    schema.pre('save', function (next) {
        const doctor: IConnectableDoc = <IConnectableDoc>this;
        if (!this.isModified('password'))
            return next();

        doctor.hashPassword();
        next();
    });
}

/**
 * Verify the authorisation to connect
 * @param req the request
 * @param res the response
 * @param next the next middleware
 * @return response with user's data if connection allowed, error if not
 */
export function connect(req: Request, res: Response, next: NextFunction): any {
    const body = req.body;
    if (!body)
        return next(createError(422, 'body missing'));
    if (!body.email || !EmailValidator.validate(body.email))
        return next(createError(422, 'field \'email\' missing or invalid'));
    if (!body.password)
        return next(createError(422, 'field \'password\' missing'));

    Connectable
        .findOne({email: body.email})
        .then((connectable: IConnectableDoc) => {
            if (!connectable || !connectable.verifyPassword(body.password))
                return next(createError(401, 'field \'email\' or \'password\' incorrect'));
            res.json({session: generateSessionToken(connectable._id)});
        })
        .catch(() => sendError(next));
}

/**
 *
 * @param req the request
 * @param res the response
 * @param next the next middleware
 * @param connectable the connectable that asked to connect
 * @param paramsErrorMsg the error message to send if error is due to the params
 */
export function register(req: Request, res: Response, next: NextFunction, connectable: IConnectableDoc, paramsErrorMsg: string): any {
    connectable
        .save()
        .then(connectable => {
            res.status(201).json({
                session: generateSessionToken(connectable._id),
            });
        })
        .catch((e) => {
            if (e.code === 11000)
                return next(createError(409, paramsErrorMsg));
            sendError(next);
        });
}

/**
 * Verify if a session is provided and if it's valid
 * @param req the request
 * @param res the response
 * @param next the next middleware
 * @return response delegated to the next middleware, or with an error
 */
export function verifySession(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers.authorization)
        return next(createError(401, 'no header \'Authorization\' provided'));

    const session: string = <string>req.headers.authorization;
    try {
        res.locals.session = <string[]><unknown>getSessionConnectableId(session);
        next();
    } catch (e) {
        return next(createError(401, 'header \'Authorization\' invalid or expired'));
    }
}

/**
 * Generate a session token
 * @param id the id
 * @param exp the expiration time
 * @private
 */
export function generateSessionToken(id: string, exp: string = expIn): string {
    return sign({
        id
    }, exp ? {expiresIn: exp} : {});
}