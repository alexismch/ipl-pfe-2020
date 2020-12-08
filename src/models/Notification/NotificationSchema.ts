import INotificationDoc from '@models/Location/ILocationDoc';
import {model, Schema} from 'mongoose';
import INotification from '@models/Notification/INotification';

const notificationSchemaFields: Record<keyof INotification, any> = {
	citizen_id: {type: Schema.Types.ObjectId, required: true},
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
