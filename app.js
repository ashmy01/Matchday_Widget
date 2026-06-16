import {
  TEAMS,
  FIXTURES,
  PLAYERS,
  CUP_IMAGE_URL,
  CUP_IMAGE_PREVIEW,
  teamByCode,
  computeWidget,
  formatTime,
  dayLabel,
  flagUrl,
  wikiImage,
  isReddish,
  MATCH_LENGTH_MIN,
} from "./src/data.js";
import { buildScript } from "./src/scriptable-template.js";

/* ---------- state ---------- */
const state = {
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
  teamCode: "ARG",
  mode: "all",
  bgStyle: "flag", // "flag" (blurred glass) | "solid"
};

/* The tournament is live, so the on-site preview uses the REAL current
   time — exactly like the widget will on the phone. */
const PREVIEW_NOW = new Date();

/* ---------- blurred flag mosaic background ---------- */
function initFlagBg() {
  const host = document.getElementById("flagBg");
  if (!host) return;
  const isos = TEAMS.map((t) => t.iso);
  const tiles = isos.slice(0, 24);
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  host.innerHTML = tiles
    .map((iso) => `<img src="${flagUrl(iso, "w160")}" alt="" />`)
    .join("");
}

/* ---------- time zone options ---------- */
const COMMON_TZS = [
  "Asia/Kolkata", "Asia/Dubai", "Asia/Singapore", "Asia/Tokyo",
  "Australia/Sydney", "Europe/London", "Europe/Paris", "Europe/Berlin",
  "Africa/Lagos", "Africa/Johannesburg", "America/New_York", "America/Chicago",
  "America/Denver", "America/Los_Angeles", "America/Mexico_City", "America/Sao_Paulo", "UTC",
];

function tzOffsetLabel(tz) {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz, timeZoneName: "shortOffset",
    }).formatToParts(new Date());
    const off = parts.find((p) => p.type === "timeZoneName");
    return off ? off.value : "";
  } catch {
    return "";
  }
}

/* Asia/Calcutta is the old alias of Asia/Kolkata — collapse to one. */
function normalizeTz(tz) {
  return tz === "Asia/Calcutta" ? "Asia/Kolkata" : tz;
}

function initTimeZones() {
  const sel = document.getElementById("tzSelect");
  state.timeZone = normalizeTz(state.timeZone);
  const list = [...new Set([state.timeZone, ...COMMON_TZS].map(normalizeTz))];
  sel.innerHTML = list
    .map((tz) => {
      const off = tzOffsetLabel(tz);
      const pretty = tz.replace(/_/g, " ");
      return `<option value="${tz}">${pretty}${off ? ` (${off})` : ""}</option>`;
    })
    .join("");
  sel.value = state.timeZone;
  document.getElementById("tzHint").textContent =
    `Detected: ${state.timeZone.replace(/_/g, " ")} — change it if it's wrong.`;
  sel.addEventListener("change", () => {
    state.timeZone = sel.value;
    render();
  });
}

/* ---------- teams ---------- */
function initTeams() {
  const sel = document.getElementById("teamSelect");
  sel.innerHTML = TEAMS.slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((t) => `<option value="${t.code}">${t.name}</option>`)
    .join("");
  sel.value = state.teamCode;
  sel.addEventListener("change", () => {
    state.teamCode = sel.value;
    render();
  });
}

/* small auto colour indicator under the team select */
function updateColourChip() {
  const el = document.getElementById("teamColours");
  if (!el) return;
  const t = teamByCode(state.teamCode);
  el.innerHTML =
    `<span class="cc" style="background:${t.dark}">Background</span>` +
    `<span class="cc" style="background:${t.light}; color:#10131f">Border</span>`;
}

/* ---------- mode ---------- */
/* keep the active highlight in sync for every segmented control */
function syncSegmented(group) {
  group.querySelectorAll(".seg").forEach((s) =>
    s.classList.toggle("active", s.querySelector("input").checked)
  );
}

function initMode() {
  document.querySelectorAll('input[name="mode"]').forEach((input) => {
    input.addEventListener("change", () => {
      state.mode = input.value;
      syncSegmented(input.closest(".segmented"));
      document.getElementById("modeHint").textContent =
        state.mode === "team"
          ? "Shows only your chosen team's matches for the day."
          : "Shows every match scheduled for the day.";
      render();
    });
  });

  // background style: blurred flag (glass) vs solid colour
  document.querySelectorAll('input[name="bg"]').forEach((input) => {
    input.addEventListener("change", () => {
      state.bgStyle = input.value;
      syncSegmented(input.closest(".segmented"));
      document.getElementById("bgHint").textContent =
        state.bgStyle === "solid"
          ? "A plain block of your team's colour."
          : "A blurred flag with a glass effect.";
      render();
    });
  });
}

/* ---------- player photo (real image of the team's star) ---------- */
const photoCache = new Map();
let playerToken = 0;

