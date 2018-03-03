function preload() {
    game.load.image('carrot', './game/assets/carrot.png', 16, 16);
	game.load.image('player1', './game/assets/thrust_ship.png');
	game.load.image('player2', './game/assets/ufo.png');
	game.load.image('player1bullet', './game/assets/tomato.png');
	game.load.image('player2bullet', './game/assets/carrot.png');
	game.load.tilemap('tilemap', './game/assets/shooter-first.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('dirt', './game/assets/dirt.png');
}