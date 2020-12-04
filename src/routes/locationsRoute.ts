import {NextFunction, Request, Response} from "express";
import ISession from "@models/Connectable/ISession";
import Connectable from "@models/Connectable/ConnectableSchema";
import ILocationDoc from "@models/Location/ILocationDoc";
import Location from "@models/Location/LocationSchema";
import {sign} from "@utils/JWTUtils";
import {sendError} from "@utils/ErrorUtils";
import {verifySession} from "@utils/ConnectableUtils";

const createError = require('http-errors');
const express = require('express');
const router = express.Router();

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
    const session = <ISession><unknown>res.locals.session;
    const id = session.id;

    if (!body)
        return next(createError(422, 'body missing'));
    if (!body.name)
        return next(createError(422, 'field \'name\' missing'));
    if (!body.description)
        return next(createError(422, 'field \'description\' missing'));

    Connectable
        .findById(id)
        .then(con => {
            if (!con)
                return next(createError(401, 'unauthorized'));

            let qrCodeToken = "";
            const location: ILocationDoc = new Location({
                owner_id: id,
                owner_name: con.institution_name || con.doctor_firstName + con.doctor_lastName,
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

router.get('/', (req: Request, res: Response) => {
    const session = <ISession><unknown>res.locals.session;
    const id = session.id;

    Location
        .find({owner_id: id})
        .then(locs => {
            if (!locs || locs.length === 0)
                return res.status(204).send();
            res.json(locs);
        });
});

module.exports = router;