var game = new Phaser.Game(736, 736, Phaser.AUTO, '')
const width = 736
const height = 736
const reloadAmmoTime = 2500

let player1 = {}
let player2 = {}
let ammunition = {}
let text = {}
let addAmmo = true

let map
let groundLayer

let music

game.state.add('boot', bootState)
game.state.add('load', loadState)
game.state.add('menu', menuState)
game.state.add('play', playState)
game.state.add('win', winState)

game.state.start('boot')
