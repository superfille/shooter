const loadState = {
	preload() {
		const loadingLabel = game.add.text(
			80, 150,
			'loading...',
			{
				font: '30px Courier',
				fill: '#fff'
			}
		)

		game.load.tilemap('tilemap', './game/assets/shooter-second.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.image('tile_atlas', './game/assets/tile_atlas.png')
		game.load.image('car_blue', './game/assets/car90_blue.png')
		game.load.image('car_yellow', './game/assets/car90_yellow.png')
		game.load.image('blue_ball', './game/assets/blue_ball.png')
		game.load.image('yellow_ball', './game/assets/yellow_ball.png')
		game.load.image('ammo', './game/assets/carrot.png')
		game.load.spritesheet('coin', './game/assets/coin.png', 32, 32)
		game.load.image('heart', './game/assets/heart.png', 32, 32)
		
		game.load.atlas('explosion', './game/assets/explosion.png', './game/assets/explosion.json')

		game.load.audio('blaster', './game/assets/audio/blaster.mp3')
		game.load.audio('shotgun', './game/assets/audio/shotgun.wav')
		game.load.audio('pickup', './game/assets/audio/battery.wav')
		game.load.audio('pop', './game/assets/audio/numkey.wav')

		game.load.audio('boden', ['./game/assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', './game/assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);

	},

	create() {
		game.state.start('menu')
	}
}