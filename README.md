# 💊 Smart Medication Assistant
### Akıllı İlaç Asistanı — AI Buildathon 2026

---

## Problem

Türkiye'de 65 yaş üstü yaklaşık 8 milyon insan günde 4-6 farklı ilaç kullanmaktadır. Bu durum yılda 125.000'den fazla hastane başvurusuna yol açmaktadır. Yaşlı bireyler ilaç kutularındaki küçük yazıları okuyamaz, hangi ilacın hangi saatte alınacağını takip edemez ve aileler yakınlarının ilaçlarını uzaktan kontrol edemez.

---

## Çözüm

Smart Medication Assistant, Türkiye'deki yaşlı kullanıcılar için sıfırdan tasarlanmış bir web uygulamasıdır. Kullanıcı ilaç kutusunu fotoğraflar, Gemini AI otomatik okur. Her sabah WhatsApp bildirimi ve sesli uyarı gelir. "İlacı İçtim" butonuna basınca aile anında haberdar olur. 30 dakika geçerse aileye otomatik uyarı gönderilir. AI Asistan'a ilaçlar hakkında sesli veya yazılı soru sorulabilir.

**Yapay zekanın rolü:**
- 📷 Fotoğraftan ilaç adı ve dozu otomatik okuma (Gemini Vision)
- ⚠️ İlaç etkileşim analizi — Güvenli / Dikkat / Tehlikeli
- 💬 Kişisel ilaç asistanı — sesli + yazılı sohbet (kişisel ilaç listesiyle)
- 📱 Sıcak dilde Türkçe WhatsApp hatırlatma metinleri üretme

---

## Canlı Demo

🔗 Yayın Linki: https://smart-medication-assistant.lovable.app

🎥 Demo Video: https://www.loom.com/share/2c7c43cf642d461eaef54bc2c17f8e76

---

## Kullanılan Teknolojiler

- **Lovable** — Web uygulama arayüzü, otomatik deploy
- **Cursor** — AI destekli kod geliştirme
- **GitHub** — Kod deposu ve versiyon kontrolü
- **Airtable** — Veritabanı (ilaçlar, kullanıcılar, sohbet geçmişi)
- **Google Gemini API** — Fotoğraf OCR, etkileşim analizi, AI asistan
- **Make.com** — Otomasyon (WhatsApp bildirimleri, zamanlayıcılar)
- **WhatsApp Business Cloud** — Ücretsiz bildirim kanalı (1.000 mesaj/ay)
- **Web Speech API** — Sesli okuma (TTS) ve sesli giriş (STT)

---

## Nasıl Çalışır?

```
1. Kullanıcı ilaç kutusunu fotoğraflar
   → Gemini API ilaç adını ve dozunu otomatik okur

2. Her sabah 08:00'de WhatsApp hatırlatması gelir
   → Kullanıcı uygulamayı açar, sesli uyarı otomatik çalar

3. "İlacı İçtim" butonuna basar
   → Aile WhatsApp ile anında haberdar olur
   → Stok otomatik 1 azalır

4. 30 dakika geçerse
   → Aileye otomatik uyarı gider

5. AI Asistana soru sorulur
   → Gemini kişisel ilaç listesine bakarak Türkçe yanıtlar
   → Yanıt sesli okunur
```

---

## Proje Dosyaları

| Dosya | İçerik |
|---|---|
| `idea.md` | Problem tanımı, kullanıcı profili, AI rolü, rakip analizi |
| `PRD.md` | Ürün gereksinimleri, özellik listesi, prompt şablonları |
| `TASKS.md` | Görev listesi ve günlük plan |
| `USER_FLOW.md` | Kullanıcı akışları |
| `TECH_STACK.md` | Teknoloji seçimleri ve kurulum rehberi |
| `features/` | Uygulama kaynak kodları |

---

## ⚠️ Sorumluluk Reddi

Bu uygulama yalnızca bilgilendirme amaçlıdır. Tıbbi teşhis koymaz, ilaç önermez veya reçete etmez. Tüm sağlık kararları için mutlaka bir doktor veya eczacıya danışılmalıdır.

---

*AI Buildathon 2026 · Smart Medication Assistant · Ferhan Müjde*

