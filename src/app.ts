import {Request, Response} from 'express';
import * as admin from 'firebase-admin';
import 'module-alias/register';
import * as path from 'path';
import api from '@controllers/index';

/**
 * Initialize firebase
 */
const {GOOGLE_FCM_CREDENTIALS} = process.env;

if (!GOOGLE_FCM_CREDENTIALS)
	throw new Error('Environment variable GOOGLE_FCM_CREDENTIALS is not set');

admin.initializeApp({
	credential: admin.credential.cert(
		JSON.parse(process.env.GOOGLE_FCM_CREDENTIALS)
	),
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
 * Middlewares
 */
if (!process.env.NODE_ENV) app.use(cors());
else {
	const whitelist = [
		'https://ipl-pfe-2020-api-doc.herokuapp.com',
		process.env.MOBILE_ORIGIN,
	];
	console.log(`CORS only allowed to ${whitelist.join(', ')}`);
	app.use(
		cors({
			origin: whitelist,
		})
	);
}
app.use(express.json());
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms')
);
app.use(express.static('front_end/build'));

/**
 * api route definition
 */
app.use('/api', api);

/**
 * redirect all non-api unknown requests to index
 */
app.use((req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '../front_end/build', 'index.html'));
});

export default server;
