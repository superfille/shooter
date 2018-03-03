function createMap() {
	map = game.add.tilemap('tilemap');
	map.addTilesetImage('dirt', 'dirt')

	groundLayer = map.createLayer('Ground')
	groundLayer.resizeWorld()
}

function createPlayer1() {
	player1 = new Player(game, 'Filip', 'ship', 'green_ball', 'coin', 100, 100, 32, 32, 
		{
			forward: Phaser.KeyCode.W,
			left:    Phaser.KeyCode.A,
			right:   Phaser.KeyCode.D,
			fire:    Phaser.KeyCode.SPACEBAR	
		})
}

function createPlayer2() {
	player2 = new Player(game, 'Kamilla', 'ufo', 'yellow_ball', 'coin', 600, 100, 800, 32, 
	{
		forward: Phaser.KeyCode.UP,
		left:    Phaser.KeyCode.LEFT,
		right:   Phaser.KeyCode.RIGHT,
		fire:    Phaser.KeyCode.CONTROL	
	})
}

function initAmmo() {
	ammunition = game.add.physicsGroup()
}

function createAmmo() {
	ammunition.create(getRandomInt(0, 850), getRandomInt(100, 850), 'ammo')
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function winText() {
	text = game.add.text(game.world.centerX, game.world.centerY, '',
		{
			font: '65px Arial',
			fill: '#FF5722',
			align: 'center'
		})
	text.anchor.setTo(0.5, 0.5)
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE)
	cursors = game.input.keyboard.createCursorKeys()

	createMap()
	createPlayer1()
	createPlayer2()
	initAmmo()
}

