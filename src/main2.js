const boardCanvas = document.querySelector("#gameBoard");
const context = boardCanvas.getContext("2d");

class Hole {
  constructor(positionX, positionY, size, color) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.size = size;
    this.color = color;
  }

  getCoordinates() {
    return {
      positionX: this.positionX,
      positionY: this.positionY,
      size: this.size,
      color: this.color,
    };
  }

  //TODO: method that draw Hole on canvas
  draw() {
    context.beginPath();
    context.arc(this.positionX, this.positionY, this.size, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
  }
}

class Ball {
  constructor(positionX, positionY, size, color) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.size = size;
    this.color = color;
  }

  getCoordinates() {
    return {
      positionX: this.positionX,
      positionY: this.positionY,
      size: this.size,
      color: this.color,
    };
  }

  setCoordinates(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
  }

  //TODO: method that draw Ball on canvas
  draw() {
    context.beginPath();
    context.arc(this.positionX, this.positionY, this.size, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
  }
}

class MobileOrientation {
  constructor(alpha, beta) {
    this.alpha = alpha;
    this.beta = beta;
  }
  setOrientation(alpha, beta) {
    this.alpha = alpha;
    this.beta = beta - 90;
  }
  getOrientation() {
    return {
      alpha: this.alpha,
      beta: this.beta,
    };
  }
}

const mobileOrientation = new MobileOrientation(0, 0);

const hole1 = new Hole(350, 510, 30, "#ffffff");
const hole2 = new Hole(85, 705, 25, "#ffffff");
const hole3 = new Hole(132, 270, 22, "#ffffff");
const hole4 = new Hole(420, 100, 40, "#ffffff");
const ball = new Ball(
  window.innerWidth / 2,
  window.innerHeight / 1.1,
  20,
  "#ffffff"
);

window.addEventListener("deviceorientation", (e) => {
  mobileOrientation.setOrientation(e.alpha, e.beta);
});

const resizeCanvas = () => {
  boardCanvas.width = window.innerWidth;
  boardCanvas.height = window.innerHeight;
};
window.addEventListener("resize", resizeCanvas);

const update = () => {
  //TODO:  redraw board function
  context.clearRect(0, 0, boardCanvas.width, boardCanvas.height);

  //TODO: get this bitch property from mobile
  const { alpha, beta } = mobileOrientation.getOrientation();
  console.log(`Pozycja X: ${alpha}, Pozycja Y: ${beta}`);
  console.log("");

  //TODO: create if connected with this bitch property
  if (alpha > 0 && beta > 0) {
    let { positionX, positionY } = ball.getCoordinates();
    positionX += 1;
    positionY += 1;
    ball.setCoordinates(positionX, positionY);
  }
  if (alpha > 0 && beta < 0) {
    let { positionX, positionY } = ball.getCoordinates();
    positionX += 1;
    positionY -= 1;
    ball.setCoordinates(positionX, positionY);
  }
  if (alpha < 0 && beta > 0) {
    let { positionX, positionY } = ball.getCoordinates();
    positionX -= 1;
    positionY += 1;
    ball.setCoordinates(positionX, positionY);
  }
  if (alpha < 0 && beta < 0) {
    let { positionX, positionY } = ball.getCoordinates();
    positionX -= 1;
    positionY -= 1;
    ball.setCoordinates(positionX, positionY);
  }
  if (beta < 0 && beta > -90) {
    let { positionX, positionY } = ball.getCoordinates();
    positionY -= 1;
    ball.setCoordinates(positionX, positionY);
  }

  hole1.draw();
  hole2.draw();
  hole3.draw();
  hole4.draw();
  ball.draw();

  setTimeout(update, 1);
};
document.addEventListener("DOMContentLoaded", () => {
  resizeCanvas();
  update();
});
