const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`);
    })

    socket.on('message', (message) => {
        io.emit('message', message);
    })

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

//EXPRESS
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
//EXPRESS

server.listen(3000, () => {
    console.log('Escuchando en puerto 3000');
})

