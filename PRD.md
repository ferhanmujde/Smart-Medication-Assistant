# 📋 PRD — Product Requirements Document
## Smart Medication Assistant
### Akıllı İlaç Asistanı · Mini Web Uygulaması

---

> **Bu doküman ne işe yarar?**
> PRD (Ürün Gereksinimleri Dokümanı), bir uygulamayı inşa etmeden önce
> "tam olarak ne yapacağız?" sorusunu yanıtlar. Bir ev yapmadan önce
> çizilen mimari plan gibi düşün.

---

## 📌 Doküman Bilgileri

| Alan | Bilgi |
|---|---|
| Doküman Adı | Smart Medication Assistant — PRD v5.0 |
| Hazırlayan | Ürün Sahibi |
| Son Güncelleme | 2026 |
| Durum | 🟢 Aktif |
| Versiyon | v5.0 — Lovable'a geçiş |

### 🔄 v4.0 → v5.0 Değişiklik Özeti

| # | Ne değişti | Eski | Yeni |
|---|---|---|---|
| 1 | Uygulama arayüzü | Glide (ücretli) | ✅ Lovable (ücretsiz, GitHub deploy) |
| 2 | Kod asistanı | — | ✅ Cursor (sesli özellikler için) |
| 3 | Versiyon yönetimi | — | ✅ GitHub (teslim zorunluluğu) |
| 4 | Demo yayını | — | ✅ Lovable otomatik deploy |

---

## 1. 🎯 Ürün Özeti

> **Yaşlı hastaların ilaç kutusunu fotoğraflayarak ilaç adını otomatik tanıyan, ilaç saatinde sesli ve WhatsApp bildirimiyle otomatik uyaran, "İlacı İçtim" butonuyla ailesine anında haber gönderen, ilaçlar hakkındaki soruları sesli veya yazılı olarak yanıtlayan kişisel AI asistanına sahip, QR kodla aile üyesi ekleyen, tamamen ücretsiz ve Türkçe çalışan bir web uygulamasıdır.**

---

## 2. 👤 Kullanıcı Profilleri

### Fatma Hanım — Birincil Kullanıcı
```
Yaş       : 72   |   Şehir: İzmir   |   Cihaz: Android
Durum     : Emekli, yalnız yaşıyor — 5 ilaç kullanıyor
Teknoloji : Düşük (sadece WhatsApp biliyor)

İSTEDİKLERİ:
  ✅ Telefon ilaç saatinde kendisi uyarsın
  ✅ İlacı aldığımı kızıma otomatik bildirsin
  ✅ Sesli konuşsun
  ✅ Her şey Türkçe olsun
  ✅ İlacım hakkında sormak istediğimde yanıt verecek biri olsun
```

### Ayşe — İkincil Kullanıcı
```
Yaş       : 44   |   Şehir: İstanbul   |   Cihaz: iPhone
Meslek    : Öğretmen (iş saatleri yoğun)

İSTEDİKLERİ:
  ✅ Annem ilacını alınca WhatsApp'a mesaj gelsin
  ✅ Almadıysa da haber gelsin
  ✅ QR kodu okutarak tek seferde ekleneyim
```

---

## 3. 🗺️ Kullanıcı Yolculuğu

```
[Saat 08:00]
  → Make.com tetiklenir
  → WhatsApp: "💊 Günaydın! Beloc 50mg ilacınızı alma zamanı."
  → Fatma Hanım uygulamayı açar — sesli uyarı otomatik başlar
  → "✅ İlacı İçtim" butonuna basar
  → Ayşe'ye WhatsApp: "✅ Annen ilacını aldı. Saat: 08:07"
  → Stok 1 azalır

[Eğer 30 dk içinde buton basılmazsa]
  → Ayşe'ye: "⚠️ Annen 08:00 ilacını henüz almadı."

[Akşam Fatma Hanım sorar]
  → "Beloc ile peynir yiyebilir miyim?"
  → AI Asistan: "Beloc ile peynir arasında bilinen bir etkileşim yok.
     Doktorunuza danışın."
```

---

## 4. ✅ Kapsam

### 4.1 MVP'ye Dahil (In Scope)

