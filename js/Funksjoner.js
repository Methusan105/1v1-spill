/* Lager en funksjon som heter rektangelkollisjon og tar inn rectangle1 og rectangle2 som objekter
 Denne funksjonen sjekker om begge disse rektangelene kolliderer eller overlapper hverandre
 Den returnerer med true eller false om rektangelene kolliderer eller overlapper hverandre
 Den sjekker om høyre kanten av rekangel 1 treffer venstre kanten av rektangel 2
 Den sjekker om venstre kanten av rektangel 1 treffer høyre kanten av rektangel 2*/
function rektangelkollisjon({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}
/* Lager en funksjon som heter determinewinner som tar inn spiller1, spiller2, timerid som objekter
Den sletter tiden av variabelen timerid
Den setter vinner til true
Den blar gjennom hele dokumentet og leter etter iden displaytext og endrer egenskapene til elementets style objekt for å endre hvordan siden vises, den endrer display egenskapen til flex
Hvis spiller1 sin helse og spiller2 sin helse er lik så,
blar den gjennom hele html dokumentet og leter etter iden displaytext og skriver inn i den "uavgjort"
Ellers hvis spiller1 sin helse er mer enn spiller2 sin helse så,
blar den gjennom hele html dokumentet og leter etter iden displaytext og skriver inn i den "Spiller 1 vant"
Ellers hvis spiller 2 sin helse er mer enn spiller1 sin helse så,
blar den gjennom hele html dokumentet og letern etter iden displaytext og skriver inn i den "Spiller 2 vant"*/
function determineWinner({ spiller1, spiller2, timerId }) {
  clearTimeout(timerId);
  vinner = true;
  document.querySelector("#displayText").style.display = "flex";
  if (spiller1.health === spiller2.health) {
    document.querySelector("#displayText").innerHTML = "Uavgjort";
  } else if (spiller1.health > spiller2.health) {
    document.querySelector("#displayText").innerHTML = "Spiller 1 vant";
  } else if (spiller1.health < spiller2.health) {
    document.querySelector("#displayText").innerHTML = "Spiller 2 vant";
  }
}
/* lager variablen vinner og setter den til falsk,
lager variablen timer og setter den på nummeret 60,
lager variabelen timerId*/
let vinner = false;
let timer = 60;
let timerId;

/* Lager en funksjon som heter decreaseTimer
Hvis timer er mer enn 0,
så setter den timerId som slik at den tilkaller decreasetimer funksjonen hver eneste sekund,
variabelen timer subraheres med 1
den blar gjennom hele html dokumentet og velger iden timer og skriver i den nye variabelen timer
hvis timer er 0,
så skal den starte funksjonen determinewinner med spiller1, spiller2, timerid som objekter
også skal den tilkalle funksjonen restartgame()*/
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }
  if (timer === 0) {
    determineWinner({ spiller1, spiller2, timerId });
    restartGame();
  }
}

/* Lager en funksjon som heter restart game
Hvis vinner er true så setter den en timer på 5 sekunder,
etter 5 sekunder har gått så vil den kjøre funksjonen window.location.href = "index.html" (som gjør til at den starter spillet på nytt) */
function restartGame() {
  if (vinner) {
    setTimeout(function () {
      window.location.href = "index.html"
    }, 5000);
  }
}
