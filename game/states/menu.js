const menuState = {
	create() {
		const nameLabel = PhaserGame.add.text(
			80, 80,
			'Shooter game',
			{
				font: '25px Arial',
				fill: '#fff'
			}
		)

		const startLabel = PhaserGame.add.text(
			80, PhaserGame.world.height - 80,
			'Press "W" to start',
			{
				font: '25px Arial',
				fill: '#fff'
			}
		)
		
		const wKey = PhaserGame.input.keyboard.addKey(Phaser.Keyboard.W)

		wKey.onDown.addOnce(this.start, this)
	},

	start() {
		PhaserGame.state.start('play')
	}
}