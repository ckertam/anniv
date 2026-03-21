# İçerik Checklist - Seninle 365 Gün

Tüm içerikler `src/data/content.json` dosyasına yazılacak.
Fotoğraflar `src/assets/photos/month-XX/` klasörlerine konulacak.

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
- [ ] Fotoğraflar: `src/assets/photos/month-01/` klasörüne koy

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
- [ ] Fotoğraflar: `src/assets/photos/month-03/` klasörüne koy

> Örnek format (content.json → months[2].timeline.photos):
> ```json
> { "file": "month-03/foto1.jpeg", "caption": "Bu anı unutulmaz 💕", "date": "Haziran 2025" }
> ```

---

## Ay 4 — Mektuplar 💌

1-3 mektup + (opsiyonel) video mesaj.

- [ ] Mektup 1: Başlık + içerik + tarih
- [ ] Mektup 2: Başlık + içerik + tarih
- [ ] (Opsiyonel) Video mesaj: `src/assets/videos/` klasörüne koy

> Örnek format (content.json → months[3].letters.items):
> ```json
> { "title": "Sana ilk mektubum", "body": "Mektup metni...", "date": "Temmuz 2025" }
> ```

---

## Ay 5 — Şarkılarımız 🎵

Özel şarkılarınız + neden özel olduğu.

- [ ] Şarkı 1: İsim + sanatçı + Spotify track ID + hatıra
- [ ] Şarkı 2: İsim + sanatçı + Spotify track ID + hatıra
- [ ] Şarkı 3: İsim + sanatçı + Spotify track ID + hatıra

> Spotify Track ID: `open.spotify.com/track/` sonrasındaki kısım (? öncesi)
>
> Örnek format (content.json → months[4].music.tracks):
> ```json
> { "title": "Şarkı Adı", "artist": "Sanatçı", "spotifyId": "1zPaYQuwGXyQQbxbLzmIFf", "memory": "Bu şarkıyı ilk duyduğumuzda..." }
> ```

---

## Ay 6 — Seçimli Hikaye Macerası 🗺️

Bir "kendi maceranı seç" tipi hikaye.

- [ ] Giriş sahnesi
- [ ] Her sahne için 2 seçenek (en az 4-5 sahne)
- [ ] Mutlu son sahnesi

> Şu anki placeholder iyi bir şablon, kendi hikayenizi yazın.

---

## Ay 7 — Hafıza Oyunu 🃏

Eşleştirmeli kart oyunu — her çift bir fotoğraf.

- [ ] 6 çift fotoğraf (12 kart) + her birinin etiketi
- [ ] Fotoğraflar: `src/assets/photos/month-07/` klasörüne koy
- [ ] Kazanma mesajı

> Örnek format (content.json → months[6].memory.pairs):
> ```json
> { "id": "pair1", "image": "month-07/foto1.jpeg", "label": "İlk buluşma" }
> ```

---

## Ay 8 — Dilek Ağacı 🌳

Geleceğe dair dilekler — ağaca yaprak olarak asılacak.

- [ ] 6-10 dilek cümlesi
- [ ] Kapanış mesajı

> Örnek: "Seninle dünyayı gezmek", "Birlikte yaşlanmak" vs.

---

## Ay 9 — 3D Anı Odası 🏠

Sanal bir oda — duvarlarda fotoğraflar, masada objeler.

- [ ] 3-5 fotoğraf (duvara asılacak)
- [ ] Fotoğraflar: `src/assets/photos/month-10/` klasörüne koy

---

## Ay 10 — Leo'nun Dünyası 🐾

Leo'ya özel mini sayfa.

- [ ] Leo'nun adı + sahiplenme tarihi
- [ ] Sahiplenme hikayesi (1-2 paragraf)
- [ ] 3-5 Leo fotoğrafı + açıklamaları
- [ ] Fotoğraflar: `src/assets/photos/month-09/` klasörüne koy

---

## Ay 11 — Dijital Bahçe 🌸

11. ay sitesinden esinlenen çiçek bahçesi.

- [ ] Çiçek emojileri (önceden ayarlı, değiştirmek istersen güncelle)
- [ ] Özel mesaj

---

## Ay 12 — Escape Room / Son Bulmaca 🔐

3 bulmaca çözerek finale ulaşılacak.

- [ ] Bulmaca 1: İlk buluşma tarihi (GG.AA.YYYY formatında)
- [ ] Bulmaca 2: Özel bir kelime/cümle + ipucu
- [ ] Bulmaca 3: Sayısal bir cevap + ipucu
- [ ] Final mesajı

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
- Spotify ID'leri linkteki `/track/` sonrasındaki kısım
- Tüm metinler Türkçe olacak
- Her şeyi tamamlamana gerek yok — placeholder'lar zaten çalışır
