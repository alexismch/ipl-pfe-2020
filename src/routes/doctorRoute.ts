import {Request, Response} from "express";
import Doctor from "@models/Doctor/DoctorSchema";
import {IDoctorDoc} from "@models/Doctor/IDoctorDoc";
import ConnectableUtility from "@models/Connectable/ConnectableUtility";

const express = require('express');
const router = express.Router();

router.post('/login', (req: Request, res: Response) => {
    return ConnectableUtility.connect(req, res, Doctor);
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