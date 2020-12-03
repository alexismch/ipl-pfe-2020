import {NextFunction, Request, Response} from "express";
import Doctor from "@models/Doctor/DoctorSchema";
import IDoctorDoc from "@models/Doctor/IDoctorDoc";
import ConnectableUtils from "@models/Connectable/ConnectableUtils";
import * as EmailValidator from 'email-validator';
import JWTUtils from "@utils/JWTUtils";
import ErrorUtils from "@utils/ErrorUtils";
import ISession from "@models/Connectable/ISession";

const express = require('express');
const router = express.Router();

/**
 * Handle request to create a doctor
 */
router.post('/', (req: Request, res: Response) => {
    const body = req.body;
    const [firstname, lastname] = body.fullName ? body.fullName.split(' ') : [null, null];
    if (!body || !firstname || !lastname || !body.email || !body.password || !body.inami || !EmailValidator.validate(body.email))
        return ErrorUtils.sendError(res, 422, 'content missing or incorrect');

    let qrCodeToken = "";
    const doctor: IDoctorDoc = new Doctor({
        firstname: firstname,
        lastname: lastname,
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

    ConnectableUtils.register(req, res, doctor, Doctor, 'email or inami already used')
});

/**
 * Handle request to login
 * Delegated to ConnectableUtility connect method
 * @return response with the doctor that asked to connect, or with an error
 */
router.post('/session', (req: Request, res: Response) => {
    return ConnectableUtils.connect(req, res, Doctor);
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
 * Handle request to get the QR Code Token of the doctor
 */
router.get('/qrCodeToken', (req: Request, res: Response) => {
    const session: string = <string>req.headers.session;
    const decodedSession: ISession = <ISession>JWTUtils.getSessionConnectableId(session);
    if (decodedSession.type !== Doctor.collection.collectionName)
        return ErrorUtils.sendError(res, 401, 'wrong user type');
    const id = decodedSession.id;

    Doctor
        .findById(id)
        .then((d: IDoctorDoc) => {
            if (d)
                return res.json({qrCodeToken: d.qrCodeToken});
            return ErrorUtils.sendError(res, 404, 'doctor not found');
        })
        .catch(() => ErrorUtils.sendError(res));
});

module.exports = router;