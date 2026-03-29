export interface HotspotData {
  id: string
  x: string
  y: string
  emoji: string
  title: string
  text: string
  photo?: string
}

export interface SceneData {
  month: number
  city: string
  title: string
  bgGradient: string
  ambientColor: string
  decorEmojis: string[]
  hotspots: HotspotData[]
}

const scenes: SceneData[] = [
  {
    month: 1,
    city: 'Kadıköy, İstanbul',
    title: 'Tanıştık!',
    bgGradient: 'linear-gradient(135deg, #1a1a3e 0%, #2c1654 40%, #4a1942 100%)',
    ambientColor: 'rgba(147, 51, 234, 0.15)',
    decorEmojis: ['✨', '🌙', '🌟', '💫'],
    hotspots: [
      { id: '1-1', x: '20%', y: '35%', emoji: '🚂', title: 'Tren', text: 'Seni trenden aldım. İlk defa adam akıllı görüşecektik...' },
      { id: '1-2', x: '70%', y: '25%', emoji: '🍷', title: 'Şarap Gecesi', text: '[BURAYA YAZILACAK — şarap gecesi anısı]' },
      { id: '1-3', x: '45%', y: '60%', emoji: '🎵', title: 'Şarkılar', text: '[BURAYA YAZILACAK — sabaha kadar şarkı söyleme anısı]' },
      { id: '1-4', x: '80%', y: '65%', emoji: '🌙', title: 'Sabaha Kadar', text: 'Sabaha kadar oturmak... Ve her şey böyle başladı.' },
    ],
  },
  {
    month: 2,
    city: 'Bozcaada',
    title: 'Doğum Günün!',
    bgGradient: 'linear-gradient(180deg, #4facfe 0%, #00f2fe 50%, #f5e6ca 100%)',
    ambientColor: 'rgba(79, 172, 254, 0.12)',
    decorEmojis: ['🌊', '☀️', '🐚', '⛵'],
    hotspots: [
      { id: '2-1', x: '50%', y: '30%', emoji: '🎂', title: 'Doğum Günü', text: 'Doğum günün kutlu olsun! 17 Mayıs, bu adada...' },
      { id: '2-2', x: '20%', y: '50%', emoji: '🍇', title: 'Üzüm Bağları', text: '[BURAYA YAZILACAK — üzüm bağları anısı]' },
      { id: '2-3', x: '75%', y: '45%', emoji: '🌅', title: 'Gün Batımı', text: '[BURAYA YAZILACAK — gün batımı anısı]' },
      { id: '2-4', x: '55%', y: '70%', emoji: '🍷', title: 'Ada Şarabı', text: '[BURAYA YAZILACAK — Bozcaada şarap anısı]' },
    ],
  },
  {
    month: 3,
    city: 'ODTÜ, Ankara',
    title: 'Kampüs Macerası',
    bgGradient: 'linear-gradient(180deg, #87ceeb 0%, #98d8a0 50%, #4a7c59 100%)',
    ambientColor: 'rgba(76, 175, 80, 0.1)',
    decorEmojis: ['🌳', '🍃', '🦌', '🌿'],
    hotspots: [
      { id: '3-1', x: '50%', y: '35%', emoji: '🦌', title: 'ODTÜ Geyiği', text: 'ODTÜ geyiği! Kampüste her yerde bunlar var.' },
      { id: '3-2', x: '25%', y: '55%', emoji: '🌳', title: 'Yürüyüş', text: '[BURAYA YAZILACAK — kampüs yürüyüşü anısı]' },
      { id: '3-3', x: '78%', y: '40%', emoji: '📸', title: 'Fotoğraf', text: '[BURAYA YAZILACAK — ODTÜ fotoğraf anısı]' },
    ],
  },
  {
    month: 4,
    city: 'İstanbul',
    title: 'Evde Güzel',
    bgGradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)',
    ambientColor: 'rgba(252, 182, 159, 0.15)',
    decorEmojis: ['🏠', '☕', '🛋️', '🕯️'],
    hotspots: [
      { id: '4-1', x: '30%', y: '30%', emoji: '📺', title: 'Dizi Gecesi', text: '[BURAYA YAZILACAK — dizi izleme anısı]' },
      { id: '4-2', x: '65%', y: '25%', emoji: '🍳', title: 'Mutfak', text: '[BURAYA YAZILACAK — yemek yapma anısı]' },
      { id: '4-3', x: '50%', y: '55%', emoji: '💍', title: 'Nişan', text: 'Arkadaşının nişanına gittik! Güzel bir geceydi.' },
      { id: '4-4', x: '20%', y: '70%', emoji: '🛋️', title: 'Ev Hali', text: '[BURAYA YAZILACAK — ev anısı]' },
    ],
  },
  {
    month: 5,
    city: 'Ankara / Ağva',
    title: 'Düğünler & Maceralar',
    bgGradient: 'linear-gradient(180deg, #0c0c3a 0%, #1a1a5e 40%, #2d1b69 100%)',
    ambientColor: 'rgba(106, 90, 205, 0.15)',
    decorEmojis: ['💃', '🎶', '🌃', '✨'],
    hotspots: [
      { id: '5-1', x: '25%', y: '30%', emoji: '💒', title: 'Düğün', text: 'Ankara\'da düğüne gittik! Güzel bir geceydi.' },
      { id: '5-2', x: '60%', y: '25%', emoji: '🎤', title: 'Pavyon', text: '[BURAYA YAZILACAK — pavyon macerası 😂]' },
      { id: '5-3', x: '80%', y: '50%', emoji: '🏖️', title: 'Ağva', text: 'Ağva\'da 2 gün sahilde konakladık. Ne güzeldi...' },
      { id: '5-4', x: '35%', y: '65%', emoji: '💍', title: 'Nikâh Şahidi', text: 'Fenerbahçe\'de nikâh şahidi oldum! En yakın arkadaşım...' },
      { id: '5-5', x: '70%', y: '75%', emoji: '🌊', title: 'Sahil', text: '[BURAYA YAZILACAK — Ağva sahil anısı]' },
    ],
  },
  {
    month: 6,
    city: 'Diyarbakır / Mardin',
    title: 'Güneydoğu Keşfi',
    bgGradient: 'linear-gradient(180deg, #f9a825 0%, #ff8f00 40%, #e65100 100%)',
    ambientColor: 'rgba(255, 143, 0, 0.12)',
    decorEmojis: ['☀️', '🏛️', '🧱', '🕌'],
    hotspots: [
      { id: '6-1', x: '30%', y: '28%', emoji: '💒', title: 'Düğün', text: 'Diyarbakır\'da düğün! Güneydoğu sıcağı...' },
      { id: '6-2', x: '65%', y: '35%', emoji: '🧱', title: 'Taş Sokaklar', text: 'Mardin taş sokakları... Burası başka bir dünya.' },
      { id: '6-3', x: '80%', y: '55%', emoji: '🍖', title: 'Lezzetler', text: '[BURAYA YAZILACAK — yemek anısı, ciğer/kebap?]' },
      { id: '6-4', x: '20%', y: '60%', emoji: '☀️', title: 'Güneş', text: '[BURAYA YAZILACAK — Güneydoğu anısı]' },
      { id: '6-5', x: '50%', y: '75%', emoji: '📸', title: 'Fotoğraf', text: '[BURAYA YAZILACAK — fotoğraf anısı]' },
    ],
  },
  {
    month: 7,
    city: 'Balıkesir / Kaş',
    title: 'Doğum Günüm!',
    bgGradient: 'linear-gradient(180deg, #00b4d8 0%, #0096c7 40%, #023e8a 100%)',
    ambientColor: 'rgba(0, 150, 199, 0.12)',
    decorEmojis: ['🌊', '🐠', '🏊', '🌴'],
    hotspots: [
      { id: '7-1', x: '50%', y: '30%', emoji: '🏊', title: 'Infinity Pool', text: 'Infinity pool! Burası cennet gibiydi.' },
      { id: '7-2', x: '25%', y: '45%', emoji: '🎂', title: 'Doğum Günü', text: '14 Ekim — Doğum günüm! En güzel hediye sendin.' },
      { id: '7-3', x: '75%', y: '55%', emoji: '💒', title: 'Düğün', text: 'Balıkesir\'de de bir düğün vardı tabii ki 😄' },
      { id: '7-4', x: '40%', y: '70%', emoji: '🌅', title: 'Gün Batımı', text: '[BURAYA YAZILACAK — Kaş gün batımı anısı]' },
    ],
  },
  {
    month: 8,
    city: 'İstanbul',
    title: 'Yoğun Kasım',
    bgGradient: 'linear-gradient(180deg, #636e72 0%, #2d3436 50%, #1a1a2e 100%)',
    ambientColor: 'rgba(99, 110, 114, 0.12)',
    decorEmojis: ['💼', '💻', '📱', '⚡'],
    hotspots: [
      { id: '8-1', x: '30%', y: '30%', emoji: '💻', title: 'E-Ticaret', text: 'Kasım = e-ticaret çılgınlığı. Ama seni ihmal etmedim!' },
      { id: '8-2', x: '65%', y: '25%', emoji: '💇', title: 'Yeni Saç', text: 'Saçını kısa kestirdin! Çok yakıştı.' },
      { id: '8-3', x: '50%', y: '55%', emoji: '👶', title: 'Bebek Ziyareti', text: 'Arkadaşımızın bebeğini gördük. Çok tatlıydı!' },
      { id: '8-4', x: '25%', y: '70%', emoji: '🍳', title: 'Kahvaltı', text: 'GS Ada\'da kahvaltı! Manzara harikaydı.' },
    ],
  },
  {
    month: 9,
    city: 'İstanbul',
    title: 'Şoför Oldun!',
    bgGradient: 'linear-gradient(180deg, #74b9ff 0%, #a29bfe 50%, #6c5ce7 100%)',
    ambientColor: 'rgba(108, 92, 231, 0.1)',
    decorEmojis: ['🚗', '🛣️', '🚦', '🏎️'],
    hotspots: [
      { id: '9-1', x: '50%', y: '30%', emoji: '🚗', title: 'İlk Sürüş', text: 'Araba kullanmaya başladın! İlk sürüşü unutmam.' },
      { id: '9-2', x: '25%', y: '55%', emoji: '🚦', title: 'Trafik', text: '[BURAYA YAZILACAK — trafik/sürüş anısı]' },
      { id: '9-3', x: '75%', y: '60%', emoji: '🛣️', title: 'Yolculuk', text: '[BURAYA YAZILACAK — yolculuk anısı]' },
    ],
  },
  {
    month: 10,
    city: 'Sapanca',
    title: 'Zor Ama Beraber',
    bgGradient: 'linear-gradient(180deg, #2d3436 0%, #1a1a2e 40%, #0d0d1a 100%)',
    ambientColor: 'rgba(255, 255, 255, 0.05)',
    decorEmojis: ['❄️', '🌲', '🏕️', '🕯️'],
    hotspots: [
      { id: '10-1', x: '50%', y: '30%', emoji: '🏕️', title: 'Bungalov', text: 'Sapanca bungalovları. Ablan, annem, ben — hep yanındaydık.' },
      { id: '10-2', x: '25%', y: '45%', emoji: '🎄', title: 'Yılbaşı', text: 'Yılbaşını beraber geçirdik! İlk yılbaşımız.' },
      { id: '10-3', x: '75%', y: '40%', emoji: '❤️‍🩹', title: 'Güç', text: 'Zor günlerdi ama birlikte atlatamayacağımız şey yok.' },
      { id: '10-4', x: '45%', y: '70%', emoji: '🌲', title: 'Doğa', text: '[BURAYA YAZILACAK — Sapanca/doğa anısı]' },
    ],
  },
  {
    month: 11,
    city: 'İstanbul',
    title: 'Hoş Geldin Leo!',
    bgGradient: 'linear-gradient(135deg, #fdcb6e 0%, #f39c12 40%, #e67e22 100%)',
    ambientColor: 'rgba(243, 156, 18, 0.12)',
    decorEmojis: ['🐾', '🦴', '🐶', '💛'],
    hotspots: [
      { id: '11-1', x: '35%', y: '30%', emoji: '🐶', title: 'Sahiplenme', text: 'Leo\'yu sahiplendik! İlk gün ne kadar korkmuştu...' },
      { id: '11-2', x: '70%', y: '35%', emoji: '🏥', title: 'Veteriner', text: 'Parvo olduğunu öğrendik. Veterinere git gel...' },
      { id: '11-3', x: '25%', y: '60%', emoji: '🦴', title: 'Leo Anısı', text: '[BURAYA YAZILACAK — Leo anısı]' },
      { id: '11-4', x: '65%', y: '65%', emoji: '🐾', title: 'Bomba Gibi', text: 'Ama şimdi bomba gibi! Ailemizdeki en tatlı üye.' },
    ],
  },
  {
    month: 12,
    city: 'İstanbul',
    title: 'Yeni Başlangıç',
    bgGradient: 'linear-gradient(135deg, #fd79a8 0%, #e84393 40%, #6c5ce7 100%)',
    ambientColor: 'rgba(232, 67, 147, 0.12)',
    decorEmojis: ['🏡', '📦', '🐾', '💕'],
    hotspots: [
      { id: '12-1', x: '35%', y: '28%', emoji: '📦', title: 'Taşınma', text: 'Taşınma günü! Artık ev sadece senin değil, bizim.' },
      { id: '12-2', x: '70%', y: '30%', emoji: '🏡', title: 'Yeni Ev', text: '[BURAYA YAZILACAK — yeni ev anısı]' },
      { id: '12-3', x: '25%', y: '60%', emoji: '🐾', title: 'Leo Dışarıda', text: 'Leo artık dışarı çıkıyor! Parkta koşturuyor.' },
      { id: '12-4', x: '65%', y: '65%', emoji: '🍗', title: 'KFC', text: 'KFC Türkiye\'ye geldi! İlk kez birlikte gittik. EFSANE.' },
    ],
  },
]

export default scenes
