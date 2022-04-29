const express = require('express');
const path = require('path');
require('dotenv').config();

// App de Express
const app = express();

// Lectura y parseo del Body
app.use(express.json());

// Node Server
const server = require('http').createServer(app);


// Mis Rutas
app.use('/api/v1/bot', require('./routes/bot'));

server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);

});       