const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const numNodes = 40;
const radius = Math.min(width, height) / 3;
const centerX = width / 2;
const centerY = height / 2;

// Arrange nodes evenly on circle
const nodes = Array.from({ length: numNodes }, (_, i) => {
  const angle = (i / numNodes) * 2 * Math.PI;
  return {
    baseX: centerX + radius * Math.cos(angle),
    baseY: centerY + radius * Math.sin(angle),
    radius: 3,
    angle,
  };
});

// Edges: connect each node to neighbors + some cross edges
const edges = [];
for (let i = 0; i < numNodes; i++) {
  // Connect to next node (circular)
  edges.push([i, (i + 1) % numNodes]);

  // Connect to node 5 ahead for cross-links
  edges.push([i, (i + 5) % numNodes]);
}

let mouseX = 0;
let mouseY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX / width - 0.5;
  mouseY = e.clientY / height - 0.5;
});

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(180,180,255,0.3)";
  ctx.fillStyle = "rgba(255,255,255,0.9)";

  nodes.forEach((node) => {
    // Parallax effect based on mouse
    const parallaxX = node.baseX + mouseX * 30 * Math.cos(node.angle) * 1.5;
    const parallaxY = node.baseY + mouseY * 30 * Math.sin(node.angle) * 1.5;

    node.currentX = parallaxX;
    node.currentY = parallaxY;

    // Draw node
    ctx.beginPath();
    ctx.arc(parallaxX, parallaxY, node.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  // Draw edges
  edges.forEach(([i, j]) => {
    const n1 = nodes[i];
    const n2 = nodes[j];
    ctx.beginPath();
    ctx.moveTo(n1.currentX, n1.currentY);
    ctx.lineTo(n2.currentX, n2.currentY);
    ctx.stroke();
  });

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
