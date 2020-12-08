import IHistory from '@models/History/IHistory';
import IHistoryDoc from '@models/History/IHistoryDoc';
import {model, Schema} from 'mongoose';

function requiredDoctorFields(me = this): boolean {
	return (
		(me.doctor_firstName || me.doctor_lastName || me.doctor_id) &&
		!me.location_id &&
		!me.location_name &&
		!me.location_description &&
		!me.owner_id &&
		!me.owner_name
	);
}

function requiredLocationFields(): boolean {
	return !requiredDoctorFields(this);
}

const historySchemaFields: Record<keyof IHistory, any> = {
	citizen: {type: Schema.Types.ObjectId, required: true, ref : 'Citizen'},
	scanDate: {type: String, required: true},
	type: {type: String, required: true},
	doctor_id: {type: Schema.Types.ObjectId, required: requiredDoctorFields},
	doctor_firstName: {type: String, required: requiredDoctorFields},
	doctor_lastName: {type: String, required: requiredDoctorFields},
	location_id: {
		type: Schema.Types.ObjectId,
		required: requiredLocationFields,
	},
	location_name: {type: String, required: requiredLocationFields},
	location_description: {type: String, required: requiredLocationFields},
	owner_id: {type: Schema.Types.ObjectId, required: requiredLocationFields},
	owner_name: {type: String, required: requiredLocationFields},
};

const historySchema: Schema = new Schema(historySchemaFields);

historySchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default model<IHistoryDoc>('History', historySchema);
