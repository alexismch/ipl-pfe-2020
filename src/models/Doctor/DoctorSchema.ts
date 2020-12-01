import {model, Schema} from 'mongoose';
import IDoctor from "@models/Doctor/IDoctor";
import IDoctorDoc from "@models/Doctor/IDoctorDoc";
import ConnectableUtils from "@models/Connectable/ConnectableUtils";

const doctorSchemaFields: Record<keyof IDoctor, any> = {
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    inami: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    qrCodeToken: {type: String, required: true, unique: true}
};

const doctorSchema: Schema = new Schema(doctorSchemaFields);

ConnectableUtils.setProperties(doctorSchema);

export default model<IDoctorDoc>('Doctor', doctorSchema);