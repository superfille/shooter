function createMap() {
	map = game.add.tilemap('tilemap');
	map.addTilesetImage('dirt', 'dirt')

	groundLayer = map.createLayer('Ground')
	groundLayer.resizeWorld()
}

function createPlayer() {
	player1 = game.add.sprite(100, 100, 'player1')
	game.physics.arcade.enable(player1)
	player1.body.collideWorldBounds = true
	
	
	player1Bullet = game.add.group()
	player1Bullet.enableBody = true
	player1Bullet.physicsBodyType = Phaser.Physics.ARCADE
	player1Bullet.createMultiple(30, 'player1bullet')
	player1Bullet.setAll('collideWorldBounds', true)
	player1Bullet.setAll('bounce', 1)

	// player1Bullet = game.add.weapon(30, 'player1bullet')
	// player1Bullet.trackSprite(player1, 14, 0)
	// player1Bullet.bulletSpeed = 300
	// player1Bullet.bulletKillType = Phaser.Weapon.NEVER_KILL
	player1FireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)


	player2 = game.add.sprite(600, 100, 'player2')
	player2Bullet = game.add.weapon(1, 'player2bullet')
	game.physics.arcade.enable(player2)
	player2.body.collideWorldBounds = true
	player2Bullet.trackSprite(player2, 14, 0)
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
	createPlayer()
}

