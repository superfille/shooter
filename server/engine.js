
module.exports = {
    updateBall: function(delta, ball) {
		ball.x += ball.velocity.x * (delta / 1000)
		ball.y += ball.velocity.y * (delta / 1000)

        this.checkWorldBounds(ball)
	},

    //azimuth: angle, radius: speed
    setToPolar: function(entity) {
        entity.velocity.x = Math.cos(entity.radians) * 400
        entity.velocity.y = Math.sin(entity.radians) * 400
	},

	checkWorldBounds(entity) {
		var bounce = { x: 1, y: 1 }
        var pos = { x: entity.x, y: entity.y }
        var bounds = { x: 0, y: 0, right: 800, bottom: 800 }

        var bx = -bounce.x
        var by = -bounce.y
        var right = entity.x + 32
        var bottom = entity.y + 32
        if (entity.x < bounds.x) {
            entity.x = bounds.x
            entity.velocity.x *= bx
        }
        else if (right > bounds.right) {
            entity.x = bounds.right - 32
            entity.velocity.x *= bx
        }

        if (entity.y < bounds.y) {
            entity.y = bounds.y
            entity.velocity.y *= by
        }
        else if (bottom > bounds.bottom) {
            entity.y = bounds.bottom - 32;
            entity.velocity.y *= by
        }
    }
}