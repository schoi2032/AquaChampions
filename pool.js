const canvas = document.getElementById("pool");
const ctx = canvas.getContext("2d");

const lanes = 6;
const playerLane = 2;
const raceDistance = 100;
const poolLength = 50;

const swimmers = Array.from({ length: lanes }, (_, i) => ({
  progress: Math.random() * 100,
  speed: 2 + Math.random() * 4,
  color: `hsl(${i * 60}, 70%, 60%)`
}));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Pool
  const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
  g.addColorStop(0, "#0077B6");
  g.addColorStop(0.5, "#00B4D8");
  g.addColorStop(1, "#0077B6");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const laneHeight = canvas.height / lanes;
  const poolWidth = canvas.width - 100;

  swimmers.forEach((s, i) => {
    s.progress = (s.progress + s.speed * 0.05) % 100;

    const x = 50 + (s.progress / 100) * poolWidth;
    const y = laneHeight * (i + 0.5);

    ctx.save();
    ctx.translate(x, y);

    // Body
    ctx.fillStyle = i === playerLane ? "#FFD700" : s.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, 22, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.beginPath();
    ctx.arc(20, 0, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  });

  requestAnimationFrame(draw);
}

draw();
