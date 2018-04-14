class RemotePlayer extends Player {
	constructor(data) {
		super(data)
		this.time = 0
	}

	applyUpdate(state) {
		// if (!this.sprite.alive) return

		if (state) {
			if (this.tween && this.tween.isRunning) {
				this.tween.timeline[0].vStart = { x: this.sprite.x, y: this.sprite.y, angle: this.sprite.angle }
				this.tween.timeline[0].duration = this.tween.timeline[0].duration - this.tween.timeline[0].dt
				this.tween.timeline[0].vEnd = { x: state.x, y: state.y, angle: state.angle }
				this.tween.timeline[0].dt = 0
			} else {
				this.tween = Game.game.add.tween(this.sprite)
				this.tween.to( { x: state.x, y: state.y, angle: state.angle}, 0, Phaser.Easing.Linear.None, true);
			}
		}
	}
}
