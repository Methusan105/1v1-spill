/* Lager en funksjon som heter rectangularCollision og har rectangle1, rectangle2 som parameter
 */
function rectangularCollision({ rectangle1, rectangle2 }) {
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
/* Lager en funksjon som heter bestemmerWinner og har player, enemy, timerId som parameter 

Den sletter vekk timeouten timerId

Etter 3 sekunder så refresher den nettsiden for å få spillet på nytt til å starte automatisk

Den søker gjennom hele html dokumentet og finner en Id som heter displayText og legger til display element til flex i css

Hvis Player sin helse er lik motstanderen sin helse så søker den gjennom hele html dokumenter og finner displayText og skriver i den Tie som betyr uavgjort

Ellers hvis Playeren sin helse er mer enn motstanderen sin helse så vil den skrive i HTML dokumentet at Player 1 vant

Ellers hvis Motstanderen sin helse er mer enn playeren sin helse så vil den skrive i HTML dokumentet at Player 2 som vant som er nemlig motstanderen */
function bestemmerWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  document.getElementById("displayText").style.display = "flex";
  if (player.health === enemy.health) {
    document.getElementById("displayText").innerHTML = "Tie";
  } else if (player.health > enemy.health) {
    document.getElementById("displayText").innerHTML = "Player 1 Wins";
  } else if (player.health < enemy.health) {
    document.getElementById("displayText").innerHTML = "Player 2 Wins";
  }
}
/* Lager en variabel som heter timer og gir det tallet 60

Lager en variabel som heter timerId men gir ingen verdi til den

Lager en funksjon som heter decreaseTimer

Setter opp en timer og kaller til decreaseTimer hver sekund

Hvis timer er mer enn 0 så skal den subtrahere med -1 

Etterpå søker den gjennom hele HTML dokumentet etter id-en timer og skriver inn i HTML-filen den nye timer variablen

Hvis timer er 0 så kjører den funksjonen bestemmerWinner og viser hvem som vant */
let timer = 60;
let timerId;
function decreaseTimer() {
  timerId = setTimeout(decreaseTimer, 1000);
  if (timer > 0) {
    timer--;
    document.getElementById("timer").innerHTML = timer;
  }
  if (timer === 0) {
    bestemmerWinner({ player, enemy, timerId });
  }
}