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
  /* Setter startposisjonen til spiller1 x og y til 0 */
  position: {
    x: 0,
    y: 0
  },
  /* Setter hastigheten til spiller1 x og y 0 */
  velocity: {
    x: 0,
    y: 0
  },
  /* Setter forskyvning på spilleren x og y til 0 */
  offset: {
    x: 0,
    y: 0
  },
  /* Setter bilden til spiller 1 til idle png
  Setter framesmax som er klassen til maksimalt antall rammer i en animasjonssyklus
  Setter bildeskalaen til 3.5
  Setter forskyvningen til spilleren x posisjonen til 100 og y posisjonen til 80 */
  imageSrc: './Spiller 1/Idle.png',
  framesMax: 10,
  scale: 3.5,
  offset: {
    x: 100,
    y: 80
  },
  /* Definerer et objekt med egenskapen sprites.
  Sprites inneholder masse forskjellige egenskaper som idle, run, jump, fall, attack1, takeHit og death
  Disse egenskapene inneholder et bilde og framesmax.
  Når idle blir tilkalt blir idle bilden vist på siden og framesmax blir settet til 10, det samme skjer med de andre
   */
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
  /* Denne attackboxen inneholder et objekt som offset med størrelsen og plasseringen av en angrepsboks hos figuren
  Setter offset x verdien til 100 og y verdien til 50
  Setter bredde til 160 og 50 for høyden */
  attackBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 160,
    height: 50
  }
})

/* Denne koden oppretter en ny instans av klassen Spiller som er lagd i klasser js filen,
og lagrer den i en variabel som er kalt for spiller2
Denne objektet inneholder egenskapen som posisjon, bildekilde, skala, framesmax og offset.
Offset er en egenskap som angir en forskyvning i x- og y-retning for spilleren.
Denne egenskapen brukes til å justere posisjonen til spilleren på canvas elementet. 
 */
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
  /* Definerer et objekt med egenskapen sprites.
  Sprites inneholder masse forskjellige egenskaper som idle, run, jump, fall, attack1, takeHit og death
  Disse egenskapene inneholder et bilde og framesmax. 
  Når idle blir tilkalt så viser den en annen idle bilden av spiller 2 og framesmax blir settet til 10 og det samme skjer med de andre */
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
  /* Denne attackboxen inneholder et objekt som offset med størrelsen og plasseringen av en angrepsboks hos figuren
  Setter offset x verdien til -170 og y verdien til 50
  Setter bredde til 170 og 50 for høyden */
  attackBox: {
    offset: {
      x: -170,
      y: 50
    },
    width: 170,
    height: 50
  }
})

/* Oppretter en konstant variabel som kalles for keys.
Variabelen er et objekt som inneholder fire forskjellige egenskaper som er a, d, ArrowRight, ArrowLeft
Hver av de er også et objekt som en egenskap som er pressed og er satt til false
Denne koden brukes til å spore om bestemte tastetrykk er aktive eller ikke. */
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

/* Kjører funksjonen decreaseTimer */
decreaseTimer()

