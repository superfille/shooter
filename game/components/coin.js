const Coin = {
	sprite: 'coin',
	animation: 'walk',
	gap: 32,
	audio: 'temp' //TODO: Add audio
}

Coin.initialize = function(numCoins, x, y) {
	const coins = Game.addGroup()
	coins.initX = x
	coins.initY = y

	i = 0
	while (i < numCoins) {
		this.addCoin(coins)
	}

	return coins
}

Coin.add = function(coins) {
	const coin = game.add.sprite(
		coins.initX + (this.gap * coins.children.length),
		coins.initY,
		this.sprite
	)
	coin.animations.add(this.animation)
	coin.animations.play(this.animation, 12, true)
	coins.add(coin)
	
	this.playSound()
}

Coin.removeAll = function(coins) {
	coins.removeAll()
}

Coin.playSound = function() {
	// if (!this.sound) {
	// 	this.sound = Game.addAudio(this.audio)
	// }

	// this.sound.play()
}
