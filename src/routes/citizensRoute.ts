import {Request, Response} from "express";
import Citizen from "@models/Citizen/CitizenSchema";
import ICitizenDoc from "@models/Citizen/ICitizenDoc";
import ErrorUtils from "@utils/ErrorUtils";

const express = require('express');
const router = express.Router();

/**
 * Handle request to create a citizen
 * Verify if the citizen's device already has logged in before and return a citizen in all cases
 */
router.post('/', (req: Request, res: Response) => {
    const body = req.body;
    if (!body || !body.device)
        return ErrorUtils.sendError(res, 422, 'content missing or incorrect');

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
                .then(cit => res.status(201).json(cit))
                .catch(() => ErrorUtils.sendError(res));
        })
        .catch(() => ErrorUtils.sendError(res));
});

module.exports = router;