const loadState = {
	preload() {
		const loadingLabel = PhaserGame.add.text(
			80, 150,
			'loading...',
			{
				font: '30px Courier',
				fill: '#fff'
			}
		)

		// game.load.tilemap('tilemap', './game/assets/shooter-second.json', null, Phaser.Tilemap.TILED_JSON)
		// game.load.image('tile_atlas', './game/assets/tile_atlas.png')
		PhaserGame.load.tilemap('tilemap', './game/assets/map1.json', null, Phaser.Tilemap.TILED_JSON)
		PhaserGame.load.image('tile_atlas', './game/assets/tmw_desert_spacing.png')

		PhaserGame.load.image('car_blue', './game/assets/car90_blue.png')
		PhaserGame.load.image('car_yellow', './game/assets/car90_yellow.png')
		PhaserGame.load.image('car_green', './game/assets/car90_green.png')
		PhaserGame.load.image('car_purple', './game/assets/car90_purple.png')
		PhaserGame.load.image('car_red', './game/assets/car90_red.png')
		PhaserGame.load.image('car_aqua', './game/assets/car90_aqua.png')

		PhaserGame.load.image('ball_blue', './game/assets/blue_ball.png')
		PhaserGame.load.image('ball_yellow', './game/assets/yellow_ball.png')
		PhaserGame.load.image('ball_green', './game/assets/green_ball.png')
		PhaserGame.load.image('ball_red', './game/assets/red_ball.png')
		PhaserGame.load.image('ball_purple', './game/assets/purple_ball.png')
		PhaserGame.load.image('ball_aqua', './game/assets/aqua_ball.png')
	

		PhaserGame.load.image('ammo', './game/assets/carrot.png')
		PhaserGame.load.spritesheet('coin', './game/assets/coin.png', 32, 32)
		PhaserGame.load.image('heart', './game/assets/heart.png', 32, 32)
		
		PhaserGame.load.atlas('explosion', './game/assets/explosion.png', './game/assets/explosion.json')

		PhaserGame.load.audio('blaster', './game/assets/audio/blaster.mp3')
		PhaserGame.load.audio('shotgun', './game/assets/audio/shotgun.wav')
		PhaserGame.load.audio('pickup', './game/assets/audio/battery.wav')
		PhaserGame.load.audio('spawn', './game/assets/audio/numkey.wav')
		PhaserGame.load.audio('explosion', './game/assets/audio/explosion.mp3')

		PhaserGame.load.audio('boden', ['./game/assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', './game/assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);

	},

	create() {
		PhaserGame.state.start('menu')
	}
}