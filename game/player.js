const maxBullets = 50
const bulletSpeed = 500
const forwardVelocity = 500
const angularVelocity = 300
const coinsToShoot = 3

function Player(game, name, playerSprite, bulletSprite, coinSprite, x, y, hudx, hudy, controlls) {
	this.hud = {x: hudx, y: hudy}
	this.coinSprite = coinSprite
	this.name = name

	this.weapon = game.add.weapon(maxBullets, bulletSprite)

	this.weapon.bulletKillType = Phaser.Weapon.KILL_NEVER
	this.weapon.bulletCollideWorldBounds = true
	this.weapon.bulletSpeed = bulletSpeed
	this.weapon.bullets.setAll('body.bounce.x', 1);
	this.weapon.bullets.setAll('body.bounce.y', 1);

	this.player = game.add.sprite(x, y, playerSprite)
	this.player.anchor.set(0.5)

	game.physics.arcade.enable(this.player)
	this.player.body.collideWorldBounds = true
	
	this.weapon.trackSprite(this.player, 0, 0, true)

	this.text = game.add.text(hudx, hudy, this.name,{
		font: '22px Arial',
		fill: '#000000',
		align: 'center'
	})

	this.controlls = {}
	this.controlls.forward = game.input.keyboard.addKey(controlls.forward)
	this.controlls.left = game.input.keyboard.addKey(controlls.left)
	this.controlls.right = game.input.keyboard.addKey(controlls.right)
	this.controlls.fire = game.input.keyboard.addKey(controlls.fire)
	
	this.coins = game.add.group()

	this.addCoin = function() {
		let coin = game.add.sprite(this.hud.x + (32 * this.coins.children.length), this.hud.y + 30, 'coin')
		coin.animations.add('walk')
		coin.animations.play('walk', 12, true)
		this.coins.add(coin)
	}

	this.shoot = function() {
		if(this.coins.children.length === coinsToShoot) {
			this.coins.removeAll()
			this.weapon.fire()
		}
	}

	this.update = function(game) {
		this.player.body.velocity.x = 0
		this.player.body.velocity.y = 0
		this.player.body.angularVelocity = 0
	
		if (this.controlls.left.isDown){
			this.player.body.angularVelocity = -angularVelocity
		} else if (this.controlls.right.isDown){
			this.player.body.angularVelocity = angularVelocity
		}
		
		if (this.controlls.forward.isDown) {
			game.physics.arcade.velocityFromAngle(this.player.angle, forwardVelocity, this.player.body.velocity)
		}
	
		if (this.controlls.fire.isDown){
			this.shoot()
		}
	}

	this.overlapEnemyBullet = function(game, enemyBullets) {
		game.physics.arcade.overlap(this.player, enemyBullets, this.die, null, this)
	}

	this.die = function() {
		console.log(this.name + " died")
		//TODO: Add pixel explosion
	}

	this.overlapAmmunition = function(game, ammunition) {
		game.physics.arcade.overlap(this.player, ammunition, this.addAmmunition, null, this)
	}

	this.addAmmunition = function(_, ammunition) {
		ammunition.kill()
		if(this.coins.children.length < 3) {
			this.addCoin()
		}
	}
}