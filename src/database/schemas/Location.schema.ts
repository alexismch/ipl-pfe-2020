import LocationInterface from '@database/interfaces/Location.interface';
import {Schema} from 'mongoose';

const locationSchemaFields: Record<keyof LocationInterface, any> = {
	owner_id: {type: Schema.Types.ObjectId, required: true, trim: true},
	owner_name: {type: String, required: true, trim: true},
	name: {type: String, required: true, trim: true},
	description: {type: String, required: true, trim: true},
};

const locationSchema: Schema = new Schema(locationSchemaFields);

locationSchema.index({owner_name: 1, name: -1}, {unique: true});

locationSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default locationSchema;
