# 💊 Smart Medication Assistant — Proje Fikir Dokümanı

> *Bu doküman, projenin temel fikrini, hedef kitlesini, yapay zekanın rolünü, rekabet durumunu ve başarı kriterlerini özetlemektedir.*

---

## 🔴 Problem: Ne Çözüyorum?

Türkiye'de 65 yaş üstü yaklaşık **8 milyon** insan yaşamaktadır. Bu grubun büyük çoğunluğu günde 4 ila 6 farklı ilaç kullanmaktadır — buna **polifarmasi** denir. Bu durumun beraberinde getirdiği riskler ciddidir:

- **İlaç etkileşimleri** yılda yaklaşık 125.000 hastane başvurusuna yol açmaktadır.
- Yaşlı bireyler, ilaç kutularındaki küçük yazıları okumakta zorlanmaktadır.
- Hangi ilacın hangi saatte alınacağını takip etmek kafa karıştırıcıdır.
- Aileler, yakınlarının ilaçlarını uzaktan takip edememektedir.
- Eczacı veya doktora her soru için ulaşmak zaman ve ulaşım gerektirir.

**Kısaca:** Yaşlı hastalar, ilaçlarını güvenli, doğru ve düzenli şekilde yönetmek için kolay bir araca sahip değildir.

---

## 👤 Kullanıcı: Bu Uygulamayı Kim Kullanacak?

### Birincil Kullanıcı — Yaşlı Birey (65+)
- Akıllı telefon kullanım deneyimi sınırlı
- Birden fazla kronik hastalığı olan (diyabet, hipertansiyon, kalp vb.)
- Günlük ilaç takibinde zorlanan
- Büyük font, sade arayüz ve sesli geri bildirim ihtiyacı duyan

### İkincil Kullanıcı — Bakım Veren Aile Üyesi
- Şehir dışında yaşayan veya çalışan yetişkin çocuklar
- Ebeveynlerinin ilaçlarını uzaktan kontrol etmek isteyen
- Bir etkileşim riski varsa anında haberdar olmak isteyen

### Üçüncül Kullanıcı — Eczacı / Sağlık Danışmanı *(ileriki aşamada)*
- Hastasının ilaç listesini hızlıca görmek isteyen
- İlaç etkileşimi uyarılarını teyit eden

---

## 🤖 AI'ın Rolü: Yapay Zeka Bu Çözümde Ne Yapıyor?

Yapay zeka bu projede 4 kritik görevi üstlenmektedir:

### 1. Görsel Tanıma (OCR + Vision)
Kullanıcı ilaç kutusunun fotoğrafını çeker. Gemini modeli görseli analiz ederek ilaç adını, dozajını ve üretici bilgisini otomatik olarak okur. Kullanıcının hiçbir şey yazmasına gerek kalmaz.

### 2. İlaç Etkileşim Analizi
Kullanıcının tüm ilaç listesi yapay zekaya gönderilir. AI, olası etkileşimleri değerlendirerek üç seviyeli basit bir risk puanı döner: **Güvenli / Dikkat / Tehlikeli.** Teknik tıp jargonu yerine sade, anlaşılır bir dil kullanılır.

### 3. Yaşa Özel Uyarılar
Kullanıcının yaşına göre bazı ilaçlar farklı riskler taşır (böbrek fonksiyonu, düşme riski, bilişsel etkiler). AI, bu faktörleri dikkate alarak kişiselleştirilmiş uyarılar üretir.

### 4. Hatırlatıcı Mesajları ve Kişisel Asistan
Otomasyonla birlikte çalışan AI, kullanıcıya günlük ilaç hatırlatma mesajlarını sıcak ve basit bir dille yazar. Ayrıca kullanıcı ilaçları hakkında sesli veya yazılı soru sorabilir; AI kişisel ilaç listesine bakarak Türkçe yanıt verir.

> **Önemli Not:** Yapay zeka hiçbir zaman kesin tıbbi teşhis koymaz veya ilaç reçete etmez. Her çıktıda "doktorunuza danışın" yönlendirmesi yer alır.

---

## 🛠 Kullanılan Araçlar

| Araç | Rol |
|---|---|
| **Lovable** | Web uygulama arayüzü — kod yazmadan, deploy dahil |
| **Airtable** | Veritabanı — ilaçlar, kullanıcılar, sohbet geçmişi |
| **Gemini API** | Fotoğraf OCR, etkileşim analizi, AI asistan |
| **Make.com** | Otomasyon — WhatsApp bildirimleri, zamanlayıcılar |
| **WhatsApp Business Cloud** | Bildirim kanalı — ücretsiz, Türkiye'de %99 teslimat |
| **Cursor** | Gelişmiş özellikler için AI destekli kod yazımı |
| **GitHub** | Kod deposu ve Lovable deploy entegrasyonu |

