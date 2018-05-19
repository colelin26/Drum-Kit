// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
var currentlyOnline = 0;
app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

// Add the WebSocket handlers
io.on('connection', function(socket) {
    console.log('a user connected');
     currentlyOnline++;
    io.emit('a user connected', currentlyOnline );
    socket.on('disconnect', function(){
    console.log('user disconnected');
     currentlyOnline--;
    io.emit('a user disconnected', currentlyOnline );
  });
});


io.on('connection', function(socket){
  socket.on('audio', function(audio){
    console.log(audio);
    io.emit('audio', audio)
  });
});