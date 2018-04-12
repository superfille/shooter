var sitePath = process.argv[2] || ".";
var port = 3000;
 
// Libraries
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var timeStep = 1000 / 20 //
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

server._updateRate = 1
server._entities = []
server._ids = 0

server._setUpdate = function() {
	server.update_interval = setInterval(
		() => server._update(),
		2000
		//1000 / server._updateRate
	)
}()

server._update = function() {
	const sockets = io.sockets.sockets
	// TODO: behöver bara uppdatera om något ändrats
	for (var id in sockets) {
		const socket = sockets[id]
		socket.emit('updatestate', { worldState: server._entities })
	}
}

server._validateInput = function(input) {
	return true
}

server._getEntity = function(id) {
	return server._entities.find((entity) => entity.id === id)
}

server._addEntity = function(entity) {
	if (!server._getEntity(entity.id)) {
		this._entities.push(entity)
	}
}

server._getPlayers = function(id) {
	server._entities.filter((entity) => entity.isPlayer && entity.id !== id)
}

server._applyInput = function(data) {
	const state = data.state
	const entity = server._getEntity(state.id)
	entity.x = state.x
	entity.y = state.y
	entity.angle = state.angle
	entity.lastProcessedInput = state.inputSequenceNumber
}

server._processInputs = function(state) {
	if (server._validateInput(state)) {
		server._applyInput(state)
	}
}

io.on('connection', function(socket) {

	socket.on('newplayer', function() {
		const id = server._ids += 1
		const activePlayers = io.sockets.sockets.length

		const player = {
			id:    id,
			x: 	   randomInt(100, 400),
			y: 	   randomInt(100,400),
			angle: randomInt(0, 360),
			isPlayer: true
		}

		socket.playerId = id
		if (!activePlayers) {
			player.car = 'car_yellow'
			player.ball = 'yellow_ball'
		} else {
			player.car = 'car_blue'
			player.ball = 'blue_ball'
		}

		server._addEntity(player)
		socket.emit('clientplayer', player)
		socket.emit('allplayers', server._getPlayers(player.id))
		socket.broadcast.emit('newplayer', player)

		//server.addState(socket.player)

		socket.on('disconnect', function() {
			io.emit('remove', socket.playerId)
		})
		
		socket.on('move', function(data) {
			server._processInputs(data)
		})
	})
})

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
