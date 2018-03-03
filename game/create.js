function createMap() {
	map = game.add.tilemap('tilemap');
	map.addTilesetImage('dirt', 'dirt')

	groundLayer = map.createLayer('Ground')
	groundLayer.resizeWorld()
}

function createPlayer1() {
	player1Weapon = game.add.weapon(30, 'player1bullet')

	player1Weapon.bulletKillType = Phaser.Weapon.KILL_NEVER
	player1Weapon.bulletCollideWorldBounds = true
	player1Weapon.bulletGravity = 100
	player1Weapon.bulletSpeed = 600
	player1Weapon.bullets.setAll('body.bounce.x', 1);
	player1Weapon.bullets.setAll('body.bounce.y', 1);
	player1Weapon.fireRate = 100

	player1 = game.add.sprite(100, 100, 'player1')

	player1.anchor.set(0.5)

	game.physics.arcade.enable(player1)
	player1.body.collideWorldBounds = true

	player1.body.drag.set(50)
    player1.body.maxVelocity.set(200)
	
	player1Weapon.trackSprite(player1, 0, 0, true)

	cursors = game.input.keyboard.createCursorKeys()

	player1FireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)

	player1Text =
		game.add.text(28, 28, 'Player 1',
			{
				font: '22px Arial',
				fill: '#000000',
				align: 'center'
			})
}

function createPlayer2() {
	player2Weapon = game.add.weapon(30, 'player2bullet')

	player2Weapon.bulletKillType = Phaser.Weapon.KILL_NEVER
	player2Weapon.bulletCollideWorldBounds = true
	player2Weapon.bulletGravity = 100
	player2Weapon.bulletSpeed = 600
	player2Weapon.bullets.setAll('body.bounce.x', 1);
	player2Weapon.bullets.setAll('body.bounce.y', 1);
	player2Weapon.fireRate = 100

	player2 = game.add.sprite(100, 100, 'player2')

	player2.anchor.set(0.5)

	game.physics.arcade.enable(player2)
	player2.body.collideWorldBounds = true

	player2.body.drag.set(50)
    player2.body.maxVelocity.set(200)
	
	player2Weapon.trackSprite(player2, 0, 0, true)

	cursors = game.input.keyboard.createCursorKeys()

	player2FireButton = game.input.keyboard.addKey(Phaser.KeyCode.ALT)

	player2Text =
		game.add.text(900, 28, 'Player 2',
			{
				font: '22px Arial',
				fill: '#000000',
				align: 'center'
			})
}

function initAmmo() {
	ammunition = game.add.physicsGroup()
}

function createAmmo() {
	ammunition.create(getRandomInt(0, 900), getRandomInt(0, 900), 'ammo')
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function initCoins() {
	player1Coins = game.add.group()
	player2Coins = game.add.group()
}

function createCoin(player) {
	if(player === 1) {
		player1Coins.children.length
		let c = game.add.sprite(32 * player1Coins.children.length, 60, 'coin')
		c.animations.add('walk')
		c.animations.play('walk', 12, true)
		player1Coins.add(c)
	}else {
		let c = game.add.sprite(820 + (32 * player2Coins.children.length), 60, 'coin')
		c.animations.add('walk')
		c.animations.play('walk', 12, true)
		player2Coins.add(c)
	}
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
	winText()
	initAmmo()
	initCoins()
}

