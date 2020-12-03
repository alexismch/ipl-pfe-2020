import {Model, Schema} from "mongoose";
import IConnectableDoc from "@models/Connectable/IConnectableDoc";
import {NextFunction, Request, Response} from "express";
import JWTUtils from "@utils/JWTUtils";
import ErrorUtils from "@utils/ErrorUtils";

const createError = require('http-errors');
const bcrypt = require('bcrypt');

export default class ConnectableUtils {
    // Format that removes password to connectable toJson method
    public static jsonFormat = {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
            delete returnedObject.password
        }
    };
    public static saltRounds = 10;
    public static expIn = '24h';

    /**
     * Set properties to a Connectable Schema
     * @param schema to whom to set properties
     */
    public static setProperties(schema: Schema): void {
        schema.method('verifyPassword', function (password: string): boolean {
            return bcrypt.compareSync(password, this.password);
        });

        schema.method('hashPassword', function (): void {
            this.password = bcrypt.hashSync(this.password, ConnectableUtils.saltRounds);
        });

        schema.set('toJSON', ConnectableUtils.jsonFormat);

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
     * @param model the model of mongoose data
     * @return response with user's data if connection allowed, error if not
     */
    public static connect(req: Request, res: Response, next: NextFunction, model: Model<IConnectableDoc>): any {
        const body = req.body;
        if (!body || !body.email || !body.password)
            return next(createError(422, 'content missing or incorrect'));

        model
            .findOne({email: body.email})
            .then((connectable: IConnectableDoc) => {
                if (!connectable || !connectable.verifyPassword(body.password))
                    return next(createError(401, 'incorrect content'));
                res.json({session: this.generateSessionToken(connectable, model)});
            })
            .catch(() => ErrorUtils.sendError(next));
    }

    /**
     *
     * @param req the request
     * @param res the response
     * @param next the next middleware
     * @param connectable the connectable that asked to connect
     * @param model the model of the connectable
     * @param paramsErrorMsg the error message to send if error is due to the params
     */
    public static register(req: Request, res: Response, next: NextFunction, connectable: IConnectableDoc, model: Model<IConnectableDoc>, paramsErrorMsg: string): any {
        connectable
            .save()
            .then(connectable => {
                res.status(201).json({
                    session: this.generateSessionToken(connectable, model),
                    //connectable
                });
            })
            .catch((e) => {
                if (e.code === 11000)
                    return next(createError(409, paramsErrorMsg));
                ErrorUtils.sendError(next);
            });
    }

    /**
     * Verify if a session is provided and if it's valid
     * @param req the request
     * @param res the response
     * @param next the next middleware
     * @return response delegated to the next middleware, or with an error
     */
    public static verifySession(req: Request, res: Response, next: NextFunction): void {
        if (!req.headers.session)
            return next(createError(403, 'no session provided'));

        const session: string = <string>req.headers.session;
        try {
            req.headers.session = <string[]><unknown>JWTUtils.getSessionConnectableId(session);
            next();
        } catch (e) {
            return next(createError(498, 'session invalid or expired'));
        }
    }

    /**
     * Generate a session token
     * @param connectable the connectable that asked to connect
     * @param model the model of the connectable
     * @private
     */
    private static generateSessionToken(connectable: IConnectableDoc, model: Model<IConnectableDoc>): string {
        return JWTUtils.sign({
            type: model.collection.collectionName,
            id: connectable.id
        }, {expiresIn: this.expIn});
    }
}