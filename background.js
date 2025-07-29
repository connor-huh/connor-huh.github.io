const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

const n = 60; // number of nodes
const p = 0.08; // edge probability
const radius = 3;
const nodes = [];
const edges = [];

function randomVel() {
  return (Math.random() - 0.5) * 0.5;
}

// Initialize nodes with positions and small velocities
for (let i = 0; i < n; i++) {
  nodes.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: randomVel(),
    vy: randomVel(),
  });
}

// Create random edges
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    if (Math.random() < p) {
      edges.push([i, j]);
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  // Move nodes
  for (let node of nodes) {
    node.x += node.vx;
    node.y += node.vy;

    // Bounce off edges
    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;
  }

  // Draw edges
  ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
  for (let [i, j] of edges) {
    ctx.beginPath();
    ctx.moveTo(nodes[i].x, nodes[i].y);
    ctx.lineTo(nodes[j].x, nodes[j].y);
    ctx.stroke();
  }

  // Draw nodes
  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  for (let node of nodes) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();

// Update canvas size on resize
window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});
