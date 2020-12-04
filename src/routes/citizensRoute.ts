import {NextFunction, Request, Response} from "express";
import Citizen from "@models/Citizen/CitizenSchema";
import ICitizenDoc from "@models/Citizen/ICitizenDoc";
import {sendError} from "@utils/errorUtils";
import * as mongoose from "mongoose";
import {generateSessionToken} from "@utils/connectableUtils";

const express = require('express');
const router = express.Router();

/**
 * Handle request to create a citizen
 * Verify if the citizen's device already has logged in before and return a citizen in all cases
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const device = req.body?.device;
    const body = device ? {device} : {};
    const citizen: ICitizenDoc = new Citizen(body);

    const sendCitizen = (status, id) => {
        res.status(status).json({
            session: generateSessionToken(id, ''),
        });
    }

    const save = (citizen) =>
        citizen
            .save()
            .then(cit => sendCitizen(201, cit._id))
            .catch(() => sendError(next));

    if (device)
        Citizen
            .findOne({device: device})
            .then(cit => {
                if (cit)
                    return sendCitizen(200, cit._id)
                save(citizen);
            })
            .catch(() => sendError(next));
    else
        save(citizen);
});

router.post('/history', (req: Request, res: Response, next: NextFunction) => {
    console.log(Citizen.collection.collectionName);
    mongoose.connection.collection('doctors')
    next();
});

module.exports = router;