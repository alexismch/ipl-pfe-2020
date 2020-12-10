import NotificationDoc from '@database/docs/Location.doc';
import notificationSchema from '@database/schemas/Notification.schema';
import {formatDate} from '@modules/date';
import {model} from 'mongoose';

const Notification = model<NotificationDoc>('Notification', notificationSchema);

interface notificationModel {
	getByCitizenId(citizenId: string);

	create(citizen_id: string, message: string);

	save(notification: NotificationDoc);
}

const notification: notificationModel = {
	async getByCitizenId(citizenId: string) {
		return await Notification.find({citizen_id: citizenId}).exec();
	},

	create(citizen_id: string, message: string) {
		return new Notification({
			citizen_id,
			message,
			date: formatDate(new Date()),
		});
	},

	async save(notification: NotificationDoc) {
		return await notification.save();
	},
};

export default notification;
