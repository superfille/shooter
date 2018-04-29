const forwardVelocity = 400
const angularVelocity = 300
const coinsToShoot = 3
const immunTime = 1500
const immunEffectTime = 250

class Player extends Entity {
	constructor(data) {
		super(data)

		this.name = data.name
		this.type = data.type
		this.sprite = PhaserGame.add.sprite(data.x, data.y, data.car)
		this.sprite._id = data._id
		this.sprite.anchor.set(0.5)
		this.sprite.angle = data.angle
		
		this.isImmun = false

		PhaserGame.physics.arcade.enable(this.sprite)
		this.sprite.body.collideWorldBounds = true

		this.hearts = Heart.initialize(3, this.hudX, this.hudY)
		this.coins = Coin.initialize(0, this.hudX, this.hudY)
		this.weapon = new Weapon(this.sprite, data.ball)

		this.initExplosionParticles()
	}

	addHud (x, y) {
		this.hudX = 32
		this.hudY = 32
		this.text = PhaserGame.add.text(this.hudX, this.hudY, this.name,
			{
				font: '22px Arial',
				fill: '#000000',
				align: 'center'
			}
		)
	}
	
	addCoin () {
		Coin.add(this.coins)
	}

	removeCoins () {
		Coin.removeAll(this.coins)
	}

	addHeart () {
		Heart.add(this.hearts)
	}

	removeHeart () {
		Heart.remove(this.hearts)
	}

	shoot () {
		//if(this.coins.children.length === coinsToShoot) {
		//if(true) { // Fire whenever
			//this.removeCoins()
		this.weapon.shoot()
		//}
	}

	activeBullets() {
		return this.weapon.bullets()
	}

	collideLayer (collisonLayer) {
		PhaserGame.physics.arcade.collide(this.sprite, collisonLayer)
	}

	isHit (enemyBullets) {
		if(!this.isImmun) {
			PhaserGame.physics.arcade.overlap(this.sprite, enemyBullets, function() {
				this.hit()
			}, null, this)
		}
	}

	hit () {
		// if(this.hearts) {
		// 	if(this.hearts.children.length <= 1) {
		// 		this.die()
		// 	}
		// 	this.removeHeart()
		// 	this.setImmun()
		// }
		// else {
		// 	this.die()
		// }
		this.die()
	}

	immunEffect () {
		that = this
		let blink = true
		const orgTint = this.sprite.tint
		return setInterval(function(){
			if(blink) {
				that.player.tint = 0xf44336
			}else {
				that.player.tint = orgTint
			}
			blink = !blink
		}, immunEffectTime)
	}

	clearImmunEffect (interval) {
		clearInterval(interval)
	}

	setImmun () {
		interval = this.immunEffect()
		that = this
		this.isImmun = true
		setTimeout(function() {
			that.isImmun = false
			that.clearImmunEffect(interval)
		}, immunTime)
	}

	die () {
		if (this.dieSound) {
			this.dieSound.play()
		}
		this.sprite.kill()
		this.weapon.destroy()
		Client.iDied()
	//	this.dieEffect()
	}

	addCarrot () {
		// if(this.coins.children.length < 3) {
		// 	this.addCoin()
		// }
		console.log("Got carrot")
	}

	addDieSound (sound) {
		this.dieSound = PhaserGame.add.audio(sound)
	}

	isAlive () {
		return this.sprite.alive
	}

	explosionParticle (x, y, key, frame) {  
		Phaser.Particle.call(this, PhaserGame, x, y, key, frame);
	}
	
	initExplosionParticles () {
		this.explosionParticle.prototype = Object.create(Phaser.Particle.prototype)  
		this.explosionParticle.prototype.constructor = this.explosionParticle; 
		this.explosionParticle.prototype.onEmit = function() {  
			this.animations.add('explosion', Phaser.Animation.generateFrameNames("explosion_",  1, 11, ".png", 2))
			this.animations.play('explosion', 20, false, true)
		}
	}

	dieEffect () {  
		const emitter = PhaserGame.add.emitter(this.sprite.x, this.sprite.y, 6)
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
