import IInstitution from "@models/Institution/IInstitution";
import IDoctor from "@models/Doctor/IDoctor";

export default interface IConnectable extends IInstitution, IDoctor {
    email: string;
    password: string;
}