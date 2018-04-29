class ClientPlayer extends Player {
	constructor(data) {
		super(data)
	
		this.controlls = {
			forward : PhaserGame.input.keyboard.addKey(Phaser.KeyCode.W),
			left    : PhaserGame.input.keyboard.addKey(Phaser.KeyCode.A),
			right   : PhaserGame.input.keyboard.addKey(Phaser.KeyCode.D),
			fire    : PhaserGame.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
		}

		this.startSendingUpdates()
	}

	startSendingUpdates() {
		// TODO: Flytta till client.js istællet och hämta alla entities
		this.sendingStates = setInterval(() => {
			// Send this clients player and bullet states
			const state = this.getCurrentState()
			if (this.stateHasChanged(state)) {
				this.updatePreviousState(state)
				Client.sendState(state)
			}
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
			PhaserGame.physics.arcade.velocityFromAngle(this.sprite.angle, forwardVelocity, this.sprite.body.velocity)
			hasChanged = true
		}
		
		if (input.fire) {
			this.shoot()
		}

		return hasChanged
	}
}
