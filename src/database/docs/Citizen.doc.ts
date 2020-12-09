import CitizenInterface from '@database/interfaces/Citizen.interface';
import {Document} from 'mongoose';

export default interface CitizenDoc extends Document, CitizenInterface {}
