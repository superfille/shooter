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

server.listen(8081, '0.0.0.0', function() {
	console.log("Listening on " + server.address().port)
})

server.firstPlayer = { used: false, number: 1 }
server.secondPlayer = { used: false, number: 2 }

io.on('connection', function(socket) {
	socket.on('newplayer', function() {
		let id
		if (!server.firstPlayer.used) {
			id = server.firstPlayer.number
			server.firstPlayer.used = true
		} else if (!server.secondPlayer.used) {
			id = server.secondPlayer.number
			server.secondPlayer.used = true
		} else {
			socket.emit('maxPlayers')
			return
		}

		socket.player = {
			id:    id,
			x: 	   randomInt(100, 400),
			y: 	   randomInt(100,400),
			angle: randomInt(0, 360)
		}
		if(id === 1) {
			socket.player.car = 'car_yellow'
			socket.player.ball = 'yellow_ball'
		} else {
			socket.player.car = 'car_blue'
			socket.player.ball = 'blue_ball'
		}
		
		socket.emit('clientplayer', socket.player)
		socket.emit('allplayers', getAllPlayers(socket.player.id))
		socket.broadcast.emit('newplayer', socket.player)
		
		socket.on('disconnect', function() {
			if (server.firstPlayer.number === socket.player.id) {
				server.firstPlayer.used = false
			} else if (server.secondPlayer.number === socket.player.id) {
				server.secondPlayer.used = false
			}
			io.emit('remove', socket.player.id)
		})
		
		socket.on('move', function(data) {
			socket.player.x = data.state.x
			socket.player.y = data.state.y
			socket.player.angle = data.state.angle
			console.log(data)
			socket.broadcast.emit('remotemoved', data)
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
