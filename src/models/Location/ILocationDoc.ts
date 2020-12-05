import ILocation from '@models/Location/ILocation';
import {Document} from 'mongoose';

export default interface ILocationDoc extends Document, ILocation {
}