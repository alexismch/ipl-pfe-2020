import NotificationInterface from '@database/interfaces/Notification.interface';
import {Schema} from 'mongoose';

const notificationSchemaFields: Record<keyof NotificationInterface, any> = {
	citizen_id: {type: Schema.Types.ObjectId, required: true, trim: true},
	message: {type: String, required: true, trim: true},
	date: {type: String, required: true, trim: true},
};

const notificationSchema: Schema = new Schema(notificationSchemaFields);

notificationSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default notificationSchema;
