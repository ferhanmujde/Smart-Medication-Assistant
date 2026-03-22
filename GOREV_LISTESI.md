# Smart Medication Assistant — Geliştirme Görev Listesi

Bu liste [PRD v5.0](prd.md) (Akıllı İlaç Asistanı) dokümanına göre oluşturulmuştur. Aşamalar sırayla ilerletilmelidir; paralel işler alt maddelerde belirtilmiştir.

---

## Faz 0 — Hazırlık ve hesaplar

- [ ] GitHub deposu oluştur; yerel projeyi bağla (PRD teslim gereksinimi).
- [ ] Lovable'da proje aç veya Cursor'da eşdeğer React/Vite tabanlı web iskeleti kur (Türkçe UI varsayılanı).
- [ ] Airtable hesabı ve boş base oluştur.
- [ ] Google AI Studio'da Gemini 2.0 Flash API anahtarı al.
- [ ] Meta Developer'da WhatsApp Business Cloud uygulaması ve test numarası hazırla (1000 msg/ay limiti).
- [ ] Make.com hesabı; webhook URL'leri için not alanları hazırla.

---

## Faz 1 — Veri modeli (Airtable)

- [ ] `Ilaclar` tablosunu PRD'deki alanlarla oluştur: `ilac_adi`, `dozaj`, `etken_madde`, `kullanim_sikligi`, `stok_sayisi`, `etkilesim_riski` (Güvenli/Dikkat/Tehlikeli), `bekleyen_sesli_uyari`, `sesli_uyari_okundu`, `ilac_alindi_bugun`, `son_alinma_saati`.
- [ ] `Kullanicilar` tablosu: `ad`, `yas`, `telefon`, `aile_token`, `qr_url`.
- [ ] `Hatirlatilar` tablosu: `ilac_adi`, `hatirlatma_saati`, `aktif`.
- [ ] `Sohbet_Gecmisi` tablosu: `soru`, `yanit`, `tarih_saat`.
- [ ] Airtable API (Personal Access Token) ile uygulamadan okuma/yazma testi yap.

---

## Faz 2 — Uygulama iskeleti ve ana ekranlar

- [ ] Türkçe arayüz teması: tipografi, büyük dokunma alanları (yaşlı kullanıcı).
- [ ] Ana sayfa: karşılama, "Bugünkü ilaçlarınız" özeti, navigasyon (İlaç Ekle, Tüm İlaçlarım, Aile Görünümü, AI Asistanım).
- [ ] Alt bilgi: "Tıbbi tavsiye yerine geçmez" uyarısı (PRD §10).
- [ ] İlaç listesi ekranı: renkli risk rozetleri (F8 — Güvenli / Dikkat / Tehlikeli).
- [ ] İlaç detay ekranı: dozaj, sıklık, stok, etkileşim uyarı kutusu, büyük "İlacı İçtim" butonu (F6).

---

## Faz 3 — İlaç ekleme (F1, F2, F3)

- [ ] Manuel ilaç girişi formu → Airtable `Ilaclar` kaydı (F2).
- [ ] Fotoğraf yükleme / kamera: dosyayı backend veya Make webhook'a gönderme akışı.
- [ ] Gemini Prompt 1 ile OCR; yanıtı parse edip `ilac_adi`, `dozaj`, `etken_madde` alanlarına yaz (F1).
- [ ] Mevcut ilaç listesi + yaş ile Gemini Prompt 2 (etkileşim); `etkilesim_riski`, uyarı metinleri ve `SESLİ`/`WHATSAPP` alanlarını kaydet veya göster (F3).
- [ ] Polifarmasi: 4+ ilaçta Türkçe uyarı metni (F11).
- [ ] Yaş 65+ için ek uyarı metni (F12).

---

## Faz 4 — Hatırlatma, stok ve "İlacı İçtim"

- [ ] `Hatirlatilar` ile günlük zamanlamayı Airtable'da modelle; uygulamada bugünkü ilaçları saate göre listele.
- [ ] "İlacı İçtim": stok −1 (F10), `son_alinma_saati`, `ilac_alindi_bugun` güncelle; Make webhook veya doğrudan WhatsApp API ile aileye mesaj (Prompt 4) (F5, F6).
- [ ] Yanlış basım için 2 dakika "Geri Al" (undo) — PRD §10.
- [ ] `bekleyen_sesli_uyari` ve `sesli_uyari_okundu` bayraklarını Make + uygulama açılışı ile senkronize et.

---

## Faz 5 — Sesli uyarı (F4) ve Web Speech API

