const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let mouseX = 0;
let mouseY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX / width;
  mouseY = e.clientY / height;
});

const curves = Array.from({ length: 8 }, () => ({
  color: `hsl(${Math.random() * 360}, 70%, 70%)`,
  phase: Math.random() * Math.PI * 2,
  freq: 0.001 + Math.random() * 0.001,
  amp: 50 + Math.random() * 100,
  offsetY: Math.random() * height,
}));

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.15;

  curves.forEach((curve, i) => {
    ctx.beginPath();
    for (let x = 0; x < width; x += 2) {
      const y =
        Math.sin(curve.freq * x + curve.phase + mouseX * 5) *
          curve.amp *
          (0.5 + mouseY) +
        curve.offsetY;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = curve.color;
    ctx.stroke();
  });

  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
