import ISession from '@models/Connectable/ISession';

const secret = 'IPL_PFE_2020';
const jwt = require('jsonwebtoken');

/**
 * Create a JWT Token
 * @param payload payload to add to the token
 * @param options token options
 */
export function sign(payload: object, options: object = {}): string {
	return jwt.sign(payload, secret, options);
}

export function getSessionConnectableId(sessionToken: string): ISession {
	return jwt.verify(sessionToken, secret);
}
