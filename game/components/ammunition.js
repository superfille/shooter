Ammunition = {
	sprite: 'ammo',
	audio: {
		pickup: 'pickup',
		spawn: 'spawn'
	}
}

Ammunition.initialize = function() {
	this.ammunition = Game.addPhysicsGroup()
}

Ammunition.add = function() {
	this.ammunition.create(
		Utils.getRandomInt(0, width),
		Utils.getRandomInt(100, Game.height),
		this.sprite
	)
	this.playSound(this.audio.spawn)
}

Ammunition.playSound = function(sound) {
	if (!this.sound) {
		this.sound = {
			pickup: Game.addAudio(this.audio.pickup),
			spawn:  Game.addAudio(this.audio.spawn)
		}
	}
	
	this.sound[sound].play()
}

Ammunition.overlap = function(obj, cb) {
	Game.overlap(obj, this.ammunition, (_, ammo) => {
		ammo.kill()
		cb()
	})
}