---

## 🏆 Rakip Durum: Benzer Çözümler Var mı? Benimki Nasıl Farklı?

### Mevcut Çözümler

| Çözüm | Güçlü Yönleri | Zayıf Yönleri |
|---|---|---|
| **Medscape / Drugs.com** | Kapsamlı ilaç veritabanı | İngilizce, karmaşık arayüz, yaşlılara uygun değil |
| **MyTherapy** | İlaç hatırlatıcı, iyi UX | AI etkileşim kontrolü yok, Türkçe desteği sınırlı |
| **Roundhealth** | Tasarımı güzel | Türk ilaç adlarını tanımıyor, fotoğraf özelliği yok |
| **Eczane uygulamaları** | Yerel ilaç bilgisi | Sadece satış odaklı, kişisel takip yok |
| **WhatsApp grupları** | Aile paylaşımı | Hiçbir otomasyon veya AI desteği yok |

### Benim Farkım

**Smart Medication Assistant, Türkiye'deki yaşlı kullanıcılar için sıfırdan tasarlanmış tek çözümdür.**

- ✅ **Fotoğrafla giriş:** Kutuyu çek, AI okusun — yazmaya gerek yok
- ✅ **Türkçe arayüz ve Türk ilaç isimleri:** Beloc, Coumadin, Glucophage gibi
- ✅ **Aile paylaşımı:** Çocuklar uzaktan takip edebilir
- ✅ **Yaşlı odaklı UX:** Büyük font, yüksek kontrast, sesli geri bildirim
- ✅ **Polifarmasi skoru:** Kaç ilaç alındığına göre risk uyarısı
- ✅ **Stok takibi:** İlaç bitme uyarısı
- ✅ **Kişisel AI Asistan:** İlaçlar hakkında sesli veya yazılı soru sorulabilir
- ✅ **Sıfır teknik bilgi ile kullanım:** Dokunmatik ekran kullanabilen herkes kullanabilir

---

## 🎯 Başarı Kriteri: Bu Proje Başarılı Olursa Ne Değişecek?

### Kısa Vadede (Prototip Aşaması)
- [ ] Bir yaşlı kullanıcı, teknik yardım almadan ilacının fotoğrafını çekip listeye ekleyebiliyor
- [ ] AI, 2 veya daha fazla ilaç için doğru risk seviyesini döndürüyor (Güvenli / Dikkat / Tehlikeli)
- [ ] Günlük hatırlatma bildirimi zamanında ulaşıyor
- [ ] Bir aile üyesi, yakınının ilaç listesini uzaktan görebiliyor

### Orta Vadede (Beta Sürümü)
- [ ] En az 10 yaşlı kullanıcı uygulamayı 1 hafta boyunca düzenli kullanıyor
- [ ] Kullanıcıların %70'i "anlamak kolaydı" diyor
- [ ] En az 1 gerçek ilaç etkileşim uyarısı bir kullanıcıyı doktora yönlendiriyor

### Uzun Vadede (Gerçek Ürün)
- [ ] Türkiye'deki ilaç veritabanıyla (TİTCK) entegrasyon sağlanıyor
- [ ] Uygulamanın önlediği tahmini hastane başvurusu sayısı ölçülüyor
- [ ] Sağlık sigortacıları veya eczane zincirleriyle ortaklık kurulabiliyor
- [ ] İlaç uyumsuzluğundan kaynaklanan önlenebilir sağlık maliyetleri azalıyor

### En Önemli Başarı Göstergesi
> *"Fatma Hanım, 72 yaşında, 5 ilaç kullanıyor. Uygulama sayesinde bir etkileşim uyarısı aldı, doktoruna gitti ve ilaçlarından biri değiştirildi. Bir hastane yatışı önlendi."*
>
> Bu hikaye bir kez yaşandığında, proje başarılı olmuştur.

---

## ⚠️ Sorumluluk Reddi

Bu uygulama yalnızca bilgilendirme amaçlıdır. Tıbbi teşhis koymaz, ilaç önermez veya reçete etmez. Tüm sağlık kararları için mutlaka bir doktor veya eczacıya danışılmalıdır.

---

*Doküman oluşturulma tarihi: 2026 | Proje: Smart Medication Assistant MVP*
