class CarrotGroup {
	constructor() {
		this.sprite = 'ammo'
		// this.audio = {
		// 	pickup: 'pickup',
		// 	spawn: 'spawn'
		// }
		// this.sound = {
		// 	pickup: Game.addAudio(this.audio.pickup),
		// 	spawn:  Game.addAudio(this.audio.spawn)
		// }
		this.carrots = PhaserGame.add.physicsGroup()
	}

	add(entity) {
		this.carrots.create(entity.x, entity.y, this.sprite)
		//this.playSound(this.audio.spawn)
	}

	playSound(sound) {
		this.sound[sound].play()
	}

	overlap(obj, cb) {
		PhaserGame.physics.arcade.overlap(obj, this.carrots, (_, carrot) => {
			carrot.kill()
			cb()
		}, null, obj)
	}

}
