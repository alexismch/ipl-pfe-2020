import ConnectableDoc from '@database/docs/Connectable.doc';
import connectableSchema from '@database/schemas/Connectable.schema';
import {model} from 'mongoose';

const Connectable = model<ConnectableDoc>('Connectable', connectableSchema);

interface connectableModel {
	getById(id: string);

	getByMail(email: string);

	createDoctor(
		email: string,
		password: string,
		doctor_firstName: string,
		doctor_lastName: string,
		doctor_inami: string
	);

	createInstitution(
		email: string,
		password: string,
		institution_name: string,
		institution_no: string
	);

	save(connectable: ConnectableDoc);
}

const connectable: connectableModel = {
	async getById(id: string) {
		return await Connectable.findById(id).exec();
	},

	async getByMail(email) {
		return await Connectable.findOne({email: email}).exec();
	},

	createDoctor(
		email: string,
		password: string,
		doctor_firstName: string,
		doctor_lastName: string,
		doctor_inami: string
	) {
		return new Connectable({
			email,
			password,
			doctor_firstName,
			doctor_lastName,
			doctor_inami,
		});
	},

	createInstitution(
		email: string,
		password: string,
		institution_name: string,
		institution_no: string
	) {
		return new Connectable({
			institution_name,
			institution_no,
			email,
			password,
		});
	},

	async save(connectable: ConnectableDoc) {
		return await connectable.save();
	},
};

export default connectable;
