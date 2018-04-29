class Entity {
	constructor(data) {
		this._id = data._id // _ because when we add id to phaser sprite we don't want to replace the phaser sprites id.
		this.positionBuffer = []
		this.previousState = {}
	}

	stateHasChanged(state) {
		if (Utils.objectIsEmpty(this.previousState)) return true

		for (const key in state) {
			if (state.hasOwnProperty(key)) {
				if (key === 'x' || key === 'y' || key === 'angle') {
					if (state[key] !== this.previousState[key]) {
						return true
					}
				}
			}
		}
		return false
	}

	getState(state) {
		return {
			x: state.x,
			y: state.y,
			angle: state.angle,
			timestamp: state.timestamp
		}
	}

	getCurrentState() {
		return {
			_id: this._id,
			type: this.type,
			x: this.sprite.x,
			y: this.sprite.y,
			angle: this.sprite.angle,
			timestamp: +new Date()
		}
	}

	updatePreviousState(state) {
		if (state) {
			this.previousState = state	
		} else {
			this.previousState = this.getCurrentState()
		}
	}

	getPositionBufferStates() {
		let result = null
		
		if(this.positionBuffer.length > 4) {
			result = {
				0: this.getState(this.positionBuffer[3]),
				1: this.getState(this.positionBuffer[this.positionBuffer.length - 1])
			}
			this.dropOlderBufferPositions(4)
		}

		return result
	}

	addToPositionBuffer(state) {
		this.positionBuffer.push(state)
	}

	dropOlderBufferPositions(num = 30) {
		while (this.positionBuffer.length > num) {
			this.positionBuffer.shift()
		}
	}

	update() {
		this.dropOlderBufferPositions()
		const states = this.getPositionBufferStates()

		if (states) {
			this.applyUpdate(states)
		}
	}

	applyUpdate(states) {		
		if (states[0].timestamp === undefined) {
			states[0].timestamp = states[1].timestamp
		}

		if (states[1].timestamp !== states[0].timestamp) {
			let timeDiff = states[1].timestamp - states[0].timestamp
			if (timeDiff > 200) {
				// For when the player is standing still and the diff becomes large
				timeDiff = 100
			}

			if (this.tween && this.tween.isRunning) {
				this.sprite.x = states[0].x
				this.sprite.y = states[0].y
				this.sprite.angle = states[0].angle
			}

			const shortestAngle = PhaserGame.math.getShortestAngle(states[1].angle, this.sprite.angle)
			const newAngle = this.sprite.angle - shortestAngle

			this.tween = PhaserGame.add.tween(this.sprite)
			this.tween.to({
				x: states[1].x,
				y: states[1].y,
				angle: newAngle,
			}, timeDiff, 'Linear', true)
		}
	}

	remove() {
		if (this.sprite) {
			this.sprite.kill()
		}
	}
}