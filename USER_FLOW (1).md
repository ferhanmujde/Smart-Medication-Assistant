# User Flow — Smart Medication Assistant
> Akıllı İlaç Asistanı · v5.0 · Lovable + Cursor + GitHub

---

## İçindekiler

- [Akış 1: İlk Kullanım (Onboarding)](#akış-1-i̇lk-kullanım-onboarding)
- [Akış 2: İlaç Ekleme](#akış-2-i̇laç-ekleme)
- [Akış 3: Günlük İlaç Alma (Core Loop)](#akış-3-günlük-i̇laç-alma-core-loop)
- [Akış 4: AI Asistan ile Sohbet](#akış-4-ai-asistan-ile-sohbet)
- [Akış 5: Tehlikeli Etkileşim Tespiti](#akış-5-tehlikeli-etkileşim-tespiti)

---

## Akış 1: İlk Kullanım (Onboarding)

| Adım | Kullanıcı | Sistem |
|------|-----------|--------|
| 1 | Lovable uygulamasını tarayıcıda açar | Karşılama ekranı gösterilir |
| 2 | Ad, yaş ve WhatsApp numarasını girer | Kayıt Airtable'a yazılır |
| 3 | — | Benzersiz token üretilir (FAT-AIL-8X2K) |
| 4 | — | QR kodu ve paylaşım linki oluşturulur, Airtable'a kaydedilir |
| 5 | QR'ı aile üyesine WhatsApp'tan gönderir | — |
| 6 | — | Aile üyesi linke tıklar, sisteme "görüntüleyici" olarak eklenir |

---

## Akış 2: İlaç Ekleme

### 2A — Fotoğrafla

| Adım | Kullanıcı | Sistem |
|------|-----------|--------|
| 1 | "İlaç Ekle" butonuna basar | Kamera açılır |
| 2 | İlaç kutusunu fotoğraflar | Fotoğraf Airtable'a yüklenir, Make.com tetiklenir |
| 3 | — | Gemini görseli analiz eder, ilaç adı ve dozu otomatik doldurulur |
| 4 | Bilgileri onaylar | İlaç listeye eklenir |
| 5 | — | Etkileşim kontrolü çalışır, risk rengi belirlenir |

### 2B — Manuel

| Adım | Kullanıcı | Sistem |
|------|-----------|--------|
| 1 | "Elle Gir" seçeneğine basar | Manuel giriş formu açılır |
| 2 | İlaç adı, dozu ve kullanım sıklığını yazar | — |
| 3 | "Kaydet" butonuna basar | Etkileşim kontrolü devreye girer |

---

## Akış 3: Günlük İlaç Alma (Core Loop)

### Normal Senaryo

| Adım | Zaman | Kullanıcı | Sistem |
|------|-------|-----------|--------|
| 1 | 08:00 | — | Make.com tetiklenir, WhatsApp mesajı gönderilir |
| 2 | 08:00 | Bildirime tıklar, uygulamayı açar | Sesli uyarı otomatik çalar (Web Speech API) |
| 3 | 08:00 | Büyük yeşil butona basar: İlacı İçtim | — |
| 4 | 08:00 | — | Saat kaydedilir, stok 1 azaltılır |
| 5 | 08:00 | — | Aile üyelerine WhatsApp: "Annen ilacını az önce aldı." |
| 6 | 08:00 | Onay ekranını görür, ana sayfaya döner | — |

### Hata Senaryosu — Buton Basılmazsa

| Adım | Zaman | Kullanıcı | Sistem |
|------|-------|-----------|--------|
| 1 | 08:30 | — | Make.com kontrol eder: ilac_alindi_bugun = false |
| 2 | 08:30 | — | Aileye uyarı: "Annen henüz ilacını almadı." |
| 3 | 08:30 | — | Kullanıcıya hatırlatma WhatsApp gönderilir |

---

## Akış 4: AI Asistan ile Sohbet

| Adım | Kullanıcı | Sistem |
|------|-----------|--------|
| 1 | "AI Asistanım" butonuna basar | Sohbet ekranı açılır |
| 2 | Sorusunu yazar veya mikrofona basıp konuşur | STT metne çevirir, otomatik gönderilir |
| 3 | — | Make.com webhook tetiklenir |
| 4 | — | İlaç listesi ve yaş Airtable'dan çekilir |
| 5 | — | Son 3 sohbet hafızaya eklenir |
| 6 | — | Gemini'ye kişisel bağlamla gönderilir |
| 7 | ~3-5 sn bekler | Türkçe yanıt gösterilir ve sesli okunur |
| 8 | — | Sohbet Airtable'a kaydedilir, 10 kaydı geçince eskisi silinir |

---

## Akış 5: Tehlikeli Etkileşim Tespiti

| Adım | Kullanıcı | Sistem |
|------|-----------|--------|
| 1 | Yeni ilaç ekler | Gemini mevcut ilaçlarla karşılaştırır |
| 2 | — | Risk = TEHLIKELI → Senaryo 6 tetiklenir |
| 3 | — | Sesli uyarı hazırlanır |
| 4 | — | Tüm aile üyelerine acil WhatsApp gönderilir |
| 5 | İlaç listesinde kırmızı badge görür | Doktora danışma önerisi gösterilir |

---

## Notlar

- Uygulama Lovable ile oluşturulmuş, GitHub üzerinden yayınlanmaktadır.
- Sesli özellikler (TTS + STT) Cursor ile Lovable projesine eklenmiştir.
- Her akış sonu bir sonraki aksiyonu tetikler.
- Kullanıcı hiçbir şeyi "hatırlamak" zorunda kalmaz.
- Tüm bildirimler Türkçe gönderilir.
- AI Asistan yanıtları tıbbi tavsiye niteliği taşımaz; her yanıt "doktorunuza danışın" ile biter.
