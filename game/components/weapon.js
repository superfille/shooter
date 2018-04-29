class Weapon {
	constructor (player, sprite) {
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
			let entity = new Entity({ _id: bullet._id, playerId: this.weapon.trackedSprite._id })
			entity.sprite = bullet
			entity.type = Game.entityManager.entityFactory.types.bullet
			Game.entityManager.addTemp(entity)
			Client.playerShoot(entity)
		}
		//this.playSound()
	}

	remoteShoot(ball) {
		this.weapon.fireFrom.x = ball.x
		this.weapon.fireFrom.y = ball.y
		this.weapon.fireAngle = ball.angle
		this.weapon.fire()
	}

	bullets() {
		return this.weapon.bullets
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

	destroy() {
		this.weapon.killAll()
	}
}
