const socket = io();
socket.on('connect', () => {
    console.log('Connected To Server');
});

socket.on('newMessage', (message)=>{
    console.log('Message:', message);
});

socket.on('disconnect', () => {
    console.log('Disconnected From Server');
});
