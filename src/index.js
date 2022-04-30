const express = require('express');
const path = require('path');
require('dotenv').config();

// DB Config
require('./database/config').dbConnection();


// App de Express
const app = express();

// Lectura y parseo del Body
app.use(express.json());

// Node Server
const server = require('http').createServer(app);


// Mis Rutas
app.use('/api/v1/login', require('./routes/auth'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/bot', require('./routes/bot'));
app.use('/api/v1/messages', require('./routes/messages'));

server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);

});       