import {model, Schema} from 'mongoose';
import ILocation from "@models/Location/ILocation";
import ILocationDoc from "@models/Location/ILocationDoc";

const locationSchemaFields: Record<keyof ILocation, any> = {
    institution: {type: Schema.Types.ObjectId, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    qrCodeToken: {type: String, required: true, unique: true}
};

const locationSchema: Schema = new Schema(locationSchemaFields);

locationSchema.index({institution: 1, name: 1}, {unique: true});

locationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

export default model<ILocationDoc>('Location', locationSchema);