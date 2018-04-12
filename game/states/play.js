const playState = {
	create() {
		this.initMusic()
		Game.game.physics.startSystem(Phaser.Physics.ARCADE)
		Game.game.stage.disableVisibilityChange = true
		this.createMap()
		Client.askNewPlayer()
	},

	update() {
		Game.entityManager.updateWorldState()

		if (Game.clientPlayer == null) {
			return  // Not connected yet.
		}

		 // Process inputs.
		Game.clientPlayer.update()

		// Interpolate other entities.
		Game.entityManager.interpolateEntities()
		

		// if(clientPlayer === undefined) return
		// if(!clientPlayer.isAlive()) {
		// 	this.win()
		// }
		// else if(!remotePlayer.isAlive()) {
		// 	this.win()
		// }

		//this.ammunitionUpdate()
		//Game.players.forEach((player) => {
		//	player.update()
			//player.isHit(remotePlayer.weapon.bullets)
		//})
		//clientPlayer.update()
		//remotePlayer.update()
	
		//clientPlayer.isHit(remotePlayer.weapon.bullets)
		//remotePlayer.isHit(player1.weapon.bullets)

		//clientPlayer.collideLayer(collisonLayer)
		//remotePlayer.collideLayer(collisonLayer)
	},

	win() {
		Game.startState('win')
	},

	ammunitionUpdate() {
		Ammunition.overlap(clientPlayer, clientPlayer.addAmmunition)
		//Ammunition.overlap(remotePlayer, remotePlayer.addAmmunition)
	},

	createMap() {
		Game.map = Game.game.add.tilemap('tilemap');
		Game.map.addTilesetImage('tmw_desert_spacing', 'tile_atlas')
	
		// groundLayer = map.createLayer('Tile Layer 1')
		// groundLayer.resizeWorld()
		Game.groundLayer = Game.map.createLayer('Ground')
		Game.collisonLayer = Game.map.createLayer('Object')
		Game.groundLayer.resizeWorld()

		Game.map.setCollisionBetween(0, 1000, true, Game.collisonLayer)
	},
	
	initMusic() {
		if(Game.musicOn) {
			Game.music = Game.game.add.audio('boden')
			Game.music.play()
			Game.music.loop = true
			Game.music.volume = 0.7
		}
	}
}