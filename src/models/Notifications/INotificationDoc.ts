import INotification from '@models/Notifications/INotification';
import {Document} from 'mongoose';

export default interface INotificationDoc extends Document, INotification {}
