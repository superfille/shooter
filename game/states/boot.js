const bootState = {
	create() {
		//game.physics.startSystem(Phaser.Physics.ARCADE)

		PhaserGame.state.start('load')
	}
}