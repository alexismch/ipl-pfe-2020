export default class JWTUtils {
    private static readonly secret = "IPL_PFE_2020";
    private static readonly jwt = require('jsonwebtoken');

    /**
     * Create a JWT Token
     * @param payload payload to add to the token
     * @param options token options
     */
    public static sign(payload: object, options: object = {}): string {
        return this.jwt.sign(payload, this.secret, options);
    }

    public static getSessionConnectableId(sessionToken: string): object {
        return this.jwt.verify(sessionToken, this.secret);
    }
}