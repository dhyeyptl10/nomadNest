// ─── Central Image Registry ────────────────────────────────────────────
// Using picsum.photos (Lorem Picsum) — completely free, no API key, no CORS
// Format: https://picsum.photos/seed/{seed}/width/height

const IMG = (seed, w = 600, h = 400) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

// ── Destinations ──────────────────────────────────────────────────────
export const DEST_IMGS = {
  maldives:    IMG('maldives',    600, 420),
  santorini:   IMG('santorini',   600, 420),
  swissAlps:   IMG('swissalps',   600, 420),
  bali:        IMG('bali',        600, 420),
  machuPicchu: IMG('machu',       600, 420),
  kyoto:       IMG('kyoto',       600, 420),
  serengeti:   IMG('serengeti',   600, 420),
  amalfi:      IMG('amalfi',      600, 420),
  patagonia:   IMG('patagonia',   600, 420),
  newYork:     IMG('newyork',     600, 420),
  ladakh:      IMG('ladakh',      600, 420),
  queenstown:  IMG('queenstown',  600, 420),
}

// ── Trip destinations ─────────────────────────────────────────────────
export const TRIP_IMGS = {
  bali:        IMG('bali',        600, 420),
  santorini:   IMG('santorini',   600, 420),
  kyoto:       IMG('kyoto',       600, 420),
  goa:         IMG('goa',         600, 420),
  swissAlps:   IMG('swissalps',   600, 420),
  maldives:    IMG('maldives',    600, 420),
  switzerland: IMG('zurich',      600, 420),
  thailand:    IMG('thailand',    600, 420),
}

// ── Experiences ───────────────────────────────────────────────────────
export const EXP_IMGS = {
  balloon:     IMG('balloon',     600, 420),
  spa:         IMG('spa',         600, 420),
  scuba:       IMG('scuba',       600, 420),
  pasta:       IMG('rome',        600, 420),
  northernLights: IMG('iceland',  600, 420),
  sushi:       IMG('tokyo',       600, 420),
}

// ── Dashboard hero / small ────────────────────────────────────────────
export const HERO_IMG     = IMG('adventure', 1400, 700)
export const HERO_SMALL_A = IMG('waterfall', 300, 400)
export const HERO_SMALL_B = IMG('paris',     300, 370)

// ── Recommended cards ─────────────────────────────────────────────────
export const REC_IMGS = {
  maldives:    IMG('maldives',    600, 420),
  switzerland: IMG('zurich',      600, 420),
  greece:      IMG('santorini',   600, 420),
  bali:        IMG('bali',        600, 420),
}

// ── Adventure section ─────────────────────────────────────────────────
export const ADV_MOUNTAIN  = IMG('mountains', 700, 440)
export const ADV_NIGHT_SKY = IMG('milkyway',  700, 440)

// ── Stat card thumbnails ──────────────────────────────────────────────
export const STAT_IMGS = [
  IMG('globe',    120, 120),
  IMG('flight',   120, 120),
  IMG('calendar', 120, 120),
  IMG('compass',  120, 120),
]

// ── Destinations hero banner ──────────────────────────────────────────
export const DEST_HERO = IMG('travel', 1400, 500)

// ── Info strip — next trip thumb ─────────────────────────────────────
export const NEXT_TRIP_THUMB = IMG('bali', 120, 120)

// ── Sidebar / user avatar ─────────────────────────────────────────────
export const AVATAR = IMG('portrait', 80, 80)

// ── Explore section ───────────────────────────────────────────────────
export const EXPLORE_IMGS = [
  IMG('amalfi',   500, 380),
  IMG('machu',    500, 380),
  IMG('maldives', 500, 380),
]

// ── Login page ────────────────────────────────────────────────────────
export const LOGIN_BG   = IMG('mountains', 1400, 900)
export const LOGIN_THUMB = IMG('bali',      120, 120)
