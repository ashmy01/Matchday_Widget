/* =============================================================
   World Cup Widget — shared data & logic
   Used by BOTH the website live preview and the generated Scriptable
   widget script, so the widget you see on the site matches the phone.
   ============================================================= */

/* -------------------------------------------------------------
   Teams — the 48 nations at the 2026 FIFA World Cup.
     `dark`  -> widget BACKGROUND
     `light` -> widget BORDER
     `text`  -> readable text colour on the dark background
     `iso`   -> flag image code (https://flagcdn.com/<iso>.svg)
     `flag`  -> emoji fallback used inside the on-phone widget
   ------------------------------------------------------------- */
export const TEAMS = [
  { code: "ARG", name: "Argentina",             iso: "ar",     dark: "#2C5FA8", light: "#A8D0F0", text: "#FFFFFF", flag: "🇦🇷" },
  { code: "ALG", name: "Algeria",               iso: "dz",     dark: "#0E7A3D", light: "#E0392F", text: "#FFFFFF", flag: "🇩🇿" },
  { code: "AUS", name: "Australia",             iso: "au",     dark: "#0B6E3B", light: "#F4D03F", text: "#FFFFFF", flag: "🇦🇺" },
  { code: "AUT", name: "Austria",               iso: "at",     dark: "#B3122B", light: "#F2F2F2", text: "#FFFFFF", flag: "🇦🇹" },
  { code: "BEL", name: "Belgium",               iso: "be",     dark: "#161616", light: "#F4D03F", text: "#FFFFFF", flag: "🇧🇪" },
  { code: "BIH", name: "Bosnia & Herzegovina",  iso: "ba",     dark: "#1B3A8C", light: "#F4D03F", text: "#FFFFFF", flag: "🇧🇦" },
  { code: "BRA", name: "Brazil",                iso: "br",     dark: "#1B7A3D", light: "#FFD93B", text: "#FFFFFF", flag: "🇧🇷" },
  { code: "CAN", name: "Canada",                iso: "ca",     dark: "#B01E2E", light: "#F2F2F2", text: "#FFFFFF", flag: "🇨🇦" },
  { code: "CPV", name: "Cape Verde",            iso: "cv",     dark: "#11457E", light: "#F4D03F", text: "#FFFFFF", flag: "🇨🇻" },
  { code: "COL", name: "Colombia",              iso: "co",     dark: "#1B3A8C", light: "#FCD116", text: "#FFFFFF", flag: "🇨🇴" },
  { code: "CRO", name: "Croatia",               iso: "hr",     dark: "#1A237E", light: "#E1342E", text: "#FFFFFF", flag: "🇭🇷" },
  { code: "CUW", name: "Curacao",               iso: "cw",     dark: "#0B379B", light: "#F9D616", text: "#FFFFFF", flag: "🇨🇼" },
  { code: "CZE", name: "Czechia",               iso: "cz",     dark: "#11457E", light: "#D7263D", text: "#FFFFFF", flag: "🇨🇿" },
  { code: "COD", name: "DR Congo",              iso: "cd",     dark: "#0E5BB0", light: "#F7D618", text: "#FFFFFF", flag: "🇨🇩" },
  { code: "ECU", name: "Ecuador",               iso: "ec",     dark: "#1B3A8C", light: "#FCD116", text: "#FFFFFF", flag: "🇪🇨" },
  { code: "EGY", name: "Egypt",                 iso: "eg",     dark: "#161616", light: "#E0392F", text: "#FFFFFF", flag: "🇪🇬" },
  { code: "ENG", name: "England",               iso: "gb-eng", dark: "#1B254A", light: "#E63946", text: "#FFFFFF", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { code: "FRA", name: "France",                iso: "fr",     dark: "#14215C", light: "#EF4135", text: "#FFFFFF", flag: "🇫🇷" },
  { code: "GER", name: "Germany",               iso: "de",     dark: "#171717", light: "#E6B23A", text: "#FFFFFF", flag: "🇩🇪" },
  { code: "GHA", name: "Ghana",                 iso: "gh",     dark: "#0E6B36", light: "#F4D03F", text: "#FFFFFF", flag: "🇬🇭" },
  { code: "HAI", name: "Haiti",                 iso: "ht",     dark: "#00209F", light: "#D21034", text: "#FFFFFF", flag: "🇭🇹" },
  { code: "IRN", name: "Iran",                  iso: "ir",     dark: "#1E7A3D", light: "#E0392F", text: "#FFFFFF", flag: "🇮🇷" },
  { code: "IRQ", name: "Iraq",                  iso: "iq",     dark: "#0E7A3D", light: "#E0392F", text: "#FFFFFF", flag: "🇮🇶" },
  { code: "CIV", name: "Ivory Coast",           iso: "ci",     dark: "#0E7A3D", light: "#F77F00", text: "#FFFFFF", flag: "🇨🇮" },
  { code: "JPN", name: "Japan",                 iso: "jp",     dark: "#0A2A66", light: "#D7263D", text: "#FFFFFF", flag: "🇯🇵" },
  { code: "JOR", name: "Jordan",                iso: "jo",     dark: "#161616", light: "#2E9E5B", text: "#FFFFFF", flag: "🇯🇴" },
  { code: "MEX", name: "Mexico",                iso: "mx",     dark: "#0B6E3B", light: "#E0392F", text: "#FFFFFF", flag: "🇲🇽" },
  { code: "MAR", name: "Morocco",               iso: "ma",     dark: "#7C1518", light: "#2E9E5B", text: "#FFFFFF", flag: "🇲🇦" },
  { code: "NED", name: "Netherlands",           iso: "nl",     dark: "#1B3A8C", light: "#F4762A", text: "#FFFFFF", flag: "🇳🇱" },
  { code: "NZL", name: "New Zealand",           iso: "nz",     dark: "#0A2A66", light: "#D7263D", text: "#FFFFFF", flag: "🇳🇿" },
  { code: "NOR", name: "Norway",                iso: "no",     dark: "#11457E", light: "#E0392F", text: "#FFFFFF", flag: "🇳🇴" },
  { code: "PAN", name: "Panama",                iso: "pa",     dark: "#0A2A66", light: "#D7263D", text: "#FFFFFF", flag: "🇵🇦" },
  { code: "PAR", name: "Paraguay",              iso: "py",     dark: "#0038A8", light: "#D52B1E", text: "#FFFFFF", flag: "🇵🇾" },
  { code: "POR", name: "Portugal",              iso: "pt",     dark: "#0E5C2F", light: "#EF3340", text: "#FFFFFF", flag: "🇵🇹" },
  { code: "QAT", name: "Qatar",                 iso: "qa",     dark: "#6A0F2B", light: "#F0E6EA", text: "#FFFFFF", flag: "🇶🇦" },
  { code: "KSA", name: "Saudi Arabia",          iso: "sa",     dark: "#0B5D2A", light: "#EAF3EC", text: "#FFFFFF", flag: "🇸🇦" },
  { code: "SCO", name: "Scotland",              iso: "gb-sct", dark: "#0A357E", light: "#EAF1FA", text: "#FFFFFF", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  { code: "SEN", name: "Senegal",               iso: "sn",     dark: "#0E6B36", light: "#F4D03F", text: "#FFFFFF", flag: "🇸🇳" },
  { code: "RSA", name: "South Africa",          iso: "za",     dark: "#0B6E3B", light: "#F4D03F", text: "#FFFFFF", flag: "🇿🇦" },
  { code: "KOR", name: "South Korea",           iso: "kr",     dark: "#18305E", light: "#D7263D", text: "#FFFFFF", flag: "🇰🇷" },
  { code: "ESP", name: "Spain",                 iso: "es",     dark: "#A4161A", light: "#FAC800", text: "#FFFFFF", flag: "🇪🇸" },
  { code: "SWE", name: "Sweden",                iso: "se",     dark: "#114B8F", light: "#FFCD00", text: "#FFFFFF", flag: "🇸🇪" },
  { code: "SUI", name: "Switzerland",           iso: "ch",     dark: "#B01E2E", light: "#F2F2F2", text: "#FFFFFF", flag: "🇨🇭" },
  { code: "TUN", name: "Tunisia",               iso: "tn",     dark: "#B3122B", light: "#F2F2F2", text: "#FFFFFF", flag: "🇹🇳" },
  { code: "TUR", name: "Turkey",                iso: "tr",     dark: "#B3122B", light: "#F2F2F2", text: "#FFFFFF", flag: "🇹🇷" },
  { code: "USA", name: "United States",         iso: "us",     dark: "#0A2A5E", light: "#D7263D", text: "#FFFFFF", flag: "🇺🇸" },
  { code: "URU", name: "Uruguay",               iso: "uy",     dark: "#2E6BB8", light: "#F2C200", text: "#FFFFFF", flag: "🇺🇾" },
  { code: "UZB", name: "Uzbekistan",            iso: "uz",     dark: "#1B3A8C", light: "#2E9E5B", text: "#FFFFFF", flag: "🇺🇿" },
];

export function teamByCode(code) {
  return TEAMS.find((t) => t.code === code) || null;
}

/* Real flag image URL for the website (crisp SVG). `size` is a
   flagcdn width bucket like "w40", "w160", "w320", or omit for SVG. */
export function flagUrl(iso, size) {
  if (!iso) return "";
  return size
    ? `https://flagcdn.com/${size}/${iso}.png`
    : `https://flagcdn.com/${iso}.svg`;
}

/* -------------------------------------------------------------
   Star player per team -> a real high-quality photo.
   Value is the Wikipedia article title; the website resolves it to
   a Commons image via the (CORS-enabled) Wikipedia API at runtime.
   ------------------------------------------------------------- */
export const PLAYERS = {
  ARG: "Lionel Messi",        ALG: "Riyad Mahrez",       AUS: "Mathew Ryan",
  AUT: "David Alaba",         BEL: "Kevin De Bruyne",    BIH: "Edin Džeko",
  BRA: "Vinícius Júnior",     CAN: "Alphonso Davies",    CPV: "Ryan Mendes",
  COL: "James Rodríguez",     CRO: "Luka Modrić",        CUW: "Leandro Bacuna",
  CZE: "Patrik Schick",       COD: "Yoane Wissa",        ECU: "Moisés Caicedo",
  EGY: "Mohamed Salah",       ENG: "Jude Bellingham",    FRA: "Kylian Mbappé",
  GER: "Jamal Musiala",       GHA: "Mohammed Kudus",     HAI: "Frantzdy Pierrot",
  IRN: "Mehdi Taremi",        IRQ: "Aymen Hussein",      CIV: "Sébastien Haller",
  JPN: "Takefusa Kubo",       JOR: "Musa Al-Taamari",    MEX: "Santiago Giménez",
  MAR: "Achraf Hakimi",       NED: "Virgil van Dijk",    NZL: "Chris Wood",
  NOR: "Erling Haaland",      PAN: "Adalberto Carrasquilla", PAR: "Miguel Almirón",
  POR: "Cristiano Ronaldo",   QAT: "Akram Afif",         KSA: "Salem Al-Dawsari",
  SCO: "Scott McTominay",     SEN: "Sadio Mané",         RSA: "Percy Tau",
  KOR: "Son Heung-min",       ESP: "Lamine Yamal",       SWE: "Alexander Isak",
  SUI: "Granit Xhaka",        TUN: "Youssef Msakni",     TUR: "Arda Güler",
  USA: "Christian Pulisic",   URU: "Federico Valverde",  UZB: "Eldor Shomurodov",
};

/* -------------------------------------------------------------
   World Cup trophy image (a REAL photo, not a drawing).
   This single link is hardcoded into every generated widget script,
   and the user can paste their own image URL in its place.
   ------------------------------------------------------------- */
// Phone script uses this URL. Google Drive blocks BROWSER hot-linking but
// Scriptable fetches it directly (a plain GET), so it works on the phone.
export const CUP_IMAGE_URL =
  "https://lh3.googleusercontent.com/d/1GY96T11UMM3P6fz_obDYVdlHZt8pDxXj=w1000";

// The website preview can't hot-link Drive, so it uses a local copy of the
// same image (downloaded into ./assets). Always loads, no Drive throttling.
export const CUP_IMAGE_PREVIEW = "assets/cup.png";

/* Resolve a Wikipedia article title to a Commons image URL. */
export async function wikiImage(title, size = 600) {
  const url =
    `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages` +
    `&piprop=thumbnail&pithumbsize=${size}&titles=${encodeURIComponent(title)}&origin=*`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    const page = Object.values(json.query.pages)[0];
    return (page && page.thumbnail && page.thumbnail.source) || "";
  } catch {
    return "";
  }
}

/* -------------------------------------------------------------
   Fixtures — the 2026 FIFA World Cup GROUP STAGE (all 72 matches).
   Source: Sky Sports day-by-day UK kick-off schedule. Times stored
   in UTC (UK summer time BST = UTC+1, so UTC = UK − 1 hour).
   A match is treated as "finished" ~115 minutes after kickoff.
   Knockout fixtures are added once the qualifying teams are known.
   ------------------------------------------------------------- */
export const MATCH_LENGTH_MIN = 115;

export const FIXTURES = [
  { id: "m01", kickoff: "2026-06-11T16:00:00Z", stage: "Group A", home: "MEX", away: "RSA" },
  { id: "m02", kickoff: "2026-06-12T18:00:00Z", stage: "Group A", home: "KOR", away: "CZE" },
  { id: "m03", kickoff: "2026-06-12T01:00:00Z", stage: "Group B", home: "CAN", away: "BIH" },
  { id: "m04", kickoff: "2026-06-13T01:00:00Z", stage: "Group D", home: "USA", away: "PAR" },
  { id: "m05", kickoff: "2026-06-13T04:00:00Z", stage: "Group B", home: "QAT", away: "SUI" },
  { id: "m06", kickoff: "2026-06-13T09:00:00Z", stage: "Group C", home: "BRA", away: "MAR" },
  { id: "m07", kickoff: "2026-06-14T03:00:00Z", stage: "Group C", home: "HAI", away: "SCO" },
  { id: "m08", kickoff: "2026-06-14T06:00:00Z", stage: "Group D", home: "AUS", away: "TUR" },
  { id: "m09", kickoff: "2026-06-14T17:00:00Z", stage: "Group E", home: "GER", away: "CUW" },
  { id: "m10", kickoff: "2026-06-14T20:00:00Z", stage: "Group F", home: "NED", away: "JPN" },
  { id: "m11", kickoff: "2026-06-14T23:00:00Z", stage: "Group E", home: "CIV", away: "ECU" },
  { id: "m12", kickoff: "2026-06-15T02:00:00Z", stage: "Group F", home: "SWE", away: "TUN" },
  { id: "m13", kickoff: "2026-06-15T16:00:00Z", stage: "Group H", home: "ESP", away: "CPV" },
  { id: "m14", kickoff: "2026-06-15T19:00:00Z", stage: "Group G", home: "BEL", away: "EGY" },
  { id: "m15", kickoff: "2026-06-15T22:00:00Z", stage: "Group H", home: "KSA", away: "URU" },
  { id: "m16", kickoff: "2026-06-16T01:00:00Z", stage: "Group G", home: "IRN", away: "NZL" },
  { id: "m17", kickoff: "2026-06-16T19:00:00Z", stage: "Group I", home: "FRA", away: "SEN" },
  { id: "m18", kickoff: "2026-06-16T22:00:00Z", stage: "Group I", home: "IRQ", away: "NOR" },
  { id: "m19", kickoff: "2026-06-17T01:00:00Z", stage: "Group J", home: "ARG", away: "ALG" },
  { id: "m20", kickoff: "2026-06-17T04:00:00Z", stage: "Group J", home: "AUT", away: "JOR" },
  { id: "m21", kickoff: "2026-06-17T17:00:00Z", stage: "Group K", home: "POR", away: "COD" },
  { id: "m22", kickoff: "2026-06-17T20:00:00Z", stage: "Group L", home: "ENG", away: "CRO" },
  { id: "m23", kickoff: "2026-06-17T23:00:00Z", stage: "Group L", home: "GHA", away: "PAN" },
  { id: "m24", kickoff: "2026-06-18T02:00:00Z", stage: "Group K", home: "UZB", away: "COL" },
  { id: "m25", kickoff: "2026-06-18T16:00:00Z", stage: "Group A", home: "CZE", away: "RSA" },
  { id: "m26", kickoff: "2026-06-18T19:00:00Z", stage: "Group B", home: "SUI", away: "BIH" },
  { id: "m27", kickoff: "2026-06-18T22:00:00Z", stage: "Group B", home: "CAN", away: "QAT" },
  { id: "m28", kickoff: "2026-06-19T01:00:00Z", stage: "Group A", home: "MEX", away: "KOR" },
  { id: "m29", kickoff: "2026-06-19T19:00:00Z", stage: "Group D", home: "USA", away: "AUS" },
  { id: "m30", kickoff: "2026-06-19T22:00:00Z", stage: "Group C", home: "SCO", away: "MAR" },
  { id: "m31", kickoff: "2026-06-20T00:30:00Z", stage: "Group C", home: "BRA", away: "HAI" },
  { id: "m32", kickoff: "2026-06-20T03:00:00Z", stage: "Group D", home: "TUR", away: "PAR" },
  { id: "m33", kickoff: "2026-06-20T17:00:00Z", stage: "Group F", home: "NED", away: "SWE" },
  { id: "m34", kickoff: "2026-06-20T20:00:00Z", stage: "Group E", home: "GER", away: "CIV" },
  { id: "m35", kickoff: "2026-06-21T00:00:00Z", stage: "Group E", home: "ECU", away: "CUW" },
  { id: "m36", kickoff: "2026-06-21T04:00:00Z", stage: "Group F", home: "TUN", away: "JPN" },
  { id: "m37", kickoff: "2026-06-21T16:00:00Z", stage: "Group H", home: "ESP", away: "KSA" },
  { id: "m38", kickoff: "2026-06-21T19:00:00Z", stage: "Group G", home: "BEL", away: "IRN" },
  { id: "m39", kickoff: "2026-06-21T22:00:00Z", stage: "Group H", home: "URU", away: "CPV" },
  { id: "m40", kickoff: "2026-06-22T01:00:00Z", stage: "Group G", home: "NZL", away: "EGY" },
  { id: "m41", kickoff: "2026-06-22T17:00:00Z", stage: "Group J", home: "ARG", away: "AUT" },
  { id: "m42", kickoff: "2026-06-22T21:00:00Z", stage: "Group I", home: "FRA", away: "IRQ" },
  { id: "m43", kickoff: "2026-06-23T00:00:00Z", stage: "Group I", home: "NOR", away: "SEN" },
  { id: "m44", kickoff: "2026-06-23T03:00:00Z", stage: "Group J", home: "JOR", away: "ALG" },
  { id: "m45", kickoff: "2026-06-23T17:00:00Z", stage: "Group K", home: "POR", away: "UZB" },
  { id: "m46", kickoff: "2026-06-23T20:00:00Z", stage: "Group L", home: "ENG", away: "GHA" },
  { id: "m47", kickoff: "2026-06-23T23:00:00Z", stage: "Group L", home: "PAN", away: "CRO" },
  { id: "m48", kickoff: "2026-06-24T02:00:00Z", stage: "Group K", home: "COL", away: "COD" },
  { id: "m49", kickoff: "2026-06-24T19:00:00Z", stage: "Group B", home: "SUI", away: "CAN" },
  { id: "m50", kickoff: "2026-06-24T19:00:00Z", stage: "Group B", home: "BIH", away: "QAT" },
  { id: "m51", kickoff: "2026-06-24T22:00:00Z", stage: "Group C", home: "MAR", away: "HAI" },
  { id: "m52", kickoff: "2026-06-24T22:00:00Z", stage: "Group C", home: "SCO", away: "BRA" },
  { id: "m53", kickoff: "2026-06-25T01:00:00Z", stage: "Group A", home: "RSA", away: "KOR" },
  { id: "m54", kickoff: "2026-06-25T01:00:00Z", stage: "Group A", home: "CZE", away: "MEX" },
  { id: "m55", kickoff: "2026-06-25T20:00:00Z", stage: "Group E", home: "CUW", away: "CIV" },
  { id: "m56", kickoff: "2026-06-25T20:00:00Z", stage: "Group E", home: "ECU", away: "GER" },
  { id: "m57", kickoff: "2026-06-25T23:00:00Z", stage: "Group F", home: "TUN", away: "NED" },
  { id: "m58", kickoff: "2026-06-25T23:00:00Z", stage: "Group F", home: "JPN", away: "SWE" },
  { id: "m59", kickoff: "2026-06-26T02:00:00Z", stage: "Group D", home: "TUR", away: "USA" },
  { id: "m60", kickoff: "2026-06-26T02:00:00Z", stage: "Group D", home: "PAR", away: "AUS" },
  { id: "m61", kickoff: "2026-06-26T19:00:00Z", stage: "Group I", home: "NOR", away: "FRA" },
  { id: "m62", kickoff: "2026-06-26T19:00:00Z", stage: "Group I", home: "SEN", away: "IRQ" },
  { id: "m63", kickoff: "2026-06-27T00:00:00Z", stage: "Group H", home: "CPV", away: "KSA" },
  { id: "m64", kickoff: "2026-06-27T00:00:00Z", stage: "Group H", home: "URU", away: "ESP" },
  { id: "m65", kickoff: "2026-06-27T03:00:00Z", stage: "Group G", home: "NZL", away: "BEL" },
  { id: "m66", kickoff: "2026-06-27T03:00:00Z", stage: "Group G", home: "EGY", away: "IRN" },
  { id: "m67", kickoff: "2026-06-27T21:00:00Z", stage: "Group L", home: "PAN", away: "ENG" },
  { id: "m68", kickoff: "2026-06-27T21:00:00Z", stage: "Group L", home: "CRO", away: "GHA" },
  { id: "m69", kickoff: "2026-06-27T23:30:00Z", stage: "Group K", home: "COL", away: "POR" },
  { id: "m70", kickoff: "2026-06-27T23:30:00Z", stage: "Group K", home: "COD", away: "UZB" },
  { id: "m71", kickoff: "2026-06-28T02:00:00Z", stage: "Group J", home: "ALG", away: "AUT" },
  { id: "m72", kickoff: "2026-06-28T02:00:00Z", stage: "Group J", home: "JOR", away: "ARG" },
];

/* -------------------------------------------------------------
   Widget logic — "what should the widget show right now".
   Pure function so it is identical on site & phone.
   ------------------------------------------------------------- */
export function computeWidget(now, config, fixtures = FIXTURES, timeZone, limit = 4) {
  const mode = config.mode === "team" ? "team" : "all";
  const teamCode = config.teamCode || null;

  let pool = fixtures.slice();
  if (mode === "team" && teamCode) {
    pool = pool.filter((m) => m.home === teamCode || m.away === teamCode);
  }
  pool.sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff));

  const endOf = (m) => new Date(new Date(m.kickoff).getTime() + MATCH_LENGTH_MIN * 60000);

  let selected;
  if (mode === "team") {
    // Follow my team: the team's NEXT upcoming matches (across the whole
    // tournament), rolling forward as each one finishes.
    selected = pool.filter((m) => endOf(m) > now);
  } else {
    // All matches: only TODAY and TOMORROW (the user's local days).
    const todayKey = localDayKey(now, timeZone);
    const tomorrowKey = localDayKey(new Date(now.getTime() + 24 * 3600 * 1000), timeZone);
    selected = pool.filter((m) => {
      if (endOf(m) <= now) return false;
      const dk = localDayKey(new Date(m.kickoff), timeZone);
      return dk === todayKey || dk === tomorrowKey;
    });
  }

  if (!selected.length) {
    return { empty: true, matches: [] };
  }

  const matches = selected.slice(0, limit).map((m) => ({
    ...m,
    kickoffDate: new Date(m.kickoff),
    state: matchState(now, m, endOf(m)),
  }));

  return { empty: false, matches };
}

