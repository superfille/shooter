const playState = {
	create() {
		//this.initMusic()
		PhaserGame.physics.startSystem(Phaser.Physics.ARCADE)
		PhaserGame.stage.disableVisibilityChange = true
		this.createMap()
		Client.askNewPlayer()
	},

	update() {
		EntityManager.updateWorldState()

		if (EntityManager.client == null) {
			return  // Not connected yet.
		}

		 // Process inputs.
		EntityManager.client.update()

		// Interpolate other entities.
		EntityManager.interpolateEntities()
		

		// if(clientPlayer === undefined) return
		// if(!clientPlayer.isAlive()) {
		// 	this.win()
		// }
		// else if(!remotePlayer.isAlive()) {
		// 	this.win()
		// }

		//this.ammunitionUpdate()
		
		const remotePlayers = EntityManager.getRemotePlayers()
		const bullets = remotePlayers.map((player) => player.activeBullets())
		if (bullets) {
			EntityManager.client.isHit(bullets)
		}
		if (EntityManager.carrots) {
			EntityManager.carrots.overlap(EntityManager.client, EntityManager.client.addCarrot)
		}
		//clientPlayer.collideLayer(collisonLayer)
		//remotePlayer.collideLayer(collisonLayer)
	},

	win() {
		PhaserGame.state.start('win')
	},

	createMap() {
		Game.map = PhaserGame.add.tilemap('tilemap');
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
			Game.music = PhaserGame.add.audio('boden')
			Game.music.play()
			Game.music.loop = true
			Game.music.volume = 0.7
		}
	}
}