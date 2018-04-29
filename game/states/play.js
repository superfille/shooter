const playState = {
	create() {
		//this.initMusic()
		Game.game.physics.startSystem(Phaser.Physics.ARCADE)
		Game.game.stage.disableVisibilityChange = true
		this.createMap()
		Client.askNewPlayer()
	},

	update() {
		Game.entityManager.updateWorldState()

		if (Game.entityManager.client == null) {
			return  // Not connected yet.
		}

		 // Process inputs.
		Game.entityManager.client.update()

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
		
		const remotePlayers = Game.entityManager.getRemotePlayers()
		const bullets = remotePlayers.map((player) => player.weapon.bullets)
		if (bullets) {
			Game.entityManager.client.isHit(bullets)
		}

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