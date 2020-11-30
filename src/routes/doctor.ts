import {Request, Response} from "express";
import Doctor, {IDoctor} from "@models/doctor";

const express = require('express');
const router = express.Router();

router.post('/login', (req: Request, res: Response) => {
    const body = req.body;
    if (!body || !body.email || !body.passwd)
        return res.status(422).json({error: 'content missing'})

    Doctor
        .findOne({email: body.email})
        .then((doctor: IDoctor) => {
            if (!doctor || !doctor.verifyPasswd(body.passwd))
                res.status(401).json({error: 'please verify informations'});
            else
                res.json(doctor);
        });
});

router.post('/register', (req: Request, res: Response) => {
    const body = req.body;
    res.send(body);
});

module.exports = router;