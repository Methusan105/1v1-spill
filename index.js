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
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.lastKey
  }

  /* Klassen har to forskjellige måter som er draw() og update() for å fylle et rektangel på canvas med fargen grønn */
  draw() {
    c.fillStyle = "green";
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  /* Oppdaterer objektets posisjon basert på hastigheten til objektene, 
    den sjekker i tillegg om objekten har nådd bakken på canvas, 
    og når den treffer bakken setter hastigheten til 0 ellers legges til verdien av gravity i y-verdien av velocity */
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
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
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
};

/* Lager en variabel som heter lastKey
Lager en funksjon som heter animate, 
den ber nettleseren om å kjøre animate funksjonen ved neste anledning med koden: window.requestAnimationFrame(animate) 
Den fyller canvas elementet med fargen svart
oppdaterer den posisjonen til player og enemy og tegner dem begge med den oppdaterte posisjon
Kalles på animate() funksjonen for å starte animasjonsloopen 
Setter player sin x hastighet til 0
Hva a knappen ble trykket og siste knappen som ble trykket er a så skal player sin x hastighet være -1,
ellers hvis d knappen ble trykket og siste knappen som ble trykket er d så skal player sin x hastighet være 1*/

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
      player.velocity.y = -20
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight"
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      enemy.velocity.y = -20
      break;
  }
});

/* Oppretter en lytter som lytter på når jeg slipper tasten fra tastaturen, når jeg slipper d-tasten så endrer hastigheten til spilleren til 0,
når jeg slipper a-tasten så endrer hastigheten til spilleren til 0, betyr at når jeg slipper tasten så står spilleren i ro */
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
