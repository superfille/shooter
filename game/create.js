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
}

function createBullet(player, bullet, button, keycode, img) {
	bullet = game.add.weapon(30, img)
	bullet.trackSprite(player, 14, 0)
	bullet.bulletSpeed = 300
	button = game.input.keyboard.addKey(keycode)
}

function create (){
	game.physics.startSystem(Phaser.Physics.ARCADE)
	cursors = game.input.keyboard.createCursorKeys()

	createMap()
	createPlayer1()
	createPlayer2()
}

