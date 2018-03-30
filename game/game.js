const Game = {}

Game.initialize = function(width, height) {
	this.players = []
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

}

Game.addClientPlayer = function(id, name, x, y) {
	const player = this.createPlayer(id, name, x, y)
	const controlls = new Controlls(
		{
			forward: Phaser.KeyCode.W,
			left:    Phaser.KeyCode.A,
			right:   Phaser.KeyCode.D,
			fire:    Phaser.KeyCode.SPACEBAR	
		}
	)
	
	player.addMovement(controlls)
	this.players.push(player)
	console.log("Adding client player")
}

Game.addNewPlayer = function(id, name, x, y) {
	this.players.push(this.createPlayer(id, name, x, y))
}

Game.createPlayer = function(id, name, x, y) {
	let car
	let ball
	if(id === 1) {
		car = 'car_yellow'
		ball = 'yellow_ball'
	} else {
		car = 'car_blue'
		ball = 'blue_ball'
	}
	
	const player = new Player(name, car, x, y, Utils.getRandomInt(0, 360), ball)
	
	if(id === 1) {
		player.addHud(32, 32)
	} else {
		player.addHud(this.width - 130, 32)
	}
	
	return player
}

Game.addAudio = function (audio) {
	if (audio) {
		return this.game.add.audio(audio)
	}
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
