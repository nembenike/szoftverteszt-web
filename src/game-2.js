const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");

const overlay = document.getElementById("overlay");
const restartBtn = document.getElementById("restart-btn");

const GRID_SIZE = 20;
const TILE_COUNT = canvas.width / GRID_SIZE;

let snake;
let food;
let score;
let gameInterval;
let speed;

let direction;
let nextDirection;

function startGame() {

  snake = [
    { x: 15, y: 15 }
  ];

  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };

  food = randomFood();

  score = 0;
  speed = 110;

  scoreEl.textContent = score;

  overlay.classList.add("hidden");
  overlay.classList.remove("flex");

  clearInterval(gameInterval);

  gameInterval = setInterval(gameLoop, speed);

  draw();
}

function gameLoop() {

  direction = nextDirection;

  update();
  draw();
}

function update() {

  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  // WALL COLLISION
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= TILE_COUNT ||
    head.y >= TILE_COUNT
  ) {
    return gameOver();
  }

  // SELF COLLISION
  for (let part of snake) {

    if (
      part.x === head.x &&
      part.y === head.y
    ) {
      return gameOver();
    }
  }

  snake.unshift(head);

  // FOOD
  if (
    head.x === food.x &&
    head.y === food.y
  ) {

    score++;
    scoreEl.textContent = score;

    food = randomFood();

    // SPEED UP
    if (speed > 45) {

      speed -= 2;

      clearInterval(gameInterval);
      gameInterval = setInterval(gameLoop, speed);
    }

  } else {
    snake.pop();
  }
}

function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground();
  drawFood();
  drawSnake();
}

function drawBackground() {

  ctx.fillStyle = "#020617";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(255,255,255,0.04)";

  for (let i = 0; i < TILE_COUNT; i++) {

    ctx.beginPath();
    ctx.moveTo(i * GRID_SIZE, 0);
    ctx.lineTo(i * GRID_SIZE, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * GRID_SIZE);
    ctx.lineTo(canvas.width, i * GRID_SIZE);
    ctx.stroke();
  }
}

function drawSnake() {

  snake.forEach((segment, index) => {

    ctx.fillStyle =
      index === 0
        ? "#67e8f9"
        : "#22d3ee";

    ctx.beginPath();

    ctx.roundRect(
      segment.x * GRID_SIZE + 2,
      segment.y * GRID_SIZE + 2,
      GRID_SIZE - 4,
      GRID_SIZE - 4,
      6
    );

    ctx.fill();
  });
}

function drawFood() {

  ctx.fillStyle = "#f87171";

  ctx.beginPath();

  ctx.arc(
    food.x * GRID_SIZE + GRID_SIZE / 2,
    food.y * GRID_SIZE + GRID_SIZE / 2,
    GRID_SIZE / 2.8,
    0,
    Math.PI * 2
  );

  ctx.fill();
}

function randomFood() {

  return {
    x: Math.floor(Math.random() * TILE_COUNT),
    y: Math.floor(Math.random() * TILE_COUNT)
  };
}

function gameOver() {

  clearInterval(gameInterval);

  overlay.classList.remove("hidden");
  overlay.classList.add("flex");
}

document.addEventListener("keydown", (e) => {

  const key = e.key.toLowerCase();

  // UP
  if (
    (key === "arrowup" || key === "w") &&
    direction.y !== 1
  ) {
    nextDirection = { x: 0, y: -1 };
  }

  // DOWN
  if (
    (key === "arrowdown" || key === "s") &&
    direction.y !== -1
  ) {
    nextDirection = { x: 0, y: 1 };
  }

  // LEFT
  if (
    (key === "arrowleft" || key === "a") &&
    direction.x !== 1
  ) {
    nextDirection = { x: -1, y: 0 };
  }

  // RIGHT
  if (
    (key === "arrowright" || key === "d") &&
    direction.x !== -1
  ) {
    nextDirection = { x: 1, y: 0 };
  }
});

restartBtn.addEventListener("click", startGame);

startGame();