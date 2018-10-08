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
     
    socket.emit('newMessage',{
        from:'Admin',
        text:'Welcome To My Chat App',
        createdAt:new Date().getTime(),
    });

    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'New User Joined!',
        createdAt:new Date().getTime(),
    })

    socket.on('createMessage', (message) => {
        console.log('Message:', message);
        io.emit('newMessage',{
            ...message,
            createdAt:new Date().getTime(),
        })
        // socket.broadcast.emit('newMessage',{
        //     ...message,
        //     createdAt:new Date().getTime(),
        // });
    });

    socket.on('disconnect', () => {
        console.log("Client Disconnected");
    });
});

app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Chat Server is listening on port: ${port}`);
})