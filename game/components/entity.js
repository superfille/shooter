class Entity {
	constructor(data) {
		this.id = data.id
		this.x = data.x
		this.y = data.y
		this.angle = data.angle
		this.pendingState = null
		this.positionBuffer = []
		this.inputSequenceNumber = 0
	}

	startSendingUpdates() {
		this.sendingStates = setInterval(() => {
			if(this.pendingState) {
				Client.sendState(this.pendingState)
				this.pendingState = null
			}
		}, 1000 / Game.entityUpdateRate)
	}

	addState(state) {
		this.pendingState = state
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

	applyUpdate() {
		
	}

	remove() {
		if (this.sprite) {
			this.sprite.kill()
		}
	}
}