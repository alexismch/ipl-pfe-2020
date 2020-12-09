import LocationDoc from '@database/docs/Location.doc';
import locationSchema from '@database/schemas/Location.schema';
import {model} from 'mongoose';

const Location = model<LocationDoc>('Location', locationSchema);

export default Location;
