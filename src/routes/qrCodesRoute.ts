import {Request, Response} from "express";

const express = require('express');
const router = express.Router();

router.post('/', (req: Request, res: Response) => {
    const body = req.body;
    if (!body || !body.token)
        return res.status(422).json({error: 'content missing'})
    res.json({token: body.token});
});

router.post('/scan', (req: Request, res: Response) => {
    const body = req.body;
    if (!body || !body.token)
        return res.status(422).json({error: 'content missing'})
    res.json({token: body.token});
});

module.exports = router;