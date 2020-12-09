import ConnectableInterface from '@database/interfaces/Connectable.interface';
import {Document} from 'mongoose';

export default interface ConnectableDoc extends Document, ConnectableInterface {
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
