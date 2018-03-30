const Client = {}
Client.socket = io.connect()

Client.askNewPlayer = function() {
	Client.socket.emit('newplayer')
}

Client.socket.on('clientplayer', function(data) {
	Game.addClientPlayer(data.id, "filip", data.x, data.y)
})

Client.socket.on('newplayer', function(data) {
	if(data) {
		Game.addNewPlayer(data.id, data.x, data.y)
	}
})

Client.socket.on('allplayers', function(data) {
	data.forEach(element => {
		Game.addNewPlayer(element.id, element.x, element.y)
	});
})

Client.socket.on('remove', function(id) {
	removePlayer(id)
})

Client.socket.on('addAmmo', function() {
	Game.addAmmo()
})