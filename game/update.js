function update() {
	player1.body.velocity.x = 0
	player1.body.velocity.y = 0
	
	player2.body.velocity.x = 0
	player2.body.velocity.y = 0
	
	player1Movement()
	player2Movement()
}


function player1Movement() {
	if (cursors.left.isDown){
		movePlayer(player1, Phaser.LEFT)
	}else if (cursors.right.isDown){
		movePlayer(player1, Phaser.RIGHT)
	}else if (cursors.up.isDown){
		movePlayer(player1, Phaser.UP)
	}else if (cursors.down.isDown){
		movePlayer(player1, Phaser.DOWN)
	}
	if (player1FireButton.isDown){
		b = player1Bullet.getFirstExists(false)//.fire();
		if(b) {
			b.reset(player1.x, player1.y + 8)
			switch(player1.body.facing) {
				case Phaser.LEFT:
					//player1Bullet.fireAngle	= 180
					b.body.velocity.x = -400
					break;
				case Phaser.RIGHT:
					//player1Bullet.fireAngle = 0
					b.body.velocity.x = 400
					break
				case Phaser.UP:
					//player1Bullet.fireAngle = 270
					b.body.velocity.y = -400
					break
				case Phaser.DOWN:
					//player1Bullet.fireAngle = 90
					b.body.velocity.y = 400
					break
			}
		}
    }
}

function player2Movement() {
	if (game.input.keyboard.isDown(Phaser.KeyCode.A)){
		movePlayer(player2, Phaser.LEFT)
	}else if (game.input.keyboard.isDown(Phaser.KeyCode.D)){
		movePlayer(player2, Phaser.RIGHT)
	}else if (game.input.keyboard.isDown(Phaser.KeyCode.W)){
		movePlayer(player2, Phaser.UP)
	}else if (game.input.keyboard.isDown(Phaser.KeyCode.S)){
		movePlayer(player2, Phaser.DOWN)
	}
}

function movePlayer(player, direction) {
	let x = 0
	let y = 0
	if(direction === Phaser.LEFT) {
		x -= 150
	}
	if(direction === Phaser.RIGHT) {
		x += 150
	}
	if(direction === Phaser.UP) {
		y -= 150
	}
	if(direction === Phaser.DOWN) {
		y += 150
	}
	player.body.velocity.x = x
	player.body.velocity.y = y
}

function render() {
	// player1Bullet.debug()
	// player2Bullet.debug()
}