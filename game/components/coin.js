class Coin {
	constructor(x, y) {
		this.sprite ='coin'
		this.animation = 'walk'
		this.gap = 32

		this.coins = PhaserGame.add.group()
		this.coins.x = x
		this.coins.y = y
	}

	add() {
		const coin = PhaserGame.add.sprite(
			this.coins.x + (this.gap * this.coins.children.length),
			this.coins.y,
			this.sprite
		)

		coin.animations.add(this.animation)
		coin.animations.play(this.animation, 12, true)
		this.coins.add(coin)
	}

	numberOfCoins() {
		return this.coins.children.length
	}

	clear() {
		this.coins.removeAll()
	}
}
