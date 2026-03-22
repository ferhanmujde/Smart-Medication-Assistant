# Teknoloji Yığını & Kurulum Rehberi
> Smart Medication Assistant · Başlangıç Seviyesi · v5.0

---

## Önce Şunu Bil

Bu proje için **tek satır kod yazmana gerek yok.** Lovable'a Türkçe komut veriyorsun, o kodu yazıyor. Cursor sadece sesli özellikler için kullanılıyor — onu da kopyalayıp yapıştırıyorsun.

---

## Teknoloji Yığını

| Araç | Ne İşe Yarar | Neden Bu? |
|---|---|---|
| **Lovable** | Uygulama arayüzü | Kod yazmadan web uygulaması yapılır, GitHub ile direkt deploy edilir. Ücretsiz. |
| **Cursor** | Kod asistanı | Sesli özellikler ve Gemini entegrasyonu için Türkçe tarif ediyorsun, kod yazıyor |
| **GitHub** | Kod deposu | Projeyi saklamak, Lovable'a bağlamak ve teslim etmek için zorunlu |
| **Airtable** | Veritabanı | Excel gibi görünür, veritabanı gibi çalışır |
| **Make.com** | Otomasyon | Araçları birbirine bağlayan görsel akış editörü |
| **Gemini API** | Yapay zeka | Google AI Studio üzerinden ücretsiz kullanılır |
| **WhatsApp Business Cloud** | Bildirimler | Türkiye'de %99 teslimat, ayda 1.000 mesaj ücretsiz |

---

## Neden Bu Araçları Seçiyoruz?

**Lovable** — Alternatifi React, Flutter gibi framework'ler olurdu. Öğrenmesi aylar sürer. Lovable'da aynı sonuca saatler içinde ulaşırsın. GitHub ile direkt entegre olur, tek tıkla yayına alırsın.

**Cursor** — Lovable'da yapılamayan gelişmiş özellikler (sesli okuma, mikrofon) için Cursor'a Türkçe tarif ediyorsun. Kod bilmene gerek yok.

**GitHub** — Buildathon teslimi GitHub üzerinden yapılıyor. Zorunlu.

**Airtable** — Alternatifi PostgreSQL, MySQL gibi veritabanları olurdu. Bunlar için terminal bilgisi şart. Airtable'ı sıfırdan 30 dakikada öğrenirsin.

**Make.com** — Alternatifi Node.js veya Python ile yazılmış backend sunucu olurdu. Make.com'da aynı mantığı blokları birbirine bağlayarak kurarsın, kod yok.

**WhatsApp Business Cloud** — Alternatifi Twilio SMS olurdu ama ücretli. WhatsApp ayda 1.000 mesaj ücretsiz veriyor, Türkiye'de herkes kullanıyor.

---

## Kurulum Adımları

### Adım 1 — Airtable (Veritabanı) ~20 dakika

