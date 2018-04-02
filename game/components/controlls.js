function Controlls(controlls) {
	this.controlls = {}
	this.controlls.left    = Game.addKey(controlls.left)
	this.controlls.right   = Game.addKey(controlls.right)
	this.controlls.fire    = Game.addKey(controlls.fire)
	
	this.getKeyDown = function() {
		if (this.controlls.left.isDown) {
			return Phaser.KeyCode.LEFT
		}

		if (this.controlls.right.isDown) {
			return Phaser.KeyCode.RIGHT
		}
		
		if (this.controlls.fire.isDown) {
			return Phaser.KeyCode.SPACEBAR
		}

		return null
	}
}
