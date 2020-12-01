import {Request, Response} from "express";
import Doctor from "@models/Doctor/DoctorSchema";
import {IDoctorDoc} from "@models/Doctor/IDoctorDoc";
import ConnectableUtility from "@models/Connectable/ConnectableUtility";
import * as EmailValidator from 'email-validator';

const express = require('express');
const router = express.Router();

router.post('/login', (req: Request, res: Response) => {
    return ConnectableUtility.connect(req, res, Doctor);
});

router.post('/register', (req: Request, res: Response) => {
    const body = req.body;
    if (!body || !body.firstname || !body.lastname || !body.email || !body.passwd || !EmailValidator.validate(body.email))
        return res.status(422).json({error: 'content missing'});

    const doctor: IDoctorDoc = new Doctor({
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        passwd: body.passwd
    });

    doctor
        .save()
        .then(doc => res.json(doc))
        .catch((e) => {
            if (e.code === 11000)
                return res.status(409).json({error: 'email already used'});
            res.status(500).json({error: 'a server error occurred'});
        });
});

module.exports = router;