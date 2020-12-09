import DoctorInterface from '@database/interfaces/Doctor.interface';
import InstitutionInterface from '@database/interfaces/Institution.interface';

export default interface ConnectableInterface
	extends InstitutionInterface,
		DoctorInterface {
	email: string;
	password: string;
}
