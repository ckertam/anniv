# İçerik Checklist - Seninle 365 Gün

Tüm içerikler `src/data/content.json` dosyasına yazılacak.
Fotoğraflar `public/photos/month-XX/` klasörlerine konulacak.

---

## Genel Bilgiler

- [ ] İsimleriniz (`couple.name1`, `couple.name2`)
- [ ] Başlangıç tarihi (`couple.startDate`) — format: `YYYY-MM-DD`
- [ ] Spotify playlist ID (`couple.spotifyPlaylist`) — embed linki

---

## Zarf (Giriş Ekranı)

- [ ] Zarf üstü yazısı (`envelope.label`) — şu an: "Dünyanın en harika kadınına"
- [ ] Mühür emojisi (`envelope.seal`) — şu an: 🤍

---

## Ay 1 — Tanışma Hikayesi 💫

Hikaye sahne sahne anlatılacak. Her sahne bir ekran.

- [ ] Sahne 1: Tanışma anı metni + (opsiyonel) fotoğraf
- [ ] Sahne 2: İlk sohbet / ilk izlenim
- [ ] Sahne 3: "Ve böylece başladı" kapanış sahnesi
- [ ] Fotoğraflar: `public/photos/month-01/` klasörüne koy

> Örnek format (content.json → months[0].story.scenes):
> ```json
> { "text": "Hikaye metni...", "image": "month-01/foto1.jpeg", "emoji": "✨" }
> ```

---

## Ay 2 — Quiz Oyunu 🧠

5-10 soru, her birinin 4 seçeneği olacak.

- [ ] Soru 1: Soru + 4 seçenek + doğru cevap index'i + eğlenceli bilgi
- [ ] Soru 2: ...
- [ ] Soru 3: ...
- [ ] Soru 4: ...
- [ ] Soru 5: ...
- [ ] (Opsiyonel) Soru 6-10

> Örnek format (content.json → months[1].quiz.questions):
> ```json
> {
>   "question": "İlk buluşmada ne yedik?",
>   "options": ["Pizza", "Sushi", "Burger", "Döner"],
>   "correct": 0,
>   "funFact": "Ve sen ketçap istemedin 😄"
> }
> ```

---

## Ay 3 — Fotoğraf Zaman Tüneli 📸

Kronolojik fotoğraflar + altlarında yazılar.

- [ ] Fotoğraf 1 + açıklama + tarih
- [ ] Fotoğraf 2 + açıklama + tarih
- [ ] Fotoğraf 3 + açıklama + tarih
- [ ] (İstersen daha fazla ekle)
- [ ] Fotoğraflar: `public/photos/month-03/` klasörüne koy

> Örnek format (content.json → months[2].timeline.photos):
> ```json
> { "file": "month-03/foto1.jpeg", "caption": "Bu anı unutulmaz 💕", "date": "Haziran 2025" }
> ```

---

## Ay 4 — Sence Ben, Sence Sen 💑

Birbirinizi ne kadar tanıyorsunuz? Her doğru cevap bir fotoğraf açar.

- [ ] Soru 1: Soru + kime ait (ben/o/biz) + 4 seçenek + doğru cevap + fotoğraf + tepki
- [ ] Soru 2: ...
- [ ] Soru 3: ...
- [ ] Soru 4: ...
- [ ] Soru 5: ...
- [ ] Soru 6: ...
- [ ] Kapanış mesajı
- [ ] Fotoğraflar: `public/photos/month-04/` klasörüne koy (her soru için 1 fotoğraf)

> `about` alanı: "ben" = senin hakkında, "o" = onun hakkında, "biz" = ikiniz hakkında
>
> Örnek format (content.json → months[3].couplesQuiz.questions):
> ```json
> {
>   "question": "En sevdiğim yemek?",
>   "about": "ben",
>   "options": ["Pizza", "Sushi", "Burger", "Döner"],
>   "correct": 0,
>   "photo": "month-04/foto1.jpeg",
>   "reaction": "Bunu bilmen lazımdı! 😤"
> }
> ```

---

## Ay 5 — Fotoğraf Kazı Kazan 🎰

Kazı kazan kartlarının altından fotoğraflar çıkıyor.

- [ ] Kart 1: Fotoğraf + açıklama
- [ ] Kart 2: Fotoğraf + açıklama
- [ ] Kart 3: Fotoğraf + açıklama
- [ ] Kart 4-8: (daha fazla ekle, en az 6-8 kart güzel olur)
- [ ] Kapanış mesajı
- [ ] Fotoğraflar: `public/photos/month-05/` klasörüne koy

> Örnek format (content.json → months[4].scratch.cards):
> ```json
> { "photo": "month-05/foto1.jpeg", "caption": "Bu anı hatırlıyor musun? 💕" }
> ```

---

## Ay 6 — Seçimli Hikaye Macerası 🗺️

Bir "kendi maceranı seç" tipi hikaye.

