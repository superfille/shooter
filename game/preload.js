function preload() {
	game.load.image('ship', './game/assets/thrust_ship.png')
	game.load.image('ufo', './game/assets/ufo.png')
	game.load.image('green_ball', './game/assets/green_ball.png')
	game.load.image('yellow_ball', './game/assets/yellow_ball.png')
	game.load.tilemap('tilemap', './game/assets/shooter-first.json', null, Phaser.Tilemap.TILED_JSON)
	game.load.image('dirt', './game/assets/dirt.png')
	game.load.image('ammo', './game/assets/carrot.png')
	game.load.spritesheet('coin', './game/assets/coin.png', 32, 32)
}