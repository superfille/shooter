const Client = {}
Client.socket = io.connect()

Client.askNewPlayer = function() {
	Client.socket.emit('newplayer')
}

Client.cleanState = function(states) {
	if (!Array.isArray(states)) {
		states = [states]
	}

	return states.map((state) => {
		return {
			_id: state._id,
			type: state.type,
			x: state.x,
			y: state.y,
			angle: state.angle,
			timestamp: state.timestamp
		}
	})
}

Client.sendState = function(states) {
	const sendReady = this.cleanState(states)
	Client.socket.emit('move', sendReady)
}

Client.playerShoot = function(ball) {
	const newBall = {
		playerId: Game.entityManager.client._id,
		tempId: ball._id,
		x: ball.sprite.x,
		y: ball.sprite.y,
		angle: ball.sprite.angle
	}
	Client.socket.emit('shoot', newBall)
}

Client.socket.on('myNewBall', function(ball) {
	Game.addClientBall(ball)
})

Client.socket.on('newBall', function(ball) {
	Game.addRemoteBall(ball)
})

Client.socket.on('updatestate', function(worldState) {
	Game.updateWorldState(worldState)
})

Client.socket.on('clientplayer', function(data) {
	Game.createClientPlayer(data)
})

Client.socket.on('newplayer', function(data) {
	if(data) {
		Game.addRemotePlayer(data)
	}
})

Client.socket.on('allentities', function(data) {
	if (data) {
		data.forEach(element => {
			Game.entityManager.createEntity(element)
		});
	}
})

Client.socket.on('remove', function(id) {
	Game.removePlayer(id)
})

Client.socket.on('addAmmo', function() {
	Game.addAmmo()
})
