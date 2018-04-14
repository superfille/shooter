const Client = {}
Client.socket = io.connect()

Client.askNewPlayer = function() {
	Client.socket.emit('newplayer')
}

Client.sendState = function(state) {
	Client.socket.emit('move', { state: state })
}

Client.socket.on('updatestate', function(worldState) {
	Game.updateWorldState(worldState)
})

Client.socket.on('clientplayer', function(data) {
	Game.createClientPlayer(data)
})

Client.socket.on('newplayer', function(data) {
	if(data) {
		Game.addRemotePlayer(data)
	}
})

Client.socket.on('allplayers', function(data) {
	if (data) {
		data.forEach(element => {
			Game.entityManager.createEntity(element)
		});
	}
})

Client.socket.on('remove', function(id) {
	Game.removePlayer(id)
})

Client.socket.on('addAmmo', function() {
	Game.addAmmo()
})
