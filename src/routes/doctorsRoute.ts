import {NextFunction, Request, Response} from "express";
import * as EmailValidator from 'email-validator';
import JWTUtils from "@utils/JWTUtils";
import ErrorUtils from "@utils/ErrorUtils";
import ISession from "@models/Connectable/ISession";
import IConnectableDoc from "@models/Connectable/IConnectableDoc";
import Connectable from "@models/Connectable/ConnectableSchema";
import IDoctorDoc from "@models/Doctor/IDoctorDoc";

const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const connectableUtils = require('@models/Connectable/ConnectableUtils');

/**
 * Handle request to create a doctor
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    if (!body)
        return next(createError(422, 'body missing'));
    if (!body.firstName)
        return next(createError(422, 'field \'firstName\' missing'));
    if (!body.lastName)
        return next(createError(422, 'field \'lastName\' missing'));
    if (!body.email || !EmailValidator.validate(body.email))
        return next(createError(422, 'field \'email\' missing or invalid'));
    if (!body.password)
        return next(createError(422, 'field \'password\' missing'));

    let doctor_qrCodeToken = "";
    const connectable: IConnectableDoc = new Connectable({
        email: body.email,
        password: body.password,
        doctor_firstname: body.firstName,
        doctor_lastname: body.lastName,
        doctor_inami: body.inami,
        doctor_qrCodeToken
    });

    doctor_qrCodeToken = JWTUtils.sign({
        doctor: connectable._id
    });
    connectable.doctor_qrCodeToken = doctor_qrCodeToken;

    connectableUtils.register(req, res, next, connectable, 'field \'email\' or \'inami\' already used');
});

/**
 * Handle request to login
 * Delegated to ConnectableUtility connect method
 * @return response with the doctor that asked to connect, or with an error
 */
router.post('/session', (req: Request, res: Response, next: NextFunction) => {
    return connectableUtils.connect(req, res, next);
});

/**
 * Middleware to check if a session has been sent
 * @return response delegated to the next endpoint, or with an error
 */
router.use(router.use(connectableUtils.verifySession));

/**
 * Handle request to get the QR Code Token of the doctor
 */
router.get('/qrCodeToken', (req: Request, res: Response, next: NextFunction) => {
    const session = <ISession><unknown>req.headers.session;
    if (session.type !== Connectable.collection.collectionName)
        return next(createError(401, 'user must be a doctor'));
    const id = session.id;

    Connectable
        .findById(id)
        .then((d: IDoctorDoc) => {
            if (d)
                return res.json({qrCodeToken: d.doctor_qrCodeToken});
            return next(createError(404, 'doctor not found'));
        })
        .catch(() => ErrorUtils.sendError(next));
});

module.exports = router;