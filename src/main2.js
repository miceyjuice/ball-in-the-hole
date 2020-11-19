const boardCanvas = document.querySelector("#gameBoard");
const context = boardCanvas.getContext("2d");
const startTime = Date.now();

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

const hole1 = new Hole(132, 270, 22, "#ffffff");
const hole2 = new Hole(85, 705, 25, "#ffffff");
const hole3 = new Hole(350, 510, 30, "#ffffff");
const exit = new Hole(420, 100, 40, "#ffffff");
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
  // console.log(`Pozycja X: ${alpha}, Pozycja Y: ${beta}`);
  // console.log("");

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
  exit.draw();
  ball.draw();

  if (ballHoleCollide(ball, hole1)) {
    console.log("Ball and hole1 collided!");
  }
  if (ballHoleCollide(ball, hole2)) console.log("Ball and hole collided!");
  if (ballHoleCollide(ball, hole3)) console.log("Ball and hole collided!");
  if (ballHoleCollide(ball, exit)) console.log("Ball and hole collided!");

  setTimeout(update, 30);
};

const roundTimer = () => {
  let interval = 1000;
  let expected = Date.now() + interval;
  let second = 0;
  let timerDiv = document.querySelector(".timer");
  setTimeout(step, interval);
  function step() {
    let dt = Date.now() - expected;
    if (dt > interval) {
      console.log("Bad shit happened");
    }

    timerDiv.innerHTML = ++second;

    expected += interval;
    setTimeout(step, Math.max(0, interval - dt));
  }
};

const ballHoleCollide = (ball, hole) => {
  const distanceX = hole.positionX - ball.positionX;
  const distanceY = hole.positionY - ball.positionY;
  const radiusSum = hole.size / 2 + ball.size / 2;

  if (distanceX * distanceX + distanceY * distanceY < radiusSum * radiusSum) {
    hole.color = "#fce3cc";
    return true;
  }
  return false;
};

document.addEventListener("DOMContentLoaded", () => {
  resizeCanvas();
  update();
  roundTimer();
});