1. [airtable.com](https://airtable.com) → "Sign up for free"
2. "Create a base" → "Start from scratch" → İsim: `İlaç Asistanı`
3. Tabloları oluştur (ayrıntılar PRD.md Bölüm 6'da)
4. API token al: Profil → Account → Developer hub → Personal access tokens

---

### Adım 2 — GitHub (Kod Deposu) ~10 dakika

1. [github.com](https://github.com) → ücretsiz hesap aç
2. "New repository" → İsim: `smart-medication-assistant`
3. "Public" seç (teslim için zorunlu)
4. "Add a README file" işaretle → "Create repository"
5. Şu dosyaları yükle: `idea.md`, `PRD.md`, `TASKS.md`, `USER_FLOW.md`, `TECH_STACK.md`

---

### Adım 3 — Lovable (Uygulama Arayüzü) ~30 dakika

1. [lovable.dev](https://lovable.dev) → GitHub hesabınla giriş yap
2. "New Project" → "Start with an idea"
3. Şu promptu yapıştır:

```
Smart Medication Assistant adında Türkçe bir ilaç takip web uygulaması yap.
Yaşlı kullanıcılar için tasarlanmış, büyük fontlu, yüksek kontrastlı.
Ana ekranda bugünkü ilaç listesi görünsün.
Her ilaç için ilaç adı, dozaj ve büyük yeşil "İlacı İçtim" butonu olsun.
İlaç ekle ekranında form olsun.
Risk durumuna göre yeşil/sarı/kırmızı badge gösterilsin.
AI Asistanım ekranında sohbet arayüzü olsun.
Tüm metinler Türkçe olsun.
```

4. Lovable kodu yazar ve deploy eder → yayın linki alırsın
5. Sağ üstten "Connect to GitHub" → reponla bağla
6. Yayın linkini README.md'ye ekle

> 💡 Bir şeyi değiştirmek için düz Türkçe yaz: "Butonu daha büyük yap", "Arka planı beyaz yap"

---

### Adım 4 — Cursor ile Sesli Özellikler ~20 dakika

1. [cursor.com](https://cursor.com) → ücretsiz indir ve kur
2. GitHub repondan proje klasörünü aç
3. Chat panelini aç (Ctrl+L) → şunu yaz:

```
Bu Lovable projesine Türkçe sesli okuma (TTS) ve sesli giriş (STT) ekle.
Web Speech API kullanılsın, dil tr-TR olsun, hız 0.85 olsun.
Uygulama açılınca localStorage'daki bekleyen_sesli_uyari varsa otomatik okunsun.
Bir de mikrofon butonu ekle, basınca Türkçe konuşmayı dinlesin.
```

4. Cursor kodu yazar → Lovable'a yapıştır veya GitHub'a push et

---

### Adım 5 — WhatsApp Business Cloud ~30 dakika

1. [developers.facebook.com](https://developers.facebook.com) → Facebook ile giriş yap
2. "My Apps" → "Create App" → "Business" → İsim: `İlaç Asistanı`
3. Sol menüden "WhatsApp" → "Set up"
4. Kendi telefon numaranı test numarası olarak ekle
5. Kopyala ve kaydet:
   - **Phone Number ID**
   - **Temporary Access Token**

---

### Adım 6 — Make.com (Otomasyon) ~20 dakika

1. [make.com](https://make.com) → "Sign up for free"
2. "Create a new scenario" → boş kanvas açılır
3. İlk test senaryosu — sabah hatırlatması:
   - "+" → "Schedule" → Her gün 08:00
   - "+" → "Airtable" → "Search Records" → `Hatirlatilar` → `aktif = true`
   - "+" → "WhatsApp Business Cloud" → "Send a Text Message"
   - Phone Number ID ve Token'ı yapıştır
4. "Run once" → telefonuna mesaj geldi mi kontrol et

---

### Adım 7 — Gemini API ~15 dakika

1. [aistudio.google.com](https://aistudio.google.com) → API anahtarı al (zaten var ✓)
2. Make.com'da yeni senaryo → "HTTP" modülü → "Make a request":

```
URL    : https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
Method : POST
Headers: Content-Type → application/json
         x-goog-api-key → [Gemini API anahtarın]

Body:
{
  "contents": [{"parts": [{"text": "Şu ilaçlar arasında etkileşim var mı? Türkçe yanıtla: {{ilac_listesi}}"}]}]
}
```

3. "Run once" → Gemini'den yanıt geldi mi kontrol et

---

## Kurulum Sırası

```
Gün 1 sabah          → Airtable + GitHub
Gün 1 öğleden sonra  → Lovable ile uygulamayı oluştur
Gün 2 sabah          → WhatsApp Business Cloud
Gün 2 öğleden sonra  → Make.com + Gemini API test
Gün 3                → Cursor ile sesli özellikler + uçtan uca test
```

---

## Teslim Kontrol Listesi (Buildathon)

- [ ] GitHub reposu Public olarak ayarlandı
- [ ] README.md dolduruldu (Lovable yayın linki + Loom video linki)
- [ ] `idea.md`, `PRD.md`, `TASKS.md`, `USER_FLOW.md`, `TECH_STACK.md` repoda mevcut
- [ ] `features/` klasöründe kaynak kodları var
- [ ] Uygulama yayın linkinden çalışıyor
- [ ] Loom ile 2-3 dakikalık demo videosu çekildi

---

## Takılırsan Ne Yaparsın?

| Araç | Kaynak |
|---|---|
| **Airtable** | YouTube: "Airtable beginner tutorial" |
| **Lovable** | [docs.lovable.dev](https://docs.lovable.dev) |
| **Make.com** | Her modülün yanındaki "?" ikonu |
| **WhatsApp API** | Hata mesajını Google'a yapıştır |
| **Cursor** | Hata mesajını Cursor'a yapıştır, "Bu hatayı nasıl düzeltirim?" diye sor |
| **GitHub** | Gemini'ye sor: "GitHub'a dosya nasıl yüklerim?" |

> **Altın kural:** Bir adım çalışmadan bir sonrakine geçme. Her adımı ayrı test et.
