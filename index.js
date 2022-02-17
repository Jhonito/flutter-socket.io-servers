const express = require('express');
//App de Express
const app = express();
const path = require('path');
require('dotenv').config();

//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);


require('./sockets/socket');






// Path d
const publicPath = path.resolve(__dirname,'public');

app.use(express.static(publicPath));

server.listen(process.env.PORT,(err)=> {

    if (err) throw new Error(err);

    console.log('Servidor Corriendo en Puerto ',process.env.PORT);
}


)