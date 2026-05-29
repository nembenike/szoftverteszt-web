const canvas = document.getElementById('tron');
const ctx = canvas.getContext('2d');

const CELL = 8;
const COLS = Math.floor(canvas.width / CELL);
const ROWS = Math.floor(canvas.height / CELL);
const TICK = 60;

let timer = null;
let running = false;
let paused = false;

class Player {
  constructor(x, y, dx, dy, color, controls) {
    this.x = x; this.y = y; this.dx = dx; this.dy = dy;
    this.color = color; this.controls = controls; this.alive = true;
    this.next = {dx, dy};
  }
  setDir(dx, dy) {
    if (dx === -this.dx && dy === -this.dy) return;
    this.next = {dx, dy};
  }
  step() {
    if (!this.alive) return;
    this.dx = this.next.dx; this.dy = this.next.dy;
    this.x += this.dx; this.y += this.dy;
  }
}

let trails = new Set();
let p1, p2;
let score1 = 0, score2 = 0;
let aiEnabled = false;

function posKey(x,y){return `${x},${y}`}

function reset() {
  trails = new Set();
  p1 = new Player(8, Math.floor(ROWS/2), 1, 0, '#00ffff', {
    left: 'ArrowLeft', right: 'ArrowRight', up: 'ArrowUp', down: 'ArrowDown'
  });
  p2 = new Player(COLS-9, Math.floor(ROWS/2), -1, 0, '#ff7b7b', {
    left: 'a', right: 'd', up: 'w', down: 's'
  });
  running = false; paused = false;
  updateStatus('Press Enter to start — Player 1: Arrows, Player 2: WASD');
  render();
  updateHUD();
}

function start() {
  if (running) return;
  running = true; paused = false;
  trails.add(posKey(p1.x, p1.y));
  trails.add(posKey(p2.x, p2.y));
  timer = setInterval(tick, TICK);
  updateStatus('Running');
}

function tick(){
  if (!running || paused) return;

  // AI decision for player 2 happens before stepping
  if (aiEnabled && p2 && p2.alive) {
    const d = computeAIDirection();
    p2.setDir(d.dx, d.dy);
  }

  p1.step(); p2.step();

  const k1 = posKey(p1.x, p1.y);
  const k2 = posKey(p2.x, p2.y);

  let p1Dead = false, p2Dead = false;

  if (p1.x < 0 || p1.x >= COLS || p1.y < 0 || p1.y >= ROWS) p1Dead = true;
  if (p2.x < 0 || p2.x >= COLS || p2.y < 0 || p2.y >= ROWS) p2Dead = true;

  if (trails.has(k1)) p1Dead = true;
  if (trails.has(k2)) p2Dead = true;

  if (k1 === k2) { p1Dead = true; p2Dead = true; }

  if (p1Dead) p1.alive = false;
  if (p2Dead) p2.alive = false;

  trails.add(k1); trails.add(k2);

  if (!p1.alive && !p2.alive) {
    endMatch('Tie!');
    return;
  }
  if (!p1.alive) { endMatch('Player 2 wins!'); return; }
  if (!p2.alive) { endMatch('Player 1 wins!'); return; }

  render();
}

function endMatch(text){
  running = false; clearInterval(timer); timer = null;
  // update scores
  if (text.includes('Player 1 wins')) score1++;
  else if (text.includes('Player 2 wins')) score2++;
  updateHUD();
  updateStatus(text + ' — Press Space to restart');
  render();
}

function updateStatus(t){
  const s = document.getElementById('status'); if (s) s.textContent = t;
}

function updateHUD(){
  const el = document.getElementById('score'); if (el) el.textContent = `P1: ${score1} • P2: ${score2}`;
  const aiBtn = document.getElementById('aiToggle'); if (aiBtn) aiBtn.textContent = aiEnabled? 'Disable AI' : 'Enable AI';
}

function computeAIDirection(){
  const tryDirs = [];
  tryDirs.push([p2.dx, p2.dy]);
  tryDirs.push([-p2.dy, p2.dx]);
  tryDirs.push([p2.dy, -p2.dx]);
  tryDirs.push([-p2.dx, -p2.dy]);

  for (let [dx,dy] of tryDirs){
    const nx = p2.x + dx, ny = p2.y + dy;
    const k = posKey(nx,ny);
    if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) continue;
    if (trails.has(k)) continue;
    if (nx === p1.x && ny === p1.y) continue;
    return {dx, dy};
  }
  return {dx: p2.dx, dy: p2.dy};
}

function render(){
  ctx.fillStyle = '#000'; ctx.fillRect(0,0,canvas.width,canvas.height);

  for (let key of trails){
    const [x,y] = key.split(',').map(Number);
    drawCell(x,y,'#0a3b3f');
  }

  if (p1) drawCell(p1.x,p1.y,p1.color);
  if (p2) drawCell(p2.x,p2.y,p2.color);
}

function drawCell(x,y,color){
  ctx.fillStyle = color;
  ctx.fillRect(x*CELL, y*CELL, CELL, CELL);
}

window.addEventListener('keydown', (e)=>{
  const k = e.key;
  if (k === 'Enter') { start(); e.preventDefault(); return; }
  if (k === ' ') { reset(); start(); e.preventDefault(); return; }
  if (k === 'p' || k === 'P') { paused = !paused; updateStatus(paused? 'Paused' : 'Running'); return; }

  if (k === p1.controls.left) p1.setDir(-1,0);
  if (k === p1.controls.right) p1.setDir(1,0);
  if (k === p1.controls.up) p1.setDir(0,-1);
  if (k === p1.controls.down) p1.setDir(0,1);

  const kk = k.toLowerCase();
  if (!aiEnabled) {
    if (kk === p2.controls.left) p2.setDir(-1,0);
    if (kk === p2.controls.right) p2.setDir(1,0);
    if (kk === p2.controls.up) p2.setDir(0,-1);
    if (kk === p2.controls.down) p2.setDir(0,1);
  }
});

document.getElementById('restart').addEventListener('click', ()=>{ reset(); start(); });

reset();

const aiBtn = document.getElementById('aiToggle');
if (aiBtn) aiBtn.addEventListener('click', ()=>{ aiEnabled = !aiEnabled; updateHUD(); });

