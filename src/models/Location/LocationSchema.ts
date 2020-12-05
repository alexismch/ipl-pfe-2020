import ILocation from '@models/Location/ILocation';
import ILocationDoc from '@models/Location/ILocationDoc';
import {model, Schema} from 'mongoose';

const locationSchemaFields: Record<keyof ILocation, any> = {
	owner_id: {type: Schema.Types.ObjectId, required: true},
	owner_name: {type: String, required: true},
	name: {type: String, required: true},
	description: {type: String, required: true}
};

const locationSchema: Schema = new Schema(locationSchemaFields);

locationSchema.index({institution: 1, name: 1}, {unique: true});

locationSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

export default model<ILocationDoc>('Location', locationSchema);