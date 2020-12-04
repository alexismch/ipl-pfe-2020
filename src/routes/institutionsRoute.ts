import {NextFunction, Request, Response} from "express";
import ConnectableUtils from "@models/Connectable/ConnectableUtils";
import * as EmailValidator from "email-validator";
import ErrorUtils from "@utils/ErrorUtils";
import JWTUtils from "@utils/JWTUtils";
import Location from "@models/Location/LocationSchema";
import ILocationDoc from "@models/Location/ILocationDoc";
import ISession from "@models/Connectable/ISession";
import Connectable from "@models/Connectable/ConnectableSchema";
import IConnectableDoc from "@models/Connectable/IConnectableDoc";

const createError = require('http-errors');
const express = require('express');
const router = express.Router();

/**
 * Handle request to create an institution
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    if (!body || !body.name || !body.no || !body.email || !body.password || !EmailValidator.validate(body.email))
        return next(createError(422, 'content missing or incorrect'));

    const institution: IConnectableDoc = new Connectable({
        institution_name: body.name,
        institution_no: body.no,
        email: body.email,
        password: body.password
    });

    ConnectableUtils.register(req, res, next, institution, 'email or name already used');
});

/**
 * Handle request to login
 * Delegated to ConnectableUtility connect method
 * @return response with a session token, or with an error
 */
router.post('/session', (req: Request, res: Response, next: NextFunction) => {
    return ConnectableUtils.connect(req, res, next);
});

/**
 * Middleware to check if a session has been sent
 * Delegated to ConnectableUtility verifySession method
 * @return response delegated to the next endpoint, or with an error
 */
router.use(ConnectableUtils.verifySession);

/**
 * Handle request to create a location
 * @return response with the new location, or with an error
 */
router.post('/locations', (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const session = <ISession><unknown>req.headers.session;
    if (session.type !== Connectable.collection.collectionName)
        return next(createError(401, 'wrong user type'));
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

            qrCodeToken = JWTUtils.sign({
                location: location._id
            });
            location.qrCodeToken = qrCodeToken;

            location
                .save()
                .then(loc => res.status(201).send(loc))
                .catch(e => {
                    if (e.code === 11000)
                        return next(createError(409, 'location\'s name already used for this institution'));
                    ErrorUtils.sendError(next);
                });
        })
        .catch(() => ErrorUtils.sendError(next));
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