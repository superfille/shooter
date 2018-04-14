class EntityFactory {
	create(state, isClient) {
		let entity = {}
		if (state.type === "bullet") {
			entity.name = "Bullet"
		}
		else if (state.type === "powerup") {
			entity.name = "PowerUp"
		}
		else if (state.isPlayer) {
			if (isClient) {
				entity = new ClientPlayer(state)
			} else {
				entity = new RemotePlayer(state)
			}
		}
		else {
			return null
		}

		// entity.id = state.id
		// entity.x = state.x
		// entity.y = state.y
		// entity.angle = state.angle
		return entity
	}
}