import HistoryDoc from '@database/docs/History.doc';
import historySchema from '@database/schemas/History.schema';
import {model} from 'mongoose';

const History = model<HistoryDoc>('History', historySchema);

export default History;
