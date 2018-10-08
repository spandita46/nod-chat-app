const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
var io = socketIO(server);
io.on('connection', socket => {
    console.log("New Client Connected");

    socket.emit('newMessage', generateMessage('Admin', 'Welcome To My Chat App'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined!'));

    socket.on('createMessage', message => io.emit('newMessage', generateMessage(...message)));

    socket.on('disconnect', () => {
        console.log("Client Disconnected");
    });
});

app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Chat Server is listening on port: ${port}`);
})