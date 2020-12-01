import {model, Schema} from 'mongoose';
import IDoctor from "@models/Doctor/IDoctor";
import IDoctorDoc from "@models/Doctor/IDoctorDoc";
import ConnectableUtility from "@models/Connectable/ConnectableUtility";

const doctorSchemaFields: Record<keyof IDoctor, any> = {
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    inami: {type: String, required: true, unique: true},
    password: {type: String, required: true}
};

const doctorSchema: Schema = new Schema(doctorSchemaFields);

ConnectableUtility.setProperties(doctorSchema);

export default model<IDoctorDoc>('Doctor', doctorSchema);