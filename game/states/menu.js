const menuState = {
	create() {
		const nameLabel = Game.game.add.text(
			80, 80,
			'Shooter game',
			{
				font: '25px Arial',
				fill: '#fff'
			}
		)

		const startLabel = Game.game.add.text(
			80, Game.game.world.height - 80,
			'Press "W" to start',
			{
				font: '25px Arial',
				fill: '#fff'
			}
		)
		
		const wKey = Game.addKey(Phaser.Keyboard.W)

		wKey.onDown.addOnce(this.start, this)
	},

	start() {
		Game.startState('play')
	}
}