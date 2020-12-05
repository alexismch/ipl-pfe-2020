import IConnectable from '@models/Connectable/IConnectable';
import {Document} from 'mongoose';

export default interface IConnectableDoc extends Document, IConnectable {
	/**
	 * Verify if password matches with hashed password
	 * @param password the password to verify
	 */
	verifyPassword(password: string): boolean;

	/**
	 * Hash the current password
	 */
	hashPassword(): void;
}