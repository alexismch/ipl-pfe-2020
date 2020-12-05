import IDoctor from '@models/Doctor/IDoctor';
import IInstitution from '@models/Institution/IInstitution';

export default interface IConnectable extends IInstitution, IDoctor {
	email: string;
	password: string;
}
