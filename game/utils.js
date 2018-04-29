Utils = {}

Utils.getRandomInt = function(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}

Utils.objectIsEmpty = function (obj) {
	return Object.keys(obj).length === 0 && obj.constructor === Object
}

Utils.types = {
	player: 1,
	bullet: 2,
	carrot: 3
}