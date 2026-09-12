// ---- Edit your servers here ----
const SERVERS = [
  { name: "Botino Classic | de_dust2 24/7", map: "de_dust2", players: 21, max: 32, ip: "127.0.0.1:27015", online: true,  thumb: "./images/dust2.jpg" },
  { name: "Botino DeathMatch",              map: "de_inferno", players: 14, max: 24, ip: "127.0.0.1:27016", online: true,  thumb: "./images/inferno.jpg" },
  { name: "Botino Zombie Plague",           map: "zm_lila",  players: 0,  max: 32, ip: "127.0.0.1:27017", online: false, thumb: "./images/zombie.jpg" }
];

const NAMES = ["ProKiller", "botino_fan", "AWP_God", "n0scope", "SmokeMid", "RushB", "Tuz", "Silent"];

const list = document.getElementById("serverList");
const detail = document.getElementById("detail");
let selected = null;
let tab = "info";

function render() {
  list.innerHTML = SERVERS.map((s, i) => `
    <article class="card ${selected === i ? "selected" : ""}" data-i="${i}">
      <div class="thumb" style="background-image:url('${s.thumb}')"></div>
      <div class="play">▶</div>
      <div class="dot ${s.online ? "on" : ""}"></div>
      <div class="card-body">
        <h3>${s.name}</h3>
        <div class="meta"><span>🗺 ${s.map}</span><span>👥 ${s.players}/${s.max}</span></div>
      </div>
      <div class="card-foot"><span>📶 ${s.ip}</span><span class="connect">CONNECT →</span></div>
    </article>`).join("");

  list.querySelectorAll(".card").forEach(el => {
    el.addEventListener("click", () => {
      const i = Number(el.dataset.i);
      if (selected === i) {
        window.location.href = "steam://connect/" + SERVERS[i].ip;
        return;
      }
      selected = i;
      render();
      renderDetail();
    });
  });

  const totalPlayers = SERVERS.reduce((a, s) => a + s.players, 0);
  document.getElementById("statServers").textContent = SERVERS.length;
  document.getElementById("statPlayers").textContent = totalPlayers;
  document.getElementById("heroServers").textContent = SERVERS.length;
  document.getElementById("heroPlayers").textContent = totalPlayers;
}

function renderDetail() {
  if (selected === null) return;
  const s = SERVERS[selected];
  if (tab === "players") {
    const rows = Array.from({ length: Math.min(s.players, 8) }, (_, i) =>
      `<li><span>${NAMES[i % NAMES.length]}</span><span>${20 - i * 2} kills</span></li>`).join("");
    detail.innerHTML = `<div class="info"><h3>${s.name}</h3>
      <ul class="players">${rows || "<li><span>No players online</span><span>—</span></li>"}</ul></div>`;
    return;
  }
  detail.innerHTML = `<div class="info">
    <h3>${s.name}</h3>
    <div class="rows">
      <div class="row"><span>Status</span><span>${s.online ? "Online" : "Offline"}</span></div>
      <div class="row"><span>Map</span><span>${s.map}</span></div>
      <div class="row"><span>Players</span><span>${s.players}/${s.max}</span></div>
      <div class="row"><span>Address</span><span>${s.ip}</span></div>
      <div class="row"><span>Game</span><span>Counter-Strike 1.6</span></div>
    </div>
    <button class="btn" onclick="window.location.href='steam://connect/${s.ip}'">CONNECT NOW</button>
  </div>`;
}

document.querySelectorAll(".tabs .tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tabs .tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    tab = btn.dataset.tab;
    renderDetail();
  });
});

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  e.target.reset();
  document.getElementById("formOk").hidden = false;
});

document.getElementById("year").textContent = new Date().getFullYear();
render();