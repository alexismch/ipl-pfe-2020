import IHistory from '@models/History/IHistory';
import {Document} from 'mongoose';

export default interface IHistoryDoc extends Document, IHistory {}
