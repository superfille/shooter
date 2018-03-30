const Heart = {
	sprite: 'heart',
	gap: 32
}

Heart.initialize = function(numHearts, x, y) {
	const hearts = Game.addGroup()
	hearts.initalX = x
	hearts.initalY = y
	
	i = 0
	while (i < numHearts) {
		this.add(hearts)
		i += 1
	}

	return hearts
}

Heart.add = function(hearts) {
	hearts.add(
		Game.addSprite(
			hearts.initalX + (hearts.children.length * this.gap),
			hearts.initalY,
			this.sprite
		)
	)
}

Heart.remove = function(hearts) {
	if (hearts.children.length > 0) {
		hearts.remove(hearts.getAt(hearts.children.length - 1))
	}
}