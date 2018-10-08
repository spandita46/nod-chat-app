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
    
    socket.on('disconnect', socket =>{
        console.log("Client Disconnected");
    })
})
app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Chat Server is listening on port: ${port}`);
})