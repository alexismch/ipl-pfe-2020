import {Request, Response} from "express";
import JWTUtils from "@utils/JWTUtils";
import ErrorUtils from "@utils/ErrorUtils";

const express = require('express');
const router = express.Router();

/**
 *
 */
router.post('/', (req: Request, res: Response) => {
    //TODO
    const body = req.body;
    const type = body.type;
    if (!body || !type)
        return ErrorUtils.sendError(res, 422, 'content missing or incorrect');

    let token;
    switch (type) {
        case "location":
            break;
        case "doctor":
            if (!body.inami)
                return ErrorUtils.sendError(res, 422, 'inami missing or incorrect');
            token = JWTUtils.sign({inami: body.inami});
            break;
        default:
            return ErrorUtils.sendError(res, 422, 'wrong QR code type');
    }
    res.json({token});
});

/**
 *
 */
router.post('/scan', (req: Request, res: Response) => {
    //TODO
    const body = req.body;
    const token = body.token;
    if (!body || !token)
        return ErrorUtils.sendError(res, 422, 'content missing or incorrect');
    res.json({token: body.token});
});

module.exports = router;