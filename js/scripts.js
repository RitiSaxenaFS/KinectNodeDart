var socket = io.connect('http://localhost:8000/');
socket.on('bodyFrame', interpretData);
function interpretData(bodyFrame) {
    // Web Socket message:
    console.log(bodyFrame);
}