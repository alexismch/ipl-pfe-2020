import Citizen from '@models/Citizen/CitizenSchema';
import ICitizenDoc from '@models/Citizen/ICitizenDoc';
import Connectable from '@models/Connectable/ConnectableSchema';
import History from '@models/History/HistorySchema';
import IHistoryDoc from '@models/History/IHistoryDoc';
import Location from '@models/Location/LocationSchema';
import {generateSessionToken, verifySession} from '@modules/connectable';
import {sendError} from '@modules/error';
import {NextFunction, Request, Response} from 'express';
import * as admin from 'firebase-admin';
import {formatDate} from '@modules/date';
import {stringify} from "querystring";

const createError = require('http-errors');
const express = require('express');
const router = express.Router();

/**
 * Handle request to create a citizen
 * Verify if the citizen's device already has logged in before and return a citizen in all cases
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
	const body = req.body;
	const device = body?.device;
	const fcmToken = body?.fcmToken;
	const citizen: ICitizenDoc = new Citizen({
		fcmToken,
		device,
	});

	const sendCitizen = (status, id) => {
		res.status(status).json({
			token: generateSessionToken(id, ''),
			type: 'citizen',
		});
	};

	const save = citizen =>
		citizen
			.save()
			.then(cit => sendCitizen(201, cit._id))
			.catch(() => sendError(next));

	if (device)
		Citizen.findOne({device})
			.then(cit => {
				if (cit) {
					cit.fcmToken = fcmToken;
					cit.save()
						.then(cit => sendCitizen(200, cit._id))
						.catch(() => sendError(next));
				} else save(citizen);
			})
			.catch(() => sendError(next));
	else save(citizen);
});

/**
 * Middleware to check if a session has been sent
 * Delegated to ConnectableUtility verifySession method
 * @return response delegated to the next endpoint, or with an error
 */
router.use(verifySession);

//TODO : getAllNotifications
/**
 * Handle request to get the citizen history
 * @return response with the history, or a no content
 */
router.get('/history', (req: Request, res: Response, next: NextFunction) => {
	const id = res.locals.session.id;

	Citizen.findById(id)
		.then(cit => {
			if (!cit) return next(createError(401, 'unknown citizen'));
		})
		.catch(() => sendError(next));

	History.find({citizen: id})
		.then(hist => {
			res.json(hist);
		})
		.catch(() => sendError(next));
});

/**
 * Handle request to add an scan event to the history
 */
