function formatTime(ms) {
  const totalSeconds = ms / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const centiseconds = Math.floor((ms % 1000) / 10);
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${centiseconds
    .toString()
    .padStart(2, '0')}`;
}

function getMedal(position) {
  if (position === 1) return { name: "GOLD", emoji: "🥇", color: "#facc15" };
  if (position === 2) return { name: "SILVER", emoji: "🥈", color: "#e5e7eb" };
  if (position === 3) return { name: "BRONZE", emoji: "🥉", color: "#d97706" };
  return null;
}

function renderResults({
  results,
  playerIndex,
  raceDistance,
  raceStroke,
  isNewRecord,
  onRestart,
  onBackToMenu
}) {
  const root = document.getElementById("results-root");
  root.innerHTML = "";

  const playerPosition = playerIndex + 1;
  const medal = getMedal(playerPosition);
  const player = results[playerIndex];

  // Highlight
  const highlight = document.createElement("div");
  highlight.className = "card center fade-in";
  highlight.innerHTML = medal
    ? `<div class="medal">${medal.emoji}</div>
       <h1 style="color:${medal.color}">${medal.name} MEDAL!</h1>`
    : `<h1>${playerPosition}th Place</h1><div class="medal">🏊</div>`;
  root.appendChild(highlight);

  // Time card
  const timeCard = document.createElement("div");
  timeCard.className = "card center fade-in";
  timeCard.style.marginTop = "20px";
  timeCard.innerHTML = `
    <h3>Your Time ${isNewRecord ? "⭐ NEW RECORD!" : ""}</h3>
    <div style="font-size:48px;font-family:monospace">
      ${formatTime(player.time)}
    </div>
    <div style="opacity:.6">${raceDistance}m ${raceStroke || "Freestyle"}</div>
  `;
  root.appendChild(timeCard);

  // Results list
  const table = document.createElement("div");
  table.className = "card column fade-in";
  table.style.marginTop = "20px";
  table.innerHTML = `<h3>Final Standings</h3>`;

  results.forEach((r, i) => {
    const row = document.createElement("div");
    row.className = `row list-item ${i === playerIndex ? "highlight" : ""}`;
    row.innerHTML = `
      <div>
        <strong>${i + 1}. ${r.name}${i === playerIndex ? " (You)" : ""}</strong>
        <div style="font-size:12px;opacity:.6">${r.country}</div>
      </div>
      <div style="font-family:monospace">${formatTime(r.time)}</div>
    `;
    table.appendChild(row);
  });

  root.appendChild(table);

  // Buttons
  const buttons = document.createElement("div");
  buttons.className = "row fade-in";
  buttons.style.marginTop = "20px";

  const restart = document.createElement("button");
  restart.className = "btn btn-primary";
  restart.textContent = "Race Again";
  restart.onclick = onRestart;

  const back = document.createElement("button");
  back.className = "btn btn-outline";
  back.textContent = "Back to Events";
  back.onclick = onBackToMenu;

  buttons.append(restart, back);
  root.appendChild(buttons);
}

/* ---------- DEMO DATA ---------- */
renderResults({
  raceDistance: 100,
  raceStroke: "freestyle",
  playerIndex: 1,
  isNewRecord: true,
  results: [
    { name: "Alex", country: "USA", time: 52000 },
    { name: "You", country: "KOR", time: 53400 },
    { name: "Liam", country: "AUS", time: 54800 }
  ],
  onRestart: () => alert("Restart race"),
  onBackToMenu: () => alert("Back to menu")
});
