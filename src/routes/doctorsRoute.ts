import {NextFunction, Request, Response} from "express";
import Doctor from "@models/Doctor/DoctorSchema";
import IDoctorDoc from "@models/Doctor/IDoctorDoc";
import ConnectableUtils from "@models/Connectable/ConnectableUtils";
import * as EmailValidator from 'email-validator';
import JWTUtils from "@utils/JWTUtils";
import ErrorUtils from "@utils/ErrorUtils";
import ISession from "@models/Connectable/ISession";

const createError = require('http-errors');
const express = require('express');
const router = express.Router();

/**
 * Handle request to create a doctor
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    if (!body || !body.firstName || !body.lastName || !body.email || !body.password || !body.inami || !EmailValidator.validate(body.email))
        return next(createError(422, 'content missing or incorrect'));

    let qrCodeToken = "";
    const doctor: IDoctorDoc = new Doctor({
        firstname: body.firstName,
        lastname: body.lastName,
        email: body.email,
        password: body.password,
        inami: body.inami,
        qrCodeToken
    });

    qrCodeToken = JWTUtils.sign({
        type: Doctor.collection.collectionName,
        doctor: doctor._id
    });
    doctor.qrCodeToken = qrCodeToken;

    ConnectableUtils.register(req, res, next, doctor, Doctor, 'email or inami already used');
});

/**
 * Handle request to login
 * Delegated to ConnectableUtility connect method
 * @return response with the doctor that asked to connect, or with an error
 */
router.post('/session', (req: Request, res: Response, next: NextFunction) => {
    return ConnectableUtils.connect(req, res, next, Doctor);
});

/**
 * Middleware to check if a session has been sent
 * @return response delegated to the next endpoint, or with an error
 */
router.use(router.use(ConnectableUtils.verifySession));

/**
 * Handle request to get the QR Code Token of the doctor
 */
router.get('/qrCodeToken', (req: Request, res: Response, next: NextFunction) => {
    const session = <ISession><unknown>req.headers.session;
    if (session.type !== Doctor.collection.collectionName)
        return next(createError(401, 'wrong user type'));
    const id = session.id;

    Doctor
        .findById(id)
        .then((d: IDoctorDoc) => {
            if (d)
                return res.json({qrCodeToken: d.qrCodeToken});
            return next(createError(404, 'doctor not found'));
        })
        .catch(() => ErrorUtils.sendError(next));
});

module.exports = router;