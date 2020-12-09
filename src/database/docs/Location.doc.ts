import LocationInterface from '@database/interfaces/Location.interface';
import {Document} from 'mongoose';

export default interface LocationDoc extends Document, LocationInterface {}
