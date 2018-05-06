class MyClient {
	constructor() {
		this.socket = io.connect()
		this.initSocket()
	}

	askNewPlayer() {
		this.socket.emit('newplayer')
	}

	cleanState(states) {
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

	sendState(states) {
		const sendReady = this.cleanState(states)
		this.socket.emit('move', sendReady)
	}

	playerShoot(ball) {
		console.log(ball.sprite.body.velocity)
		const newBall = {
			playerId: EntityManager.client._id,
			tempId: ball._id,
			x: ball.sprite.x,
			y: ball.sprite.y,
			velocity: {
				x: ball.sprite.body.velocity.x,
				y: ball.sprite.body.velocity.y
			},
			angle: ball.sprite.angle,
			radians: Phaser.Math.degToRad(ball.sprite.angle)
		}
		this.socket.emit('shoot', newBall)
	}

	iDied() {
		this.socket.emit('iDied')
	}

	initSocket() {
		this.socket.on('addCarrot', function(carrot) {
			Game.addCarrot(carrot)
		})

		this.socket.on('myNewBall', function(ball) {
			Game.addClientBall(ball)
		})

		this.socket.on('newBall', function(ball) {
			Game.addRemoteBall(ball)
		})

		this.socket.on('updatestate', function(worldState) {
			Game.updateWorldState(worldState)
		})

		this.socket.on('clientplayer', function(data) {
			Game.createClientPlayer(data)
		})

		this.socket.on('newplayer', function(data) {
			if(data) {
				Game.addRemotePlayer(data)
			}
		})

		this.socket.on('allentities', function(data) {
			if (data) {
				data.forEach(element => {
					EntityManager.createEntity(element)
				});
			}
		})

		this.socket.on('remove', function(id) {
			Game.removePlayer(id)
		})
	}
}
