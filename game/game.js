Game.initialize = function(width, height) {
	this.updateRate = 30
	this.entityUpdateRate = 10
	this.ammunition = {}
	this.text = {}
	this.addAmmo = true
	
	this.map
	this.groundLayer
	this.collisonLayer
	
	this.music
	this.musicOn = false
	
	this.width = width
	this.height = height
	this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, '')
	window.game = this.game
	this.entityManager = new EntityManager()

	this.initStates()
}

Game.initStates = function() {
	this.game.state.add('boot', bootState)
	this.game.state.add('load', loadState)
	this.game.state.add('menu', menuState)
	this.game.state.add('play', playState)
	this.game.state.add('win', winState)
	
	this.game.state.start('boot')
}

Game.startState = function(state) {
	this.game.state.start(state)
}

Game.removePlayer = function (id) {
	this.entityManager.remove(id)
}

Game.updateWorldState = function(worldState) {
	this.entityManager.updateWorldState(worldState)
}

Game.createClientPlayer = function(data) {
	if (this.entityManager.client) {
		this.entityManager.remove(this.entityManager.client._id)
	}
	const player = this.entityManager.entityFactory.create(data, true)
	window.player = player
	this.entityManager.addClient(player)
}

Game.addRemotePlayer = function(data) {
	const player = this.entityManager.entityFactory.create(data)
	this.entityManager.add(player)
}

Game.addAudio = function (audio) {
	if (audio) {
		return this.game.add.audio(audio)
	}
}

Game.addClientBall = function(ball) {
	this.entityManager.addClientBall(ball)
}

Game.addRemoteBall = function(ball) {
	this.entityManager.addRemoteBall(ball)
}

Game.addSprite = function(x, y, sprite) {
	return this.game.add.sprite(x, y, sprite)
}

Game.addGroup = function() {
	return this.game.add.group()
}

Game.addPhysicsGroup = function() {
	return this.game.add.physicsGroup()
}

Game.addWeapon = function(maxBullets, sprite) {
	return this.game.add.weapon(maxBullets, sprite)
}

Game.addKey = function(key) {
	return this.game.input.keyboard.addKey(key)
}

Game.addAmmo = function() {
	Ammunition.add()
}

Game.overlap = function(obj1, obj2, cb) {
	return this.game.physics.arcade.overlap(obj1, obj2, cb, null, obj1)
}

Game.initialize(800,800)
