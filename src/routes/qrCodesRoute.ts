import {Request, Response} from "express";

const express = require('express');
const router = express.Router();

router.post('/', (req: Request, res: Response) => {
    //TODO
    const body = req.body;
    const type = body.type;
    if (!body || !type)
        return res.status(422).json({error: 'content missing'});
    switch (type) {
        case "location":
            break;
        case "infection":
            break;
        default:
            return res.status(422).json({error: 'wrong QR code type'});
    }
    res.json({token: body.token});
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