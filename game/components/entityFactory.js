class EntityFactory {
	create(state) {
		let entity = {}
		if (state.type === "bullet") {
			entity.name = "Bullet"
		}
		else if (state.type === "powerup") {
			entity.name = "PowerUp"
		}
		else if (state.isPlayer) {
			entity = new RemotePlayer(state)
		}
		// else {
		// 	return null
		// }

		// entity.id = state.id
		// entity.x = state.x
		// entity.y = state.y
		// entity.angle = state.angle
		console.log("Creating entity", entity)
		console.log(entity.positionBuffer)
		return entity
	}
}