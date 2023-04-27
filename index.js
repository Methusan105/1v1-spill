/* Blar gjennom hele HTML-dokumenter og finner elementet canvas og velger */
const canvas = document.querySelector("canvas");

/* Koden som henter 2d tegningskontekst fra html canvas elementet */
const c = canvas.getContext("2d");
/* Setter canvas sin lengde og bredde til 1024 og 576 */

canvas.width = 800;
canvas.height = 576;
/* Koden som bruker fillrect metoden som bruker til å tegne en rektangel i canvas elementet. 
Denne metoden tar inn 4 forskjellige argumenter som er: x, y, bredde og høyde.
x og y er satt til 0 og bredden er satt til canvas sin lenge og bredde.*/

c.fillRect(0, 0, canvas.width, canvas.height);

/* Denne koden oppretter en ny instans av klassen bakgrunn som er lagd i klasser js filen,
og lagrer den i en variabel som er kalt for background.
Koden nedenfor inneholder et argument til bakgrunn konstruktøren. 
Denne objektet inneholder egenskapen som posisjon og bildekilde.
 */
const background = new Bakgrunn({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./Tiny Forest Pack/paralax/forest_paralax.jpg",
});

/* Denne koden oppretter en ny instans av klassen bakgrunn som er lagd i klasser js filen,
og lagrer den i en variabel som er kalt for shop.
Koden nedenfor inneholder et argument til bakgrunn konstruktøren. 
Denne objektet inneholder egenskapen som posisjon, bildekilde, skala, og framesmax.
Framesmax er klassen som angir maksimalt antall rammer i en animasjonssyklus. */
const shop = new Bakgrunn({
  position: {
    x: 1100,
    y: 128,
  },
  imageSrc: "./Tiny Forest Pack/shop.png",
  scale: 3.15,
  framesMax: 6,
});


function tegn(){
  /* Denne koden gjør til at funksjonen animer blir kalt igjen på neste animasjonsramme. */
  window.requestAnimationFrame(tegn);

  /* Setter fargestilen til svart */
  c.fillStyle = "black";

  /* Fyller den svarte fargen fra forrige koden på hele canvas elementet */
  c.fillRect(0, 0, canvas.width, canvas.height);

  /* Tilkaller updatefunksjonen på konstante variabelen background,
  og tegner bakgrunnen hver gang funksjonen animer blir tilkalt */
  background.update();

  /* Tilkaller updatefunksjonen på konstante variabelen shop,
   og tegner bakgrunnen hver gang funksjonen snimer blir tilkalt */
  shop.update();

  /* Denne koden fyller fargen hvit med gjennomsiktighet med 15%  */
  c.fillStyle = "rgba(255, 255, 255, 0.15)";

  /* Fyller den hvite fargen med 15% gjennomsiktighet fra forrige koden på hele canvas elementet */
  c.fillRect(0, 0, canvas.width, canvas.height);

}
tegn()

function Start(){
    window.location.href = "Fight.html"
}

function End(){
    window.location.href = "https://google.com/";
}