| # | Özellik | Açıklama | Öncelik |
|---|---|---|---|
| F1 | Fotoğrafla ilaç ekleme | Gemini AI fotoğraftan ilaç adını okur | 🔴 Zorunlu |
| F2 | Manuel ilaç girişi | Elle yazarak ilaç eklenebilir | 🔴 Zorunlu |
| F3 | İlaç etkileşim kontrolü | Gemini: Güvenli / Dikkat / Tehlikeli | 🔴 Zorunlu |
| F4 | Otomatik sesli uyarı | İlaç saatinde TTS çalar | 🔴 Zorunlu |
| F5 | WhatsApp hatırlatma | Sabah 08:00 otomatik mesaj | 🔴 Zorunlu |
| F6 | "İlacı İçtim" butonu | Aileye WhatsApp onayı gider | 🔴 Zorunlu |
| F7 | "İlaç alınmadı" uyarısı | 30 dk geçerse aileye uyarı | 🔴 Zorunlu |
| F8 | İlaç listesi renkli risk | Güvenli/Dikkat/Tehlikeli badge | 🔴 Zorunlu |
| F9 | QR ile aile ekleme | Süresiz QR, WhatsApp'tan gönderilir | 🟡 Önemli |
| F10 | Stok takibi | Buton stoku 1 azaltır | 🟡 Önemli |
| F11 | Polifarmasi skoru | 4+ ilaçta Türkçe uyarı | 🟡 Önemli |
| F12 | Yaşa özel uyarı | 65+ için ek mesaj | 🟢 Bonus |
| F13 | AI Asistan — Metin | Yazılı soru → Gemini yanıtı | 🟡 Önemli |
| F14 | AI Asistan — Sesli | Mikrofon → STT → Gemini → TTS | 🟡 Önemli |
| F15 | Hızlı Soru Butonları | Hazır sorular tek tıkla gönderilir | 🟢 Bonus |
| F16 | Sohbet Geçmişi | Son 10 soru-cevap saklanır | 🟢 Bonus |

### 4.2 Kapsam Dışı (Out of Scope)

- TİTCK ilaç veritabanı entegrasyonu
- Doktor/eczacı hesabı
- iOS/Android native uygulama
- Çok dilli destek

---

## 5. 📐 Teknik Mimari

### 5.1 Araç Seti — Tamamen Ücretsiz

| Araç | Ne İşe Yarar | Maliyet |
|---|---|---|
| **Lovable** | Uygulama arayüzü, otomatik GitHub deploy | ✅ Ücretsiz |
| **Cursor** | Sesli özellikler ve Gemini entegrasyonu | ✅ Ücretsiz |
| **GitHub** | Kod deposu ve teslim platformu | ✅ Ücretsiz |
| **Airtable** | Veritabanı | ✅ Ücretsiz |
| **Google Gemini 2.0 Flash** | OCR + etkileşim + AI sohbet | ✅ Ücretsiz |
| **Make.com** | Otomasyon | ✅ Ücretsiz |
| **WhatsApp Business Cloud** | Bildirimler | ✅ Ücretsiz (1.000 msg/ay) |
| **Web Speech API** | TTS + STT | ✅ Tarayıcıda gömülü |
| **QR Server API** | QR üretimi | ✅ Ücretsiz |

> 💡 **Demo toplam maliyeti: 0 TL / 0 $**

---

### 5.2 Sistem Şeması

```
┌────────────────────┐     ┌──────────────────────────┐
│    KULLANICI       │     │      LOVABLE APP          │
│  Fatma Hanım       │────►│  Türkçe Arayüz            │
│  Android / iOS     │◄────│  Web Speech API (TTS+STT) │
└────────────────────┘     └────────────┬──────────────┘
                                        │
           ┌────────────────────────────┼──────────────────────┐
           │                            │                      │
   ┌───────▼──────┐            ┌────────▼──────┐    ┌──────────▼──────┐
   │   AIRTABLE   │            │   MAKE.COM    │    │    GEMINI       │
   │  Veritabanı  │            │  Otomasyon    │    │  2.0 Flash      │
   │  Stok/token  │            │  Zamanlayıcı  │    │  Fotoğraf okur  │
   │  Sohbet geç. │            │  Webhook      │    │  Etkileşim+Chat │
   └──────────────┘            └───────┬───────┘    └─────────────────┘
                                       │
                    ┌──────────────────┴──────────────────┐
                    │                                      │
           ┌────────▼───────┐                  ┌──────────▼──────┐
           │   WHATSAPP     │                  │  QR SERVER API  │
           │ Business Cloud │                  │  (Süresiz QR)   │
           │ 1.000 msg/ay   │                  └─────────────────┘
           └────────────────┘
```

---

### 5.3 Sesli Uyarı Sistemi

**Cursor ile Lovable'a eklenecek JavaScript:**

```javascript
function bekleyenUyariKontrol() {
  const bekleyenUyari = localStorage.getItem('bekleyen_sesli_uyari');
  const uyariOkundu   = localStorage.getItem('sesli_uyari_okundu');
  if (bekleyenUyari && uyariOkundu !== 'true') {
    sesliOku(bekleyenUyari);
    localStorage.setItem('sesli_uyari_okundu', 'true');
  }
}

function sesliOku(metin) {
  const konusma  = new SpeechSynthesisUtterance(metin);
  konusma.lang   = 'tr-TR';
  konusma.rate   = 0.85;
  konusma.volume = 1.0;
  window.speechSynthesis.speak(konusma);
}

bekleyenUyariKontrol();
```