/* Lager en funksjon som heter animer.*/
function animer() {

  /* Denne koden gjør til at funksjonen animer blir kalt igjen på neste animasjonsramme. */
  window.requestAnimationFrame(animer)

  /* Setter fargestilen til svart */
  c.fillStyle = 'black'

  /* Fyller den svarte fargen fra forrige koden på hele canvas elementet */
  c.fillRect(0, 0, canvas.width, canvas.height)

  /* Tilkaller updatefunksjonen på konstante variabelen background,
  og tegner bakgrunnen hver gang funksjonen animer blir tilkalt */
  background.update()

  /* Tilkaller updatefunksjonen på konstante variabelen shop,
   og tegner bakgrunnen hver gang funksjonen snimer blir tilkalt */
  shop.update()

  /* Denne koden fyller fargen hvit med gjennomsiktighet med 15%  */
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'

  /* Fyller den hvite fargen med 15% gjennomsiktighet fra forrige koden på hele canvas elementet */
  c.fillRect(0, 0, canvas.width, canvas.height)

  /* Tilkaller updatefunksjonen på konstante variabelen spiller 1 og spiller 2,
  og blir tegnet i canvas elementet hver gang funksjonen animer blir tilkalt */
  spiller1.update()
  spiller2.update()

  /* Setter spiller 1 og spiller 2 sin x hastighet til 0 */
  spiller1.velocity.x = 0
  spiller2.velocity.x = 0

  /* Hvis knappen a er trykket og siste knappen som spiller 1 trykket er a,
  så setter den spiller 1 sin hastighet til -5 og  */
  if (keys.a.pressed && spiller1.lastKey === 'a') {
    spiller1.velocity.x = -5

    /* Denne koden bytter fra idle bilden til løpe bilden */
    spiller1.switchSprite('run')
    /* Ellers hvis knappen d og spilleren sin siste knapp er d,
    så skal spiller sin hastighet settes til -5 og bytte til løpe bilden */
  } else if (keys.d.pressed && spiller1.lastKey === 'd') {
    spiller1.velocity.x = 5
    spiller1.switchSprite('run')

    /* Ellers settes idle bilden som aktiv hvis ikke noen av knappene trykkes. */
  } else {
    spiller1.switchSprite('idle')
  }

  /* Hvis y hastigheten til spiller 1 er mer enn 0 (som angir at spilleren ikke er i bakken) så skal den bytte hoppe bilden til spiller 1 som den aktive bilden */
  if (spiller1.velocity.y < 0) {
    spiller1.switchSprite('jump')
  } 
  /* Ellers hvis y hastigheten til spiller 1 mindre enn 0 (som angir at spilleren faller ned) så skal den bytte fra hoppe bilden til falle bilden */
  else if (spiller1.velocity.y > 0) {
    spiller1.switchSprite('fall')
  }

  /* Hvis knappen pil venstre er trykket og siste knappen som trykket er pil venstre,
  så skal den sette motstanderen sin x hastighet settes til -5 og skal bytte til løpe bilden til motstanderen */
  if (keys.ArrowLeft.pressed && spiller2.lastKey === 'ArrowLeft') {
    spiller2.velocity.x = -5
    spiller2.switchSprite('run')    
  } 
  /* Ellers hvis knappen pil høyre er trykket og siste knappen som er trykket er pil høyre,
  så skal motstanderen sin x hastighet settes til 5 og bytte til løpebilden til motstanderen */
  else if (keys.ArrowRight.pressed && spiller2.lastKey === 'ArrowRight') {
    spiller2.velocity.x = 5
    spiller2.switchSprite('run')
  } 
  /* Ellers skal settes idle bilden som aktiv hvis ikke noen av knappene trykkes. */
  else {
    spiller2.switchSprite('idle')
  }

  /* Hvis y hastigheten til motstanderen er mer enn 0 (som angir at motstanderen ikke er i bakken) så skal den bytte hoppe bilden til spiller 1 som den aktive bilden */ 
  if (spiller2.velocity.y < 0) {
    spiller2.switchSprite('jump')
  } 
  /* Ellers hvis y hastigheten til motstanderen mindre enn 0 (som angir at motstanderen faller ned) så skal den bytte fra hoppe bilden til falle bilden */
  else if (spiller2.velocity.y > 0) {
    spiller2.switchSprite('fall')
  }

  /* Denne koden sjekker om rektangelene mellom spiller 1 og motstanderen kolliderer
  Setter rektangel 1 som spiller 1 og rektangel 2 som motstander,
  den sjekker om spiller 1 angriper og at den sjekker om at spiller 1 viser den fjerde bilden 
  Spiller 2 blir slått og mister liv, og setter spiller 1 ikke angriper,
  Den blar gjennom hele html dokumentet og velger iden enemyhealth og endrer bredden til motstanderen sin helse  */
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
    document.querySelector("#enemyhealth").style.width = spiller2.health + "%";
  }

  /* Hvis spiller 1 angriper og spiller 1 viser den fjerde bilden så skal den sette at spiller angriper til false 
  Denne koden skjer i tillegg når spiller 1 ikke treffer*/
  if (spiller1.isAttacking && spiller1.framesCurrent === 4) {
    spiller1.isAttacking = false
  }

  /* Denne koden sjekker om rektangelene mellom motstanderen og spiller 1  kolliderer
  Setter rektangel 1 som motstander og rektangel 2 som spiller 1,
  den sjekker om spiller 2 angriper og at den sjekker om at spiller 2 viser den andre bilden 
  Spiller 1 blir slått og mister liv, og setter spiller 2 ikke angriper,
  Den blar gjennom hele html dokumentet og velger iden playerhealth og endrer bredden til motstanderen sin helse  */
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

    document.querySelector("#playerhealth").style.width = spiller1.health + "%";
  }

  /* Hvis motstanderen angriper og motstanderen viser den andre bilden så skal den sette at spiller angriper til false 
  Denne koden skjer i tillegg når spiller 2 ikke treffer*/
  if (spiller2.isAttacking && spiller2.framesCurrent === 2) {
    spiller2.isAttacking = false
  }

  /* Hvis motstanderen sin helse er 0 eller hvis helsen til spiller 1,
   så skal den kjøre funksjonen determinewinner som tar spiller1, spiller2, timerid som argumenter  */
  if (spiller2.health <= 0 || spiller1.health <= 0) {
    determineWinner({ spiller1, spiller2, timerId })
  }
}

/* Kjører funksjonen animer() */
animer()

/* Koden lytter etter taster som blir trykket på,
Den sjekker om spiller1 ikke er død (ved å sjekke om dead egenskapen er falsk),
Når knappen d trykkes på så setter den at knappen d ble trykket på til true og spiller 1 trykket sist på d
Når knappen a trykkes på så setter den at knappen a ble trykket på til true og spiller 1 trykket sist på a
Når knappen w trykkes på setter den y hastighen til spiller1 til -11.5
Når knappen mellomrom trykkes på så kalles attack funksjonen på spilleren
 */
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
/* Den sjekker om spiller2 ikke er død (ved å sjekke om dead egenskapen er falsk),
Når knappen pil høyre trykkes på så setter den at knappen pil høyre ble trykket på til true og spiller 1 trykket sist på pil høyre
Når knappen pil venstre trykkes på så setter den at knappen pil venstre ble trykket på til true og spiller 1 trykket sist på pil venstre
Når knappen pil opp trykkes på setter den y hastighen til spiller1 til -11.5
Når knappen pil ned trykkes på så kalles attack funksjonen på spilleren */
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
/* Koden lytter etter taster som blir sluppet
Når knappen d sluppes på så setter den at knappen d ble trykket på til false
Når knappen a sluppes på så setter den at knappen a ble trykket på til false
 */
window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }

/* Når knappen Pil høyre sluppes på så setter den at knappen d ble trykket på til false
Når knappen pil venstre sluppes på så setter den at knappen a ble trykket på til false */
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})
