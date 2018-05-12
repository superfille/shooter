class MyGame {
	constructor() {
		this.updateRate = 30
		this.entityUpdateRate = 10

		this.musicOn = false

		this.initStates()
	}

	initStates() {
		PhaserGame.state.add('boot', bootState)
		PhaserGame.state.add('load', loadState)
		PhaserGame.state.add('menu', menuState)
		PhaserGame.state.add('play', playState)
		PhaserGame.state.add('win', winState)
		
		PhaserGame.state.start('boot')
	}

	removePlayer(id) {
		if (!this.clientActive) return
		EntityManager.removePlayer(id)
	}

	updateWorldState(worldState) {
		if (!this.clientActive) return
		EntityManager.updateWorldState(worldState)
	}

	createClientPlayer(state) {
		this.clientActive = true
		if (EntityManager.client) {
			EntityManager.remove(EntityManager.client._id)
		}
		const player = new ClientPlayer(state)
		EntityManager.addClient(player)
	}

	addRemotePlayer(state) {
		if (!this.clientActive) return
		EntityManager.addRemotePlayer(state)
	}

	addAudio(audio) {
		if (audio) {
			return PhaserGame.add.audio(audio)
		}
	}

	addCarrot(carrot) {
		if (!this.clientActive) return
		EntityManager.addCarrot(carrot)
	}

	gotCarrot(carrot) {
		EntityManager.addPlayerCarrot(carrot)
	}

	addClientBall(ball) {
		if (!this.clientActive) return
		EntityManager.addClientBall(ball)
	}

	addRemoteBall(ball) {
		if (!this.clientActive) return
		EntityManager.addRemoteBall(ball)
	}
}