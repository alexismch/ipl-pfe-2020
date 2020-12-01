import {Request, Response} from "express";
import Citizen from "@models/Citizen/CitizenSchema";
import ICitizenDoc from "@models/Citizen/ICitizenDoc";

const express = require('express');
const router = express.Router();

/**
 * Handle request to create a citizen
 * Verify if the citizen's device already has logged in before and return a citizen in all cases
 */
router.post('/', (req: Request, res: Response) => {
    const body = req.body;
    if (!body || !body.device)
        return res.status(422).json({error: 'content missing'});

    const citizen: ICitizenDoc = new Citizen({
        device: body.device
    });

    Citizen
        .findOne({device: body.device})
        .then(cit => {
            if (cit)
                return res.json(cit);
            citizen
                .save()
                .then(cit => res.json(cit))
                .catch(() => res.status(500).json({error: 'a server error occurred'}))
        })
        .catch(() => res.status(500).json({error: 'a server error occurred'}));
});

module.exports = router;