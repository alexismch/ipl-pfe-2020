import IConnectable from '@models/Connectable/IConnectable';
import IConnectableDoc from '@models/Connectable/IConnectableDoc';
import {model, Schema} from 'mongoose';

function requiredDoctorFields(me = this): boolean {
	return (
		(me.doctor_firstName || me.doctor_lastName || me.doctor_inami) &&
		!me.institution_name &&
		!me.institution_no
	);
}

function requiredInstitutionFields(): boolean {
	return !requiredDoctorFields(this);
}

const connectableSchemaFields: Record<keyof IConnectable, any> = {
	email: {type: String, required: true, unique: true, trim: true},
	password: {type: String, required: true, unique: true, trim: true},
	institution_name: {
		type: String,
		required: requiredInstitutionFields,
		trim: true,
	},
	institution_no: {
		type: String,
		index: true,
		unique: true,
		sparse: true,
		required: requiredInstitutionFields,
		trim: true,
	},
	doctor_firstName: {
		type: String,
		required: requiredDoctorFields,
		trim: true,
	},
	doctor_lastName: {type: String, required: requiredDoctorFields, trim: true},
	doctor_inami: {
		type: String,
		index: true,
		unique: true,
		sparse: true,
		required: requiredDoctorFields,
		trim: true,
	},
};

const connectableSchema: Schema = new Schema(connectableSchemaFields);

/**
 * Set properties to a Connectable Schema
 */
{
	const bcrypt = require('bcrypt');
	const jsonFormat = {
		transform: (document, returnedObject) => {
			returnedObject.id = returnedObject._id.toString();
			delete returnedObject._id;
			delete returnedObject.__v;
			delete returnedObject.password;
		},
	};
	const saltRounds = 10;

	connectableSchema.method(
		'verifyPassword',
		function (password: string): boolean {
			return bcrypt.compareSync(password, this.password);
		}
	);

	connectableSchema.method('hashPassword', function (): void {
		this.password = bcrypt.hashSync(this.password, saltRounds);
	});

	connectableSchema.set('toJSON', jsonFormat);

	connectableSchema.pre('save', function (next) {
		const doctor: IConnectableDoc = <IConnectableDoc>this;
		if (!this.isModified('password')) return next();

		doctor.hashPassword();
		next();
	});
}

export default model<IConnectableDoc>('connectable', connectableSchema);
