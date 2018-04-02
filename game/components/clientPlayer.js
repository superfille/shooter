class ClientPlayer extends Player {
	constructor(data) {
		super(data)
	
		this.controlls = new Controlls (
			{
				left:    Phaser.KeyCode.A,
				right:   Phaser.KeyCode.D,
				fire:    Phaser.KeyCode.SPACEBAR	
			}
		)
	}

	update() {
		if (!this.player.alive) return
		const keyDown = this.controlls.getKeyDown()

		this.player.body.velocity.x = 0
		this.player.body.velocity.y = 0
	
		let result = 0
		if (keyDown === Phaser.KeyCode.LEFT) {
			result = -angularVelocity
		} else if (keyDown === Phaser.KeyCode.RIGHT) {
			result = angularVelocity
		}

		// Client
		this.player.body.angularVelocity = result
		Game.game.physics.arcade.velocityFromAngle(this.player.angle, forwardVelocity, this.player.body.velocity)
		
		// if (keyDown === Phaser.KeyCode.SPACEBAR) {
		// 	this.shoot()
		// }
		this.sendState({
			action: keyDown,
			x: this.player.x,
			y: this.player.y,
			angle: this.player.angle
		})
	}
}
