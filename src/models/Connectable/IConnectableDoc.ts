import {Document} from "mongoose";
import {IConnectable} from "@models/Connectable/IConnectable";

export interface IConnectableDoc extends Document, IConnectable {
    /**
     * verify is passwd matches with hashed passwd
     * @param passwd the passwd to verify
     */
    verifyPasswd(passwd: string): boolean;

    /**
     * hash the current passwd
     */
    hashPasswd(): void;
}