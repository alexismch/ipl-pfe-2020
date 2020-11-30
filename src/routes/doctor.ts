import {Request, Response} from "express";
import Doctor from "@models/Doctor/DoctorSchema";
import {IDoctorDoc} from "@models/Doctor/IDoctorDoc";

const express = require('express');
const router = express.Router();

router.post('/login', (req: Request, res: Response) => {
    const body = req.body;
    if (!body || !body.email || !body.passwd)
        return res.status(422).json({error: 'content missing'})

    Doctor
        .findOne({email: body.email})
        .then((doctor: IDoctorDoc) => {
            if (!doctor || !doctor.verifyPasswd(body.passwd))
                res.status(401).json({error: 'please verify informations'});
            else
                res.json(doctor);
        });
});

router.post('/register', (req: Request, res: Response) => {
    const dc: IDoctorDoc = new Doctor({
        firstname: "alexis",
        lastname: "michiels",
        email: "private@alexismch.be",
        passwd: "ok"
    });
    dc.save().then(d => {
        console.log(d);
    })
    const body = req.body;
    res.send(body);
});

module.exports = router;