import HistoryDoc from '@database/docs/History.doc';
import historySchema from '@database/schemas/History.schema';
import {formatDate} from '@modules/date';
import {model} from 'mongoose';

const History = model<HistoryDoc>('History', historySchema);

interface historyModel {
	getByCitizenId(citizenId: string);

	getByConditions(conditions: object);

	getDistinctCitizens(conditions: object);

	create(citizen: string, scanDate: Date);

	save(history: HistoryDoc);
}

const history: historyModel = {
	async getByCitizenId(citizenId: string) {
		return await History.find({citizen: citizenId}).exec();
	},

	async getByConditions(conditions: object) {
		return await History.find(conditions).exec();
	},

	async getDistinctCitizens(conditions: object) {
		return await History.find(conditions).distinct('citizen').exec();
	},

	create(citizen: string, scanDate: Date) {
		return new History({
			citizen,
			scanDate: formatDate(scanDate),
		});
	},

	async save(history: HistoryDoc) {
		return await history.save();
	},
};

export default history;
