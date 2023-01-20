// Init-test: console.log('hello world!')
// Setting-up game window
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.35

// Creating a main-class for players
class Sprite {
    constructor({position, velocity, color = 'red', offset}) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
                },
            offset,
            width: 100,
            height: 50,
        }
        this.color = color
        this.isAttacking
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // attack box
        // if (this.isAttacking) {
            this.isAttacking
            c.fillStyle = 'green'
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        // }
    }
    // Update function runs in animate func(): consists of Dynamic changes over sprites 
    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }
    // attk method
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100);
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0 
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    }
})

// player.draw()

const enemy = new Sprite({
    position: {
        x: 400,
        y: 100 
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    }
})

// enemy.draw()

// console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

// rectangualr collision
function rectangualrCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && 
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}

// Animate and clear unwanted graphics in canvas
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    // console.log('go')
    player.update()
    enemy.update()
    // Checking key press
    player.velocity.x = 0 // movement speed
    enemy.velocity.x = 0 // movement speed

    // player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }
    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }

    // detect for collision
    if (
        rectangualrCollision({ rectangle1: player, rectangle2: enemy }) && player.isAttacking) {
        player.isAttacking = false
         console.log('PlayerATK') 
        }
    if (
        rectangualrCollision({ rectangle1: enemy, rectangle2: player }) && enemy.isAttacking) {
        enemy.isAttacking = false
         console.log('EnemyATK') 
        }
}

animate()

// Adding event actions for sprite ctrl
window.addEventListener('keydown', (event) => { 
    // console.log(event.key)
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            //player.velocity.x = 5
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            //player.velocity.x = -5
            break
        case 'w':
            // keys.w.pressed = true
            player.velocity.y = -10
            break
        case ' ':
            player.attack()
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            //player.velocity.x = 5
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            //player.velocity.x = -5
            break
        case 'ArrowUp':
            // keys.w.pressed = true
            enemy.velocity.y = -10
            break
        case 'ArrowDown':
            // keys.w.pressed = true
            enemy.isAttacking = true
            break
    }
    // console.log(event.key) 
})
window.addEventListener('keyup', (event) => { 
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            // player.velocity.x = 0
            break
        case 'a':
            keys.a.pressed = false
            // player.velocity.x = 0
            break
        case 'w':
            keys.w.pressed = false
            // player.velocity.x = 0
            break
    }
    // enemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            // player.velocity.x = 0
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            // player.velocity.x = 0
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            // player.velocity.x = 0
            break
    }
    console.log(event.key) 
})














// _____________________________//
// Attacks 1:10.30 timestamp