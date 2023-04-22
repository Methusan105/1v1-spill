/* Blar gjennom hele HTML-dokumenter og finner elementet canvas og velger */
const canvas = document.querySelector('canvas')
/* Koden som henter 2d tegningskontekst fra html canvas elementet */

const c = canvas.getContext('2d')
/* Setter canvas sin lengde og bredde til 1024 og 576 */

canvas.width = 1024
canvas.height = 576

/* Koden som bruker fillrect metoden som bruker til å tegne en rektangel i canvas elementet. 
Denne metoden tar inn 4 forskjellige argumenter som er: x, y, bredde og høyde.
x og y er satt til 0 og bredden er satt til canvas sin lenge og bredde.*/

c.fillRect(0, 0, canvas.width, canvas.height)

/* Setter graviteten til 0.3 */
const gravity = 0.3

/* Denne koden oppretter en ny instans av klassen bakgrunn som er lagd i klasser js filen,
og lagrer den i en variabel som er kalt for background.
Koden nedenfor inneholder et argument til bakgrunn konstruktøren. 
Denne objektet inneholder egenskapen som posisjon og bildekilde.
 */
const background = new Bakgrunn({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './Tiny Forest Pack/paralax/forest_paralax.jpg'
})

/* Denne koden oppretter en ny instans av klassen bakgrunn som er lagd i klasser js filen,
og lagrer den i en variabel som er kalt for shop.
Koden nedenfor inneholder et argument til bakgrunn konstruktøren. 
Denne objektet inneholder egenskapen som posisjon, bildekilde, skala, og framesmax.
Framesmax er klassen som angir maksimalt antall rammer i en animasjonssyklus. */
const shop = new Bakgrunn({
  position: {
    x: 655,
    y: 128
  },
  imageSrc: './Tiny Forest Pack/shop.png',
  scale: 3.15,
  framesMax: 6
})

/* Denne koden oppretter en ny instans av klassen Spiller som er lagd i klasser js filen,
og lagrer den i en variabel som er kalt for spiller1
Denne objektet inneholder egenskapen som posisjon, bildekilde, skala, framesmax og offset.
Offset er en egenskap som angir en forskyvning i x- og y-retning for spilleren.
Denne egenskapen brukes til å justere posisjonen til spilleren på canvas elementet. */
const spiller1 = new Spiller({
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
  },
  imageSrc: './Spiller 1/Idle.png',
  framesMax: 10,
  scale: 3.5,
  offset: {
    x: 100,
    y: 80
  },
  sprites: {
    idle: {
      imageSrc: './Spiller 1/Idle.png',
      framesMax: 10
    },
    run: {
      imageSrc: './Spiller 1/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './Spiller 1/Going Up.png',
      framesMax: 3
    },
    fall: {
      imageSrc: './Spiller 1/Going Down.png',
      framesMax: 3
    },
    attack1: {
      imageSrc: './Spiller 1/Attack1.png',
      framesMax: 7
    },
    takeHit: {
      imageSrc: './Spiller 1/Take Hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './Spiller 1/Death.png',
      framesMax: 11
    }
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 160,
    height: 50
  }
})

const spiller2 = new Spiller({
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
  },
  imageSrc: './Spiller 2/Idle.png',
  framesMax: 4,
  scale: 3.5,
  offset: {
    x: 215,
    y: 250
  },
  sprites: {
    idle: {
      imageSrc: './Spiller 2/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './Spiller 2/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './Spiller 2/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './Spiller 2/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './Spiller 2/Attack1.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './Spiller 2/Take hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './Spiller 2/Death.png',
      framesMax: 7
    }
  },
  attackBox: {
    offset: {
      x: -170,
      y: 50
    },
    width: 170,
    height: 50
  }
})

console.log(spiller1)

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

decreaseTimer()

function animer() {
  window.requestAnimationFrame(animer)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  shop.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  spiller1.update()
  spiller2.update()

  spiller1.velocity.x = 0
  spiller2.velocity.x = 0

  // spiller1 movement

  if (keys.a.pressed && spiller1.lastKey === 'a') {
    spiller1.velocity.x = -5
    spiller1.switchSprite('run')
  } else if (keys.d.pressed && spiller1.lastKey === 'd') {
    spiller1.velocity.x = 5
    spiller1.switchSprite('run')
  } else {
    spiller1.switchSprite('idle')
  }

  // jumping
  if (spiller1.velocity.y < 0) {
    spiller1.switchSprite('jump')
  } else if (spiller1.velocity.y > 0) {
    spiller1.switchSprite('fall')
  }

  // Enemy movement
  if (keys.ArrowLeft.pressed && spiller2.lastKey === 'ArrowLeft') {
    spiller2.velocity.x = -5
    spiller2.switchSprite('run')
  } else if (keys.ArrowRight.pressed && spiller2.lastKey === 'ArrowRight') {
    spiller2.velocity.x = 5
    spiller2.switchSprite('run')
  } else {
    spiller2.switchSprite('idle')
  }

  // jumping
  if (spiller2.velocity.y < 0) {
    spiller2.switchSprite('jump')
  } else if (spiller2.velocity.y > 0) {
    spiller2.switchSprite('fall')
  }

  // detect for collision & spiller2 gets hit
  if (
    rectangularCollision({
      rectangle1: spiller1,
      rectangle2: spiller2
    }) &&
    spiller1.isAttacking &&
    spiller1.framesCurrent === 4
  ) {
    spiller2.takeHit()
    spiller1.isAttacking = false

    gsap.to('#enemyHealth', {
      width: spiller2.health + '%'
    })
  }

  // if spiller1 misses
  if (spiller1.isAttacking && spiller1.framesCurrent === 4) {
    spiller1.isAttacking = false
  }

  // this is where our spiller1 gets hit
  if (
    rectangularCollision({
      rectangle1: spiller2,
      rectangle2: spiller1
    }) &&
    spiller2.isAttacking &&
    spiller2.framesCurrent === 2
  ) {
    spiller1.takeHit()
    spiller2.isAttacking = false

    gsap.to('#playerHealth', {
      width: spiller1.health + '%'
    })
  }

  // if spiller1 misses
  if (spiller2.isAttacking && spiller2.framesCurrent === 2) {
    spiller2.isAttacking = false
  }

  // end game based on health
  if (spiller2.health <= 0 || spiller1.health <= 0) {
    determineWinner({ spiller1, spiller2, timerId })
  }
}

animer()

window.addEventListener('keydown', (event) => {
  if (!spiller1.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        spiller1.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        spiller1.lastKey = 'a'
        break
      case 'w':
        spiller1.velocity.y = -11.5
        break
      case ' ':
        spiller1.attack()
        break
    }
  }

  if (!spiller2.dead) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        spiller2.lastKey = 'ArrowRight'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        spiller2.lastKey = 'ArrowLeft'
        break
      case 'ArrowUp':
        spiller2.velocity.y = -11.5
        break
      case 'ArrowDown':
        spiller2.attack()
        break
    }
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }

  // spiller2 keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})
