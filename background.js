const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const NODE_COUNT = 50;
const EDGE_PROB = 0.06;
const NODES = Array.from({ length: NODE_COUNT }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  vx: (Math.random() - 0.5) * 0.5,
  vy: (Math.random() - 0.5) * 0.5,
}));

function draw() {
  ctx.clearRect(0, 0, width, height);

  // Draw edges
  ctx.strokeStyle = "rgba(100, 100, 255, 0.15)";
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (Math.random() < EDGE_PROB) {
        ctx.beginPath();
        ctx.moveTo(NODES[i].x, NODES[i].y);
        ctx.lineTo(NODES[j].x, NODES[j].y);
        ctx.stroke();
      }
    }
  }

  // Draw nodes
  ctx.fillStyle = "rgba(80, 80, 255, 0.6)";
  NODES.forEach((n) => {
    ctx.beginPath();
    ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Move nodes
    n.x += n.vx;
    n.y += n.vy;

    if (n.x < 0 || n.x > width) n.vx *= -1;
    if (n.y < 0 || n.y > height) n.vy *= -1;
  });

  requestAnimationFrame(draw);
}

draw();
