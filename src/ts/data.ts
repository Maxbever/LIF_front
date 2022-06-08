
var socket = new io.Socket();

socket.connect('http://127.0.0.1:8080');

// Add a connect listener
socket.on('connect',function() {
    console.log('Client has connected to the server!');
});