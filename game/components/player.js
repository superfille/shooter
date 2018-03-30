const forwardVelocity = 400
const angularVelocity = 300
const coinsToShoot = 3
const immunTime = 1500
const immunEffectTime = 250

function Player(name, playerSprite, x, y, angle, bulletSprite) {
	this.name = name
	this.isImmun = false
	this.player = Game.game.add.sprite(x, y, playerSprite)
	this.player.anchor.set(0.5)
	this.player.angle = angle

	Game.game.physics.arcade.enable(this.player)
	this.player.body.collideWorldBounds = true

	this.hearts = Heart.initialize(3, this.hudX, this.hudY)
	this.coins = Coin.initialize(0, this.hudX, this.hudY)
	this.weapon = Weapon.initialize(this.player, bulletSprite)
	
	this.addHud = function(x, y) {
		this.hudX = 32
		this.hudY = 32
		this.text = Game.game.add.text(this.hudX, this.hudY, this.name,
			{
				font: '22px Arial',
				fill: '#000000',
				align: 'center'
			}
		)
	}

	this.addMovement = function(component) {
		this.movement = component
	}

	this.addCoin = function() {
		Coin.add(this.coins)
	}

	this.removeCoins = function() {
		Coin.removeAll(this.coins)
	}

	this.addHeart = function() {
		Heart.add(this.hearts)
	}

	this.removeHeart = function() {
		Heart.remove(this.hearts)
	}

	this.shoot = function() {
		if(this.coins.children.length === coinsToShoot) {
		//if(true) { // Fire whenever
			this.removeCoins()
			this.weapon.shoot()
		}
	}

	this.update = function() {
		if (!this.player.alive) return

		this.player.body.velocity.x = 0
		this.player.body.velocity.y = 0
	
		this.player.body.angularVelocity = this.movement.getAngularVelocity(angularVelocity)
		
		Game.game.physics.arcade.velocityFromAngle(this.player.angle, forwardVelocity, this.player.body.velocity)
	
	}

	this.collideLayer = function(collisonLayer) {
		game.physics.arcade.collide(this.player, collisonLayer)
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

	this.addAmmunition = function() {
		if(this.coins.children.length < 3) {
			this.addCoin()
		}
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
		emitter = Game.game.add.emitter(this.player.x, this.player.y, 6)
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