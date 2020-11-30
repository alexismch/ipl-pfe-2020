"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const doctor_1 = require("@models/doctor");
const express = require('express');
const router = express.Router();
router.post('/login', (req, res) => {
    const body = req.body;
    if (!body || !body.email || !body.passwd)
        return res.status(422).json({ error: 'content missing' });
    doctor_1.default
        .findOne({ email: body.email })
        .then((doctor) => {
        if (!doctor || !doctor.verifyPasswd(body.passwd))
            res.status(401).json({ error: 'please verify informations' });
        else
            res.json(doctor);
    });
});
router.post('/register', (req, res) => {
    const body = req.body;
    res.send(body);
});
module.exports = router;
//# sourceMappingURL=doctor.js.map