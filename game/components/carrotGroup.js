class CarrotGroup {
	constructor() {
		this.sprite = 'ammo'
		this.audio = {
			pickup: 'pickup',
			spawn: 'spawn'
		}
		this.sound = {
			pickup: PhaserGame.add.audio(this.audio.pickup),
			spawn:  PhaserGame.add.audio(this.audio.spawn)
		}
		this.carrots = PhaserGame.add.physicsGroup()
	}

	add(entity) {
		const carrot = this.carrots.create(entity.x, entity.y, this.sprite)
		carrot._id = entity._id
		this.playSound(this.audio.spawn)
	}

	playSound(sound) {
		this.sound[sound].play()
	}

	overlap(obj, cb) {
		PhaserGame.physics.arcade.overlap(obj, this.carrots, (_, carrot) => {
			const id = carrot._id
			cb(id)
		}, null, obj)
	}

	remove(id) {
		for (let index = 0; index < this.carrots.children.length; index += 1) {
			const carrot = this.carrots.children[index];
			if (carrot._id === id) {
				carrot.kill()
				this.playSound(this.audio.pickup)
				break
			}
		}
	}

}
