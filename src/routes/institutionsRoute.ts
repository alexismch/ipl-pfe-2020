import {Request, Response} from "express";
import Institution from "@models/Institution/InstitutionSchema";
import ConnectableUtility from "@models/Connectable/ConnectableUtility";
import * as EmailValidator from "email-validator";
import IInstitutionDoc from "@models/Institution/IInstitutionDoc";

const express = require('express');
const router = express.Router();

/**
 * Handle request to login
 * Delegated to ConnectableUtility connect method
 * @return response with a session token that expires in 24h, or with an error
 */
router.post('/session', (req: Request, res: Response) => {
    return ConnectableUtility.connect(req, res, Institution);
});

/**
 * Handle request to create an institution
 */
router.post('/', (req: Request, res: Response) => {
    const body = req.body;
    if (!body || !body.fullName || !body.email || !body.password || !EmailValidator.validate(body.email))
        return res.status(422).json({error: 'content missing or incorrect'});

    const institution: IInstitutionDoc = new Institution({
        name: body.fullName,
        description: body.description,
        email: body.email,
        password: body.password
    });

    institution
        .save()
        .then(inst => res.json(inst))
        .catch((e) => {
            if (e.code === 11000)
                return res.status(409).json({error: 'email or name already used'});
            console.log(e);
            res.status(500).json({error: 'a server error occurred'});
        });
});

module.exports = router;