---

### 5.4 AI Asistan — Sesli Giriş (STT)

```javascript
function mikrofonuBaslat() {
  const dinleyici = new webkitSpeechRecognition();
  dinleyici.lang = 'tr-TR';
  dinleyici.onresult = (event) => {
    const sorulan = event.results[0][0].transcript;
    document.getElementById('soru-alani').value = sorulan;
    soruGonder(sorulan);
  };
  dinleyici.start();
}
```

---

## 6. 🗄️ Veri Modeli

### `Ilaclar` tablosu

| Alan | Tip |
|---|---|
| ilac_adi | Single line text |
| dozaj | Single line text |
| etken_madde | Single line text |
| kullanim_sikligi | Single line text |
| stok_sayisi | Number |
| etkilesim_riski | Single select (Güvenli/Dikkat/Tehlikeli) |
| bekleyen_sesli_uyari | Long text |
| sesli_uyari_okundu | Checkbox |
| ilac_alindi_bugun | Checkbox |
| son_alinma_saati | Date (Include time: açık) |

### `Kullanicilar` tablosu

| Alan | Tip |
|---|---|
| ad | Single line text |
| yas | Number |
| telefon | Phone number |
| aile_token | Single line text |
| qr_url | URL |

### `Hatirlatilar` tablosu

| Alan | Tip |
|---|---|
| ilac_adi | Single line text |
| hatirlatma_saati | Single line text |
| aktif | Checkbox |

### `Sohbet_Gecmisi` tablosu

| Alan | Tip |
|---|---|
| soru | Long text |
| yanit | Long text |
| tarih_saat | Date (Include time: açık) |

---

## 7. 📱 Ekran Tasarımları

### Ana Sayfa

```
┌────────────────────────────────┐
│  💊 İlaç Asistanınız           │
│  Günaydın, Fatma Hanım! 👋     │
│  ╔══════════════════════════╗  │
│  ║  BUGÜNKÜ İLAÇLARINIZ    ║  │
│  ║  Beloc 50mg — 08:00  ✅  ║  │
│  ║  Coumadin 5mg — 20:00 ⏳ ║  │
│  ╚══════════════════════════╝  │
│  [ 📷 İlaç Ekle             ]  │
│  [ 💊 Tüm İlaçlarım         ]  │
│  [ 👨‍👩‍👧 Aile Görünümü        ]  │
│  [ 💬 AI Asistanım          ]  │
│  ⚠️ Tıbbi tavsiye yerine geçmez│
└────────────────────────────────┘
```

### İlaç Detay

```
┌────────────────────────────────┐
│  BELOC 50MG                    │
│  Günde 1 kez — sabah 08:00     │
│  Stok: 27 hap                  │
│  ┌──────────────────────────┐  │
│  │  🟡 DİKKAT               │  │
│  │  Warfarin ile kanama     │  │
│  │  riski artabilir.        │  │
│  └──────────────────────────┘  │
│  ╔══════════════════════════╗  │
│  ║   ✅  İLACI İÇTİM        ║  │
│  ╚══════════════════════════╝  │
└────────────────────────────────┘
```

### AI Asistanım

```
┌────────────────────────────────┐
│  💬 AI Asistanım               │
│  Merhaba Fatma Hanım!          │
│                                │
│  Siz: "Beloc aç mı alınır?"    │
│  ┌──────────────────────────┐  │
│  │ Beloc sabah aç karnına   │  │
│  │ alınır. Doktorunuza      │  │
│  │ danışın.                 │  │
│  └──────────────────────────┘  │
│  [🍽️ Aç mı tok?] [💊 Yan etki]│
│  [☕ Çay/kahve?] [😴 Uyku?   ] │
│  ┌──────────────────────────┐  │
│  │  Sorunuzu yazın...       │  │
│  └──────────────────────────┘  │
│  [ 🎤 Sesli Sor ] [ Gönder ➤ ] │
└────────────────────────────────┘
```

---

## 8. 🤖 AI Prompt Şablonları

### Prompt 1 — Fotoğraftan İlaç Okuma

```
Görev: Bu ilaç kutusu fotoğrafını analiz et.
SADECE şu formatta yaz:
İLAÇ: [ilaç adı] | DOZ: [doz] | ETKEN: [etken madde]
- Yanıt Türkçe
- Okunamazsa: İLAÇ: Okunamadı | DOZ: Bilinmiyor | ETKEN: Bilinmiyor
```

### Prompt 2 — Etkileşim Kontrolü

```
Sen Türkiye'deki yaşlı hastalar için ilaç güvenliği asistanısın.
Hasta: {{yas}} yaşında
İlaçlar: {{ilac_listesi}}

SADECE bu formatta yanıt ver:
RİSK: [GÜVENLİ / DİKKAT / TEHLİKELİ]
UYARI: [Maks 20 kelime]
SESLİ: [Maks 15 kelime]
WHATSAPP: [Maks 20 kelime]
Son satır: "Doktorunuza danışmayı unutmayın."
```

