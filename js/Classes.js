class Sprite {
  /* Lager en konstruktur som tar inn objekt med to egenskaper som: position og velocity */
  constructor({ position, imageSrc }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image()
    this.image.src = imageSrc
  }

  /* Klassen har to forskjellige måter som er draw() og update() for å fylle et rektangel på canvas med fargen grønn */
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }

  /* Oppdaterer objektets posisjon basert på hastigheten til objektene, 
    den sjekker i tillegg om objekten har nådd bakken på canvas, 
    og når den treffer bakken setter hastigheten til 0 ellers legges til verdien av gravity i y-verdien av velocity */
  update() {
    this.draw();
  }
}
class Fighter {
  /* Lager en konstruktur som tar inn objekt med to egenskaper som: position og velocity */
  constructor({ position, velocity, color = "red", offset }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100;
  }

  /* Klassen har to forskjellige måter som er draw() og update() for å fylle et rektangel på canvas med fargen grønn */
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    /* Angrip boks */
    if (this.isAttacking) {
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
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 50) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }
  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
