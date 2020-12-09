import HistoryInterface from '@database/interfaces/History.interface';
import {Document} from 'mongoose';

export default interface HistoryDoc extends Document, HistoryInterface {}
