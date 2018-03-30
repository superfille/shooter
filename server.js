var sitePath = process.argv[2] || ".";
var port = 3000;
 
// Libraries
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
 
// Request logging
app.use(function(req, res, next) {
    next();
});
 
// Start server
console.log(sitePath);
console.log("Starting server in: " + __dirname + '/' + sitePath);
app.use(express.static(__dirname + '/' + sitePath));

server.listen(8081, function() {
	console.log("Listening on " + server.address().port)
})

server.lastPlayerID = 0

io.on('connection', function(socket) {
	socket.on('newplayer', function() {
		socket.player = {
			id: server.lastPlayerID++,
			x: randomInt(100, 400),
			y: randomInt(100,400)
		}
		socket.emit('clientplayer', socket.player)
		socket.emit('allplayers', getAllPlayers(socket.player.id))
		socket.broadcast.emit('newplayer', socket.player)
		
		socket.on('disconnect', function() {
			io.emit('remove', socket.player.id)
		})
	})
})

function getAllPlayers(id) {
	var players = []
	Object.keys(io.sockets.connected).forEach(function(socketID) {
		const player = io.sockets.connected[socketID].player
		
		if(player && player.id !== id) {
			players.push(player)
		}
	})
	return players
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
