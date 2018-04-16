class Entity {
	constructor(data) {
		this._id = data._id // _ because when we add id to phaser sprite we don't want to replace the phaser sprites id.
		this.positionBuffer = []
	}

	getCurrentState() {
		return Game.entityManager.serverState(this.sprite)
	}

	addToPositionBuffer(state) {
		this.positionBuffer.push(state)
	}

	getPositionBufferStates() {	
		if (this.positionBuffer.length < 2) {
			return null
		} else {
			return {
				0: {
					x: this.positionBuffer[0].x,
					y: this.positionBuffer[0].y,
					angle: this.positionBuffer[0].angle,
					timestamp: this.positionBuffer[0].timestamp
				},
				1: {
					x: this.positionBuffer[1].x,
					y: this.positionBuffer[1].y,
					angle: this.positionBuffer[1].angle,
					timestamp: this.positionBuffer[1].timestamp
				}
			}
		}
	}

	dropOlderBufferPositions(time) {
		while (this.positionBuffer.length >= 2 && this.positionBuffer[1].timestamp <= time) {
			this.positionBuffer.shift()
		}
	}

	applyInput() {
	}

	applyUpdate(timestamp) {
		const states = this.getPositionBufferStates()
		const state = states[1]
		// const x0 = states[0].x
		// const x1 = states[1].x
		
		// const y0 = states[0].y
		// const y1 = states[1].y

		// const angle0 = states[0].angle
		// const angle1 = states[1].angle

		// const t0 = states[0].timestamp
		// const t1 = states[1].timestamp

		// this.sprite.x = x0 + (x1 - x0) * (timestamp - t0) / (t1 - t0)
		// this.sprite.y = y0 + (y1 - y0) * (timestamp - t0) / (t1 - t0)
		// this.sprite.angle = angle0 + (angle1 - angle0) * (timestamp - t0) / (t1 - t0)

		if (this.tween && this.tween.isRunning) {
			this.tween.timeline[0].vStart = { x: this.sprite.x, y: this.sprite.y, angle: this.sprite.angle }
			this.tween.timeline[0].duration = this.tween.timeline[0].duration - this.tween.timeline[0].dt
			this.tween.timeline[0].vEnd = { x: state.x, y: state.y, angle: state.angle }
			this.tween.timeline[0].dt = 0
		} else {
			this.tween = Game.game.add.tween(this.sprite)
			this.tween.to( { x: state.x, y: state.y, angle: state.angle}, 100, Phaser.Easing.Linear.None, true);
		}
	}

	remove() {
		if (this.sprite) {
			this.sprite.kill()
		}
	}
}