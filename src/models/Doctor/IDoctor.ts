import IConnectable from "@models/Connectable/IConnectable";

export default interface IDoctor extends IConnectable {
    firstname: string;
    lastname: string;
    inami: string;
    qrCodeToken: string;
}