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

	update() {
		if (!this.sprite.alive) return

		this.sprite.body.velocity.x = 0
		this.sprite.body.velocity.y = 0
		this.sprite.body.angularVelocity = 0

		const input = {
			left: this.controlls.left.isDown,
			right: this.controlls.right.isDown,
			forward: this.controlls.forward.isDown,
		}
		
		this.applyInput(input)

		const state = {
			id: this.id,
			x: this.sprite.x,
			y: this.sprite.y,
			angle: this.sprite.angle,
			inputSequenceNumber: this.inputSequenceNumber += 1
		}
		
		if(this.previousState) {
			if(Math.round(this.previousState.x) !== Math.round(state.x) && Math.round(this.previousState.y) !== Math.round(state.y)) {
				this.addState(state)
				this.previousState = state
			}
		} else {
			this.addState(state)
			this.previousState = state
		}
	}

	applyInput (input) {
		let result = 0
		if (input.left) {
			result = -angularVelocity
		}
		else if (input.right) {
			result = angularVelocity
		}
		
		if (input.forward) {
			this.sprite.body.angularVelocity = result
			Game.game.physics.arcade.velocityFromAngle(this.sprite.angle, forwardVelocity, this.sprite.body.velocity)
		}

		// if (input.fire) {
		// 	this.shoot()
		// }
	}

	authoritativeUpdate(state) {
		const tween = Game.game.add.tween(this.sprite)
		tween.to( { x: state.x, y: state.y, angle: state.angle}, 20, Phaser.Easing.Linear.None, true)
	}
}
