import ConnectableDoc from '@database/docs/Connectable.doc';
import connectableSchema from '@database/schemas/Connectable.schema';
import {model} from 'mongoose';

const Connectable = model<ConnectableDoc>('Connectable', connectableSchema);

export default Connectable;
