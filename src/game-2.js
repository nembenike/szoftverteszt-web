const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const overlay = document.getElementById("overlay");

const size = 20;

let snake = [];
let food = {};

let dx = 1;
let dy = 0;

let score = 0;

let game;

function startGame() {

  snake = [
    { x: 10, y: 10 }
  ];

  dx = 1;
  dy = 0;

  score = 0;
  scoreText.innerText = score;

  food = {
    x: randomNumber(),
    y: randomNumber()
  };

  overlay.classList.add("hidden");
  overlay.classList.remove("flex");

  clearInterval(game);

  game = setInterval(drawGame, 100);
}

function drawGame() {

  moveSnake();

  checkGameOver();

  drawBackground();

  drawFood();

  drawSnake();
}

function moveSnake() {

  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  snake.unshift(head);

  // FOOD
  if (
    head.x === food.x &&
    head.y === food.y
  ) {

    score++;

    scoreText.innerText = score;

    food = {
      x: randomNumber(),
      y: randomNumber()
    };

  } else {

    snake.pop();
  }
}

function drawBackground() {

  ctx.fillStyle = "#020617";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );
}

function drawSnake() {

  for (let i = 0; i < snake.length; i++) {

    if (i === 0) {
      ctx.fillStyle = "#67e8f9";
    } else {
      ctx.fillStyle = "#22d3ee";
    }

    ctx.fillRect(
      snake[i].x * size,
      snake[i].y * size,
      size - 2,
      size - 2
    );
  }
}

function drawFood() {

  ctx.fillStyle = "#f87171";

  ctx.fillRect(
    food.x * size,
    food.y * size,
    size - 2,
    size - 2
  );
}

function randomNumber() {

  return Math.floor(Math.random() * 30);
}

function checkGameOver() {

  const head = snake[0];

  // WALL
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= 30 ||
    head.y >= 30
  ) {
    gameOver();
  }

  // SELF
  for (let i = 1; i < snake.length; i++) {

    if (
      head.x === snake[i].x &&
      head.y === snake[i].y
    ) {
      gameOver();
    }
  }
}

function gameOver() {

  clearInterval(game);

  overlay.classList.remove("hidden");
  overlay.classList.add("flex");
}

document.addEventListener("keydown", function (e) {

  // UP
  if (
    (e.key === "ArrowUp" || e.key === "w") &&
    dy !== 1
  ) {
    dx = 0;
    dy = -1;
  }

  // DOWN
  if (
    (e.key === "ArrowDown" || e.key === "s") &&
    dy !== -1
  ) {
    dx = 0;
    dy = 1;
  }

  // LEFT
  if (
    (e.key === "ArrowLeft" || e.key === "a") &&
    dx !== 1
  ) {
    dx = -1;
    dy = 0;
  }

  // RIGHT
  if (
    (e.key === "ArrowRight" || e.key === "d") &&
    dx !== -1
  ) {
    dx = 1;
    dy = 0;
  }
});

startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", startGame);

drawBackground();