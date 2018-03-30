const Weapon = {
	maxBullets: 50,
	bulletSpeed: 500,
	audio: 'blaster'
}

Weapon.initialize = function(player, sprite) {
	const weapon = Game.addWeapon(this.maxBullets, sprite)

	weapon.bulletKillType = Phaser.Weapon.KILL_NEVER
	weapon.bulletCollideWorldBounds = true
	weapon.bulletSpeed = this.bulletSpeed
	weapon.bullets.setAll('body.bounce.x', 1)
	weapon.bullets.setAll('body.bounce.y', 1)
	weapon.trackSprite(player, 0, 0, true)
	
	return weapon
}

Weapon.shoot = function(weapon) {
	weapon.fire()
	this.playSound()
}

Weapon.playSound = function() {
	if(!this.sound) {
		this.sound = Game.addAudio(this.audio)
	}

	this.sound.play()
}