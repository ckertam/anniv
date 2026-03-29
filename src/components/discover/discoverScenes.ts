export interface QuizData {
  question: string
  options: string[]
  correct: number
}

export interface DiscoverItem {
  id: string
  x: string
  y: string
  emoji: string
  type: 'real' | 'decoy'
  title?: string
  text?: string
  photo?: string
  quiz?: QuizData
  decoyText?: string
  decoyPhoto?: string
}

export interface DiscoverScene {
  month: number
  city: string
  title: string
  bgGradient: string
  clueWords: string[]
  items: DiscoverItem[]
  requiredFinds: number
}

const scenes: DiscoverScene[] = [
  // ── AY 1: Kadıköy ──
  {
    month: 1,
    city: 'Kadıköy, İstanbul',
    title: 'Tanıştık!',
    bgGradient: 'linear-gradient(135deg, #1a1a3e 0%, #2c1654 40%, #4a1942 100%)',
    clueWords: ['tren', 'şarap', 'şarkı', 'sabah', 'Kadıköy'],
    requiredFinds: 4,
    items: [
      { id: '1-r1', x: '18%', y: '32%', emoji: '🚂', type: 'real', title: 'Tren', text: 'Seni trenden aldım. İlk defa adam akıllı görüşecektik...', photo: 'https://placehold.co/400x300/2c1654/white?text=Tren+Ani' },
      { id: '1-r2', x: '72%', y: '22%', emoji: '🍷', type: 'real', title: 'Şarap Gecesi', text: '[BURAYA YAZILACAK — şarap gecesi anısı]', photo: 'https://placehold.co/400x300/4a1942/white?text=Sarap+Gecesi' },
      { id: '1-r3', x: '45%', y: '58%', emoji: '🎵', type: 'real', title: 'Şarkılar', text: '[BURAYA YAZILACAK — sabaha kadar şarkı söyleme]', photo: 'https://placehold.co/400x300/1a1a3e/white?text=Sarki+Anisi', quiz: { question: 'O gece ilk söylediğimiz şarkı?', options: ['[Seçenek 1]', '[Seçenek 2]', '[Seçenek 3]'], correct: 0 } },
      { id: '1-r4', x: '82%', y: '68%', emoji: '🌙', type: 'real', title: 'Sabaha Kadar', text: 'Sabaha kadar oturmak... Ve her şey böyle başladı.', photo: 'https://placehold.co/400x300/2c1654/white?text=Sabaha+Kadar' },
      { id: '1-d1', x: '30%', y: '75%', emoji: '🍕', type: 'decoy', decoyText: 'Pizza mı arıyordun? O gece pizza yemedik ki 😄', decoyPhoto: 'https://placehold.co/400x300/e74c3c/white?text=Bulamadin+:D' },
      { id: '1-d2', x: '55%', y: '28%', emoji: '🎭', type: 'decoy', decoyText: '[BURAYA YAZILACAK — komik inside joke]', decoyPhoto: 'https://placehold.co/400x300/e74c3c/white?text=Hehe' },
      { id: '1-d3', x: '12%', y: '55%', emoji: '🐱', type: 'decoy', decoyText: 'Leo daha yok o zaman! Sabret 😂', decoyPhoto: 'https://placehold.co/400x300/f39c12/white?text=Leo+Henuz+Yok' },
      { id: '1-d4', x: '65%', y: '48%', emoji: '🎪', type: 'decoy', decoyText: '[BURAYA YAZILACAK — garip fotoğraf]' },
    ],
  },

  // ── AY 2: Bozcaada ──
  {
    month: 2,
    city: 'Bozcaada',
    title: 'Doğum Günün!',
    bgGradient: 'linear-gradient(180deg, #4facfe 0%, #00f2fe 50%, #f5e6ca 100%)',
    clueWords: ['doğum günü', 'ada', 'üzüm', 'deniz', 'rüzgar'],
    requiredFinds: 4,
    items: [
      { id: '2-r1', x: '50%', y: '25%', emoji: '🎂', type: 'real', title: 'Doğum Günü', text: 'Doğum günün kutlu olsun! 17 Mayıs, bu adada...', photo: 'https://placehold.co/400x300/4facfe/white?text=Dogum+Gunu' },
      { id: '2-r2', x: '20%', y: '45%', emoji: '🍇', type: 'real', title: 'Üzüm Bağları', text: '[BURAYA YAZILACAK — üzüm bağları anısı]', photo: 'https://placehold.co/400x300/6c5ce7/white?text=Uzum+Baglari' },
      { id: '2-r3', x: '78%', y: '40%', emoji: '🌅', type: 'real', title: 'Gün Batımı', text: '[BURAYA YAZILACAK — gün batımı anısı]', photo: 'https://placehold.co/400x300/fd79a8/white?text=Gun+Batimi', quiz: { question: 'Bozcaada\'da kaç gece kaldık?', options: ['[Seçenek 1]', '[Seçenek 2]', '[Seçenek 3]'], correct: 0 } },
      { id: '2-r4', x: '55%', y: '68%', emoji: '🍷', type: 'real', title: 'Ada Şarabı', text: '[BURAYA YAZILACAK — Bozcaada şarap anısı]', photo: 'https://placehold.co/400x300/e84393/white?text=Ada+Sarabi' },
      { id: '2-d1', x: '35%', y: '60%', emoji: '🦀', type: 'decoy', decoyText: 'Yengeç tutmadık ama 😂' },
      { id: '2-d2', x: '85%', y: '70%', emoji: '🏄', type: 'decoy', decoyText: 'Sörf mü? O kadar sportif miyiz sanki 😄', decoyPhoto: 'https://placehold.co/400x300/e74c3c/white?text=Haha+Surf' },
      { id: '2-d3', x: '15%', y: '72%', emoji: '🐙', type: 'decoy', decoyText: '[BURAYA YAZILACAK — komik inside joke]' },
      { id: '2-d4', x: '68%', y: '18%', emoji: '⛵', type: 'decoy', decoyText: 'Tekneye binmedik ki! Belki bir dahaki sefere 🤷' },
    ],
  },

  // ── AY 3: ODTÜ ──
  {
    month: 3,
    city: 'ODTÜ, Ankara',
    title: 'Kampüs Macerası',
    bgGradient: 'linear-gradient(180deg, #87ceeb 0%, #98d8a0 50%, #4a7c59 100%)',
    clueWords: ['geyik', 'göl', 'yeşillik', 'kampüs'],
    requiredFinds: 3,
    items: [
      { id: '3-r1', x: '50%', y: '30%', emoji: '🦌', type: 'real', title: 'ODTÜ Geyiği', text: 'ODTÜ geyiği! Kampüste her yerde bunlar var.', photo: 'https://placehold.co/400x300/4a7c59/white?text=ODTU+Geyigi' },
      { id: '3-r2', x: '22%', y: '55%', emoji: '🌳', type: 'real', title: 'Yürüyüş', text: '[BURAYA YAZILACAK — kampüs yürüyüşü anısı]', photo: 'https://placehold.co/400x300/98d8a0/white?text=Yuruyus' },
      { id: '3-r3', x: '78%', y: '42%', emoji: '📸', type: 'real', title: 'Fotoğraf', text: '[BURAYA YAZILACAK — ODTÜ fotoğraf anısı]', photo: 'https://placehold.co/400x300/87ceeb/white?text=ODTU+Foto', quiz: { question: 'ODTÜ\'nün ünlü gölünün adı?', options: ['[Seçenek 1]', '[Seçenek 2]', '[Seçenek 3]'], correct: 0 } },
      { id: '3-d1', x: '38%', y: '70%', emoji: '🎓', type: 'decoy', decoyText: 'Mezun olmadık ki buradan 😄' },
      { id: '3-d2', x: '65%', y: '62%', emoji: '🏀', type: 'decoy', decoyText: '[BURAYA YAZILACAK — komik yorum]', decoyPhoto: 'https://placehold.co/400x300/e74c3c/white?text=Basket+Mi' },
      { id: '3-d3', x: '12%', y: '35%', emoji: '🐿️', type: 'decoy', decoyText: 'Sincap değil geyik! Yanlış hayvan 🤦' },
    ],
  },

  // ── AY 4: Ev Hayatı ──
  {
    month: 4,
    city: 'İstanbul',
    title: 'Evde Güzel',
    bgGradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)',
    clueWords: ['dizi', 'yemek', 'nişan', 'kanepe', 'ev'],
    requiredFinds: 4,
    items: [
      { id: '4-r1', x: '28%', y: '28%', emoji: '📺', type: 'real', title: 'Dizi Gecesi', text: '[BURAYA YAZILACAK — dizi izleme anısı]', photo: 'https://placehold.co/400x300/fcb69f/white?text=Dizi+Gecesi' },
      { id: '4-r2', x: '68%', y: '22%', emoji: '🍳', type: 'real', title: 'Mutfak', text: '[BURAYA YAZILACAK — yemek yapma anısı]', photo: 'https://placehold.co/400x300/ff9a9e/white?text=Mutfak' },
      { id: '4-r3', x: '52%', y: '52%', emoji: '💍', type: 'real', title: 'Nişan', text: 'Arkadaşının nişanına gittik! Güzel bir geceydi.', photo: 'https://placehold.co/400x300/ffecd2/white?text=Nisan' },
      { id: '4-r4', x: '20%', y: '68%', emoji: '🛋️', type: 'real', title: 'Kanepe', text: '[BURAYA YAZILACAK — ev anısı]', photo: 'https://placehold.co/400x300/fcb69f/white?text=Kanepe+Anisi', quiz: { question: 'Beraber ilk izlediğimiz dizi?', options: ['[Seçenek 1]', '[Seçenek 2]', '[Seçenek 3]'], correct: 0 } },
      { id: '4-d1', x: '42%', y: '38%', emoji: '🧹', type: 'decoy', decoyText: 'Temizlik mi? Hahahaha 😂', decoyPhoto: 'https://placehold.co/400x300/e74c3c/white?text=Temizlik+Mi' },
      { id: '4-d2', x: '80%', y: '55%', emoji: '🎮', type: 'decoy', decoyText: '[BURAYA YAZILACAK — garip fotoğraf/joke]' },
      { id: '4-d3', x: '60%', y: '75%', emoji: '🏋️', type: 'decoy', decoyText: 'Evde spor? Hadi ya 🤣' },
      { id: '4-d4', x: '12%', y: '42%', emoji: '🧸', type: 'decoy', decoyText: '[BURAYA YAZILACAK — inside joke]' },
    ],
  },

  // ── AY 5: Ankara + Ağva ──
  {
    month: 5,
    city: 'Ankara / Ağva',
    title: 'Düğünler & Maceralar',
    bgGradient: 'linear-gradient(180deg, #0c0c3a 0%, #1a1a5e 40%, #2d1b69 100%)',
    clueWords: ['düğün', 'pavyon', 'sahil', 'nikâh', 'Ağva'],
    requiredFinds: 4,
    items: [
      { id: '5-r1', x: '22%', y: '28%', emoji: '💒', type: 'real', title: 'Düğün', text: 'Ankara\'da düğüne gittik! Güzel bir geceydi.', photo: 'https://placehold.co/400x300/2d1b69/white?text=Dugun' },
      { id: '5-r2', x: '62%', y: '22%', emoji: '🎤', type: 'real', title: 'Pavyon', text: '[BURAYA YAZILACAK — pavyon macerası 😂]', photo: 'https://placehold.co/400x300/1a1a5e/white?text=Pavyon', quiz: { question: 'Pavyonda ne oldu? 😂', options: ['[Seçenek 1]', '[Seçenek 2]', '[Seçenek 3]'], correct: 0 } },
      { id: '5-r3', x: '80%', y: '48%', emoji: '🏖️', type: 'real', title: 'Ağva Sahil', text: 'Ağva\'da 2 gün sahilde konakladık. Ne güzeldi...', photo: 'https://placehold.co/400x300/0c0c3a/white?text=Agva+Sahil' },
      { id: '5-r4', x: '35%', y: '62%', emoji: '💍', type: 'real', title: 'Nikâh Şahidi', text: 'Fenerbahçe\'de nikâh şahidi oldum! En yakın arkadaşım...', photo: 'https://placehold.co/400x300/2d1b69/white?text=Nikah' },
      { id: '5-d1', x: '50%', y: '42%', emoji: '🕺', type: 'decoy', decoyText: 'Dans mı? Sen mi? 😂😂😂', decoyPhoto: 'https://placehold.co/400x300/e74c3c/white?text=Dans+Eden+Sen' },
      { id: '5-d2', x: '15%', y: '50%', emoji: '🎰', type: 'decoy', decoyText: '[BURAYA YAZILACAK — komik yorum]' },
      { id: '5-d3', x: '72%', y: '72%', emoji: '🦈', type: 'decoy', decoyText: 'Ağva\'da köpekbalığı mı? Hadi ya 🤣' },
      { id: '5-d4', x: '42%', y: '80%', emoji: '🎺', type: 'decoy', decoyText: '[BURAYA YAZILACAK — inside joke]' },
    ],
  },

  // ── AY 6: Diyarbakır / Mardin ──
  {
    month: 6,
    city: 'Diyarbakır / Mardin',
    title: 'Güneydoğu Keşfi',
    bgGradient: 'linear-gradient(180deg, #f9a825 0%, #ff8f00 40%, #e65100 100%)',
    clueWords: ['taş', 'sıcak', 'kebap', 'düğün', 'Mardin'],
    requiredFinds: 4,
    items: [
      { id: '6-r1', x: '28%', y: '25%', emoji: '💒', type: 'real', title: 'Düğün', text: 'Diyarbakır\'da düğün! Güneydoğu sıcağı...', photo: 'https://placehold.co/400x300/f9a825/white?text=Diyarbakir+Dugun' },
      { id: '6-r2', x: '68%', y: '32%', emoji: '🧱', type: 'real', title: 'Taş Sokaklar', text: 'Mardin taş sokakları... Burası başka bir dünya.', photo: 'https://placehold.co/400x300/ff8f00/white?text=Mardin+Taslar' },
      { id: '6-r3', x: '82%', y: '55%', emoji: '🍖', type: 'real', title: 'Lezzetler', text: '[BURAYA YAZILACAK — yemek anısı]', photo: 'https://placehold.co/400x300/e65100/white?text=Kebap', quiz: { question: 'Diyarbakır\'da en çok ne yedik?', options: ['[Seçenek 1]', '[Seçenek 2]', '[Seçenek 3]'], correct: 0 } },
      { id: '6-r4', x: '22%', y: '60%', emoji: '☀️', type: 'real', title: 'Güneş', text: '[BURAYA YAZILACAK — Güneydoğu anısı]', photo: 'https://placehold.co/400x300/f9a825/white?text=Guneydogu+Gunesi' },
      { id: '6-d1', x: '50%', y: '45%', emoji: '🐪', type: 'decoy', decoyText: 'Deve mi? Güneydoğu\'da deve yok 😂' },
      { id: '6-d2', x: '40%', y: '72%', emoji: '🏺', type: 'decoy', decoyText: '[BURAYA YAZILACAK — komik yorum]', decoyPhoto: 'https://placehold.co/400x300/e74c3c/white?text=Vazo+Mu' },
      { id: '6-d3', x: '72%', y: '70%', emoji: '🎪', type: 'decoy', decoyText: 'Sirk yoktu ama düğün eğlencesi sirk gibiydi 😄' },
      { id: '6-d4', x: '15%', y: '40%', emoji: '🌵', type: 'decoy', decoyText: '[BURAYA YAZILACAK — inside joke]' },
    ],
  },

  // ── AY 7: Kaş ──
  {
    month: 7,
    city: 'Balıkesir / Kaş',
    title: 'Doğum Günüm!',
    bgGradient: 'linear-gradient(180deg, #00b4d8 0%, #0096c7 40%, #023e8a 100%)',
    clueWords: ['havuz', 'doğum günü', 'deniz', 'düğün', 'Kaş'],
    requiredFinds: 4,
    items: [
      { id: '7-r1', x: '50%', y: '28%', emoji: '🏊', type: 'real', title: 'Infinity Pool', text: 'Infinity pool! Burası cennet gibiydi.', photo: 'https://placehold.co/400x300/00b4d8/white?text=Infinity+Pool' },
      { id: '7-r2', x: '22%', y: '42%', emoji: '🎂', type: 'real', title: 'Doğum Günü', text: '14 Ekim — Doğum günüm! En güzel hediye sendin.', photo: 'https://placehold.co/400x300/0096c7/white?text=Dogum+Gunum', quiz: { question: 'Doğum günümde bana ne hediye aldın?', options: ['[Seçenek 1]', '[Seçenek 2]', '[Seçenek 3]'], correct: 0 } },
      { id: '7-r3', x: '78%', y: '52%', emoji: '💒', type: 'real', title: 'Düğün', text: 'Balıkesir\'de de bir düğün vardı tabii ki 😄', photo: 'https://placehold.co/400x300/023e8a/white?text=Balikesir+Dugun' },
      { id: '7-r4', x: '40%', y: '68%', emoji: '🌅', type: 'real', title: 'Gün Batımı', text: '[BURAYA YAZILACAK — Kaş gün batımı anısı]', photo: 'https://placehold.co/400x300/00b4d8/white?text=Gun+Batimi' },
      { id: '7-d1', x: '62%', y: '38%', emoji: '🐬', type: 'decoy', decoyText: 'Yunus görmedik ama olsun 🐬' },
      { id: '7-d2', x: '30%', y: '75%', emoji: '🤿', type: 'decoy', decoyText: '[BURAYA YAZILACAK — dalış yapmadık joke]', decoyPhoto: 'https://placehold.co/400x300/e74c3c/white?text=Dalis+Mi' },
      { id: '7-d3', x: '85%', y: '72%', emoji: '🦑', type: 'decoy', decoyText: 'Ahtapot ne alaka 😂' },
      { id: '7-d4', x: '15%', y: '60%', emoji: '🧊', type: 'decoy', decoyText: '[BURAYA YAZILACAK — inside joke]' },
    ],
  },

  // ── AY 8: Yoğun Kasım ──
  {
    month: 8,
    city: 'İstanbul',
    title: 'Yoğun Kasım',
    bgGradient: 'linear-gradient(180deg, #636e72 0%, #2d3436 50%, #1a1a2e 100%)',
    clueWords: ['iş', 'saç', 'bebek', 'kahvaltı', 'kasım'],
    requiredFinds: 4,
    items: [
      { id: '8-r1', x: '28%', y: '28%', emoji: '💻', type: 'real', title: 'E-Ticaret', text: 'Kasım = e-ticaret çılgınlığı. Ama seni ihmal etmedim!', photo: 'https://placehold.co/400x300/636e72/white?text=E-Ticaret' },
      { id: '8-r2', x: '68%', y: '22%', emoji: '💇', type: 'real', title: 'Yeni Saç', text: 'Saçını kısa kestirdin! Çok yakıştı.', photo: 'https://placehold.co/400x300/2d3436/white?text=Yeni+Sac' },
      { id: '8-r3', x: '52%', y: '52%', emoji: '👶', type: 'real', title: 'Bebek Ziyareti', text: 'Arkadaşımızın bebeğini gördük. Çok tatlıydı!', photo: 'https://placehold.co/400x300/636e72/white?text=Bebek+Ziyareti' },
      { id: '8-r4', x: '25%', y: '68%', emoji: '🍳', type: 'real', title: 'Kahvaltı', text: 'GS Ada\'da kahvaltı! Manzara harikaydı.', photo: 'https://placehold.co/400x300/2d3436/white?text=GS+Ada+Kahvalti', quiz: { question: 'GS Ada nerede?', options: ['[Seçenek 1]', '[Seçenek 2]', '[Seçenek 3]'], correct: 0 } },
      { id: '8-d1', x: '42%', y: '38%', emoji: '🛒', type: 'decoy', decoyText: 'Black Friday\'de ne aldık? Hiçbir şey 😂' },
      { id: '8-d2', x: '80%', y: '55%', emoji: '😴', type: 'decoy', decoyText: '[BURAYA YAZILACAK — uyku/yorgunluk joke]', decoyPhoto: 'https://placehold.co/400x300/e74c3c/white?text=Uyku' },
      { id: '8-d3', x: '15%', y: '48%', emoji: '📊', type: 'decoy', decoyText: 'Excel tabloları çok romantik 📊❤️' },
      { id: '8-d4', x: '72%', y: '75%', emoji: '🧶', type: 'decoy', decoyText: '[BURAYA YAZILACAK — inside joke]' },
    ],
  },

  // ── AY 9: Araba ──
  {
    month: 9,
    city: 'İstanbul',
    title: 'Şoför Oldun!',
    bgGradient: 'linear-gradient(180deg, #74b9ff 0%, #a29bfe 50%, #6c5ce7 100%)',
    clueWords: ['araba', 'sürüş', 'yol', 'trafik'],
    requiredFinds: 3,
    items: [
      { id: '9-r1', x: '50%', y: '28%', emoji: '🚗', type: 'real', title: 'İlk Sürüş', text: 'Araba kullanmaya başladın! İlk sürüşü unutmam.', photo: 'https://placehold.co/400x300/74b9ff/white?text=Ilk+Surus' },
      { id: '9-r2', x: '22%', y: '52%', emoji: '🚦', type: 'real', title: 'Trafik', text: '[BURAYA YAZILACAK — trafik/sürüş anısı]', photo: 'https://placehold.co/400x300/a29bfe/white?text=Trafik', quiz: { question: 'İlk kez nereye sürdün?', options: ['[Seçenek 1]', '[Seçenek 2]', '[Seçenek 3]'], correct: 0 } },
      { id: '9-r3', x: '78%', y: '58%', emoji: '🛣️', type: 'real', title: 'Yolculuk', text: '[BURAYA YAZILACAK — yolculuk anısı]', photo: 'https://placehold.co/400x300/6c5ce7/white?text=Yolculuk' },
      { id: '9-d1', x: '38%', y: '68%', emoji: '🏎️', type: 'decoy', decoyText: 'Formula 1 değil bu, sakin ol 😂', decoyPhoto: 'https://placehold.co/400x300/e74c3c/white?text=F1+Mi' },
      { id: '9-d2', x: '65%', y: '38%', emoji: '🚁', type: 'decoy', decoyText: '[BURAYA YAZILACAK — komik yorum]' },
      { id: '9-d3', x: '12%', y: '35%', emoji: '🛵', type: 'decoy', decoyText: 'Scooter da güzeldi ama araba daha iyi 🤷' },
    ],
  },

  // ── AY 10: Sapanca ──
  {
    month: 10,
    city: 'Sapanca',
    title: 'Zor Ama Beraber',
    bgGradient: 'linear-gradient(180deg, #2d3436 0%, #1a1a2e 40%, #0d0d1a 100%)',
    clueWords: ['bungalov', 'yılbaşı', 'kar', 'beraber', 'güç'],
    requiredFinds: 4,
    items: [
      { id: '10-r1', x: '50%', y: '28%', emoji: '🏕️', type: 'real', title: 'Bungalov', text: 'Sapanca bungalovları. Ablan, annem, ben — hep yanındaydık.', photo: 'https://placehold.co/400x300/2d3436/white?text=Bungalov' },
      { id: '10-r2', x: '22%', y: '42%', emoji: '🎄', type: 'real', title: 'Yılbaşı', text: 'Yılbaşını beraber geçirdik! İlk yılbaşımız.', photo: 'https://placehold.co/400x300/1a1a2e/white?text=Yilbasi' },
      { id: '10-r3', x: '78%', y: '38%', emoji: '❤️‍🩹', type: 'real', title: 'Güç', text: 'Zor günlerdi ama birlikte atlatamayacağımız şey yok.', photo: 'https://placehold.co/400x300/0d0d1a/white?text=Birlikte+Guc', quiz: { question: 'Yılbaşında ne dilek tuttun?', options: ['[Seçenek 1]', '[Seçenek 2]', '[Seçenek 3]'], correct: 0 } },
      { id: '10-r4', x: '45%', y: '68%', emoji: '🌲', type: 'real', title: 'Doğa', text: '[BURAYA YAZILACAK — Sapanca/doğa anısı]', photo: 'https://placehold.co/400x300/2d3436/white?text=Sapanca+Doga' },
      { id: '10-d1', x: '35%', y: '52%', emoji: '⛷️', type: 'decoy', decoyText: 'Kayak mı? O kadar sporcu değiliz 😅' },
      { id: '10-d2', x: '68%', y: '60%', emoji: '🐻', type: 'decoy', decoyText: '[BURAYA YAZILACAK — ayı joke]', decoyPhoto: 'https://placehold.co/400x300/e74c3c/white?text=Ayi+Mi' },
      { id: '10-d3', x: '15%', y: '65%', emoji: '🧊', type: 'decoy', decoyText: 'Buz pateni? Hayır teşekkürler 🤣' },
      { id: '10-d4', x: '82%', y: '75%', emoji: '🦉', type: 'decoy', decoyText: '[BURAYA YAZILACAK — inside joke]' },
    ],
  },

  // ── AY 11: Leo ──
  {
    month: 11,
    city: 'İstanbul',
    title: 'Hoş Geldin Leo!',
    bgGradient: 'linear-gradient(135deg, #fdcb6e 0%, #f39c12 40%, #e67e22 100%)',
    clueWords: ['Leo', 'parvo', 'veteriner', 'pati', 'sahiplenme'],
    requiredFinds: 4,
    items: [
      { id: '11-r1', x: '32%', y: '28%', emoji: '🐶', type: 'real', title: 'Sahiplenme', text: 'Leo\'yu sahiplendik! İlk gün ne kadar korkmuştu...', photo: 'https://placehold.co/400x300/fdcb6e/white?text=Leo+Ilk+Gun' },
      { id: '11-r2', x: '72%', y: '32%', emoji: '🏥', type: 'real', title: 'Veteriner', text: 'Parvo olduğunu öğrendik. Veterinere git gel...', photo: 'https://placehold.co/400x300/f39c12/white?text=Veteriner', quiz: { question: 'Leo kaç günde iyileşti?', options: ['[Seçenek 1]', '[Seçenek 2]', '[Seçenek 3]'], correct: 0 } },
      { id: '11-r3', x: '22%', y: '58%', emoji: '🦴', type: 'real', title: 'Leo Anısı', text: '[BURAYA YAZILACAK — Leo anısı]', photo: 'https://placehold.co/400x300/e67e22/white?text=Leo+Kemik' },
      { id: '11-r4', x: '68%', y: '62%', emoji: '🐾', type: 'real', title: 'Bomba Gibi', text: 'Ama şimdi bomba gibi! Ailemizdeki en tatlı üye.', photo: 'https://placehold.co/400x300/fdcb6e/white?text=Leo+Simdi' },
      { id: '11-d1', x: '50%', y: '45%', emoji: '🐱', type: 'decoy', decoyText: 'Kedi mi? LEO BİR KÖPEK 😤', decoyPhoto: 'https://placehold.co/400x300/e74c3c/white?text=Kedi+Degil' },
      { id: '11-d2', x: '40%', y: '75%', emoji: '🐰', type: 'decoy', decoyText: '[BURAYA YAZILACAK — tavşan joke]' },
      { id: '11-d3', x: '82%', y: '48%', emoji: '🦜', type: 'decoy', decoyText: 'Papağan mı aldık sanıyorsun 😂' },
      { id: '11-d4', x: '15%', y: '40%', emoji: '🐹', type: 'decoy', decoyText: '[BURAYA YAZILACAK — inside joke]' },
    ],
  },

  // ── AY 12: Yeni Ev ──
  {
    month: 12,
    city: 'İstanbul',
    title: 'Yeni Başlangıç',
    bgGradient: 'linear-gradient(135deg, #fd79a8 0%, #e84393 40%, #6c5ce7 100%)',
    clueWords: ['taşınma', 'yeni ev', 'Leo', 'KFC', 'bizim'],
    requiredFinds: 4,
    items: [
      { id: '12-r1', x: '32%', y: '25%', emoji: '📦', type: 'real', title: 'Taşınma', text: 'Taşınma günü! Artık ev sadece senin değil, bizim.', photo: 'https://placehold.co/400x300/fd79a8/white?text=Tasinma+Gunu' },
      { id: '12-r2', x: '72%', y: '28%', emoji: '🏡', type: 'real', title: 'Yeni Ev', text: '[BURAYA YAZILACAK — yeni ev anısı]', photo: 'https://placehold.co/400x300/e84393/white?text=Yeni+Ev', quiz: { question: 'Yeni evde ilk ne yaptık?', options: ['[Seçenek 1]', '[Seçenek 2]', '[Seçenek 3]'], correct: 0 } },
      { id: '12-r3', x: '22%', y: '58%', emoji: '🐾', type: 'real', title: 'Leo Dışarıda', text: 'Leo artık dışarı çıkıyor! Parkta koşturuyor.', photo: 'https://placehold.co/400x300/6c5ce7/white?text=Leo+Parka' },
      { id: '12-r4', x: '68%', y: '62%', emoji: '🍗', type: 'real', title: 'KFC', text: 'KFC Türkiye\'ye geldi! İlk kez birlikte gittik. EFSANE.', photo: 'https://placehold.co/400x300/fd79a8/white?text=KFC+Efsane' },
      { id: '12-d1', x: '50%', y: '42%', emoji: '🧳', type: 'decoy', decoyText: 'Bavulları hâlâ açmadık mı? 😂', decoyPhoto: 'https://placehold.co/400x300/e74c3c/white?text=Bavullar' },
      { id: '12-d2', x: '40%', y: '75%', emoji: '🔑', type: 'decoy', decoyText: '[BURAYA YAZILACAK — anahtar joke]' },
      { id: '12-d3', x: '82%', y: '48%', emoji: '🪑', type: 'decoy', decoyText: 'IKEA\'dan sandalye almak 3 saat sürdü 😤' },
      { id: '12-d4', x: '15%', y: '38%', emoji: '🧹', type: 'decoy', decoyText: '[BURAYA YAZILACAK — inside joke]' },
    ],
  },
]

export default scenes
