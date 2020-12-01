import {Request, Response} from "express";
import Establishment from "@models/Establishment/EstablishmentSchema";
import ConnectableUtility from "@models/Connectable/ConnectableUtility";

const express = require('express');
const router = express.Router();

router.post('/login', (req: Request, res: Response) => {
    return ConnectableUtility.connect(req, res, Establishment);
});

router.post('/register', (req: Request, res: Response) => {

});

module.exports = router;