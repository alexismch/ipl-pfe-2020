import CitizenInterface from '@database/interfaces/Citizen.interface';
import {Schema} from 'mongoose';

const citizenSchemaFields: Record<keyof CitizenInterface, any> = {
	device: {type: String, trim: true},
	fcmToken: {type: String, trim: true},
};

const citizenSchema: Schema = new Schema(citizenSchemaFields);

citizenSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default citizenSchema;
