import {Model, Schema} from "mongoose";
import IConnectableDoc from "@models/Connectable/IConnectableDoc";
import {Request, Response} from "express";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export default class ConnectableUtility {
    private static secret = "IPL_PFE_2020";

    // Format that removes password to connectable toJson method
    public static jsonFormat = {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
            delete returnedObject.password
        }
    };
    public static saltRounds = 10;

    /**
     * Set properties to a Connectable Schema
     * @param schema to whom to set properties
     */
    public static setProperties(schema: Schema): void {
        schema.method('verifyPassword', function (password: string): boolean {
            return bcrypt.compareSync(password, this.password);
        });

        schema.method('hashPassword', function (): void {
            this.password = bcrypt.hashSync(this.password, ConnectableUtility.saltRounds);
        });

        schema.set('toJSON', ConnectableUtility.jsonFormat);

        schema.pre('save', function (next) {
            const doctor: IConnectableDoc = <IConnectableDoc>this;
            if (!this.isModified('password'))
                return next();

            doctor.hashPassword();
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
        if (!body || !body.email || !body.password)
            return res.status(422).json({error: 'content missing'});

        console.log(model.collection.collectionName);

        model
            .findOne({email: body.email})
            .then((connectable: IConnectableDoc) => {
                if (!connectable || !connectable.verifyPassword(body.password))
                    return res.status(401).json({error: 'please verify content'});
                const token = jwt.sign({
                    type: model.collection.collectionName,
                    id: connectable.id
                }, this.secret, {expiresIn: '24h'});
                res.json({token});
            })
            .catch(() => res.status(500).json({error: 'a server error occurred'}));
    }
}