- [ ] Uygulama yüklendiğinde `bekleyenUyariKontrol()` ve `sesliOku()` (PRD §5.3): `tr-TR`, rate ~0.85.
- [ ] Hatırlatma sonrası sesli metnin Airtable'dan gelmesi ve bir kez okunması (`sesli_uyari_okundu`).
- [ ] AI yanıtları için isteğe bağlı TTS (Prompt 6'daki `SESLİ` satırı).

---

## Faz 6 — Make.com otomasyonları

- [ ] Senaryo 1 — OCR: yeni fotoğraf / kayıt → Gemini → Airtable `Ilaclar` güncelle.
- [ ] Senaryo 2 — Etkileşim: Senaryo 1 sonrası → Gemini risk → Airtable; TEHLİKELİ ise Senaryo 6.
- [ ] Senaryo 3 — Hatırlatma: günlük saat (ör. 08:00) → WhatsApp hasta → `bekleyen_sesli_uyari` hazırla (Prompt 3).
- [ ] Senaryo 4 — Kontrol: 08:30 → `ilac_alindi_bugun` false ise aileye uyarı (Prompt 5) (F7).
- [ ] Senaryo 5 — İçtim: Lovable/webhook → stok, saat, aile WhatsApp (F6 ile uyumlu).
- [ ] Senaryo 6 — Acil: TEHLİKELİ risk → tüm aileye WhatsApp.
- [ ] Senaryo 7 — QR: ilk kayıt → token → QR Server API → `qr_url` Airtable (F9).
- [ ] Senaryo 8 — AI sohbet: webhook → bağlam + Gemini → yanıt + `Sohbet_Gecmisi` (F13).

---

## Faz 7 — WhatsApp Business Cloud

- [ ] Şablon mesajlar / oturum mesajları ile hatırlatma, içtim, alınmadı, acil akışlarını bağla.
- [ ] Aile telefon numaralarını `aile_token` veya ilişki tablosu ile eşle; mesajları PRD karakter limitlerine göre kısalt.

---

## Faz 8 — QR ile aile ekleme (F9)

- [ ] Süresiz `aile_token` üretimi ve QR Server API ile görsel URL.
- [ ] QR tarama / link ile aile üyesi kayıt veya izin ekranı (minimal: telefon + doğrulama).
- [ ] WhatsApp'tan paylaşılabilir bağlantı veya görsel.

---

## Faz 9 — AI Asistan (F13, F14, F15, F16)

- [ ] Metin girişi → Gemini Prompt 6; bağlam: ad, yaş, ilaç listesi, risk özeti, son 3 mesaj.
- [ ] `Sohbet_Gecmisi` kaydı; istemde son 10 soru-cevap (F16).
- [ ] `webkitSpeechRecognition` ile STT (tr-TR); sonuçları soru alanına ve `soruGonder` (PRD §5.4) (F14).
- [ ] Hızlı soru butonları: Aç/tok, yan etki, çay/kahve, uyku (F15).
- [ ] Her yanıtın "Doktorunuza danışın." ile bitmesi kuralını prompt + UI'da doğrula.

---

## Faz 10 — Aile görünümü ve güvenlik

- [ ] Aile görünümü: son alınma, kaçırılan doz, stok uyarıları (salt okunur / sınırlı düzenleme).
- [ ] "İlacı İçtim" yalnızca hasta oturumunda; rol veya token ile ayır (PRD §10).
- [ ] Gizlilik: API anahtarları yalnızca sunucu / Make'de; istemcide sızıntı kontrolü.

---

## Faz 11 — Test ve demo (PRD §11)

- [ ] OCR: 10 kutudan 8 doğruluk hedefi için test seti.
- [ ] Etkileşim: bilinen 5 senaryo ile manuel test.
- [ ] WhatsApp 08:00 / 08:30 zamanlaması canlı veya test ortamında doğrula.
- [ ] Sesli uyarı: uygulama açılışında Türkçe TTS.
- [ ] QR: iki farklı cihazda akış.
- [ ] AI: yazılı <5 sn; sesli uçtan uca.
- [ ] 5 dakikalık demo senaryosu (Loom vb.) hazırla.

---

## Özet bağımlılık sırası

1. Faz 0–1 → veri ve erişim hazır olmadan entegrasyon yapılamaz.
2. Faz 2–3 → çekirdek ilaç yönetimi.
3. Faz 4–7 → hatırlatma, içtim, Make, WhatsApp birbirine bağlı.
4. Faz 5 ve 9 → Web Speech; AI ekranı Faz 3 sonrası anlamlıdır.
5. Faz 8 ve 10 → aile akışları stabilize olduktan sonra sertleştirilir.
6. Faz 11 → MVP kapanışı.

---

*Kaynak: PRD v5.0 — Smart Medication Assistant (Lovable + Cursor + GitHub + Airtable + Gemini + Make + WhatsApp).*
