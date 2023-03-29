class Sprite {
  /* Lager en konstruktur som tar inn objekt med to egenskaper som: position og velocity */
  constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 } }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale
    this.framesMax = framesMax
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 5
    this.offset = offset
  }

  /* Klassen har to forskjellige måter som er draw() og update() for å fylle et rektangel på canvas med fargen grønn */
  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax ,
      this.image.height,
      this.position.x - this.offset.x, 
      this.position.y - this.offset.y, 
      (this.image.width / this.framesMax) * this.scale, 
      this.image.height * this.scale)
  }
  animateFrames(){
    this.framesElapsed++
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }
  /* Oppdaterer objektets posisjon basert på hastigheten til objektene, 
    den sjekker i tillegg om objekten har nådd bakken på canvas, 
    og når den treffer bakken setter hastigheten til 0 ellers legges til verdien av gravity i y-verdien av velocity */
  update() {
    this.draw();
    this.animateFrames();
  }
}
class Fighter extends Sprite{
  /* Lager en konstruktur som tar inn objekt med to egenskaper som: position og velocity */
  constructor({ position, velocity, color = "red", offset, imageSrc, scale = 1, framesMax = 1, }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset
    })
    
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

  /* Oppdaterer objektets posisjon basert på hastigheten til objektene, 
    den sjekker i tillegg om objekten har nådd bakken på canvas, 
    og når den treffer bakken setter hastigheten til 0 ellers legges til verdien av gravity i y-verdien av velocity */
  update() {
    this.draw();
    this.animateFrames()
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
