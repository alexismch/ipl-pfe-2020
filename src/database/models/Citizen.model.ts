import CitizenDoc from '@database/docs/Citizen.doc';
import citizenSchema from '@database/schemas/Citizen.schema';
import {model} from 'mongoose';

const Citizen = model<CitizenDoc>('Citizen', citizenSchema);

interface citizenModel {
	getById(id: string);

	getByDevice(device: string);

	getByConditions(conditions: object);

	create(fcmToken: string, device: string);

	save(citizen: CitizenDoc);
}

const citizen: citizenModel = {
	async getById(id: string) {
		return await Citizen.findById(id).exec();
	},

	async getByDevice(device: string) {
		return await Citizen.findOne({device}).exec();
	},

	async getByConditions(conditions: object) {
		return await Citizen.find(conditions).exec();
	},

	create(fcmToken: string, device: string) {
		return new Citizen({
			fcmToken,
			device,
		});
	},

	async save(citizen: CitizenDoc) {
		return await citizen.save();
	},
};

export default citizen;