/* True when a hex colour is predominantly red (so a red "live" dot would
   be invisible on it — use a black dot instead). */
export function isReddish(hex) {
  const h = (hex || "").replace("#", "");
  if (h.length < 6) return false;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return r > 100 && r > g * 1.5 && r > b * 1.5;
}

function matchState(now, m, end) {
  const start = new Date(m.kickoff);
  if (now < start) return "upcoming";
  if (now >= start && now < end) return "live";
  return "done";
}

/* ISO-like day key (YYYY-MM-DD) in a given time zone. */
export function localDayKey(date, timeZone) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/* Human label for a match's day:
   - today's matches show "Tonight" (early hours) or "Today"
   - any other day shows the explicit date, e.g. "17 Jun" */
export function dayLabel(now, kickoffISO, timeZone) {
  const k = new Date(kickoffISO);
  const dayKey = localDayKey(k, timeZone);
  const todayKey = localDayKey(now, timeZone);
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", hour12: false }).format(k)
  );

  if (dayKey === todayKey) return hour < 6 ? "Tonight" : "Today";

  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    day: "numeric",
    month: "short",
  }).format(k); // e.g. "17 Jun"
}

/* Format a kickoff time in the user's tz, e.g. "12:30 am". */
export function formatTime(date, timeZone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .toLowerCase();
}
