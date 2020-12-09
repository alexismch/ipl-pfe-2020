import DoctorHistoryInterface from '@database/interfaces/DoctorHistory.interface';
import InstitutionHistoryInterface from '@database/interfaces/InstitutionHistory.interface';

export default interface HistoryInterface
	extends DoctorHistoryInterface,
		InstitutionHistoryInterface {
	citizen: string;
	scanDate: string;
	type: string;
}
