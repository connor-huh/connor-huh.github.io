const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Create nodes
const numNodes = 50;
const nodes = Array.from({ length: numNodes }, () => ({
  baseX: Math.random() * width,
  baseY: Math.random() * height,
  radius: 2 + Math.random() * 2,
}));

// Generate edges randomly
const edges = [];
for (let i = 0; i < numNodes; i++) {
  for (let j = i + 1; j < numNodes; j++) {
    if (Math.random() < 0.08) {
      edges.push([i, j]);
    }
  }
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
  ctx.strokeStyle = "rgba(180,180,255,0.2)";
  ctx.fillStyle = "rgba(255,255,255,0.8)";

  // Update node positions with parallax effect
  nodes.forEach((node, i) => {
    const parallaxX = node.baseX + mouseX * 30 * (i / numNodes);
    const parallaxY = node.baseY + mouseY * 30 * (i / numNodes);

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
