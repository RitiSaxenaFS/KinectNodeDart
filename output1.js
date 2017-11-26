/*var Kinect2 = require('kinect2');

var kinect = new Kinect2();

if(kinect.open()) {
    console.log("Kinect Opened");
    //listen for body frames
    kinect.on('bodyFrame', function(bodyFrame){
        for(var i = 0;  i < bodyFrame.bodies.length; i++) {
            if(bodyFrame.bodies[i].tracked) {
                console.log(bodyFrame.bodies[i]);
            }
        }
    });

    //request body frames
    kinect.openBodyReader();

    //close the kinect after 5 seconds
    setTimeout(function(){
        kinect.close();
        console.log("Kinect Closed");
    }, 60000);
}*/

var Kinect2 = require('kinect2'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var kinect = new Kinect2();

if(kinect.open()) {
    server.listen(8000);
    console.log('Server listening on port 8000');
    console.log('Point your browser to http://localhost:8000');

    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    kinect.on('bodyFrame', function(bodyFrame){
        io.sockets.emit('bodyFrame', bodyFrame);
    });

    kinect.openBodyReader();
}