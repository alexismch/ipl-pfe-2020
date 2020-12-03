import {NextFunction, Request, Response} from "express";
import Institution from "@models/Institution/InstitutionSchema";
import ConnectableUtils from "@models/Connectable/ConnectableUtils";
import * as EmailValidator from "email-validator";
import IInstitutionDoc from "@models/Institution/IInstitutionDoc";
import ErrorUtils from "@utils/ErrorUtils";
import JWTUtils from "@utils/JWTUtils";
import Location from "@models/Location/LocationSchema";
import ILocationDoc from "@models/Location/ILocationDoc";
import ISession from "@models/Connectable/ISession";

const express = require('express');
const router = express.Router();

/**
 * Handle request to create an institution
 */
router.post('/', (req: Request, res: Response) => {
    const body = req.body;
    if (!body || !body.fullName || !body.email || !body.password || !EmailValidator.validate(body.email))
        return ErrorUtils.sendError(res, 422, 'content missing or incorrect');

    const institution: IInstitutionDoc = new Institution({
        name: body.fullName,
        description: body.description,
        email: body.email,
        password: body.password
    });

    ConnectableUtils.register(req, res, institution, Institution, 'email or name already used')
});

/**
 * Handle request to login
 * Delegated to ConnectableUtility connect method
 * @return response with a session token that expires in 24h, or with an error
 */
router.post('/session', (req: Request, res: Response) => {
    return ConnectableUtils.connect(req, res, Institution);
});

/**
 * Middleware to check if a session has been sent
 * @return response delegated to the next endpoint, or with an error
 */
router.use((req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.session)
        return ErrorUtils.sendError(res, 403, 'no session provided');
    next();
});

/**
 * Handle request to create a location
 * @return response with the new location, or with an error
 */
router.post('/location', (req: Request, res: Response) => {
    const body = req.body;
    const session: string = <string>req.headers.session;
    const decodedSession: ISession = <ISession>JWTUtils.getSessionConnectableId(session);
    if (decodedSession.type !== Institution.collection.collectionName)
        return ErrorUtils.sendError(res, 401, 'wrong user type');
    const id = decodedSession.id;

    Institution
        .findById(id)
        .then(inst => {
            if (!inst)
                return ErrorUtils.sendError(res, 422, 'incorrect institution id');

            if (!body || !body.name || !body.description)
                return ErrorUtils.sendError(res, 422, 'content missing or incorrect');

            let qrCodeToken = "";
            const location: ILocationDoc = new Location({
                institution: id,
                name: body.name,
                description: body.description,
                qrCodeToken
            });

            qrCodeToken = JWTUtils.sign({
                type: Location.collection.collectionName,
                location: location._id
            });
            location.qrCodeToken = qrCodeToken;

            location
                .save()
                .then(loc => res.status(201).send(loc))
                .catch(e => {
                    if (e.code === 11000)
                        return ErrorUtils.sendError(res, 409, 'location\'s name already used for this institution');
                    ErrorUtils.sendError(res);
                });
        })
        .catch(() => ErrorUtils.sendError(res));
});

module.exports = router;