const winState = {
	create() {
		const winLabel = PhaserGame.add.text(
			80, 80,
			'You Won',
			{
				font: '50px Arial',
				fill: '#0f0'
			}
		)
		const startLabel = PhaserGame.add.text(
			80, game.world.height - 80,
			'Press the "W" key to restart',
			{
				font: '25px Arial',
				fill: '#ff'
			}
		)

		const wKey = PhaserGame.input.keyboard.addKey(Phaser.Keyboard.W)

		wKey.onDown.addOnce(this.restart, this)
	},

	restart() {
		PhaserGame.state.start('menu')
	}
}