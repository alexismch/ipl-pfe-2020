import * as mongoose from 'mongoose';
import server from './app';

require('dotenv').config();

const url = process.env.MONGODB_URI;
const port = process.env.PORT || 4000;

server.listen(port, () => {
	console.error('Server listening on port ' + port);

	console.log('connecting to', url);
	mongoose
		.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})
		.then(() => {
			console.log('connected to MongoDB');
		})
		.catch(error => {
			console.log('error connecting to MongoDB:', error.message);
		});
});
