import IInstitutionDoc from "@models/Institution/IInstitutionDoc";

export default interface ILocation {
    institution: IInstitutionDoc;
    name: string;
    description: string;
    qrCodeToken: string
}