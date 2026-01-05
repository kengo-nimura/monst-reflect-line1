const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

const start = { x: W / 2, y: H * 0.75 };
const maxReflect = 5;

let angle = -Math.PI / 2;

canvas.addEventListener("pointermove", e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  angle = Math.atan2(y - start.y, x - start.x);
  draw();
});

function drawHex(x, y, r = 7) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 3 * i;
    ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
  }
  ctx.closePath();
  ctx.strokeStyle = "#8fdfff";
  ctx.stroke();
}

function drawReflectLine() {
  let x = start.x;
  let y = start.y;
  let dx = Math.cos(angle);
  let dy = Math.sin(angle);

  ctx.beginPath();
  ctx.moveTo(x, y);

  for (let i = 0; i < maxReflect; i++) {
    const tx = dx > 0 ? (W - x) / dx : -x / dx;
    const ty = dy > 0 ? (H - y) / dy : -y / dy;
    const t = Math.min(tx, ty);

    x += dx * t;
    y += dy * t;
    ctx.lineTo(x, y);

    drawHex(x, y);

    if (t === tx) dx *= -1;
    if (t === ty) dy *= -1;
  }

  ctx.strokeStyle = "rgba(220,240,255,0.9)";
  ctx.lineWidth = 3;
  ctx.shadowColor = "#9fdfff";
  ctx.shadowBlur = 10;
  ctx.stroke();

  ctx.shadowBlur = 0;
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  ctx.beginPath();
  ctx.arc(start.x, start.y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#0f0";
  ctx.fill();

  drawReflectLine();
}

draw();
