/* Blar gjennom hele HTML dokumentet og prøver å finne etter en element som heter canvas */
const canvas = document.querySelector("canvas");

/* Gir tilgang til verktøyene som jeg trenger til tegne i to dimensjoner*/
const c = canvas.getContext("2d");

/* Setter canvas sin lengde og bredde med bredden på skjermen og lengden på skjermen */
canvas.width = 1024;
canvas.height = 576;

/* Denne koden tegner en firkant, x og y verdien er satt til 0, mens bredden og høyden er satt til canvas.width og height */
c.fillRect(0, 0, canvas.width, canvas.height);

/* Lager en konstant med navnet gravity og setter den på 0.7 */
const gravity = 0.3;

/* Lager en klasse som heter Sprite */

const background = new Tegner({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: "./Tiny Forest Pack/paralax/forest_paralax.jpg"
})
const shop = new Tegner({
  position: {
    x: 600,
    y: 175
  },
  imageSrc: "./Tiny Forest Pack/shop.png",
  scale: 2.75,
  framesMax: 6,
})
/* Lager en variabel som heter player, 
variablen player lager en ny instans av Sprite og definerer posisjonen til den nye Spriten til 0,0 og velocityen til 0,0 */
const player = new Kamp({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "./Spiller 1/Idle.png",
  framesMax: 10,
  scale: 4,
  offset: {
    x: 200,
    y: 170
  },
  sprites:{
    idle:{
      imageSrc: "./Spiller 1/Idle.png",
      framesMax: 10
    },
    run:{
      imageSrc: "./Spiller 1/Run.png",
      framesMax: 8
    },
    jump:{
      imageSrc: "./Spiller 1/Going Up.png",
      framesMax: 3
    },
    fall:{
      imageSrc: "./Spiller 1/Going Down.png",
      framesMax: 3
    },
    attack1:{
      imageSrc: "./Spiller 1/Attack1.png",
      framesMax: 7
    }
  },
  attackBox: {
    offset:{
      x: 0,
      y: 0
    },
    width: 100,
    height: 50
  }
});

/* Lager en variabelen som heter Enemy,
variablen enemy lager en ny instans av Sprite og definerer posisjonen til den nye Spriten til 400, 100 og velocity til 0,0 */
const enemy = new Kamp({
  position: {
    x: 450,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "blue",
  offset: {
    x: -50,
    y: 0,
  },
  imageSrc: "./Spiller 2/Idle.png",
  framesMax: 4,
  scale: 4,
  offset: {
    x: 200,
    y: 350
  },
  sprites:{
    idle:{
      imageSrc: "./Spiller 2/Idle.png",
      framesMax: 4
    },
    run:{
      imageSrc: "./Spiller 2/Run.png",
      framesMax: 8
    },
    jump:{
      imageSrc: "./Spiller 2/Jump.png",
      framesMax: 2
    },
    fall:{
      imageSrc: "./Spiller 2/Fall.png",
      framesMax: 2
    },
    attack1:{
      imageSrc: "./Spiller 2/Attack1.png",
      framesMax: 4
    }
  },
  attackBox: {
    offset:{
      x: 0,
      y: 0
    },
    width: 100,
    height: 50
  }
});

/* Lager funksjonen keys 
Lager*/
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
};

decreaseTimer();