async function renderPlayer() {
  const stage = document.getElementById("playerStage");
  if (!stage) return;
  const team = teamByCode(state.teamCode);
  const player = PLAYERS[team.code] || team.name;
  const flag = flagUrl(team.iso, "w40");
  const token = ++playerToken;

  // frame with team colours + loading state
  stage.style.setProperty("--frame", team.light);
  stage.innerHTML = `
    <div class="player-photo loading" style="border-color:${team.light}; --flag-fallback:url('${flagUrl(team.iso, "w320")}')">
      <div class="player-spinner"></div>
      <div class="player-overlay">
        <span class="player-team"><img src="${flag}" alt="" /> ${team.name}</span>
        <span class="player-name">${player}</span>
      </div>
    </div>`;

  let src = photoCache.get(player);
  if (src === undefined) {
    src = await wikiImage(player, 600);
    photoCache.set(player, src);
  }
  if (token !== playerToken) return; // a newer selection won

  const photo = stage.querySelector(".player-photo");
  if (src) {
    const img = new Image();
    img.onload = () => {
      if (token !== playerToken) return;
      photo.style.backgroundImage = `url("${src}")`;
      photo.classList.remove("loading");
    };
    img.onerror = () => photo.classList.add("no-photo");
    img.src = src;
  } else {
    photo.classList.add("no-photo");
    photo.classList.remove("loading");
  }
}

/* ---------- widget rendering (HTML preview) ---------- */
function renderWidget(el, now) {
  const team = teamByCode(state.teamCode);
  el.style.setProperty("--wc-bg", team.dark);
  el.style.setProperty("--wc-border", team.light);
  el.style.setProperty("--wc-text", team.text);
  // background style: blurred flag (glassmorphic) or solid team colour
  if (state.bgStyle === "solid") {
    el.classList.add("solid");
  } else {
    el.classList.remove("solid");
    el.style.setProperty("--wc-flag", `url("${flagUrl(team.iso, "w320")}")`);
  }
  // live dot: bright red, but black on red backgrounds so it stays visible
  el.style.setProperty("--wc-livedot", isReddish(team.dark) ? "#000000" : "#ff2d2d");

  const result = computeWidget(now, { mode: state.mode, teamCode: state.teamCode }, FIXTURES, state.timeZone);
  const art =
    `<div class="wc-art">` +
    `<img class="cup-img" src="${CUP_IMAGE_PREVIEW}" alt="World Cup" onerror="this.classList.add('hide')" />` +
    `</div>`;

  if (result.empty) {
    el.innerHTML = art + `<div class="wc-body"><div class="wc-empty">No upcoming matches.</div></div>`;
    return;
  }

  // Render ALL matches; the panel scrolls when there are more than ~3.
  const rows = result.matches
    .map((m) => {
      const h = teamByCode(m.home);
      const a = teamByCode(m.away);
      const time = formatTime(m.kickoffDate, state.timeZone);
      const dl = dayLabel(now, m.kickoff, state.timeZone);
      const live = m.state === "live";
      // when live: a dot beside the word LIVE; otherwise the day · time
      const whenHtml = live
        ? `<span class="wc-live-dot" aria-hidden="true"></span><span class="live-text">LIVE</span>`
        : `${dl} · ${time}`;
      const side = (t, code) => `
        <span class="side">
          <img class="wc-flag" src="${t ? flagUrl(t.iso, "w40") : ""}" alt="" />
          <span class="name">${t ? t.name : code}</span>
        </span>`;
      return `<div class="wc-match ${live ? "live" : ""}">
        <div class="wc-teams">${side(h, m.home)}<span class="vs">vs</span>${side(a, m.away)}</div>
        <div class="wc-when">${whenHtml}</div>
      </div>`;
    })
    .join("");

  el.innerHTML =
    art +
    `<div class="wc-body">
      <div class="wc-matches">${rows}</div>
    </div>`;
}

function render() {
  const hero = document.getElementById("heroWidget");
  const builder = document.getElementById("builderWidget");
  if (hero) renderWidget(hero, PREVIEW_NOW);
  if (builder) renderWidget(builder, PREVIEW_NOW);
  updateColourChip();
  renderPlayer();
  updateScript();
}

/* ---------- script output ---------- */
function updateScript() {
  const team = teamByCode(state.teamCode);
  const script = buildScript({
    timeZone: state.timeZone,
    team,
    mode: state.mode,
    bgStyle: state.bgStyle,
    teams: TEAMS,
    fixtures: FIXTURES,
    cupImage: CUP_IMAGE_URL,
    matchLengthMin: MATCH_LENGTH_MIN,
  });
  document.getElementById("scriptOut").textContent = script;
}

function initCopy() {
  document.getElementById("copyBtn").addEventListener("click", async () => {
    const text = document.getElementById("scriptOut").textContent;
    try {
      await navigator.clipboard.writeText(text);
      toast("Script copied — paste it into Scriptable");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      toast("Script copied");
    }
  });
}

let toastTimer;
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ---------- boot ---------- */
initFlagBg();
initTimeZones();
initTeams();
initMode();
initCopy();
render();
