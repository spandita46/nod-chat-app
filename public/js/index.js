const socket = io();
socket.on('connect', () => {
    console.log('Connected To Server');
});

socket.on('newMessage', (message) => {
    console.log('Message:', message);
});

socket.emit('createMessage', {
    from: 'Frank',
    text: 'Test Message',
}, (ackData) => {
    console.log('Got It: ', ackData);
});

socket.on('disconnect', () => {
    console.log('Disconnected From Server');
});