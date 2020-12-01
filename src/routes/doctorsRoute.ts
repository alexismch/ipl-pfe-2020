import {Request, Response} from "express";
import Doctor from "@models/Doctor/DoctorSchema";
import IDoctorDoc from "@models/Doctor/IDoctorDoc";
import ConnectableUtils from "@models/Connectable/ConnectableUtils";
import * as EmailValidator from 'email-validator';
import JWTUtils from "@utils/JWTUtils";
import ErrorUtils from "@utils/ErrorUtils";

const express = require('express');
const router = express.Router();

/**
 * Handle request to login
 * Delegated to ConnectableUtility connect method
 * @return response with the doctor that asked to connect, or with an error
 */
router.post('/session', (req: Request, res: Response) => {
    return ConnectableUtils.connect(req, res, Doctor);
});

/**
 * Handle request to create a doctor
 */
router.post('/', (req: Request, res: Response) => {
    const body = req.body;
    const [firstname, lastname] = body.fullName ? body.fullName.split(' ') : [null, null];
    if (!body || !firstname || !lastname || !body.email || !body.password || !body.inami || !EmailValidator.validate(body.email))
        return ErrorUtils.sendError(res, 422, 'content missing or incorrect');

    const qrCodeToken = JWTUtils.sign({
        type: Doctor.collection.collectionName,
        inami: body.inami
    });
    const doctor: IDoctorDoc = new Doctor({
        firstname: firstname,
        lastname: lastname,
        email: body.email,
        password: body.password,
        inami: body.inami,
        qrCodeToken: qrCodeToken
    });
    ConnectableUtils.register(req, res, doctor, Doctor, 'email or inami already used')
});

/**
 * Handle request to get the QR Code Token of the doctor
 */
router.get('/:id/qrCodeToken', (req: Request, res: Response) => {
    const id = req.params.id;

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