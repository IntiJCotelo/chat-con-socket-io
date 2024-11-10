const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('chat message', (msg) => {
        console.log('Mensaje: ' + msg);
        io.emit('chat message', msg);
    })

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    })
});

//EXPRESS
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
//EXPRESS

server.listen(3000, () => {
    console.log('Escuchando en el puerto 3000');
})

