import LocationDoc from '@database/docs/Location.doc';
import locationSchema from '@database/schemas/Location.schema';
import {model} from 'mongoose';

const Location = model<LocationDoc>('Location', locationSchema);

interface locationModel {
	getById(id: string);

	getByOwnerId(ownerId: string);

	create(
		owner_id: string,
		owner_name: string,
		name: string,
		description: string
	);

	save(location: LocationDoc);
}

const location: locationModel = {
	async getById(id: string) {
		return await Location.findById(id).exec();
	},

	async getByOwnerId(ownerId: string) {
		return await Location.find({owner_id: ownerId}).exec();
	},

	create(
		owner_id: string,
		owner_name: string,
		name: string,
		description: string
	) {
		return new Location({
			owner_id,
			owner_name,
			name,
			description,
		});
	},

	async save(location: LocationDoc) {
		return await location.save();
	},
};

export default location;
