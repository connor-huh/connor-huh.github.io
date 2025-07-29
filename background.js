const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Adjustable probability of edge creation (0.06 works well visually)
const EDGE_PROB = 0.06;
const NODE_COUNT = 50;
const EDGE_REFRESH_INTERVAL = 5000; // ms

// Create nodes with random positions and gentle movement
const NODES = Array.from({ length: NODE_COUNT }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  vx: (Math.random() - 0.5) * 0.3,
  vy: (Math.random() - 0.5) * 0.3,
}));

let currentEdges = [];
let nextEdges = [];
let lastSwitchTime = Date.now();

function generateEdges() {
  const edges = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (Math.random() < EDGE_PROB) {
        edges.push([i, j]);
      }
    }
  }
  return edges;
}

nextEdges = generateEdges();

function draw() {
  ctx.clearRect(0, 0, width, height);

  const now = Date.now();
  const timeSinceSwitch = now - lastSwitchTime;
  const transitionProgress = Math.min(timeSinceSwitch / 1000, 1); // fade duration: 1 sec

  if (timeSinceSwitch >= EDGE_REFRESH_INTERVAL) {
    currentEdges = nextEdges;
    nextEdges = generateEdges();
    lastSwitchTime = now;
  }

  // Draw old edges fading out
  drawEdges(currentEdges, 1 - transitionProgress);

  // Draw new edges fading in
  drawEdges(nextEdges, transitionProgress);

  // Draw nodes
  NODES.forEach((n) => {
    ctx.beginPath();
    ctx.arc(n.x, n.y, 3.8, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(80, 80, 255, 0.8)";
    ctx.fill();

    // Update position with bounce at edge
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 0 || n.x > width) n.vx *= -1;
    if (n.y < 0 || n.y > height) n.vy *= -1;
  });

  requestAnimationFrame(draw);
}

function drawEdges(edges, alpha) {
  ctx.strokeStyle = `rgba(100, 100, 255, ${0.3 * alpha})`;
  ctx.lineWidth = 1.3;
  edges.forEach(([i, j]) => {
    const a = NODES[i], b = NODES[j];
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  });
}

draw();
