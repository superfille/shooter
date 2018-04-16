class EntityManager {
	constructor(data) {
		this.entities = []
		this.entityFactory = new EntityFactory()
		this.temporaryIds = 0
	}

	getTempId() {
		this.temporaryIds += 1
		return "t" + this.temporaryIds
	}

	add(entity) {
		if(!this.entities.find((ent) => ent._id === entity._id)) {
			this.entities.push(entity)
		}
	}

	createEntity(entity, isClient) {
		const createdEntity = this.entityFactory.create(entity, isClient)
		if (createdEntity) {
			this.add(createdEntity)
		}
	}

	serverState(sprite) {
		const entity = this.getEntity(sprite._id)
		return {
			_id: sprite._id,
			type: entity.type,
			x: sprite.x,
			y: sprite.y,
			angle: sprite.angle
		}
	}

	getEntity(id) {
		return this.entities.find((entity) => entity._id === id)
	}

	addClient(entity) {
		this.client = entity
		this.add(entity)
	}

	remove(id) {
		let position = -1
		if((position = this.entities.findIndex((entity) => entity._id === id)) >= 0) {
			const entity = this.entities[position]
			this.entities.splice(position, 1)
			entity.remove()
		}
	}

	cleanEntityId(entity) {
		const ent = this.getEntity(entity.tempId)
		ent._id = entity._id
		ent.sprite._id = entity._id
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
		if (!entities) {
			return entities = this.entities
		}
		// World state is a list of entity states.
		for (let i = 0; i < entities.length; i++) {
			const state = entities[i]
			
			// This entity does not exist
			if (!this.getEntity(state._id)) {
				return
			}

			const entity = this.getEntity(state._id)
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
			if (entity._id === this.client._id) {
				continue
			}

			entity.dropOlderBufferPositions(render_timestamp)

			// Find the two authoritative positions surrounding the rendering timestamp.
			const buffer = entity.positionBuffer
		   // Interpolate between the two surrounding authoritative positions.
			if (buffer && buffer.length >= 2 && buffer[0].timestamp <= render_timestamp && render_timestamp <= buffer[1].timestamp) {
				entity.applyUpdate(render_timestamp)
			}
		}
	}
}