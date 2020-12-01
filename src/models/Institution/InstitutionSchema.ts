import {model, Schema} from 'mongoose';
import IInstitution from "@models/Institution/IInstitution";
import IInstitutionDoc from "@models/Institution/IInstitutionDoc";
import ConnectableUtility from "@models/Connectable/ConnectableUtility";

const institutionSchemaFields: Record<keyof IInstitution, any> = {
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
};

const institutionSchema: Schema = new Schema(institutionSchemaFields);

ConnectableUtility.setProperties(institutionSchema);

export default model<IInstitutionDoc>('Institution', institutionSchema);