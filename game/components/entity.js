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
		console.log("adding state", state)
		this.pendingStates.push(state)
	}

	applyInput() {

	}

	applyUpdate() {
		
	}
}