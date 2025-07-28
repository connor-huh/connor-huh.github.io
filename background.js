const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

let width, height;
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const curves = Array.from({ length: 10 }, (_, i) => ({
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    phase: Math.random() * Math.PI * 2,
    freq: 0.0005 + Math.random() * 0.001,
    amp: 50 + Math.random() * 100,
    offsetX: Math.random() * width,
    offsetY: Math.random() * height,
    speed: 0.002 + Math.random() * 0.004,
}));

function draw(t) {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1.5;

    curves.forEach(curve => {
        ctx.beginPath();
        for (let i = 0; i < width; i += 2) {
            const x = i;
            const y = Math.sin(curve.freq * i + t * curve.speed + curve.phase) * curve.amp + curve.offsetY;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = curve.color;
        ctx.globalAlpha = 0.15;
        ctx.stroke();
    });

    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
