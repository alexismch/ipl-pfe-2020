export default class QRCode {
    private static readonly secret = "IPL_PFE_2020";
    private static readonly jwt = require('jsonwebtoken');

    public static sign(payload: object): string {
        return this.jwt.sign(payload, this.secret);
    }
}