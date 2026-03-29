export type CardData =
  | { type: 'memory'; emoji: string; title: string; text: string; color: string; photo?: string }
  | { type: 'quiz'; question: string; options: string[]; correct: number; color: string }
  | { type: 'quote'; text: string; source: string; color: string }

const cards: CardData[] = [
  {
    type: 'memory',
    emoji: '🍷',
    title: 'İlk Gece',
    text: 'Kadıköy\'de sabaha kadar şarap içip şarkı söyledik. Her şey orada başladı.',
    color: '#6c5ce7',
  },
  {
    type: 'quiz',
    question: 'Benim en sevdiğim yemek?',
    options: ['[Seçenek 1]', '[Seçenek 2]', '[Seçenek 3]'],
    correct: 0,
    color: '#00b894',
  },
  {
    type: 'memory',
    emoji: '🎂',
    title: 'Bozcaada',
    text: 'Senin doğum günün için Bozcaada\'ya gittik. 17 Mayıs, ada rüzgarı, şarap...',
    color: '#0984e3',
  },
  {
    type: 'quote',
    text: 'Seni seviyorum',
    source: '— her gün, her an 🤍',
    color: '#e84393',
  },
  {
    type: 'quiz',
    question: 'İlk buluşmamızda ne içtik?',
    options: ['[Seçenek 1]', '[Seçenek 2]', '[Seçenek 3]'],
    correct: 0,
    color: '#00b894',
  },
  {
    type: 'memory',
    emoji: '💒',
    title: 'Düğünler',
    text: 'Ankara, Balıkesir, Diyarbakır... Her düğüne beraber gittik. Dans etmeyi sevmesen de 😄',
    color: '#fdcb6e',
  },
  {
    type: 'quiz',
    question: 'Leo\'yu hangi ayda sahiplendik?',
    options: ['Ocak', 'Şubat', 'Mart'],
    correct: 1,
    color: '#00b894',
  },
  {
    type: 'memory',
    emoji: '🏊',
    title: 'Kaş',
    text: '14 Ekim — benim doğum günüm. Infinity pool\'lu evde kaldık. Cennet gibiydi.',
    color: '#00cec9',
  },
  {
    type: 'quote',
    text: '[BURAYA YAZILACAK — komik inside joke]',
    source: '— sen',
    color: '#a29bfe',
  },
  {
    type: 'memory',
    emoji: '🚗',
    title: 'Şoför',
    text: 'Araba kullanmaya başladın! Ve baya iyi kullanıyorsun aslında.',
    color: '#74b9ff',
  },
  {
    type: 'quiz',
    question: 'Benim en sinir olduğum şeyim ne?',
    options: ['[Seçenek 1]', '[Seçenek 2]', '[Seçenek 3]'],
    correct: 0,
    color: '#00b894',
  },
  {
    type: 'memory',
    emoji: '🐶',
    title: 'Leo',
    text: 'Leo\'yu sahiplendik. Parvo oldu, atlattı. Şimdi bomba gibi, ailemizdeki en tatlı üye.',
    color: '#f39c12',
  },
  {
    type: 'quote',
    text: '[BURAYA YAZILACAK — komik söz]',
    source: '— ben',
    color: '#fd79a8',
  },
  {
    type: 'memory',
    emoji: '🏕️',
    title: 'Sapanca',
    text: 'Zor bir dönemdi. Ama Sapanca\'da bungalovlar, yılbaşı, yanında olmak... Atlattık.',
    color: '#2d3436',
  },
  {
    type: 'quiz',
    question: 'En sevdiğim özelliğin ne?',
    options: ['[Seçenek 1]', '[Seçenek 2]', '[Seçenek 3]'],
    correct: 0,
    color: '#00b894',
  },
  {
    type: 'memory',
    emoji: '🍗',
    title: 'KFC!',
    text: 'KFC Türkiye\'ye geldi! İlk kez birlikte gittik. EFSANE.',
    color: '#e17055',
  },
  {
    type: 'memory',
    emoji: '🏡',
    title: 'Yeni Ev',
    text: 'Artık ev sadece senin değil, bizim. Yeni sayfa, aynı aşk.',
    color: '#e84393',
  },
  {
    type: 'quote',
    text: '12 ay, 12 şehir, 1 aşk. Seni çok seviyorum.',
    source: '— sonsuza kadar 🤍',
    color: '#6c5ce7',
  },
]

export default cards
