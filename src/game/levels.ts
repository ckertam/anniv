/**
 * Tile legend:
 * 0 = grass/floor (walkable)
 * 1 = wall/solid
 * 2 = water (not walkable)
 * 3 = sand (walkable)
 * 4 = wood floor (walkable)
 * 5 = road (walkable)
 * 6 = stone floor (walkable)
 * 7 = tree (not walkable, decorative)
 * 8 = exit door (walkable, triggers next level when unlocked)
 * 9 = snow (walkable)
 */

export interface InteractiveObject {
  x: number
  y: number
  emoji: string
  text: string
  found?: boolean
}

export interface LevelConfig {
  month: number
  city: string
  title: string
  story: string
  emoji: string
  skyColor: string
  map: number[][]
  objects: InteractiveObject[]
  spawnX: number
  spawnY: number
  exitX: number
  exitY: number
}

const W = 1  // wall
const G = 0  // grass
const S = 3  // sand
const F = 4  // wood floor
const R = 5  // road
const T = 7  // tree
const X = 8  // exit
const WA = 2 // water
const ST = 6 // stone
const SN = 9 // snow

const levels: LevelConfig[] = [
  // ── AY 1: Kadıköy buluşması ──
  {
    month: 1,
    city: 'Kadıköy, İstanbul',
    title: 'Tanıştık!',
    story: 'Kadıköy\'de tanıştık, seni trenden aldım, evinde sabaha kadar şarap içip şarkı söyledik...',
    emoji: '🍷',
    skyColor: '#2c1654',
    map: [
      [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
      [W, R, R, R, R, R, R, R, R, R, R, R, R, R, X, W],
      [W, R, G, G, G, R, W, W, W, W, R, G, G, G, R, W],
      [W, R, G, G, G, R, W, F, F, W, R, G, G, G, R, W],
      [W, R, G, G, G, R, W, F, F, W, R, G, T, G, R, W],
      [W, R, R, R, R, R, R, F, F, R, R, R, R, R, R, W],
      [W, G, G, R, G, G, R, W, W, R, G, G, R, G, G, W],
      [W, G, T, R, G, G, R, R, R, R, G, G, R, T, G, W],
      [W, G, G, R, G, G, G, R, G, G, G, G, R, G, G, W],
      [W, R, R, R, R, R, R, R, R, R, R, R, R, R, R, W],
      [W, R, G, G, G, G, G, R, G, G, G, G, G, G, R, W],
      [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
    ],
    objects: [
      { x: 1, y: 9, emoji: '🚂', text: 'Seni trenden aldım. İlk defa adam akıllı görüşecektik...' },
      { x: 8, y: 3, emoji: '🍷', text: '[BURAYA YAZILACAK — şarap gecesi anısı]' },
      { x: 4, y: 3, emoji: '🎵', text: '[BURAYA YAZILACAK — şarkı söyleme anısı]' },
      { x: 12, y: 7, emoji: '🌙', text: 'Sabaha kadar oturmak... Ve her şey böyle başladı.' },
    ],
    spawnX: 1, spawnY: 10,
    exitX: 14, exitY: 1,
  },

  // ── AY 2: Bozcaada ──
  {
    month: 2,
    city: 'Bozcaada',
    title: 'Doğum Günün!',
    story: 'Senin doğum günün için Bozcaada\'ya gittik! 17 Mayıs.',
    emoji: '🎂',
    skyColor: '#4facfe',
    map: [
      [WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA],
      [WA,WA,WA,S, S, S, S, S, S, S, S, S, S, WA,WA,WA],
      [WA,WA,S, S, G, G, G, G, G, G, G, G, S, S, WA,WA],
      [WA,S, S, G, G, G, T, G, G, T, G, G, G, S, S, WA],
      [WA,S, G, G, G, G, G, G, G, G, G, G, G, G, S, WA],
      [WA,S, G, G, T, G, G, G, G, G, G, T, G, G, S, WA],
      [WA,S, G, G, G, G, G, G, G, G, G, G, G, G, S, WA],
      [WA,S, S, G, G, G, G, G, G, G, G, G, G, S, S, WA],
      [WA,WA,S, S, G, G, G, G, G, G, G, G, S, S, WA,WA],
      [WA,WA,WA,S, S, S, S, S, S, S, S, S, S, WA,WA,WA],
      [WA,WA,WA,WA,S, S, S, X, S, S, S, WA,WA,WA,WA,WA],
      [WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA],
    ],
    objects: [
      { x: 7, y: 4, emoji: '🎂', text: 'Doğum günün kutlu olsun! 17 Mayıs, bu adada...' },
      { x: 3, y: 3, emoji: '🍇', text: '[BURAYA YAZILACAK — üzüm bağları anısı]' },
      { x: 11, y: 5, emoji: '🌅', text: '[BURAYA YAZILACAK — gün batımı anısı]' },
      { x: 7, y: 7, emoji: '🍷', text: '[BURAYA YAZILACAK — Bozcaada şarap anısı]' },
    ],
    spawnX: 7, spawnY: 2,
    exitX: 7, exitY: 10,
  },

  // ── AY 3: ODTÜ ──
  {
    month: 3,
    city: 'ODTÜ, Ankara',
    title: 'Kampüs Macerası',
    story: 'Beraber ODTÜ\'ye gittik! Kampüsün yeşilliklerinde kaybolmak...',
    emoji: '🎓',
    skyColor: '#87ceeb',
    map: [
      [T, T, T, T, T, G, G, G, G, G, T, T, T, T, T, T],
      [T, G, G, G, T, G, G, G, G, G, G, T, G, G, G, T],
      [T, G, G, G, G, G, G,WA,WA, G, G, G, G, G, G, T],
      [T, G, G, G, G, G,WA,WA,WA,WA, G, G, G, G, G, T],
      [G, G, G, T, G, G,WA,WA,WA,WA, G, G, T, G, G, G],
      [G, G, G, G, G, G, G,WA,WA, G, G, G, G, G, G, G],
      [G, G, T, G, G, G, G, G, G, G, G, G, G, T, G, G],
      [T, G, G, G, G, G, G, G, G, G, G, G, G, G, G, T],
      [T, G, G, G, T, G, G, G, G, G, G, T, G, G, G, T],
      [T, G, G, G, G, G, G, G, G, G, G, G, G, G, G, T],
      [T, T, G, G, G, G, G, G, G, G, G, G, G, G, X, T],
      [T, T, T, T, T, T, G, G, G, G, T, T, T, T, T, T],
    ],
    objects: [
      { x: 7, y: 3, emoji: '🦌', text: 'ODTÜ geyiği! Kampüste her yerde bunlar var.' },
      { x: 3, y: 6, emoji: '🌳', text: '[BURAYA YAZILACAK — kampüs yürüyüşü anısı]' },
      { x: 12, y: 4, emoji: '📸', text: '[BURAYA YAZILACAK — ODTÜ fotoğraf anısı]' },
    ],
    spawnX: 6, spawnY: 11,
    exitX: 14, exitY: 10,
  },

  // ── AY 4: İstanbul Ev ──
  {
    month: 4,
    city: 'İstanbul',
    title: 'Evde Güzel',
    story: 'Sakin bir ay. Evde birlikte vakit geçirmek, dizi izlemek...',
    emoji: '🏠',
    skyColor: '#ffecd2',
    map: [
      [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
      [W, F, F, F, F, W, F, F, F, F, W, F, F, F, F, W],
      [W, F, F, F, F, W, F, F, F, F, W, F, F, F, F, W],
      [W, F, F, F, F, F, F, F, F, F, W, F, F, F, F, W],
      [W, F, F, F, F, W, F, F, F, F, W, F, F, F, F, W],
      [W, W, W, F, W, W, F, F, F, F, W, W, F, W, W, W],
      [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
      [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
      [W, W, W, F, W, W, F, F, F, F, W, W, F, W, W, W],
      [W, F, F, F, F, W, F, F, F, F, W, F, F, F, F, W],
      [W, F, F, F, F, W, F, F, F, F, W, F, F, F, X, W],
      [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
    ],
    objects: [
      { x: 2, y: 2, emoji: '📺', text: '[BURAYA YAZILACAK — dizi izleme anısı]' },
      { x: 8, y: 2, emoji: '🍳', text: '[BURAYA YAZILACAK — yemek yapma anısı]' },
      { x: 13, y: 2, emoji: '💍', text: 'Arkadaşının nişanına gittik! Güzel bir geceydi.' },
      { x: 7, y: 7, emoji: '🛋️', text: '[BURAYA YAZILACAK — ev anısı]' },
    ],
    spawnX: 3, spawnY: 6,
    exitX: 14, exitY: 10,
  },

  // ── AY 5: Ankara / Ağva / Düğün ──
  {
    month: 5,
    city: 'Ankara / Ağva',
    title: 'Düğünler & Maceralar',
    story: 'Ankara\'da düğün + pavyon 😂 Ağva\'da sahil, Fenerbahçe\'de nikâh şahitliği!',
    emoji: '💃',
    skyColor: '#0c0c3a',
    map: [
      [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
      [W, ST,ST,ST,ST, W, R, R, R, R, W, S, S, S, S, W],
      [W, ST,ST,ST,ST, W, R, R, R, R, W, S, S, S, S, W],
      [W, ST,ST,ST,ST, W, R, R, R, R, W, S, S, S, S, W],
      [W, ST,ST,ST,ST, W, R, R, R, R, W, S, S, S, S, W],
      [W, W, W, ST,W, W, R, R, R, R, W, W, S, W, W, W],
      [W, R, R, R, R, R, R, R, R, R, R, R, R, R, R, W],
      [W, R, R, R, R, R, R, R, R, R, R, R, R, R, R, W],
      [W, W, W, R, W, W, R, R, R, R, W, W, R, W, W, W],
      [W, ST,ST,R, ST,ST, R, R, R, R, ST,ST, R, S, S, W],
      [W, ST,ST,R, ST,X, R, R, R, R, ST,ST, R, S, S, W],
      [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
    ],
    objects: [
      { x: 2, y: 2, emoji: '💒', text: 'Ankara\'da düğüne gittik! Güzel bir geceydi.' },
      { x: 8, y: 2, emoji: '🎤', text: '[BURAYA YAZILACAK — pavyon macerası 😂]' },
      { x: 13, y: 2, emoji: '🏖️', text: 'Ağva\'da 2 gün sahilde konakladık. Ne güzeldi...' },
      { x: 2, y: 9, emoji: '💍', text: 'Fenerbahçe\'de nikâh şahidi oldum! En yakın arkadaşım...' },
      { x: 13, y: 9, emoji: '🌊', text: '[BURAYA YAZILACAK — Ağva sahil anısı]' },
    ],
    spawnX: 7, spawnY: 7,
    exitX: 5, exitY: 10,
  },

  // ── AY 6: Diyarbakır / Mardin ──
  {
    month: 6,
    city: 'Diyarbakır / Mardin',
    title: 'Güneydoğu Keşfi',
    story: 'Diyarbakır\'da düğüne gittik, Mardin\'i gezdik. Taş sokaklar, güneş, lezzetler!',
    emoji: '🏛️',
    skyColor: '#f9a825',
    map: [
      [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
      [W, ST,ST,ST, W, ST,ST,ST,ST,ST,ST, W, ST,ST,ST, W],
      [W, ST,ST,ST, W, ST,ST,ST,ST,ST,ST, W, ST,ST,ST, W],
      [W, ST,ST,ST,ST,ST,ST,ST,ST,ST,ST,ST,ST,ST,ST, W],
      [W, W, W, ST,W, W, ST,ST,ST,ST, W, W, ST,W, W, W],
      [W, ST,ST,ST,ST,ST,ST,ST,ST,ST,ST,ST,ST,ST,ST, W],
      [W, ST,ST,ST,ST,ST,ST,ST,ST,ST,ST,ST,ST,ST,ST, W],
      [W, W, W, ST,W, W, ST,ST,ST,ST, W, W, ST,W, W, W],
      [W, ST,ST,ST,ST,ST,ST,ST,ST,ST,ST,ST,ST,ST,ST, W],
      [W, ST,ST,ST, W, ST,ST,ST,ST,ST,ST, W, ST,ST,ST, W],
      [W, ST,ST,ST, W, ST,ST,ST,X, ST,ST, W, ST,ST,ST, W],
      [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
    ],
    objects: [
      { x: 2, y: 2, emoji: '💒', text: 'Diyarbakır\'da düğün! Güneydoğu sıcağı...' },
      { x: 8, y: 3, emoji: '🧱', text: 'Mardin taş sokakları... Burası başka bir dünya.' },
      { x: 13, y: 2, emoji: '🍖', text: '[BURAYA YAZILACAK — yemek anısı, ciğer/kebap?]' },
      { x: 5, y: 6, emoji: '☀️', text: '[BURAYA YAZILACAK — Güneydoğu anısı]' },
      { x: 13, y: 9, emoji: '📸', text: '[BURAYA YAZILACAK — fotoğraf anısı]' },
    ],
    spawnX: 2, spawnY: 5,
    exitX: 8, exitY: 10,
  },

  // ── AY 7: Kaş ──
  {
    month: 7,
    city: 'Balıkesir / Kaş',
    title: 'Doğum Günüm!',
    story: 'Balıkesir\'de düğün, Kaş\'ta infinity pool\'lu ev! 14 Ekim — benim doğum günüm.',
    emoji: '🌊',
    skyColor: '#00b4d8',
    map: [
      [WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA],
      [WA,WA,WA,WA, S, S, S, S, S, S, S, S,WA,WA,WA,WA],
      [WA,WA, S, S, S, G, G, G, G, G, G, S, S, S,WA,WA],
      [WA, S, S, G, G, G, G, G, G, G, G, G, G, S, S,WA],
      [WA, S, G, G, G, G,WA,WA,WA,WA, G, G, G, G, S,WA],
      [WA, S, G, G, G, G,WA,WA,WA,WA, G, G, G, G, S,WA],
      [WA, S, G, G, G, G, G, G, G, G, G, G, G, G, S,WA],
      [WA, S, S, G, G, G, G, G, G, G, G, G, G, S, S,WA],
      [WA,WA, S, S, G, G, G, G, G, G, G, G, S, S,WA,WA],
      [WA,WA,WA, S, S, S, S, S, S, S, S, S, S,WA,WA,WA],
      [WA,WA,WA,WA, S, S, S, X, S, S, S,WA,WA,WA,WA,WA],
      [WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA],
    ],
    objects: [
      { x: 7, y: 4, emoji: '🏊', text: 'Infinity pool! Burası cennet gibiydi.' },
      { x: 3, y: 3, emoji: '🎂', text: '14 Ekim — Doğum günüm! En güzel hediye sendin.' },
      { x: 11, y: 6, emoji: '💒', text: 'Balıkesir\'de de bir düğün vardı tabii ki 😄' },
      { x: 7, y: 7, emoji: '🌅', text: '[BURAYA YAZILACAK — Kaş gün batımı anısı]' },
    ],
    spawnX: 7, spawnY: 2,
    exitX: 7, exitY: 10,
  },

  // ── AY 8: Yoğun Kasım ──
  {
    month: 8,
    city: 'İstanbul',
    title: 'Yoğun Kasım',
    story: 'E-ticaret çıldırıyor! Ama yine de vakit bulduk: saç, kahvaltı, bebek ziyareti...',
    emoji: '💼',
    skyColor: '#636e72',
    map: [
      [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
      [W, F, F, F, W, F, F, F, F, W, F, F, F, F, F, W],
      [W, F, F, F, W, F, F, F, F, W, F, F, F, F, F, W],
      [W, F, F, F, F, F, F, F, F, W, F, F, F, F, F, W],
      [W, W, W, F, W, W, W, F, W, W, W, F, W, W, W, W],
      [W, R, R, R, R, R, R, R, R, R, R, R, R, R, R, W],
      [W, R, R, R, R, R, R, R, R, R, R, R, R, R, R, W],
      [W, W, W, R, W, W, W, R, W, W, W, R, W, W, W, W],
      [W, G, G, R, G, G, W, R, W, G, G, R, G, G, G, W],
      [W, G, G, R, G, G, W, R, W, G, G, R, G, G, G, W],
      [W, G, G, R, G, G, W, R, W, G, G, R, G, G, X, W],
      [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
    ],
    objects: [
      { x: 2, y: 2, emoji: '💻', text: 'Kasım = e-ticaret çılgınlığı. Ama seni ihmal etmedim!' },
      { x: 7, y: 2, emoji: '💇', text: 'Saçını kısa kestirdin! Çok yakıştı.' },
      { x: 13, y: 2, emoji: '👶', text: 'Arkadaşımızın bebeğini gördük. Çok tatlıydı!' },
      { x: 4, y: 9, emoji: '🍳', text: 'GS Ada\'da kahvaltı! Manzara harikaydı.' },
    ],
    spawnX: 7, spawnY: 6,
    exitX: 14, exitY: 10,
  },

  // ── AY 9: Araba ──
  {
    month: 9,
    city: 'İstanbul',
    title: 'Şoför Oldun!',
    story: 'Araba kullanmaya başladın! Ve baya iyi kullanıyorsun.',
    emoji: '🚗',
    skyColor: '#74b9ff',
    map: [
      [G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G],
      [G, G, T, G, R, R, R, R, R, R, R, R, G, T, G, G],
      [G, G, G, G, R, G, G, G, G, G, G, R, G, G, G, G],
      [G, T, G, G, R, G, T, G, G, T, G, R, G, G, T, G],
      [G, G, G, G, R, G, G, G, G, G, G, R, G, G, G, G],
      [R, R, R, R, R, G, G, G, G, G, G, R, R, R, R, R],
      [G, G, G, G, R, G, G, G, G, G, G, R, G, G, G, G],
      [G, T, G, G, R, G, G, T, G, G, G, R, G, G, T, G],
      [G, G, G, G, R, G, G, G, G, G, G, R, G, G, G, G],
      [G, G, G, G, R, R, R, R, R, R, R, R, G, G, G, G],
      [G, G, T, G, G, G, G, G, G, G, G, G, G, T, G, X],
      [G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G],
    ],
    objects: [
      { x: 7, y: 1, emoji: '🚗', text: 'Araba kullanmaya başladın! İlk sürüşü unutmam.' },
      { x: 4, y: 5, emoji: '🚦', text: '[BURAYA YAZILACAK — trafik/sürüş anısı]' },
      { x: 11, y: 5, emoji: '🛣️', text: '[BURAYA YAZILACAK — yolculuk anısı]' },
    ],
    spawnX: 0, spawnY: 5,
    exitX: 15, exitY: 10,
  },

  // ── AY 10: Sapanca ──
  {
    month: 10,
    city: 'Sapanca',
    title: 'Zor Ama Beraber',
    story: 'Zor bir ay. Ama hep yanındaydık. Sapanca\'da bungalovlar, yılbaşı...',
    emoji: '🏕️',
    skyColor: '#2d3436',
    map: [
      [T, T, T, T, T, T, T, SN,SN, T, T, T, T, T, T, T],
      [T, SN,SN,SN, T, SN,SN,SN,SN,SN,SN, T, SN,SN,SN, T],
      [T, SN,SN,SN,SN,SN,SN,SN,SN,SN,SN,SN,SN,SN,SN, T],
      [T, SN,SN,SN,SN,SN, W, W, W, W,SN,SN,SN,SN,SN, T],
      [T, SN,SN,SN,SN,SN, W, F, F, W,SN,SN,SN,SN,SN, T],
      [T, SN,SN,SN,SN,SN, W, F, F, W,SN,SN,SN,SN,SN, T],
      [T, SN,SN,SN,SN,SN,SN, F,SN,SN,SN,SN,SN,SN,SN, T],
      [T, SN,SN,SN,SN,SN,SN,SN,SN,SN,SN,SN,SN,SN,SN, T],
      [T, SN,SN,SN, T,SN,SN,SN,SN,SN,SN, T,SN,SN,SN, T],
      [T, SN,SN,SN,SN,SN,SN,SN,SN,SN,SN,SN,SN,SN,SN, T],
      [T, SN,SN,SN,SN,SN,SN,SN, X,SN,SN,SN,SN,SN,SN, T],
      [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
    ],
    objects: [
      { x: 7, y: 4, emoji: '🏕️', text: 'Sapanca bungalovları. Ablan, annem, ben — hep yanındaydık.' },
      { x: 3, y: 2, emoji: '🎄', text: 'Yılbaşını beraber geçirdik! İlk yılbaşımız.' },
      { x: 12, y: 2, emoji: '❤️‍🩹', text: 'Zor günlerdi ama birlikte atlatamayacağımız şey yok.' },
      { x: 7, y: 8, emoji: '🌲', text: '[BURAYA YAZILACAK — Sapanca/doğa anısı]' },
    ],
    spawnX: 7, spawnY: 0,
    exitX: 8, exitY: 10,
  },

  // ── AY 11: Leo ──
  {
    month: 11,
    city: 'İstanbul',
    title: 'Hoş Geldin Leo!',
    story: 'Leo\'yu sahiplendik! Parvo oldu ama atlattı. Ailemizdeki en tatlı üye.',
    emoji: '🐾',
    skyColor: '#fdcb6e',
    map: [
      [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
      [W, F, F, F, F, F, W, G, G, G, G, G, G, G, G, W],
      [W, F, F, F, F, F, W, G, G, G, G, G, G, G, G, W],
      [W, F, F, F, F, F, W, G, G, G, T, G, G, G, G, W],
      [W, F, F, F, F, F, F, G, G, G, G, G, G, G, G, W],
      [W, F, F, F, F, F, W, G, G, G, G, G, T, G, G, W],
      [W, W, W, F, W, W, W, G, G, G, G, G, G, G, G, W],
      [W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, W],
      [W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, W],
      [W, G, T, G, G, G, G, G, G, G, G, G, G, T, G, W],
      [W, G, G, G, G, G, G, G, G, G, G, G, G, G, X, W],
      [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
    ],
    objects: [
      { x: 3, y: 2, emoji: '🐶', text: 'Leo\'yu sahiplendik! İlk gün ne kadar korkmuştu...' },
      { x: 10, y: 3, emoji: '🏥', text: 'Parvo olduğunu öğrendik. Veterinere git gel...' },
      { x: 3, y: 5, emoji: '🦴', text: '[BURAYA YAZILACAK — Leo anısı]' },
      { x: 12, y: 8, emoji: '🐾', text: 'Ama şimdi bomba gibi! Ailemizdeki en tatlı üye.' },
    ],
    spawnX: 3, spawnY: 7,
    exitX: 14, exitY: 10,
  },

  // ── AY 12: Yeni Ev + KFC ──
  {
    month: 12,
    city: 'İstanbul',
    title: 'Yeni Başlangıç',
    story: 'Yeni ev, Leo dışarıda, ilk KFC! Yeni sayfa, aynı aşk.',
    emoji: '🏡',
    skyColor: '#fd79a8',
    map: [
      [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
      [W, F, F, F, F, F, W, F, F, F, F, F, F, F, F, W],
      [W, F, F, F, F, F, W, F, F, F, F, F, F, F, F, W],
      [W, F, F, F, F, F, W, F, F, F, F, F, F, F, F, W],
      [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
      [W, W, W, W, F, W, W, W, W, W, W, W, F, W, W, W],
      [W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, W],
      [W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, W],
      [W, G, G, T, G, G, G, G, G, G, G, G, T, G, G, W],
      [W, G, G, G, G, G, G, R, R, G, G, G, G, G, G, W],
      [W, G, G, G, G, G, G, R, X, G, G, G, G, G, G, W],
      [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
    ],
    objects: [
      { x: 3, y: 2, emoji: '📦', text: 'Taşınma günü! Artık ev sadece senin değil, bizim.' },
      { x: 10, y: 2, emoji: '🏡', text: '[BURAYA YAZILACAK — yeni ev anısı]' },
      { x: 3, y: 7, emoji: '🐾', text: 'Leo artık dışarı çıkıyor! Parkta koşturuyor.' },
      { x: 12, y: 7, emoji: '🍗', text: 'KFC Türkiye\'ye geldi! İlk kez birlikte gittik. EFSANE.' },
    ],
    spawnX: 4, spawnY: 4,
    exitX: 8, exitY: 10,
  },
]

export default levels
