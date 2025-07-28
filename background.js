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
let mouseY
