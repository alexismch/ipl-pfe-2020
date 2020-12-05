import server from './app';

require('dotenv').config();

server.listen(process.env.PORT || 4000);