- [ ] Giriş sahnesi
- [ ] Her sahne için 2 seçenek (en az 4-5 sahne)
- [ ] Mutlu son sahnesi

> Şu anki placeholder iyi bir şablon, kendi hikayenizi yazın.

---

## Ay 7 — Bu Kim Dedi? 🗣️

Alışkanlıklar ve itiraflar — kim hangisi?

- [ ] İfade 1: Metin + cevap (name1/name2) + fotoğraf + tepki
- [ ] İfade 2: ...
- [ ] İfade 3: ...
- [ ] İfade 4-8: (en az 8 ifade güzel olur)
- [ ] Kapanış mesajı
- [ ] Fotoğraflar: `public/photos/month-07/` klasörüne koy

> `answer` alanı: "name1" = senin isminin karşılığı, "name2" = onun isminin karşılığı
>
> Örnek format (content.json → months[6].whoSaidIt.statements):
> ```json
> {
>   "text": "Uyurken battaniyeyi çalan",
>   "answer": "name1",
>   "photo": "month-07/foto1.jpeg",
>   "reaction": "Her gece aynı senaryo! 😂"
> }
> ```

---

## Ay 8 — Seninle Her Yol Güzel 🗺️ (Pixel Art Şehir Macerası)

Gittiğiniz şehirler, pixel art retro oyun tarzında.

- [ ] Şehir 1 (Bozcaada): Hikaye + fotoğraf + tarih
- [ ] Şehir 2 (Ankara): Hikaye + fotoğraf
- [ ] Şehir 3 (Düğün): Hikaye + fotoğraf
- [ ] Şehir 4 (Diyarbakır/Mardin): Hikaye + fotoğraf
- [ ] Şehir 5 (Antalya Kaş): Hikaye + fotoğraf + tarih
- [ ] Şehir 6 (Balıkesir): Hikaye + fotoğraf
- [ ] Kapanış mesajı
- [ ] Fotoğraflar: `public/photos/month-08/` klasörüne koy (bozcaada.jpeg, ankara.jpeg vs.)

> Örnek format (content.json → months[7].cityQuest.cities):
> ```json
> {
>   "name": "Bozcaada",
>   "event": "Aslı'nın Doğum Günü 🎂",
>   "date": "17 Mayıs",
>   "story": "Prensesin doğum günü kutlaması...",
>   "photo": "month-08/bozcaada.jpeg",
>   "color": "#4a90d9",
>   "emoji": "🏝️"
> }
> ```

---

## Ay 9 — 3D Anı Odası 🏠

Sanal bir oda — duvarlarda fotoğraflar, masada objeler.

- [ ] 3-5 fotoğraf (duvara asılacak)
- [ ] Fotoğraflar: `public/photos/month-10/` klasörüne koy

---

## Ay 10 — Leo'nun Dünyası 🐾

Leo'ya özel mini sayfa.

- [ ] Leo'nun adı + sahiplenme tarihi
- [ ] Sahiplenme hikayesi (1-2 paragraf)
- [ ] 3-5 Leo fotoğrafı + açıklamaları
- [ ] Fotoğraflar: `public/photos/month-10/` klasörüne koy

---

## Ay 11 — Dijital Bahçe 🌸

11. ay sitesinden esinlenen çiçek bahçesi.

- [ ] Çiçek emojileri (önceden ayarlı, değiştirmek istersen güncelle)
- [ ] Özel mesaj

---

## Ay 12 — Yeni Evimize Hoş Geldin 🏡

Escape Room tarzı: 3 bulmacayı çöz, yeni evin kapısını aç!

- [ ] Bulmaca 1: İlk buluşma tarihi (GG.AA.YYYY formatında)
- [ ] Bulmaca 2: Özel bir kelime/cümle + ipucu
- [ ] Bulmaca 3: Sayısal bir cevap + ipucu (Leo'nun sahiplenme ayı = 10)
- [ ] Giriş mesajı (intro)
- [ ] Final mesajı (yeni ev temasında)

> Örnek format (content.json → months[11].escape.puzzles):
> ```json
> { "type": "date", "question": "İlk buluşma tarihimiz?", "answer": "20.04.2025", "hint": "Nisan ayıydı..." }
> ```

---

## Büyük Final 🎉

Tüm ayları tamamladıktan sonra açılan final sahne.

- [ ] Final başlığı
- [ ] Final mesajı (uzun, duygusal)
- [ ] (Opsiyonel) Video mesaj: `src/assets/videos/` klasörüne koy
- [ ] Konfeti efekti (otomatik açık)

---

## Notlar

- Fotoğraflar `.jpeg` veya `.png` formatında olmalı
- Video `.mp4` formatında olmalı
- Tüm metinler Türkçe olacak
- Her şeyi tamamlamana gerek yok — placeholder'lar zaten çalışır
- `name1` ve `name2` alanları `couple.name1` ve `couple.name2`'ye karşılık gelir
