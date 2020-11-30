"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
router.post('/', (req, res) => {
    const body = req.body;
    if (!body || !body.token)
        return res.status(422).json({ error: 'content missing' });
    res.json({ token: body.token });
});
module.exports = router;
//# sourceMappingURL=qrcode.js.map