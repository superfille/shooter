class RemotePlayer extends Player {
	constructor(data) {
		super(data)
	
		this.controlls = new Controlls (
			this.player,
			{
				forward: Phaser.KeyCode.W,
				left:    Phaser.KeyCode.A,
				right:   Phaser.KeyCode.D,
				fire:    Phaser.KeyCode.SPACEBAR	
			}
		)
	}
	
	setState (state) {
		this.state = state
	}

	getUpdatedState () {
		const result = {
			angularVelocity: 0,
			shoot: false
		}

		if (this.state) {
			const keyDown = this.state.action
			if (keyDown === Phaser.KeyCode.LEFT) {
				result.angularVelocity = -angularVelocity
			} else if (keyDown === Phaser.KeyCode.RIGHT) {
				result.angularVelocity = angularVelocity
			}
	
			result.shoot = keyDown === Phaser.KeyCode.SPACEBAR
			result.x = this.state.x
			result.y = this.state.y
			result.angle = this.state.angle
		}
		this.state = null
		return result
	}

	update() {
		// if (!this.player.alive) return
		const state = this.getUpdatedState()

		this.player.body.velocity.x = 0
		this.player.body.velocity.y = 0
		
		this.player.body.angularVelocity = state.angularVelocity
		Game.game.physics.arcade.velocityFromAngle(this.player.angle, forwardVelocity, this.player.body.velocity)
		if (state.x) {
			this.player.x = state.x
			this.player.y = state.y
			this.player.angle = state.angle
		}
	}
}
