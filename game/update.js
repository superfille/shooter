function update() {
	updatePlayer1()
	updatePlayer2()
	ammunitionUpdate()
}

function ammunitionUpdate() {
	if(addAmmo) {
		createAmmo()
		setTimeout(function() {
			addAmmo = true
		}, reloadAmmoTime)
		addAmmo = false
	}

	game.physics.arcade.overlap(player1, ammunition, player1AddAmmo, null)
	game.physics.arcade.overlap(player2, ammunition, player2AddAmmo, null)
}

function player1AddAmmo(p1, ammo) {
	ammo.kill()
	if(player1Coins.children.length < 3) {
		createCoin(1)
	}
}

function player2AddAmmo(p2, ammo) {
	ammo.kill()
	if(player2Coins.children.length < 3) {
		createCoin(2)
	}
}

function updatePlayer1() {
	player1.body.angularVelocity = 0
    if (game.input.keyboard.isDown(Phaser.KeyCode.W)){
        game.physics.arcade.accelerationFromRotation(
			player1.rotation,
			300,
			player1.body.acceleration
		)
    }else{
        player1.body.acceleration.set(0)
    }

    if (game.input.keyboard.isDown(Phaser.KeyCode.A)){
        player1.body.angularVelocity = -300
    }else if (game.input.keyboard.isDown(Phaser.KeyCode.D)){
        player1.body.angularVelocity = 300
    }else{
        player1.body.angularVelocity = 0
    }

    if (player1FireButton.isDown){
		if(player1Coins.children.length === 3) {
			player1Coins.removeAll()
			player1Weapon.fire()
		}
    }

	game.physics.arcade.overlap(player1, player2Weapon.bullets, player1Dead, null)
    //game.world.wrap(player1, 16)
}

function player1Dead() {
	text.text = "Player 2 wins"
}

function updatePlayer2() {
	player2.body.angularVelocity = 0
    if(cursors.up.isDown) {
        game.physics.arcade.accelerationFromRotation(
			player2.rotation,
			300,
			player2.body.acceleration
		)
    }else {
        player2.body.acceleration.set(0)
    }

    if(cursors.left.isDown) {
        player2.body.angularVelocity = -300
    }else if(cursors.right.isDown) {
        player2.body.angularVelocity = 300
    }else{
        player2.body.angularVelocity = 0
    }

    if (player2FireButton.isDown) {
		if(player2Coins.children.length === 3) {
			player2Coins.removeAll()
			player2Weapon.fire()
		}
	}

	game.physics.arcade.overlap(player2, player1Weapon.bullets, player1Dead, null)
    //game.world.wrap(player2, 16)
}


function render() {

}