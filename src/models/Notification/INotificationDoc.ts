import INotification from '@models/Citizen/ICitizen';
import {Document} from 'mongoose';

export default interface INotificationDoc extends Document, INotification {}
