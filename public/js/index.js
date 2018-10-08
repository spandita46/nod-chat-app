const socket = io();
socket.on('connect', () => {
    console.log('Connected To Server');
});

socket.on('newMessage', (message) => {
    console.log('Message:', message);
    let li = $("<li></li>");
    li.text(`${message.from} : ${message.text}`);

    $('#message-box').append(li);
});


socket.on('disconnect', () => {
    console.log('Disconnected From Server');
});

$('#message-form').on('submit', (e) => {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'Frank',
        text: $('[name="message"]').val(),
    }, (ackData) => {
        console.log('Got It: ', ackData);
    });
})