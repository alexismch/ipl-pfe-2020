import IDoctorHistory from '@models/History/IDoctorHistory';
import IInstitutionHistory from '@models/History/IInstitutionHistory';

export default interface IHistory extends IDoctorHistory, IInstitutionHistory {
	citizen: string;
	scanDate: string;
	type: string;
}
