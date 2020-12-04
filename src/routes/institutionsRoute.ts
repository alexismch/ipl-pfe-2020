import {NextFunction, Request, Response} from "express";
import * as EmailValidator from "email-validator";
import {sendError} from "@utils/ErrorUtils";
import Location from "@models/Location/LocationSchema";
import ILocationDoc from "@models/Location/ILocationDoc";
import ISession from "@models/Connectable/ISession";
import Connectable from "@models/Connectable/ConnectableSchema";
import IConnectableDoc from "@models/Connectable/IConnectableDoc";
import {connect, register, verifySession} from "@utils/ConnectableUtils";
import {sign} from "@utils/JWTUtils";

const createError = require('http-errors');
const express = require('express');
const router = express.Router();

/**
 * Handle request to create an institution
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    if (!body)
        return next(createError(422, 'body missing'));
    if (!body.name)
        return next(createError(422, 'field \'name\' missing'));
    if (!body.no || !/^(\s*?\.*?-*?)(\d\s*\.*-*){10}$/.test(body.no))
        return next(createError(422, 'field \'no\' missing or invalid'));
    if (!body.email || !EmailValidator.validate(body.email))
        return next(createError(422, 'field \'email\' missing or invalid'));
    if (!body.password)
        return next(createError(422, 'field \'password\' missing'));

    const institution: IConnectableDoc = new Connectable({
        institution_name: body.name,
        institution_no: body.no,
        email: body.email,
        password: body.password
    });

    register(req, res, next, institution, 'field \'email\' or \'name\' already used');
});

/**
 * Handle request to login
 * Delegated to ConnectableUtility connect method
 * @return response with a session token, or with an error
 */
router.post('/session', (req: Request, res: Response, next: NextFunction) => {
    return connect(req, res, next);
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
router.post('/locations', (req: Request, res: Response, next: NextFunction) => {
    //TODO: move to global
    const body = req.body;
    const session = <ISession><unknown>req.headers.session;
    if (session.type !== Connectable.collection.collectionName)
        return next(createError(401, 'user must be an institution'));
    const id = session.id;

    Connectable
        .findById(id)
        .then(inst => {
            if (!inst)
                return next(createError(422, 'incorrect institution id'));

            if (!body || !body.name || !body.description)
                return next(createError(422, 'content missing or incorrect'));

            let qrCodeToken = "";
            const location: ILocationDoc = new Location({
                institution: id,
                name: body.name,
                description: body.description,
                qrCodeToken
            });

            qrCodeToken = sign({
                location: location._id
            });
            location.qrCodeToken = qrCodeToken;

            location
                .save()
                .then(loc => res.status(201).send(loc))
                .catch(e => {
                    if (e.code === 11000)
                        return next(createError(409, 'location\'s name already used for this institution'));
                    sendError(next);
                });
        })
        .catch(() => sendError(next));
});

router.get('/locations', (req: Request, res: Response, next: NextFunction) => {
    const session = <ISession><unknown>req.headers.session;
    if (session.type !== Connectable.collection.collectionName)
        return next(createError(401, 'wrong user type'));
    const id = session.id;

    Location
        .find({institution: id})
        .then(locs => {
            if (!locs || locs.length === 0)
                return res.status(204).send();
            res.json(locs);
        });
});

module.exports = router;