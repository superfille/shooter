class RemotePlayer extends Player {
	constructor(data) {
		super(data)
		this.time = 0
	}

	applyUpdate(state) {
		console.log("Updating remote player",state)
		// if (!this.sprite.alive) return

		if (state) {
			if (this.tween && this.tween.isRunning) {
				this.tween.timeline[0].vStart = { x: this.sprite.x, y: this.sprite.y, angle: this.sprite.angle }
				this.tween.timeline[0].duration = this.tween.timeline[0].duration - this.tween.timeline[0].dt
				this.tween.timeline[0].vEnd = { x: this.state.x, y: this.state.y, angle: this.state.angle }
				this.tween.timeline[0].dt = 0
			}else {
				this.tween = Game.game.add.tween(this.sprite)
				this.tween.to( { x: this.state.x, y: this.state.y, angle: this.state.angle}, 20, Phaser.Easing.Linear.None, true);
			}
		}
		//this.time = this.time + (1/0.2) * this.game.time.physicsElapsed;
		this.state = null
	}
}
