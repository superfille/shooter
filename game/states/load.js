const loadState = {
	preload() {
		const loadingLabel = Game.game.add.text(
			80, 150,
			'loading...',
			{
				font: '30px Courier',
				fill: '#fff'
			}
		)

		// game.load.tilemap('tilemap', './game/assets/shooter-second.json', null, Phaser.Tilemap.TILED_JSON)
		// game.load.image('tile_atlas', './game/assets/tile_atlas.png')
		Game.game.load.tilemap('tilemap', './game/assets/map1.json', null, Phaser.Tilemap.TILED_JSON)
		Game.game.load.image('tile_atlas', './game/assets/tmw_desert_spacing.png')

		Game.game.load.image('car_blue', './game/assets/car90_blue.png')
		Game.game.load.image('car_yellow', './game/assets/car90_yellow.png')
		Game.game.load.image('blue_ball', './game/assets/blue_ball.png')
		Game.game.load.image('yellow_ball', './game/assets/yellow_ball.png')
		Game.game.load.image('ammo', './game/assets/carrot.png')
		Game.game.load.spritesheet('coin', './game/assets/coin.png', 32, 32)
		Game.game.load.image('heart', './game/assets/heart.png', 32, 32)
		
		Game.game.load.atlas('explosion', './game/assets/explosion.png', './game/assets/explosion.json')

		Game.game.load.audio('blaster', './game/assets/audio/blaster.mp3')
		Game.game.load.audio('shotgun', './game/assets/audio/shotgun.wav')
		Game.game.load.audio('pickup', './game/assets/audio/battery.wav')
		Game.game.load.audio('spawn', './game/assets/audio/numkey.wav')

		Game.game.load.audio('boden', ['./game/assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', './game/assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);

	},

	create() {
		Game.startState('menu')
	}
}