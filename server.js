var sitePath = process.argv[2] || ".";
var port = 8081;
 
// Libraries
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var engine = require('./server/engine')
// Request logging
app.use(function(req, res, next) {
    next();
});
 
// Start server
console.log(sitePath);
console.log("Starting server in: " + __dirname + '/' + sitePath);
app.use(express.static(__dirname + '/' + sitePath));

server.listen(port, '0.0.0.0', function() {
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
server._useCarrots = true

server._setUpdate = function() {
	server._prevTime = +new Date()
	server.update_interval = setInterval(
		() => {
			server._renderUpdate()
			server._update()
		},
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

server._renderUpdate = function() {
	const now = +new Date()
	const delta = now - server._prevTime
	server._prevTime = now
	server._entities.forEach(entity => {
		if (entity.type === types.ball) {
			entity.timestamp = now
			engine.updateBall(delta, entity)
		}
	})
}

server._getCleanWorldState = function() {
	return server._entities.map((entity) => {
		return {
			_id: entity._id,
			playerId: entity.playerId,
			type: entity.type,
			x: entity.x,
			y: entity.y,
			angle: entity.angle,
			timestamp: entity.timestamp
		}
	})
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

server._removePlayer = function(id) {
	for (let index = 0; index < server._entities.length; index += 1) {
		const entity = server._entities[index]
		if (entity._id === id || entity.playerId === id) {
			server._entities.splice(index, 1)
			index -= 1
		}
	}
}

server._getAll = function(id) {
	return server._entities.filter((entity) => entity._id !== id)
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
	server._applyInput(state)
}

server._getNewId = function() {
	return server._ids += 1
}

server._addBall = function(data) {
	const newId = server._getNewId()
	const entity = {
		_id: newId,
		type: types.ball,
		playerId: data.playerId,
		x: data.x,
		y: data.y,
		angle: data.angle,
		radians: data.radians,
		velocity: {
			x: data.velocity.x,
			y: data.velocity.y
		}
	}
	engine.setToPolar(entity)
	server._addEntity(entity)

	return entity
}

server._initCarrots = function() {
	if (server._useCarrots) {
		if (!server._gameIsOn) {
			server._gameIsOn = true
			server.update_interval = setInterval(
				() => server._addCarrot(),
				8000
			)
		}
	}
}

server._addCarrot = function() {
	const newCarrot = {
		_id: server._getNewId(),
		type: types.carrot,
		x: randomInt(100, 700),
		y: randomInt(100, 700),
	}

	server._addEntity(newCarrot)
	const sockets = io.sockets.sockets
	for (var id in sockets) {
		const socket = sockets[id]
		socket.emit('addCarrot', newCarrot)
	}
}

server._validateTookCarrot = function(playerId, id) {
	server._removeEntity(id)
	return true
}

server._garage = [
	'blue', 'purple', 'yellow', 'green', 'aqua', 'red'
]
server._inStreet = []
server._getCar = function() {
	let car = server._garage.shift()
	if (!car) {
		car = 'red'
	}

	return car
}

server._returnCar = function(car) {
	server._garage.push(car)
}

io.on('connection', function(socket) {
	server._initCarrots()
	socket.on('newplayer', function() {
		const id = server._getNewId()
		socket.car = server._getCar()
		socket.playerId = id
		
		const player = {
			_id:    id,
			x: 	   randomInt(100, 400),
			y: 	   randomInt(100, 400),
			angle: randomInt(0, 360),
			type: types.player,
			car: socket.car
		}

		server._addEntity(player)
		socket.emit('clientplayer', player)
		const eveything = server._getAll(player._id)
		if (eveything.length > 0) {
			socket.emit('allentities', eveything)
			socket.broadcast.emit('newplayer', player)
		}
		
		socket.on('disconnect', function() {
			io.emit('remove', socket.playerId)
			server._removePlayer(socket.playerId)
			server._returnCar(socket.car)
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
		
		socket.on('tookCarrot', function(id) {
			if (server._validateTookCarrot(socket.playerId, id)) {
				socket.emit('tookCarrot', {playerId: socket.playerId, id: id})
				socket.broadcast.emit('tookCarrot', {playerId: socket.playerId, id: id})
			}
		})

		socket.on('iDied', function() {
			server._removePlayer(socket.playerId)
			socket.broadcast.emit('playerdied', socket.playerId)
		})
	})
})

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
