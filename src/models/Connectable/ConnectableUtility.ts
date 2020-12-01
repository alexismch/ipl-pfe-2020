import {Model, Schema} from "mongoose";
import {IConnectableDoc} from "@models/Connectable/IConnectableDoc";
import {Request, Response} from "express";

const bcrypt = require('bcrypt');

export default class ConnectableUtility {
    // Format that removes passwd to connectable toJson method
    public static jsonFormat = {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
            delete returnedObject.passwd
        }
    };
    public static saltRounds = 10;

    /**
     * Set properties to a Connectable Schema
     * @param schema to whom to set properties
     */
    public static setProperties(schema: Schema): void {
        schema.method('verifyPasswd', function (passwd: string): boolean {
            return bcrypt.compareSync(passwd, this.passwd);
        });

        schema.method('hashPasswd', function (): void {
            this.passwd = bcrypt.hashSync(this.passwd, ConnectableUtility.saltRounds);
        });

        schema.set('toJSON', ConnectableUtility.jsonFormat);

        schema.pre('save', function (next) {
            const doctor: IConnectableDoc = <IConnectableDoc>this;
            if (!this.isModified('passwd'))
                return next();

            doctor.hashPasswd();
            next();
        });
    }

    /**
     * Verify the authorisation to connect
     * @param req the request
     * @param res the response
     * @param model the model of mongoose data
     * @return response with user's data if connection allowed, error if not
     */
    public static connect(req: Request, res: Response, model: Model<IConnectableDoc>): any {
        const body = req.body;
        if (!body || !body.email || !body.passwd)
            return res.status(422).json({error: 'content missing'});

        model
            .findOne({email: body.email})
            .then((connectable: IConnectableDoc) => {
                if (!connectable || !connectable.verifyPasswd(body.passwd))
                    res.status(401).json({error: 'please verify content'});
                else
                    res.json(connectable);
            })
            .catch(() => res.status(500).json({error: 'a server error occurred'}));
    }
}