router.post('/history', (req: Request, res: Response, next: NextFunction) => {
	const body = req.body;
	if (!body) return next(createError(422, 'body missing'));
	if (!body.type) return next(createError(422, "field 'type' missing"));
	if (!body.id || body.id.length !== 24)
		return next(createError(422, "field 'id' missing or incorrect"));
	if (
		!body.scanDate ||
		!/^\d\d\d\d-(0[1-9]|1[012])-([012]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(Z)$/.test(
			body.scanDate
		)
	)
		return next(createError(422, "field 'scanDate' missing or incorrect"));

	const scanDate = new Date(body.scanDate);
	const nowDate = new Date();
	const maxPastDate = new Date();
	maxPastDate.setDate(nowDate.getDate() - 2);

	if (nowDate.valueOf() - scanDate.valueOf() < 0)
		return next(createError(422, "field 'scanDate' is in the future"));
	if (maxPastDate.valueOf() - scanDate.valueOf() > 0)
		return next(
			createError(422, "field 'scanDate' is too far in the past")
		);
	const citizen_id = res.locals.session.id;

	Citizen.findById(citizen_id)
		.then(cit => {
			if (!cit) return next(createError(401, 'unknown citizen'));
			const history = new History({
				citizen: citizen_id,
				scanDate: formatDate(scanDate),
			});

			console.log(history);
			switch (body.type) {
				case 'location':
					locationCase(body.id, history, res, next);
					break;
				case 'doctor':
					doctorCase(body.id, history, res, next);
					alertNearContact(citizen_id)
					break;
				default:

					next(createError(422, "field 'type' incorrect"));
			}
		})
		.catch(() => sendError(next));
});



function saveHistory(history: IHistoryDoc, res: Response, next: NextFunction) {
	history
		.save()
		.then(hist => res.json(hist))
		.catch(() => sendError(next));
}

function locationCase(
	id,
	history: IHistoryDoc,
	res: Response,
	next: NextFunction
) {
	Location.findById(id)
		.then(loc => {
			if (!loc) return next(createError(422, "field 'id' incorrect"));
			history.location_id = loc._id;
			history.location_name = loc.name;
			history.location_description = loc.description;
			history.owner_id = loc.owner_id;
			history.owner_name = loc.owner_name;
			history.type = 'location';
			saveHistory(history, res, next);
		})
		.catch(() => sendError(next));
}

function doctorCase(
	id,
	history: IHistoryDoc,
	res: Response,
	next: NextFunction
) {
	Connectable.findById(id)
		.then(doc => {
			if (!doc || !doc.doctor_inami)
				return next(createError(422, "field 'id' incorrect"));
			history.doctor_id = doc._id;
			history.doctor_firstName = doc.doctor_firstName;
			history.doctor_lastName = doc.doctor_lastName;
			history.type = 'doctor';
			saveHistory(history, res, next);

/*			let registrationTokens = [
				'etwM22wLrywUB--1-apXpS:APA91bHh2QV69dSUjVP-1Veug4ws-lc45n_D0CNxoDD2msHep-8jh5APNdpEh55dT9YFysMDyaEzL9b7CsVA1fNCWGx1fUqUc6TV4VzAhSZNyCuOm_L7BY3t9Jlk8joICxTlvRhh2GcO',
				'eZpceJz_uYy-6cLWtblzX7:APA91bHY5pq0LxBacVgL_rtZS5gV452aNcBhXQgMTSl0BMu23pq6xBUzaQRAoRoB1gqRn31tvxxdszsufi32l8HWX_qicy63KENd2Lcz-x2_2nSoRrLO3aVHc4muzpyO05OONqczMbln',
			];*/

			console.log(doc);
		})
		.catch(() => sendError(next));
}

module.exports = router;


/**
 * Search and alert all the people in contact with the scanned citizen
 * @param citizen_id citizen who is positive to covid
 */
function alertNearContact(citizen_id: any) {
	let limitDay = new Date()
	limitDay.setDate(limitDay.getDate()-10)

	const dateLimite = formatDate(limitDay)

	console.log(dateLimite < '2020-12-6T1:34:42Z')
	History
		.find({
			citizen: citizen_id,
			scanDate: { $gt: dateLimite},
			location_id: { $exists: true, $ne: null }
		})
		.then(resp => {
			const conditions = createConditionsTime(resp,60,citizen_id)
			console.log("number location to scan " + resp.length)
			History.find({
				$or : conditions
			}).distinct("citizen")
				.then((citizenList) => {
					for ( const citizen of citizenList)
						Citizen.findOne({
							_id : citizen
						}).then((citizen) =>{
							const message = 'Vous êtes entré en contact avec une personne positive, mettez vous en quarantaine'
							sendNotificationsAlert(citizen,message)
							}
						)
				})
			/*			History.find({
                            $or : conditions
                        }).select({
                            citizen : 1,
                            _id : 0
                        }).populate({
                            path : 'citizen',
                            select : 'fcmToken -_id'
                        })
                            .then(resp => {
                                for(const entry of resp){
                                    console.log(entry.citizen)
                                    sendNotificationsAlert(entry.citizen['fcmToken'])
                                }
                            }

                        )*/
		})
		.catch((e) =>e.toString());


}

/**
 * Create the conditions for the query accordind to the time
 * @return the array of conditions
 * @param collections che collections who needs to be scanned
 * @param time the range in minutes of the contact time
 * @param citizen_id the id of the positive citizen
 */
function createConditionsTime(collections : IHistoryDoc[], time : number, citizen_id : string){
	const conditions = [];
	for (const entry of collections){
		let minHourContact = new Date(entry.scanDate)
		minHourContact.setMinutes(minHourContact.getMinutes()-time)
		let maxHourContact = new Date(entry.scanDate)
		maxHourContact.setMinutes(maxHourContact.getMinutes()+time)

		const cond = {
			location_id : entry.location_id,
			scanDate: { $gt: formatDate(minHourContact), $lt : formatDate(maxHourContact)},
			citizen : {$ne:citizen_id }
		}
		conditions.push(cond)
	}
	return conditions
}

/***
 * Save the notification to the DB
 * @param message the message to remember
 * @param citizen_id citizen who has been sent the notification
 */
function saveNotification(message : string, citizen_id : string) {
	//TODO: Add notifications to this citizen
}

/**
 * send the notification to the correct device
 * @param citizen the citizen who needs to be sent the notification
 * @param message the message whihc needs to be sent
 */
function sendNotificationsAlert(citizen: ICitizenDoc,message : string) {

	let content = {
		notification: {
			title: 'IMPORTANT BLOCKCOVID',
			body: message,
		},
		token: citizen.fcmToken,
	};
	// Send a message to the device corresponding to the provided registration token.
	admin
		.messaging()
		.send(content)
		.then(response => {
			saveNotification(message,citizen._id);
			console.log('Successfully sent message:', response);
		})
		.catch(error => {
			console.log('Error sending message:', error);
		});
}
