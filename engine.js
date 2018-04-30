class Body {
	constructor(x, y, shape) {
		this.x = x
		this.y = y
		this.shape = shape
	}
}

class Shape {
	constructor() {

	}

	overlaps(shape2) {
		
	}
}

class Rectangle extends Shape {
	constructor(width, height) {
		this.width = width
		this.height = height
	}
}

class Circle extends Shape {
	constructor(radius) {
		this.radius = radious
	}
}