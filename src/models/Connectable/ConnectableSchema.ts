import {model, Schema} from 'mongoose';
import IConnectable from "@models/Connectable/IConnectable";
import IConnectableDoc from "@models/Connectable/IConnectableDoc";
import {setProperties} from "@models/Connectable/ConnectableUtils";


// @ts-ignore
const requiredDoctorFields = () => !this.institution_name && this.doctor_inami;

// @ts-ignore
const requiredInstitutionFields = () => this.institution_name && !this.doctor_inami;

const connectableSchemaFields: Record<keyof IConnectable, any> = {
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    institution_name: {type: String, required: requiredInstitutionFields},
    institution_no: {type: String, required: requiredInstitutionFields},
    doctor_firstName: {type: String, required: requiredDoctorFields},
    doctor_lastName: {type: String, required: requiredDoctorFields},
    doctor_inami: {type: String, required: requiredDoctorFields},
    doctor_qrCodeToken: {type: String, required: requiredDoctorFields},
};

const connectableSchema: Schema = new Schema(connectableSchemaFields);

setProperties(connectableSchema);

export default model<IConnectableDoc>('connectable', connectableSchema);