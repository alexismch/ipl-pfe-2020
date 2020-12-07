import INotification from '@models/Notifications/INotification';
import INotificationDoc from '@models/Notifications/INotificationDoc';
import {model, Schema} from 'mongoose';

const notificationSchemaFields: Record<keyof INotification, any> = {
	citizen: {type: Schema.Types.ObjectId, required: true},
	message: {type: String, required: true},
	date: {type: String, required: true},
};

const notificationSchema: Schema = new Schema(notificationSchemaFields);

notificationSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default model<INotificationDoc>('Notification', notificationSchema);
