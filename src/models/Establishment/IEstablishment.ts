import {IConnectable} from "@models/Connectable/IConnectable";

export interface IEstablishment extends IConnectable {
    name: string;
    description: string;
}