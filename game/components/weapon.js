class Weapon {
	constructor (player, sprite) {
		this.maxBullets = 50
		this.bulletSpeed = 0//500
		this.audio = 'blaster'
		this.sound = Game.addAudio(this.audio)
		this.weapon = PhaserGame.add.weapon(this.maxBullets, sprite)

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
			bullet._id = EntityManager.getTempId()
			const entity = new Entity({ _id: bullet._id, playerId: this.weapon.trackedSprite._id })
			entity.sprite = bullet
			entity.type = Utils.types.bullet
			EntityManager.addTemp(entity)
			Client.playerShoot(entity)
		}
		//this.playSound()
	}

	remoteShoot(ball) {
		this.weapon.fireFrom.x = ball.x
		this.weapon.fireFrom.y = ball.y
		this.weapon.fireAngle = ball.angle
		const ballSprite = this.weapon.fire()
		const entity = new Entity({ _id: ball._id })
		entity.x = ball.x
		entity.y = ball.y
		entity.angle = ball.angle
		entity.sprite = ballSprite
		entity.velocity = { x: ball.velocity.x, y: ball.velocity.y }
		entity.playerId = this.weapon.trackedSprite._id

		return entity
	}

	bullets() {
		return this.weapon.bullets
	}

	playSound() {
		this.sound.play()
	}

	destroy() {
		this.weapon.killAll()
	}
}
