const menuState = {
	create() {
		const nameLabel = game.add.text(
			80, 80,
			'Shooter game',
			{
				font: '25px Arial',
				fill: '#fff'
			}
		)

		const startLabel = game.add.text(
			80, game.world.height - 80,
			'Press "W" to start',
			{
				font: '25px Arial',
				fill: '#fff'
			}
		)

		const wKey = game.input.keyboard.addKey(Phaser.Keyboard.W)

		wKey.onDown.addOnce(this.start, this)
	},

	start() {
		game.state.start('play')
	}
}