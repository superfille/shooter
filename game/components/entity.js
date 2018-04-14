class Entity {
	constructor(data) {
		this.id = data.id
		this.x = data.x
		this.y = data.y
		this.angle = data.angle
		this.updateRate = 30
		this.pendingStates = []
		this.positionBuffer = []
		this.inputSequenceNumber = 0
	}

	startSendingUpdates() {
		this.sendingStates = setInterval(() => {
			if(this.pendingStates.length > 0) {
				const state = this.pendingStates.shift()
				
				// if (this.previousState) {
				// 	if(Math.round(this.previousState.x) === Math.round(state.x) &&
				// 		Math.round(this.previousState.y) === Math.round(state.y))
				// 	{
				// 		return
				// 	}
				// }

				if (state) {
					Client.sendState(state)
				//	this.previousState = state
				}
			}
		}, 1000 / this.updateRate)
	}

	addState(state) {
		this.pendingStates.push(state)
		while(this.pendingStates.length > 1) {
			this.pendingStates.shift()
		}
	}

	addToPositionBuffer(state) {
		this.positionBuffer.push(state)
		// while (this.positionBuffer.length > 2 ) {
		// 	this.positionBuffer.shift()
		// }
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
			buffer.shift()
		}
	}

	applyInput() {

	}

	applyUpdate() {
		
	}
}