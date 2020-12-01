import {model, Schema} from 'mongoose';
import IEstablishment from "@models/Establishment/IEstablishment";
import IEstablishmentDoc from "@models/Establishment/IEstablishmentDoc";
import ConnectableUtility from "@models/Connectable/ConnectableUtility";

const establishmentSchemaFields: Record<keyof IEstablishment, any> = {
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    passwd: {type: String, required: true}
};

const establishmentSchema: Schema = new Schema(establishmentSchemaFields);

ConnectableUtility.setProperties(establishmentSchema);

export default model<IEstablishmentDoc>('Establishment', establishmentSchema);