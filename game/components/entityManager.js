class EntityManager {
	constructor(data) {
		this.entities = []
		this.tempEntities = []
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

	addTemp(entity) {
		if(!this.tempEntities.find((ent) => ent._id === entity._id)) {
			this.tempEntities.push(entity)
		}
	}

	addRemoteBall(ball) {
		const player = this.getEntity(ball.playerId)
		if (player) {
			player.weapon.remoteShoot(ball)
		}
		else {
			console.error("Shooting ball could not find player", ball)
		}
		
	}

	updateTempToNormal(entity) {
		const index = this.tempEntities.findIndex((ent) => ent._id === entity.tempId)
		if (index >= 0) {
			const tempEntity = this.tempEntities[index]
			tempEntity._id = entity._id	
			this.add(tempEntity)
			this.tempEntities.splice(index, 1)
		}
	}

	createEntity(entity, isClient) {
		const createdEntity = this.entityFactory.create(entity, isClient)
		if (createdEntity) {
			this.add(createdEntity)
		}
	}

	sendToServerState(sprite) {
		const entity = this.getEntity(sprite._id)
		return {
			_id: sprite._id,
			type: entity.type,
			x: sprite.x,
			y: sprite.y,
			angle: sprite.angle,
			timestamp: entity.timestamp
		}
	}

	getEntity(id) {
		return this.entities.find((entity) => entity._id === id)
	}

	getRemotePlayers() {
		return this.entities.filter((entity) => {
			return entity.type === this.entityFactory.types.player && entity._id !== this.client._id
		})
	}

	addClient(entity) {
		this.client = entity
		this.add(entity)
	}

	addClientBall(ball) {
		this.updateTempToNormal(ball)
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
			return
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
				entity.addToPositionBuffer(state)
			}
		}
	}

	interpolateEntities() {
		for (let i in this.entities) { 
		   	const entity = this.entities[i]
	   
			// No point in interpolating this client's entity.
			if (entity._id === this.client._id) {
				continue
			}

			entity.update()
		}
	}
}