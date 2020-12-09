import INotification from '@database/interfaces/Citizen.interface';
import {Document} from 'mongoose';

export default interface NotificationDoc extends Document, INotification {}
