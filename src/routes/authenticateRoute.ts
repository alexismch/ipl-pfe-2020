import {NextFunction, Request, Response} from "express";
import {connect} from "@modules/connectable";

const express = require('express');
const router = express.Router();

/**
 * Handle request to login
 * Delegated to ConnectableUtility connect method
 * @return response with the connectable that asked to connect, or with an error
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    return connect(req, res, next);
});

module.exports = router;