import {Request, Response} from "express";
import QRCode from "@models/QRCode/QRCode";

const express = require('express');
const router = express.Router();

/**
 *
 */
router.post('/', (req: Request, res: Response) => {
    const body = req.body;
    const type = body.type;
    if (!body || !type)
        return res.status(422).json({error: 'content missing'});
    let token;
    switch (type) {
        case "location":
            break;
        case "doctor":
            if (!body.inami)
                return res.status(422).json({error: 'inami missing'});
            token = QRCode.sign({inami: body.inami});
            break;
        default:
            return res.status(422).json({error: 'wrong QR code type'});
    }
    res.json({token});
});

router.post('/scan', (req: Request, res: Response) => {
    //TODO
    const body = req.body;
    const token = body.token;
    if (!body || !token)
        return res.status(422).json({error: 'content missing'});
    res.json({token: body.token});
});

module.exports = router;