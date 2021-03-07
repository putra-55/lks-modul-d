let canvas,
  ctx,
  ship,
  musuh,
  widthCharacter,
  canvasWidth,
  canvasHeight,
  speedShip,
  showTembak,
  audio;

let up = false;
let down = false;
let right = false;
let left = false;
let laser = false;
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

canvasWidth = canvas.width;
canvasHeight = canvas.height;

widthCharacter = 60;

let shipX = (canvasWidth - widthCharacter) / 2;
let shipY = canvasHeight - widthCharacter;

ship = new Image();
ship.src = "./assets/ship.png";

musuh = new Image();
musuh.src = "./assets/musuh.png";

speedShip = 20;
window.onload = mounted;

function mounted() {
  renderShip(shipX, shipY);
  controller();
}

function controller() {
  document.addEventListener("keydown", function (e) {
    startDirection(e.code);
  });
  document.addEventListener("keyup", function (e) {
    stopDirection(e.code);
  });
}

function shipDirection() {
  if (right) {
    if (shipX < canvasWidth - (widthCharacter + speedShip)) {
      shipX += speedShip;
    }
  } else if (left) {
    if (shipX > speedShip) {
      shipX -= speedShip;
    }
  } else if (up) {
    if (shipY > speedShip) {
      shipY -= speedShip;
    }
  } else if (down) {
    if (shipY < canvasHeight - widthCharacter) {
      shipY += speedShip;
    }
  }

  if (laser) {
    laserMp3();
  }
  renderShip(shipX, shipY);
}
function startDirection(key) {
  if (key == "ArrowRight") {
    right = true;
  } else if (key == "ArrowLeft") {
    left = true;
  } else if (key == "ArrowUp") {
    up = true;
  } else if (key == "ArrowDown") {
    down = true;
  }

  if (key == "Space") {
    laser = true;
  }

  shipDirection();
}
function stopDirection(key) {
  if (key == "ArrowRight") {
    right = false;
  } else if (key == "ArrowLeft") {
    left = false;
  } else if (key == "ArrowUp") {
    up = false;
  } else if (key == "ArrowDown") {
    down = false;
  }

  if (key == "Space") {
    laser = false;
  }
}

function renderShip(x, y) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.drawImage(ship, x, y, widthCharacter, widthCharacter);
  if (laser) {
    showTembak = shipY - widthCharacter / 2;
    shoot(shipX + (widthCharacter / 2 - 3), showTembak);
  }
  ctx.restore();
}

function tembak() {}
function laserMp3() {
  audio = new Audio();
  audio.src = "./assets/laser.m4a";
  audio.play();

  shoot();
}

function shoot(x, y) {
  ctx.fillStyle = "red";
  ctx.fillRect(x, y, 7, 20);
}
