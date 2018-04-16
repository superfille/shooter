class ClientPlayer extends Player {
	constructor(data) {
		super(data)
	
		this.controlls = {
			forward : Game.addKey(Phaser.KeyCode.W),
			left    : Game.addKey(Phaser.KeyCode.A),
			right   : Game.addKey(Phaser.KeyCode.D),
			fire    : Game.addKey(Phaser.KeyCode.SPACEBAR)
		}

		this.startSendingUpdates()
	}

	startSendingUpdates() {
		this.sendingStates = setInterval(() => {
			// Send this clients player and bullet states
			Client.sendState(this.getCurrentState())
		}, 1000 / Game.entityUpdateRate)
	}

	update() {
		if (!this.sprite.alive) return

		this.sprite.body.velocity.x = 0
		this.sprite.body.velocity.y = 0
		this.sprite.body.angularVelocity = 0

		const input = {
			left: 		this.controlls.left.isDown,
			right: 		this.controlls.right.isDown,
			forward: 	this.controlls.forward.isDown,
			fire: 		this.controlls.fire.isDown
		}
		
		const hasChanged = this.applyInput(input)

		if (hasChanged) {
			const state = this.getCurrentState()
			
			if(this.previousState) {
				if(Math.round(this.previousState.x) !== Math.round(state.x) && Math.round(this.previousState.y) !== Math.round(state.y)) {
					this.previousState = state
				}
			} else {
				this.previousState = state
			}
		}
	}

	applyInput (input) {
		let result = 0
		let hasChanged = false
		if (input.left) {
			result = -angularVelocity
		}
		else if (input.right) {
			result = angularVelocity
		}
		
		if (input.forward) {
			this.sprite.body.angularVelocity = result
			Game.game.physics.arcade.velocityFromAngle(this.sprite.angle, forwardVelocity, this.sprite.body.velocity)
			hasChanged = true
		}
		
		if (input.fire) {
			this.shoot()
		}

		return hasChanged
	}
}
