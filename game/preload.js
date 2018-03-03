function preload() {
	game.load.image('ship', './game/assets/thrust_ship.png')
	game.load.image('ufo', './game/assets/ufo.png')
	game.load.image('green_ball', './game/assets/green_ball.png')
	game.load.image('yellow_ball', './game/assets/yellow_ball.png')
	game.load.tilemap('tilemap', './game/assets/shooter-first.json', null, Phaser.Tilemap.TILED_JSON)
	game.load.image('dirt', './game/assets/dirt.png')
	game.load.image('ammo', './game/assets/carrot.png')
	game.load.spritesheet('coin', './game/assets/coin.png', 32, 32)
	game.load.atlas('explosion', './game/assets/explosion.png', './game/assets/explosion.json')

	game.load.audio('blaster', './game/assets/audio/blaster.mp3')
	game.load.audio('shotgun', './game/assets/audio/shotgun.wav')
	game.load.audio('pickup', './game/assets/audio/battery.wav')
	game.load.audio('explosion', './game/assets/audio/explosion.mp3')

	game.load.audio('boden', ['./game/assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', './game/assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);
}