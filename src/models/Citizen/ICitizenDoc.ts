import ICitizen from '@models/Citizen/ICitizen';
import {Document} from 'mongoose';

export default interface ICitizenDoc extends Document, ICitizen {
}