/* 
Lager en funksjon som heter animate

Den ber nettleseren om å kjøre animate funksjonen

Den fyller canvas elementet med fargen svart

Oppdaterer posisjonen til player og enemy og tegner dem begge med den oppdaterte posisjon

Setter player sin x hastighet til 0

Hvis påstanden at a knappen ble trykket og siste knappen som ble trykket er a så skal player sin x hastighet settes på -5

Ellers hvis påstanden d knappen ble trykket og siste knappen som ble trykket er d så skal player sin x hastighet settes på 5

Setter enemy sin x hastighet til 0

Hvis påstanden at ArrowLeft knappen ble trykket og siste knappen som ble trykket er ArrowLeft så skal enemy sin x hastighet settes på -5

Ellers hvis påstanden ArrowRight knappen ble trykket og siste knappen som ble trykket er ArrowRight så skal enemy sin x hastighet settes på 5

Kalles på animate() funksjonen for å starte animasjonsloopen */
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update()
  player.update();
  enemy.update();

  /* Setter player sin hastighet til 0

  Hvis nøkkelen a er presset og hvis sisteknappen som presset er a så skal den sette player sin hastighet til -5 

  ellers hvis nøkkelen d er presset og hvis sisteknappen som presset er d så skal den sette player sin hastighet til 5*/
  player.velocity.x = 0;
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -3;
    player.switchSprite("run")
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 3;
    player.switchSprite("run")
  } else {
    player.switchSprite("idle")
  }
  if (player.velocity.y < 0){
    player.switchSprite("jump")
  } else if (player.velocity.y > 0){
    player.switchSprite("fall")
  }

  /* Setter motstanderen sin hastighet til 0

  Hvis pil venstre knappen er trykket og motstanderens sin siste knapp som ble trykket er pil venstre

  så skal den sette motstanderen sin hastighet til -5

  ellers hvis pil høyre er trykket og motstanderens sin siste knapp som ble trykket er pil høyre 

  så skal den sette motstanderen sin hastighet til 5 */
  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -3;
    enemy.switchSprite("run")
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 3;
    enemy.switchSprite("run")
  } else {
    enemy.switchSprite("idle")
  } if (enemy.velocity.y < 0){
    enemy.switchSprite("jump")
  } else if (enemy.velocity.y > 0){
    enemy.switchSprite("fall")
  }

  /* Koden for at spilleren og motstanderen skal slå hverandre */
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= 20;
    document.getElementById("enemyHealth").style.width = enemy.health + "%";
  }
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 20;
    document.getElementById("playerHealth").style.width = player.health + "%";
  }
  if (enemy.health <= 0 || player.health <= 0) {
    bestemmerWinner({ player, enemy, timerId });
  }
}
animate();

/* Oppretter en lytter som lytter på når spilleren trykker en tast på tastaturen 

Når spilleren trykker på d-tasten så setter den til at knappen d ble trykket som true og setter i tillegg at player sist trykket på knappen d

Når spilleren trykker på a-tasten så setter den til at knappen a ble trykket som true og setter i tillegg at player sist trykket på knappen a 

Når spilleren trykker på w-tasten så endrer hastigheten i y-verdien til -20, slik at spilleren hopper når han trykker på w-tasten

Når motstanderen trykker på ArrowRight-tasten så setter den til at knappen ArrowRight ble trykket som true og setter i tillegg at motstanderen sist trykket på knappen ArrowRight

Når motstanderen trykker på ArrowLeft-tasten så setter den til at knappen ArrowLeft ble trykket som true og setter i tillegg at motstanderen sist trykket på knappen d

Når motstanderen trykker på ArrowUp-tasten så endrer hastigheten i y-verdien til -20, slik at motstanderen hopper når han trykker på w-tasten

Når motstanderen trykker på ArrowDown-tasten så setter den at motstanderen angriper til sann */
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    case "w":
      keys.w.pressed = true;
      player.lastKey = "w"
      player.velocity.y = -12;
      break;
    case " ":
      player.attack();
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      enemy.velocity.y = -12;
      break;
    case "ArrowDown":
      enemy.attack()
      break;
  }
});

/* Oppretter en lytter som lytter på når jeg slipper tasten fra tastaturen 

Når jeg slipper d-tasten så setter den knappen d presset til false

Når jeg slipper a-tasten så setter den knappen a presset til false

Når jeg slipper w-tasten så setter den knappen d presset til false

Når jeg slipper ArrowRight-tasten så setter den knappen ArrowRight presset til false

Når jeg slipper ArrowLeft-tasten så setter den knappen ArrowLeft presset til false

Når jeg slipper ArrowUp-tasten så setter den knappen ArrowUp presset til false*/

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
  }

  /* Motstanders knapper */
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
  }
});
