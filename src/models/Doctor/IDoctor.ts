import {IConnectable} from "@models/Connectable/IConnectable";

export interface IDoctor extends IConnectable {
    firstname: string;
    lastname: string;
    inami: string;
}