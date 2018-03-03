function update() {
	ammunitionUpdate()
	player1.update(game)
	player2.update(game)

	player1.overlapEnemyBullet(game, player2.weapon.bullets)
	player2.overlapEnemyBullet(game, player1.weapon.bullets)
}

function ammunitionUpdate() {
	if(addAmmo) {
		createAmmo()
		setTimeout(function() {
			addAmmo = true
		}, reloadAmmoTime)
		addAmmo = false
	}

	
	player1.overlapAmmunition(game, ammunition)
	player2.overlapAmmunition(game, ammunition)
}


function render() {

}