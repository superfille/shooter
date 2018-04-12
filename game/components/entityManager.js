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

	getEntity(id) {
		return this.entities.find((entity) => entity.id === id)
	}

	addClient(entity) {
		this.client = entity
	}

	remove(id) {
		if((position = this.entities.findIndex((entity) => entity.id === id)) >= 0) {
			this.entities.splice(position, 1)
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
		if (!entities) {
			entities = this.entities
		}
		// World state is a list of entity states.
		for (let i = 0; i < entities.length; i++) {
			const state = entities[i]

			// If this is the first time we see this entity, create a local representation.
			if (!this.getEntity(state.id)) {
				const entity = this.entityFactory.create(state)
				this.add(entity)
			}

			const entity = this.getEntity(state.id)
			if (state.id == Game.clientPlayer.id) {
				// Received the authoritative position of this client's entity.
				Game.clientPlayer.authoritativeUpdate(state)

				// Server Reconciliation. Re-apply all the inputs not yet processed by
				// the server.
				let j = 0
				while (j < Game.player.pendingStates.length) {
					const input = this.pendingStates[j]
					if (input.inputSequenceNumber <= state.lastProcessedInput) {
						// Already processed. Its effect is already taken into account into the world update
						// we just got, so we can drop it.
						Game.player.pendingStates.splice(j, 1)
					}
					else {
						// Not processed by the server yet. Re-apply it.
						this.clientPlayer.applyInput(input)
						j += 1
					}
				}
			} else {
				// Received the position of an entity other than this client's.
				// Add it to the position buffer.
				var timestamp = +new Date()
				entity.positionBuffer.push({
					timestamp: timestamp,
					position: state
				})
			}
		}
	}

	interpolateEntities() {
		// Compute render timestamp.
		const now = +new Date()
		const render_timestamp = now - 2000//(1000.0 / 1)
		for (let i in this.entities) { 
		   	const entity = this.entities[i]
	   
			// No point in interpolating this client's entity.
			if (entity.id === Game.clientPlayer.id) {
				continue
			}

			// Find the two authoritative positions surrounding the rendering timestamp.
			const buffer = entity.positionBuffer
			
			// Drop older positions.
			while (buffer.length >= 2 && buffer[1].timestamp <= render_timestamp) {
				buffer.shift()
				console.log("shifted", buffer)
			}
	   
		   // Interpolate between the two surrounding authoritative positions.
			if (buffer.length >= 2 && buffer[0].timestamp <= render_timestamp && render_timestamp <= buffer[1].timestamp) {
				const x0 = buffer[0].position.x
				const x1 = buffer[1].position.x
				
				const y0 = buffer[0].position.y
				const y1 = buffer[1].position.y

				const angle0 = buffer[0].position.angle
				const angle1 = buffer[1].position.angle

				const t0 = buffer[0].timestamp
				const t1 = buffer[1].timestamp

				entity.x = x0 + (x1 - x0) * (render_timestamp - t0) / (t1 - t0)
				entity.y = y0 + (y1 - y0) * (render_timestamp - t0) / (t1 - t0)
				entity.applyUpdate({
					x: x0 + (x1 - x0) * (render_timestamp - t0) / (t1 - t0),
					y: y0 + (y1 - y0) * (render_timestamp - t0) / (t1 - t0),
					angle: buffer[1].position.angle // probably chnage this
				})
			}
		}
	}
}