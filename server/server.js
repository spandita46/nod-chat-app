const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
var io = socketIO(server);
io.on('connection', socket => {
    console.log("New Client Connected");

    socket.emit('newMessage', {
        from: 'Swati',
        text: 'Hi!',
        createdAt: new Date().toString(),
    });

    socket.on('createMessage', (message) => {
        console.log('Message:', message);
    });

    socket.on('disconnect', () => {
        console.log("Client Disconnected");
    });
});

app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Chat Server is listening on port: ${port}`);
})