import INotificationDoc from '@database/docs/Location.doc';
import notificationSchema from '@database/schemas/Notification.schema';
import {model} from 'mongoose';

const Notification = model<INotificationDoc>(
	'Notification',
	notificationSchema
);

export default Notification;
