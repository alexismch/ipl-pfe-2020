const express = require('express')
const app = express();
const server = require('http').Server(app);

server.listen(process.env.PORT || 4000);

app.use(express.static('front_end/build'))

