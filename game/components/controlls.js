function Controlls(controlls) {
	this.controlls = {}
	this.controlls.forward = Game.addKey(controlls.forward)
	this.controlls.left    = Game.addKey(controlls.left)
	this.controlls.right   = Game.addKey(controlls.right)
	this.controlls.fire    = Game.addKey(controlls.fire)
	
	this.getAngularVelocity = function(angularVelocity) {
		
		if (this.controlls.left.isDown){
			return -angularVelocity
		} else if (this.controlls.right.isDown){
			return angularVelocity
		}
	
		return 0
	}
	
	this.fire = function() {
		return this.controlls.fire.isDown
	}
}

function RemoteControlls() {
	this.getAngularVelocity = function(angularVelocity) {
		
		if (this.controlls.left.isDown){
			return -angularVelocity
		} else if (this.controlls.right.isDown){
			return angularVelocity
		}
	
		return 0
	}
	
	this.fire = function() {
		return this.controlls.fire.isDown
	}
}
