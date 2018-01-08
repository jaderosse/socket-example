var express = require('express');
var socket = require('socket.io');
var app = express();

//how to link folder without using ejs layouts
app.use(express.static('public'));

//telling socket module that THIS is server
var server = app.listen(process.env.PORT || 3000);
//passing in server variable to socket module
var io = socket(server);

//event for when handshake happens(create socket connection on connection to the server)
io.sockets.on('connection', function(socket){
	console.log("Connected to client");
	//listening for client event
	socket.on('mouse', function(data){
		console.log("Received: 'mouse' " + data.x + " " + data.y);
		//send to everyone connected to server except yourself
		socket.broadcast.emit('mouse', data); //the event that gets broadcasted
	});
});