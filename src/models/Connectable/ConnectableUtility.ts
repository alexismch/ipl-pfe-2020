import {Schema} from "mongoose";
import {IConnectableDoc} from "@models/Connectable/IConnectableDoc";

const bcrypt = require('bcrypt');

export default class ConnectableUtility {
    public static jsonFormat = {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
            delete returnedObject.passwd
        }
    };
    public static saltRounds = 10;

    public static setProperties(schema: Schema): void {
        schema.method('verifyPasswd', function (passwd: string): boolean {
            return bcrypt.compareSync(passwd, this.passwd);
        });

        schema.method('hashPasswd', function (): void {
            this.passwd = bcrypt.hashSync(this.passwd, ConnectableUtility.saltRounds);
        });

        schema.set('toJSON', ConnectableUtility.jsonFormat);

        schema.pre('save', function (next) {
            const doctor: IConnectableDoc = <IConnectableDoc> this;
            if (!this.isModified('passwd'))
                return next();

            doctor.passwd = bcrypt.hashSync(doctor.passwd, ConnectableUtility.saltRounds);
            next();
        });
    }
}