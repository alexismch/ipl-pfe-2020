import {Request, Response} from "express";
import Institution from "@models/Institution/InstitutionSchema";
import ConnectableUtils from "@models/Connectable/ConnectableUtils";
import * as EmailValidator from "email-validator";
import IInstitutionDoc from "@models/Institution/IInstitutionDoc";
import ErrorUtils from "@utils/ErrorUtils";

const express = require('express');
const router = express.Router();

/**
 * Handle request to login
 * Delegated to ConnectableUtility connect method
 * @return response with a session token that expires in 24h, or with an error
 */
router.post('/session', (req: Request, res: Response) => {
    return ConnectableUtils.connect(req, res, Institution);
});

/**
 * Handle request to create an institution
 */
router.post('/', (req: Request, res: Response) => {
    const body = req.body;
    if (!body || !body.fullName || !body.email || !body.password || !EmailValidator.validate(body.email))
        return ErrorUtils.sendError(res, 422, 'content missing or incorrect');

    const institution: IInstitutionDoc = new Institution({
        name: body.fullName,
        description: body.description,
        email: body.email,
        password: body.password
    });

    ConnectableUtils.register(req, res, institution, Institution, 'email or name already used')
});

module.exports = router;