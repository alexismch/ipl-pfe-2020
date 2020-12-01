import {Request, Response} from "express";
import Establishment from "@models/Establishment/EstablishmentSchema";
import ConnectableUtility from "@models/Connectable/ConnectableUtility";
import * as EmailValidator from "email-validator";
import {IEstablishmentDoc} from "@models/Establishment/IEstablishmentDoc";

const express = require('express');
const router = express.Router();

router.post('/session', (req: Request, res: Response) => {
    return ConnectableUtility.connect(req, res, Establishment);
});

router.post('/', (req: Request, res: Response) => {
    const body = req.body;
    if (!body || !body.name || !body.description || !body.email || !body.passwd || !EmailValidator.validate(body.email))
        return res.status(422).json({error: 'content missing'});

    const establishment: IEstablishmentDoc = new Establishment({
        name: body.name,
        description: body.description,
        email: body.email,
        passwd: body.passwd
    });

    establishment
        .save()
        .then(est => res.json(est))
        .catch((e) => {
            if (e.code === 11000)
                return res.status(409).json({error: 'email or name already used'});
            res.status(500).json({error: 'a server error occurred'});
        });
});

module.exports = router;