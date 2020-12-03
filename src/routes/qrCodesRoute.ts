import {NextFunction, Request, Response} from "express";
import JWTUtils from "@utils/JWTUtils";

const createError = require('http-errors');
const express = require('express');
const router = express.Router();

/**
 *
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    //TODO
    const body = req.body;
    const type = body.type;
    if (!body || !type)
        return next(createError(422, 'content missing or incorrect'));

    let token;
    switch (type) {
        case "location":
            break;
        case "doctor":
            if (!body.inami)
                return next(createError(422, 'inami missing or incorrect'));
            token = JWTUtils.sign({inami: body.inami});
            break;
        default:
            return next(createError(422, 'wrong QR code type'));
    }
    res.json({token});
});

/**
 *
 */
router.post('/scan', (req: Request, res: Response, next: NextFunction) => {
    //TODO
    const body = req.body;
    const token = body.token;
    if (!body || !token)
        return next(createError(422, 'content missing or incorrect'));
    res.json({token: body.token});
});

module.exports = router;