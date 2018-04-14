class EntityManager {
	constructor(data) {
		this.entities = []
		this.entityFactory = new EntityFactory()
	}

	add(entity) {
		if(!this.entities.find((ent) => ent.id === entity.id)) {
			this.entities.push(entity)
		}
	}

	createEntity(entity) {
		let ent = this.getEntity(entity.id)
		if (ent) {
			ent = Object.assign(ent, entity)
		} else {
			ent = this.entityFactory.create(entity)
			this.add(ent)
		}
	}

	getEntity(id) {
		return this.entities.find((entity) => entity.id === id)
	}

	addClient(entity) {
		this.client = entity
		this.add(entity)
	}

	remove(id) {
		let position = -1
		if((position = this.entities.findIndex((entity) => entity.id === id)) >= 0) {
			const entity = this.entities[position]
			this.entities.splice(position, 1)
			entity.remove()
		}
	}

	updateEntity(entity) {
		entity.update()
	}

	updateEntities() {
		this.entities.forEach((entity) => {
			this.updateEntity(entity)
		})
	}

	updateWorldState(entities) {
		if (!entities || !entities.worldState) {
			return entities = this.entities
		} else {
			entities = entities.worldState
		}
		// World state is a list of entity states.
		for (let i = 0; i < entities.length; i++) {
			const state = entities[i]

			// If this is the first time we see this entity, create a local representation.
			if (!this.getEntity(state.id)) {
				const entity = this.entityFactory.create(state)
				if (entity) {
					this.add(entity)
				}
			}

			const entity = this.getEntity(state.id)
			if (entity && this.client !== entity) {
				var timestamp = +new Date()
				state.timestamp = timestamp
				entity.addToPositionBuffer(state)
			}
		}
	}

	interpolateEntities() {
		// Compute render timestamp.
		const now = +new Date()
		const render_timestamp = now - (1000 / Game.updateRate)
		for (let i in this.entities) { 
		   	const entity = this.entities[i]
	   
			// No point in interpolating this client's entity.
			if (entity.id === this.client.id) {
				continue
			}

			entity.dropOlderBufferPositions(render_timestamp)

			// Find the two authoritative positions surrounding the rendering timestamp.
			const buffer = entity.positionBuffer
		   // Interpolate between the two surrounding authoritative positions.
			if (buffer && buffer.length >= 2 && buffer[0].timestamp <= render_timestamp && render_timestamp <= buffer[1].timestamp) {
				const states = entity.getPositionBufferStates()
				const x0 = states[0].x
				const x1 = states[1].x
				
				const y0 = states[0].y
				const y1 = states[1].y

				const angle0 = states[0].angle
				const angle1 = states[1].angle

				const t0 = states[0].timestamp
				const t1 = states[1].timestamp

				entity.sprite.x = x0 + (x1 - x0) * (render_timestamp - t0) / (t1 - t0)
				entity.sprite.y = y0 + (y1 - y0) * (render_timestamp - t0) / (t1 - t0)
				entity.sprite.angle = states[1].angle

				//entity.applyUpdate(buffer)
			}
		}
	}
}