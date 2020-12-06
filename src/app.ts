import {Request, Response} from 'express';
import 'module-alias/register';
import * as path from 'path';
import * as admin from 'firebase-admin';

require('@models/dbInit');

/**
 * Initialize firebase
 */
admin.initializeApp({
	credential: admin.credential.applicationDefault(),
});

/**
 * Web server
 */
const express = require('express');
const app = express();
const server = require('http').Server(app);
const morgan = require('morgan');
const cors = require('cors');

/**
 * api route import
 */
const apiRoute = require('@routes/apiRoute');

/**
 * Middlewares
 */
app.use(cors());
app.use(express.json());
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms')
);
app.use(express.static('front_end/build'));

/**
 * api route definition
 */
app.use('/api', apiRoute);

/**
 * redirect all non-api unknown requests to index
 */
app.use((req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '../front_end/build', 'index.html'));
});

export default server;
