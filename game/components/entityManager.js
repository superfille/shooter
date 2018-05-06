class MyEntityManager {
	constructor() {
		this.entities = []
		this.tempEntities = []
		this.temporaryIds = 0
	}

	getTempId() {
		this.temporaryIds += 1
		return "t" + this.temporaryIds
	}

	add(entity) {
		if (!Utils.objectIsEmpty(entity)) {
			if(!this.entities.find((ent) => ent._id === entity._id)) {
				this.entities.push(entity)
			}
		}
	}

	addTemp(entity) {
		if(!this.tempEntities.find((ent) => ent._id === entity._id)) {
			this.tempEntities.push(entity)
		}
	}

	addRemoteBall(ball) {
		const remotePlayer = this.getEntity(ball.playerId)
		if (!remotePlayer) {
			return console.error("Could not find remote palyer")
		}
		const newBallEntity = remotePlayer.weapon.remoteShoot(ball)
		this.add(newBallEntity)
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

	addRemotePlayer(state) {
		const player = new RemotePlayer(state)
		this.add(player)
	}

	createEntity(entity) {
		if (entity.type === Utils.types.player) {
			this.addRemotePlayer(entity)	
		} else {
			this.add(entity)
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
			return entity.type === Utils.types.player && entity._id !== this.client._id
		})
	}

	addClient(entity) {
		this.client = entity
		window.player = entity
		this.add(entity)
	}

	addCarrot(carrot) {
		if (!this.carrots) {
			this.carrots = new CarrotGroup()
		}
		this.carrots.add(carrot)
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
			if (!Utils.objectIsEmpty(entity) && this.client !== entity) {
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