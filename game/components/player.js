const maxBullets = 50
const bulletSpeed = 500
const forwardVelocity = 400
const angularVelocity = 300
const coinsToShoot = 3
const immunTime = 1500
const immunEffectTime = 250

function Player(name, playerSprite, x, y, angle) {
	this.name = name
	this.isImmun = false
	this.player = game.add.sprite(x, y, playerSprite)
	this.player.anchor.set(0.5)
	this.player.angle = angle

	game.physics.arcade.enable(this.player)
	this.player.body.collideWorldBounds = true

	this.addCoin = function() {
		let coin = game.add.sprite(this.hudX + (32 * this.coins.children.length), this.hudY + 60, 'coin')
		coin.animations.add('walk')
		coin.animations.play('walk', 12, true)
		this.coins.add(coin)
	}

	this.addHeart = function() {
		let heart = game.add.sprite(this.hudX + (32 * this.hearts.children.length), this.hudY + 30, 'heart')
		this.hearts.add(heart)
	}

	this.removeHeart = function() {
		this.hearts.remove(this.hearts.getAt(this.hearts.children.length - 1))
	}

	this.addControlls = function(controlls) {
		this.controlls = {}
		this.controlls.forward = game.input.keyboard.addKey(controlls.forward)
		this.controlls.left    = game.input.keyboard.addKey(controlls.left)
		this.controlls.right   = game.input.keyboard.addKey(controlls.right)
		this.controlls.fire    = game.input.keyboard.addKey(controlls.fire)
	}

	this.addWeapon = function(bulletSprite) {
		this.weapon = game.add.weapon(maxBullets, bulletSprite)

		this.weapon.bulletKillType = Phaser.Weapon.KILL_NEVER
		this.weapon.bulletCollideWorldBounds = true
		this.weapon.bulletSpeed = bulletSpeed
		this.weapon.bullets.setAll('body.bounce.x', 1)
		this.weapon.bullets.setAll('body.bounce.y', 1)
		this.weapon.trackSprite(this.player, 0, 0, true)
	}

	this.addHud = function(x, y) {
		this.coins = game.add.group()
		this.hearts = game.add.group()
		this.hudX = x
		this.hudY = y
		this.text = game.add.text(x, y, this.name,
			{
				font: '22px Arial',
				fill: '#000000',
				align: 'center'
			}
		)
	}

	this.shoot = function() {
		if(this.coins.children.length === coinsToShoot) {
		//if(true) { // Fire whenever
			this.coins.removeAll()
			this.weapon.fire()
			if(this.weaponSound) {
				this.weaponSound.play()
			}
		}
	}

	this.update = function() {
		if (!this.player.alive) return

		this.player.body.velocity.x = 0
		this.player.body.velocity.y = 0
		this.player.body.angularVelocity = 0
	
		if (this.controlls.left.isDown){
			this.player.body.angularVelocity = -angularVelocity
		} else if (this.controlls.right.isDown){
			this.player.body.angularVelocity = angularVelocity
		}
		
		//if (this.controlls.forward.isDown) {
		game.physics.arcade.velocityFromAngle(this.player.angle, forwardVelocity, this.player.body.velocity)
		//}
	
		if (this.controlls.fire.isDown){
			this.shoot()
		}
	}

	this.isHit = function(enemyBullets) {
		if(!this.isImmun) {
			game.physics.arcade.overlap(this.player, enemyBullets, function() {
				this.hit()
			}, null, this)
		}
	}

	this.hit = function() {
		if(this.hearts) {
			if(this.hearts.children.length <= 1) {
				this.die()
			}
			this.removeHeart()
			this.setImmun()
		}else {
			this.die()
		}
	}

	this.immunEffect = function() {
		that = this
		let blink = true
		const orgTint = this.player.tint
		return setInterval(function(){
			if(blink) {
				that.player.tint = 0xf44336
			}else {
				that.player.tint = orgTint
			}
			blink = !blink
		}, immunEffectTime)
	}

	this.clearImmunEffect = function(interval) {
		clearInterval(interval)
	}

	this.setImmun = function() {
		interval = this.immunEffect()
		that = this
		this.isImmun = true
		setTimeout(function() {
			that.isImmun = false
			that.clearImmunEffect(interval)
		}, immunTime)
		
	}

	this.die = function() {
		if (this.dieSound) {
			this.dieSound.play()
		}
		this.player.kill()
		this.dieEffect()
	}

	this.overlapAmmunition = function(ammunition) {
		game.physics.arcade.overlap(this.player, ammunition, this.addAmmunition, null, this)
	}

	this.addAmmunition = function(_, ammunition) {
		ammunition.kill()
		if(this.coins.children.length < 3) {
			this.addCoin()
			if(this.ammunitionSound) {
				this.ammunitionSound.play()
			}
		}
	}

	this.addWeaponSound = function(sound) {
		this.weaponSound = game.add.audio(sound)
	}

	this.addAmmunitionSound = function(sound) {
		this.ammunitionSound = game.add.audio(sound)
	}

	this.addDieSound = function(sound) {
		this.dieSound = game.add.audio(sound)
	}

	this.isAlive = function() {
		return this.player.alive
	}

	this.explosionParticle = function(x, y, key, frame) {  
		Phaser.Particle.call(this, game, x, y, key, frame);
	}
	
	this.explosionParticle.prototype = Object.create(Phaser.Particle.prototype)  
	this.explosionParticle.prototype.constructor = this.explosionParticle; 
	this.explosionParticle.prototype.onEmit = function() {  
		this.animations.add('explosion', Phaser.Animation.generateFrameNames("explosion_",  1, 11, ".png", 2))
		this.animations.play('explosion', 20, false, true)
	}

	this.dieEffect = function() {  
		emitter = game.add.emitter(this.player.x, this.player.y, 6)
		emitter.particleClass = this.explosionParticle
		emitter.makeParticles('explosion')
		emitter.width = 20
		emitter.height = 20
		emitter.minParticleScale = 0.5
		emitter.maxParticleScale = 3
		emitter.minParticleSpeed.set(0, 0)
		emitter.maxParticleSpeed.set(0, 0)
		emitter.gravity = 0
		emitter.start(false, 2000, 50, 6)      
	}
}