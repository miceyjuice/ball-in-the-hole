const boardCanvas = document.querySelector("#gameBoard");
const context = boardCanvas.getContext("2d");

class Hole {
  constructor(positionX, positionY, size, color, order) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.size = size;
    this.color = color;
    this.order = order;
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
  constructor(positionX, positionY, size, color, order) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.size = size;
    this.color = color;
    this.order = order;
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

const hole1 = new Hole(132, 270, 22, "#ffffff", 1);
const hole2 = new Hole(85, 705, 25, "#ffffff", 2);
const hole3 = new Hole(350, 510, 30, "#ffffff", 3);
const exit = new Hole(420, 100, 40, "#ffffff", 4);
const ball = new Ball(
  window.innerWidth / 2,
  window.innerHeight / 1.1,
  20,
  "#ffffff",
  1
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

  let { positionX, positionY } = ball.getCoordinates();

  positionX -= alpha * 0.05;
  positionY -= beta * 0.05;

  //TODO: create if connected with this bitch property
  if (alpha > 0 && beta > 0) {
    positionX += 1;
    positionY += 1;
    ball.setCoordinates(positionX, positionY);
  }
  if (alpha > 0 && beta < 0) {
    positionX += 1;
    positionY -= 1;
    ball.setCoordinates(positionX, positionY);
  }
  if (alpha < 0 && beta > 0) {
    positionX -= 1;
    positionY += 1;
    ball.setCoordinates(positionX, positionY);
  }
  if (alpha < 0 && beta < 0) {
    positionX -= 1;
    positionY -= 1;
    ball.setCoordinates(positionX, positionY);
  }
  if (beta < 0 && beta > -90) {
    positionY -= 1;
    ball.setCoordinates(positionX, positionY);
  }

  hole1.draw();
  hole2.draw();
  hole3.draw();
  exit.draw();
  ball.draw();

  ballHoleOrderCollide(ball, hole1);
  ballHoleOrderCollide(ball, hole2);
  ballHoleOrderCollide(ball, hole3);
  ballHoleOrderCollide(ball, exit);

  if (ball.order === 5) console.log("wygrales gre kurwo");
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

    timerDiv.innerHTML = `Round time: ${++second}s`;

    expected += interval;
    setTimeout(step, Math.max(0, interval - dt));
  }
};

const ballHoleOrderCollide = (ball, hole) => {
  const distanceX = hole.positionX - ball.positionX;
  const distanceY = hole.positionY - ball.positionY;
  const radiusSum = hole.size / 2 + ball.size / 2;

  if (distanceX * distanceX + distanceY * distanceY < radiusSum * radiusSum) {
    if (ball.order == hole.order) {
      hole.color = "#fce3cc";
      ball.order++;
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  resizeCanvas();
  roundTimer();
  setInterval(update, 10);
});
