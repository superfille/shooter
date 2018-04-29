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

const types = {
	player: 1,
	bullet: 2,
	carrot: 3
}

server._updateRate = 30
server._entities = []
server._ids = 0

server._setUpdate = function() {
	server.update_interval = setInterval(
		() => server._update(),
		1000 / server._updateRate
	)
}()

server._update = function() {
	if (server._entities.length <= 0) return

	const sockets = io.sockets.sockets
	const worldState = this._getCleanWorldState()
	for (var id in sockets) {
		const socket = sockets[id]
		socket.emit('updatestate', worldState)
	}
}

server._getCleanWorldState = function() {
	return server._entities.map((entity) => {
		return {
			_id: entity._id,
			type: entity.type,
			x: entity.x,
			y: entity.y,
			angle: entity.angle,
			timestamp: entity.timestamp
		}
	})
}

server._sendMsgToPlayer = function(id, msg, action) {
	const sockets = io.sockets.sockets
	for (var index in sockets) {
		const socket = sockets[index]
		if (socket.playerId === id) {
			socket.emit(action, msg)
			return
		}
	}
}

server._validateInput = function(input) {
	return true
}

server._getEntity = function(id) {
	return server._entities.find((entity) => entity._id === id || (entity.tempId && entity.tempId === id))
}

server._addEntity = function(entity) {
	if (!server._getEntity(entity._id)) {
		this._entities.push(entity)
	}
}

server._removeEntity = function(id) {
	let position = -1
	if((position = server._entities.findIndex((entity) => entity._id === id)) >= 0) {
		server._entities.splice(position, 1)
	}
}

server._getAll = function(id) {
	return server._entities.filter((entity) => entity.type === types.player && entity._id !== id)
}

server._applyInput = function(data) {
	if (!Array.isArray(data)) {
		data = [data]
	}

	data.forEach((state) => {
		let entity = server._getEntity(state._id)
		if (entity) {
			entity.x = state.x
			entity.y = state.y
			entity.angle = state.angle
			entity.timestamp = state.timestamp
		}
	})
}

server._processInputs = function(state) {
	if (server._validateInput(state)) {
		server._applyInput(state)
	}
}

server._getNewId = function() {
	return server._ids += 1
}

server._addBall = function(data) {
	const newId = server._getNewId()
	const entity = {
		_id: newId,
		playerId: data.playerId,
		x: data.x,
		y: data.y,
		angle: data.angle,
	}
	server._addEntity(entity)

	return entity
}

server._startGame = function() {
	if (!server._gameIsOn) {
		server._gameIsOn = true
		server.update_interval = setInterval(
			() => server._addCarrot(),
			8000
		)
	}
}

server._addCarrot = function() {
	const newCarrot = {
		id: server._getNewId(),
		type: types.carrot,
		x: randomInt(100, 500),
		y: randomInt(100, 500),
	}

	server._addEntity(newCarrot)
	const sockets = io.sockets.sockets
	for (var id in sockets) {
		const socket = sockets[id]
		socket.emit('addCarrot', newCarrot)
	}
}

io.on('connection', function(socket) {
	server._startGame()
	socket.on('newplayer', function() {
		const id = server._getNewId()
		const activePlayers = Object.keys(io.sockets.sockets).length
		const player = {
			_id:    id,
			x: 	   randomInt(100, 400),
			y: 	   randomInt(100, 400),
			angle: randomInt(0, 360),
			type: types.player
		}

		socket.playerId = id
		if (activePlayers === 1) {
			player.car = 'car_yellow'
			player.ball = 'yellow_ball'
		} else {
			player.car = 'car_blue'
			player.ball = 'blue_ball'
		}

		server._addEntity(player)
		socket.emit('clientplayer', player)
		const allPlayers = server._getAll(player._id)
		console.log(allPlayers)
		if (allPlayers.length > 0) {
			socket.emit('allentities', allPlayers)
			socket.broadcast.emit('newplayer', player)
		}
		
		socket.on('disconnect', function() {
			io.emit('remove', socket.playerId)
			server._removeEntity(socket.playerId)
		})
		
		socket.on('move', function(data) {
			server._processInputs(data)
		})

		socket.on('shoot', function(data) {
			const ball = server._addBall(data)
			socket.broadcast.emit('newBall', ball)
			
			ball.tempId = data.tempId
			socket.emit('myNewBall', ball)
		})

		socket.on('iDied', function() {
			
		})
	})
})

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
