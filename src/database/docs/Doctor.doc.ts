import ConnectableDoc from '@database/docs/Connectable.doc';
import DoctorInterface from '@database/interfaces/Doctor.interface';

export default interface DoctorDoc extends ConnectableDoc, DoctorInterface {}
