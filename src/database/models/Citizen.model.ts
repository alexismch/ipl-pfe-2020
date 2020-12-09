import CitizenDoc from '@database/docs/Citizen.doc';
import citizenSchema from '@database/schemas/Citizen.schema';
import {model} from 'mongoose';

const Citizen = model<CitizenDoc>('Citizen', citizenSchema);

export interface citizens {
	getByDevice(device);
}

export default Citizen;
