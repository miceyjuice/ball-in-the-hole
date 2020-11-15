const boardCanvas = document.querySelector("#gameBoard");
const context = boardCanvas.getContext("2d");
let x = window.innerWidth / 2,
  y = window.innerHeight / 1.1,
  velX = 0,
  velY = 0,
  speed = 1.1;

const board = () => {
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  if (window.DeviceOrientationEvent) {
    window.addEventListener(
      "deviceorientation",
      handleDeviceOrientation,
      false
    );
    console.log("Device orientation supported!");
  }
};

const resizeCanvas = () => {
  boardCanvas.width = window.innerWidth;
  boardCanvas.height = window.innerHeight;

  draw();
};

const draw = () => {
  ball(context, x, y, 20);
  hole(context, 350, 510, 30);
  hole(context, 85, 705, 25);
  hole(context, 132, 270, 22);
  hole(context, 420, 100, 40);

  console.log("dziala");
};

const ball = (context, x, y, size) => {
  context.beginPath();
  context.arc(x, y, size, 0, 2 * Math.PI);
  context.fillStyle = "#f9f9f9";
  context.fill();
};

const hole = (context, x, y, size) => {
  context.beginPath();
  context.arc(x, y, size, 0, 2 * Math.PI);
  context.fillStyle = "#fc95ca";
  context.fill();
};

const handleDeviceOrientation = (e) => {
  let targetX = e.alpha * -1;
  let targetY = e.beta * -1;
  targetY += 90;
  let tx = targetX - x,
    ty = targetY - y;

  console.log(`X wynosi: ${x}`);

  velX = tx * speed;
  velY = ty * speed;

  x -= targetX * 0.05;
  y -= targetY * 0.05;

  console.log(`TargetX: ${targetX}, TargetY: ${targetY}`);
  console.log(`VelX: ${velX}, VelY: ${velY}`);
  console.log(`Pozycja X piłki: ${x}, pozycja Y piłki: ${y}`);
  console.log("");

  if (targetX > 0 && targetY > 0) {
    x -= 1;
    y -= 1;
  }
  if (targetX > 0 && targetY < 0) {
    x -= 1;
    y += 1;
  }
  if (targetX < 0 && targetY > 0) {
    x += 1;
    y -= 1;
  }
  if (targetX < 0 && targetY < 0) {
    x += 1;
    y += 1;
  }

  context.clearRect(0, 0, boardCanvas.width, boardCanvas.height);
  hole(context, 350, 510, 30);
  hole(context, 85, 705, 25);
  hole(context, 132, 270, 22);
  hole(context, 420, 100, 40);
  if (x < window.innerWidth && x > 20 && y < window.innerHeight && y > 20) {
    ball(context, x, y, 20);
  }
  setTimeout(update, 1);
};

const update = (targetX, targetY) => {};

const getRandomColor = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

document.addEventListener("DOMContentLoaded", () => {
  board();
});
