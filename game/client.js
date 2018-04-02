const Client = {}
Client.socket = io.connect()

Client.askNewPlayer = function() {
	Client.socket.emit('newplayer')
}

Client.sendMove = function(id, state) {
	Client.socket.emit('move', { id: id, state: state })
}

Client.socket.on('remotemoved', function(data) {
	Game.addRemotePlayerMove(data)
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
	data.forEach(element => {
		Game.addRemotePlayer(element)
	});
})

Client.socket.on('remove', function(id) {
	Game.removePlayer(id)
})

Client.socket.on('addAmmo', function() {
	Game.addAmmo()
})