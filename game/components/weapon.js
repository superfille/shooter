class Weapon {
	constructor (player, sprite) {
		this.bulletIds = 0
		this.maxBullets = 50
		this.bulletSpeed = 500
		this.audio = 'blaster'
		this.sound = Game.addAudio(this.audio)
		this.weapon = Game.addWeapon(this.maxBullets, sprite)

		this.weapon.bulletKillType = Phaser.Weapon.KILL_NEVER
		this.weapon.bulletCollideWorldBounds = true
		this.weapon.bulletSpeed = this.bulletSpeed
		this.weapon.bullets.setAll('body.bounce.x', 1)
		this.weapon.bullets.setAll('body.bounce.y', 1)
		this.weapon.trackSprite(player, 0, 0, true)
	}

	shoot() {
		const bullet = this.weapon.fire()
		if (bullet) {
			bullet._id = Game.entityManager.getTempId()
			let entity = new Entity({ _id: bullet._id })
			entity.sprite = bullet
			entity.type = Game.entityManager.entityFactory.types.bullet
			Game.entityManager.add(entity)
		}
		//this.playSound()
	}

	playSound() {
		this.sound.play()
	}

	getLivingBullets() {
		const bullets = this.weapon.bullets.getAll('alive', true).map((bullet) => {
			let state = Game.entityManager.serverState(bullet)
			state.playerId = Game.entityManager.client._id
			return state
		})

		return bullets
	}
}
