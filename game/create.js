function createMap() {
	map = game.add.tilemap('tilemap');
	map.addTilesetImage('tile_atlas', 'tile_atlas')

	groundLayer = map.createLayer('Tile Layer 1')
	groundLayer.resizeWorld()
}

function createPlayer1() {
	player1 = new Player(
		game, 'Player1', 'car_yellow', 'yellow_ball', 'coin',
		getRandomInt(50, width),
		getRandomInt(50, height),
		getRandomInt(0, 360),
		32, 32,
		{
			forward: Phaser.KeyCode.W,
			left:    Phaser.KeyCode.A,
			right:   Phaser.KeyCode.D,
			fire:    Phaser.KeyCode.SPACEBAR	
		})
	player1.addWeaponSound(game, 'blaster')
	player1.addAmmunitionSound(game, 'pickup')
	player1.addDieSound(game, 'explosion')
}

function createPlayer2() {
	player2 = new Player(
		game, 'Player2', 'car_blue', 'blue_ball', 'coin',
		getRandomInt(50, width),
		getRandomInt(50, height),
		getRandomInt(0, 360),
		width - 130, 32, 
		{
			forward: Phaser.KeyCode.UP,
			left:    Phaser.KeyCode.LEFT,
			right:   Phaser.KeyCode.RIGHT,
			fire:    Phaser.KeyCode.CONTROL	
		})
	player2.addWeaponSound(game, 'shotgun')
	player2.addAmmunitionSound(game, 'pickup')
	player2.addDieSound(game, 'explosion')
}

function initAmmo() {
	ammunition = game.add.physicsGroup()
}

function createAmmo() {
	ammunition.create(getRandomInt(0, width), getRandomInt(100, height), 'ammo')
	ammunitionSpawn.play()
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

function initMusic() {
	music = game.add.audio('boden')
	music.play()
	music.loop = true
	music.volume = 0.7
}

function create() {
	initMusic()
	ammunitionSpawn = game.add.audio('pop')
	game.physics.startSystem(Phaser.Physics.ARCADE)
	cursors = game.input.keyboard.createCursorKeys()

	createMap()
	createPlayer1()
	createPlayer2()
	initAmmo()
}