### Prompt 3 — WhatsApp Hatırlatma

```
Hasta: {{isim}}, İlaç: {{ilac_adi}}, Saat: {{hatirlatma_saati}}
Maks 160 karakter, sıcak dil, Türkçe, sadece mesaj metni.
```

### Prompt 4 — "İlacı İçtim" Bildirimi

```
{{isim}} az önce {{ilac_adi}} aldı. Saat: {{simdi}}
Maks 100 karakter, ✅ ile başla, sadece mesaj metni.
```

### Prompt 5 — "İlaç Alınmadı" Uyarısı

```
{{isim}}, {{ilac_adi}} almadı.
Maks 130 karakter, ⚠️ ile başla, nazik dil, sadece mesaj metni.
```

### Prompt 6 — AI Asistan Sohbet

```
Sen "İlaç Asistanı" adlı kişisel sağlık danışmanısın.

Ad: {{kullanici_adi}} | Yaş: {{yas}}
İlaçlar: {{ilac_listesi}}
Riskler: {{risk_ozeti}}
Son sohbet: {{son_3_mesaj}}
Soru: {{kullanici_sorusu}}

- Türkçe, maks 4 cümle
- Kesin teşhis koyma
- Her yanıt "Doktorunuza danışın." ile biter

YANIT: [metin]
SESLİ: [maks 2 cümle]
```

---

## 9. ⚙️ Make.com Senaryoları

| Senaryo | Tetikleyici | İşlem |
|---|---|---|
| 1 — OCR | Yeni fotoğraf kaydı | Gemini → ilaç adı parse → Airtable güncelle |
| 2 — Etkileşim | Senaryo 1 bitti | Gemini → risk parse → Airtable güncelle → TEHLİKELİ ise Senaryo 6 |
| 3 — Hatırlatma | Her gün 08:00 | WhatsApp gönder → sesli uyarı hazırla |
| 4 — Kontrol | Her gün 08:30 | ilac_alindi_bugun=false → aileye uyarı |
| 5 — İçtim | Lovable webhook | Stok -1 → saat kaydet → aileye WhatsApp |
| 6 — Acil | TEHLİKELİ riski | Tüm aileye acil WhatsApp |
| 7 — QR | İlk kayıt | Token üret → QR oluştur → Airtable kaydet |
| 8 — AI Sohbet | Lovable webhook | Bağlam çek → Gemini → yanıt döndür → sohbet kaydet |

---

## 10. 🔒 Güvenlik

> ⚠️ Bu uygulama yalnızca bilgi amaçlıdır. Tıbbi teşhis koymaz.
> Tüm sağlık kararları için doktorunuza danışınız.

- AI hiçbir zaman kesin teşhis koymaz
- Her yanıt "doktorunuza danışın" ile biter
- "İlacı İçtim" butonu sadece hasta görür
- Yanlış basınca 2 dakika "Geri Al" görünür

---

## 11. 📊 Başarı Metrikleri

| Test | Başarı Kriteri |
|---|---|
| Fotoğraf OCR | 10 kutudan 8'ini doğru okur |
| Etkileşim | 5 bilinen etkileşimi yakalar |
| WhatsApp | 08:00'de mesaj gelir |
| Sesli uyarı | Uygulama açılınca Türkçe okur |
| İlacı İçtim | Aileye WhatsApp gider |
| 30 dk uyarı | Alınmazsa aileye bildirim |
| QR | 2 telefonla çalışır |
| AI yazılı | 5 sn içinde yanıt |
| AI sesli | Mikrofon → sesli yanıt |
| Demo | 5 dakikada anlatılır |

---

## 12. 🔗 Araç Linkleri

| Araç | Link |
|---|---|
| Lovable | lovable.dev |
| Cursor | cursor.com |
| GitHub | github.com |
| Airtable | airtable.com |
| Google AI Studio | aistudio.google.com |
| Make.com | make.com |
| WhatsApp Business | developers.facebook.com |
| Loom | loom.com |

---

## 13. ✍️ Versiyon Geçmişi

| Versiyon | Değişiklik |
|---|---|
| v1.0 | İlk taslak |
| v2.0 | Türkçe + SMS + Sesli + QR + Gemini |
| v3.0 | İlacı İçtim + WhatsApp Cloud + Süresiz QR |
| v4.0 | AI Asistan (yazılı + sesli) eklendi |
| **v5.0** | **Glide → Lovable · Cursor + GitHub eklendi** |

---

*PRD v5.0 · Smart Medication Assistant · Ücretsiz · Lovable + Cursor + GitHub*
