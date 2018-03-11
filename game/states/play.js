const playState = {
	create() {
		this.initMusic()
		ammunitionSpawn = game.add.audio('pop')
		game.physics.startSystem(Phaser.Physics.ARCADE)
		cursors = game.input.keyboard.createCursorKeys()
	
		this.createMap()
		this.createPlayer1()
		this.createPlayer2()
		this.initAmmo()
	},

	update() {
		if(!player1.isAlive()) {
			this.win()
		}else if(!player2.isAlive()) {
			this.win()
		}

		this.ammunitionUpdate()
		player1.update()
		player2.update()
	
		player1.isHit(player2.weapon.bullets)
		player2.isHit(player1.weapon.bullets)
	},

	win() {
		game.state.start('win')
	},

	ammunitionUpdate() {
		if(addAmmo) {
			this.createAmmo()
			setTimeout(function() {
				addAmmo = true
			}, reloadAmmoTime)
			addAmmo = false
		}
	
		player1.overlapAmmunition(ammunition)
		player2.overlapAmmunition(ammunition)
	},

	createMap() {
		map = game.add.tilemap('tilemap');
		map.addTilesetImage('tile_atlas', 'tile_atlas')
	
		groundLayer = map.createLayer('Tile Layer 1')
		groundLayer.resizeWorld()
	},
	
	createPlayer1() {
		player1 = new Player(
			'Filip',
			'car_yellow',
			this.getRandomInt(50, width),
			this.getRandomInt(50, height),
			this.getRandomInt(0, 360)
		)
		player1.addControlls(
			{
				forward: Phaser.KeyCode.W,
				left:    Phaser.KeyCode.A,
				right:   Phaser.KeyCode.D,
				fire:    Phaser.KeyCode.SPACEBAR	
			}
		)
		player1.addWeapon('yellow_ball')
		player1.addHud(32, 32)
		player1.addWeaponSound('blaster')
		player1.addAmmunitionSound('pickup')
		player1.addDieSound('explosion')
		player1.addHeart()
		player1.addHeart()
		player1.addHeart()
	},
	
	createPlayer2() {
		player2 = new Player(
			'Player2',
			'car_blue',
			this.getRandomInt(50, width),
			this.getRandomInt(50, height),
			this.getRandomInt(0, 360)
		)
		player2.addControlls(
			{
				forward: Phaser.KeyCode.UP,
				left:    Phaser.KeyCode.LEFT,
				right:   Phaser.KeyCode.RIGHT,
				fire:    Phaser.KeyCode.CONTROL		
			}
		)
		player2.addWeapon('blue_ball')
		player2.addHud(width - 130, 32)
		player2.addWeaponSound('shotgun')
		player2.addAmmunitionSound('pickup')
		player2.addDieSound('explosion')
		player2.addHeart()
		player2.addHeart()
		player2.addHeart()
	},
	
	initAmmo() {
		ammunition = game.add.physicsGroup()
	},
	
	createAmmo() {
		ammunition.create(this.getRandomInt(0, width), this.getRandomInt(100, height), 'ammo')
		ammunitionSpawn.play()
	},
	
	getRandomInt(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min)) + min
	},
	
	initMusic() {
		music = game.add.audio('boden')
		music.play()
		music.loop = true
		music.volume = 0.7
	}
}