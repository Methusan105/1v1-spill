/* Blar gjennom hele HTML dokumentet og prøver å finne etter en element som heter canvas */
const canvas = document.querySelector("canvas");

/* Gir tilgang til verktøyene som jeg trenger til tegne i to dimensjoner*/
const c = canvas.getContext("2d");

/* Setter canvas sin lengde og bredde med bredden på skjermen og lengden på skjermen */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* Denne koden tegner en firkant, x og y verdien er satt til 0, mens bredden og høyden er satt til canvas.width og height */
c.fillRect(0, 0, canvas.width, canvas.height);

/* Lager en konstant med navnet gravity og setter den på 0.7 */
const gravity = 0.7;

/* Lager en klasse som heter Sprite */
class Sprite {
  /* Lager en konstruktur som tar inn objekt med to egenskaper som: position og velocity */
  constructor({ position, velocity, color = "red", offset }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x:this.position.x,
        y:this.position.y
      },
      offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking
    this.health = 100
  }

  /* Klassen har to forskjellige måter som er draw() og update() for å fylle et rektangel på canvas med fargen grønn */
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    /* Angrip boks */
    if(this.isAttacking){
    c.fillStyle = "green";
    c.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    );
    }
  }

  /* Oppdaterer objektets posisjon basert på hastigheten til objektene, 
    den sjekker i tillegg om objekten har nådd bakken på canvas, 
    og når den treffer bakken setter hastigheten til 0 ellers legges til verdien av gravity i y-verdien av velocity */
  update() {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }
  attack(){
    this.isAttacking = true
    setTimeout(() => {
      this.isAttacking = false

    }, 100)
  }
}

/* Lager en variabel som heter player, 
variablen player lager en ny instans av Sprite og definerer posisjonen til den nye Spriten til 0,0 og velocityen til 0,0 */
const player = new Sprite({
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
    y: 0
  }
});

/* Lager en variabelen som heter Enemy,
variablen enemy lager en ny instans av Sprite og definerer posisjonen til den nye Spriten til 400, 100 og velocity til 0,0 */
const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: -50,
    y: 0 
  },
  color: "blue",
});

/* Lager funksjonen keys */
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
  ArrowUp:{
    pressed: false
  },
};

/* 
Lager en funksjon som heter animate

Den ber nettleseren om å kjøre animate funksjonen ved neste anledning med koden: window.requestAnimationFrame(animate)

Den fyller canvas elementet med fargen svart

Oppdaterer posisjonen til player og enemy og tegner dem begge med den oppdaterte posisjon

Setter player sin x hastighet til 0

Hvis påstanden at a knappen ble trykket og siste knappen som ble trykket er a så skal player sin x hastighet settes på -5

Ellers hvis påstanden d knappen ble trykket og siste knappen som ble trykket er d så skal player sin x hastighet settes på 5

Setter enemy sin x hastighet til 0

Hvis påstanden at ArrowLeft knappen ble trykket og siste knappen som ble trykket er ArrowLeft så skal enemy sin x hastighet settes på -5

Ellers hvis påstanden ArrowRight knappen ble trykket og siste knappen som ble trykket er ArrowRight så skal enemy sin x hastighet settes på 5

Kalles på animate() funksjonen for å starte animasjonsloopen */

function rectangularCollision({rectangle1, rectangle2}){
  return(rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
    rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
  /* Player sine bevegelser */
  player.velocity.x = 0;
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
  }

  /* Motstander sine bevegelser */
  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
  }

  /* Oppdage kollisjon */
  if (
     rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
     }) && player.isAttacking
  ) {
    player.isAttacking = false
    enemy.health -= 20
    document.getElementById("enemyHealth").style.width = enemy.health + "%"
  }
  if (
     rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
     }) && enemy.isAttacking
  ) {
    enemy.isAttacking = false
    player.health -= 20;
    document.getElementById("playerHealth").style.width = player.health + "%";
  }
}
animate();

/* Oppretter en lytter som lytter på når spilleren trykker en tast på tastaturen 

Når spilleren trykker på d-tasten så setter den til at knappen d ble trykket som true og setter i tillegg at player sist trykket på knappen d

Når spilleren trykker på a-tasten så setter den til at knappen a ble trykket som true og setter i tillegg at player sist trykket på knappen a 

Når spilleren trykker på w-tasten så endrer hastigheten i y-verdien til -20, slik at spilleren hopper når han trykker på w-tasten

Når motstanderen trykker på ArrowRight-tasten så setter den til at knappen ArrowRight ble trykket som true og setter i tillegg at motstanderen sist trykket på knappen ArrowRight

Når motstanderen trykker på ArrowLeft-tasten så setter den til at knappen ArrowLeft ble trykket som true og setter i tillegg at motstanderen sist trykket på knappen d

Når motstanderen trykker på ArrowUp-tasten så endrer hastigheten i y-verdien til -20, slik at motstanderen hopper når han trykker på w-tasten*/
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
      player.velocity.y = -20;
      break;
    case " ":
      player.attack()
      break
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      enemy.velocity.y = -20;
      break;
    case "ArrowDown":
      enemy.isAttacking = true
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
