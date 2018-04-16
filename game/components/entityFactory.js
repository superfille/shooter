class EntityFactory {
	constructor() {
		this.types = {
			player: 1,
			bullet: 2,
			carrot: 3
		}
	}

	create(state, isClient) {
		let entity = {}
		if (state.type === this.types.player) {
			if (isClient) {
				entity = new ClientPlayer(state)
			}
			else {
				entity = new RemotePlayer(state)
			}
			return entity
		}

		if (state.type === this.types.bullet) {
			console.log("Create bullet")
			//Based on player id, create the bullet
 		}
		else if (state.type === "powerup") {
			entity.name = "PowerUp"
		}
		else {
			return null
		}

		return entity
	}
}