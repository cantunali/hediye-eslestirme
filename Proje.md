# Hediye Eşleştirme Uygulaması

## Proje Hakkında
Bu proje, belirli etkinlikler (doğum günü, düğün, ev kurma vb.) için hediye listeleri oluşturmayı ve davetlilerin bu listeden hediye seçmesini sağlayan modern bir web uygulamasıdır. Etkinlik sahipleri ihtiyaçlarını listeleyebilir, davetliler ise bütçelerine uygun hediye seçimi veya grup halinde ortak ödeme yaparak hediye alımı gerçekleştirebilirler.

## Temel Özellikler
*   **Etkinlik Yönetimi:** Etkinlik sahiplerinin etkinlik oluşturması, düzenlemesi ve yönetmesi (Dashboard).
*   **Hediye Listesi Yönetimi:** Hediyelerin eklenmesi (marka/model belirterek veya belirtmeden), silinmesi ve Excel ile toplu yükleme desteği. Hediye reserve edilmediği sürece bilgilerinin değiştirilebilmesi.
*   **Davetli Yönetimi:** Davetlilerin eklenmesi (ad, soyad, e-posta) ve Excel ile toplu yükleme. Davetlilere mail yoluyla şifre ve erişim gönderimi. Davet karekodu oluşturma.
*   **Hediye Seçimi ve Grup Kurma:** Davetlilerin sisteme giriş yaparak hediye seçebilmesi veya pahalı hediyeler için "Grup Kurma" seçeneği ile davetli listesinden katılımcı ekleyerek çoklu katılım (havuz hesap) gerçekleştirebilmesi.
*   **Önerilen Hediyeler (Featured Gifts) Sistemi:** Sistemde bulunan öne çıkan hediyelerin veritabanında (`featured gifts`) tutulması ve listeye kolayca eklenebilmesi.
*   **Yönetici/Admin Paneli:** Etkinlik adlarına ve detaylarına (kimlerin katıldığı, alınan ve kalan hediyeler) genel bakış sayfası.
*   **Modern Arayüz ve Landing Page:** Hediyelerin, davetlilerin, özelliklerin gösterildiği şık bir karşılama sayfası (Landing page).
*   **Reklam Alanı Modülü:** Arayüzün alt bölümlerinde Google reklam alanı için yerleşkeler.
*   **Gelişmiş Giriş Güvenliği:** Yönetim paneline girmek için Etkinlik Adı, E-posta Adresi ve Şifre'nin üçünün de eşleşmesi gerekliliği.

## Kullanılan Teknolojiler
*   **Frontend:** React (Vite tabanlı), React Router
*   **Stil/Arayüz:** Vanilla CSS (`index.css`), modern animasyonlar ve Lucide React ikonları. Duyarlı ve dinamik web tasarımı.
*   **Backend & Veritabanı:** Supabase (Kullanıcı yetkilendirmesi, veritabanı tabloları, RLS kuralları).
*   **E-Posta Servisi:** Nodemailer (SMTP üzerinden bilgi ve davet e-postaları gönderimi).
*   **Araçlar:** Excel işlemleri için `xlsx` kütüphanesi.

## Proje Yapısı (Özet)
Projenin dosya yapısı temel olarak şu şekildedir:
*   `src/components`: Uygulamanın temel bileşenleri (GuestPortal, ManageEvents vb.)
*   `src/services`: Supabase veritabanı bağlantısı (`supabase.js`)
*   `src/utils`: Ortak yardımcı fonksiyonlar (`helpers.js`)
*   `src/App.jsx`: Ana uygulama yönlendirmeleri ve giriş noktası.
*   `schema.sql`: Veritabanı tablo yapısı, güvenliği (RLS) ve başlangıç verileri (schema.sql).

## Kurulum ve Çalıştırma

### Gereksinimler
*   Node.js (v18+)
*   NPM veya Yarn
*   Supabase hesabı ve projesi

### Adımlar
1.  Bağlılıkları yükleyin:
    ```bash
    npm install
    ```
2.  Çevresel değişkenleri ayarlayın (Kök dizindeki `.env` dosyasını oluşturun):
    ```env
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```
3.  Vite geliştirme sunucusunu başlatın:
    ```bash
    npm run dev
    ```
4. Veritabanı: `schema.sql` dosyasındaki SQL komutlarını Supabase arayüzünden çalıştırarak gerekli veritabanı altyapısını kurun.

## Geliştirme Süreci Hakkında
- Bu uygulama, modern ve kullanıcı dostu bir arayüz sunmak hedeflenerek tasarlanmıştır.
- Etkinlik düzenleyici, kendi kontrol panelinden yönetimi devralırken, davetliler ise e-posta ile iletilen giriş kodu aracılığıyla sisteme (Guest Portal) giriş yapar.
- Şifreler ve projeyle ilgili tüm tanımlamalar, `Hediye_Eslestirme.txt` notlarında listelenen amaçlar doğrultusunda yapılandırılmıştır.
