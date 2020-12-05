import server from './app';

require('dotenv').config();

const port = process.env.PORT || 4000;
server.listen(port);
console.error('Server listening on port ' + port);
