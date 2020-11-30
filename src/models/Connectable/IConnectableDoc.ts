import {Document} from "mongoose";
import {IConnectable} from "@models/Connectable/IConnectable";

export interface IConnectableDoc extends Document, IConnectable {
    verifyPasswd?(passwd: string): boolean;

    hashPasswd?(): void;
}