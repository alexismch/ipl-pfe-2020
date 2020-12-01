import {Request, Response} from "express";
import Doctor from "@models/Doctor/DoctorSchema";
import IDoctorDoc from "@models/Doctor/IDoctorDoc";
import ConnectableUtility from "@models/Connectable/ConnectableUtility";
import * as EmailValidator from 'email-validator';

const express = require('express');
const router = express.Router();

/**
 * Handle request to login
 * Delegated to ConnectableUtility connect method
 * @return response with the doctor that asked to connect, or with an error
 */
router.post('/login', (req: Request, res: Response) => {
    return ConnectableUtility.connect(req, res, Doctor);
});

/**
 * Handle request to create a doctor
 */
router.post('/', (req: Request, res: Response) => {
    const body = req.body;
    const [firstname, lastname] = body.fullname.split(' ');
    if (!body || !firstname || !lastname || !body.email || !body.passwd || !body.inami || !EmailValidator.validate(body.email))
        return res.status(422).json({error: 'content missing'});

    const doctor: IDoctorDoc = new Doctor({
        firstname: firstname,
        lastname: lastname,
        email: body.email,
        passwd: body.passwd,
        inami: body.inami
    });

    doctor
        .save()
        .then(doc => res.json(doc))
        .catch((e) => {
            if (e.code === 11000)
                return res.status(409).json({error: 'email or inami already used'});
            res.status(500).json({error: 'a server error occurred'});
        });
});

module.exports = router;