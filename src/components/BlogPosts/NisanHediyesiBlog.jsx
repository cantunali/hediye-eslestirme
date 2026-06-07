import React from 'react';
import { Calendar, User, Clock, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '../AdBanner';

const NisanHediyesiBlog = () => {
    const slug = "nisan-hediyesi-ne-alinir-ciftlerin-gercekten-ihtiyaci-olan-hediyeler";
    const title = "Nişan Hediyesi Ne Alınır? Çiftlerin Gerçekten İhtiyacı Olan Hediyeler";
    const description = "Nişan hediyesi seçerken klasik seçeneklere takılıp kalmayın. Akıllı hediye listesi ile çiftin gerçek ihtiyaçlarını karşılayın, tekrar eden hediyelere son verin.";
    const imageUrl = "/blog-images/nisan-yildonumu-hediyesi.jpg";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "image": [imageUrl],
        "datePublished": "2026-05-15T10:00:00+03:00",
        "author": [{
            "@type": "Organization",
            "name": "HediyeEşleştir",
            "url": "https://hediyeeslestir.com"
        }]
    };

    return (
        <div className="animate-fade-in">
            
            <section className="section" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
                <div className="container">
                    <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.95rem', fontWeight: '700' }}>
                        <ChevronLeft size={18} /> Blog'a Geri Dön
                    </Link>

                    <div style={{ maxWidth: '850px' }}>
                        <h1 className="hero-title" style={{ marginBottom: '1.5rem', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#ffffff' }}>
                            {title}
                        </h1>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={16} /> 15 Mayıs 2026</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><User size={16} /> HediyeEşleştir Editör</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16} /> 4 Dakika Okuma</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                        <img
                            src={imageUrl}
                            alt="Nişan yüzüğü ve hediye kutusu"
                            style={{ width: '100%', borderRadius: '24px', marginBottom: '3rem', boxShadow: '0 20px 40px rgba(187, 0, 39, 0.1)' }}
                        />

                        <div className="blog-content" style={{ lineHeight: '1.8', fontSize: '1.15rem', color: '#ffffff' }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Nişan haberi geldi, mutluluklar paylaşıldı ve ardından o bildik telaş başladı: <strong>"Nişana ne hediye götürsek?"</strong> 💭
                            </p>

                            <p style={{ marginBottom: '1.5rem' }}>
                                Türk kültüründe nişan, düğün kadar önemli bir dönüm noktasıdır. Hediye seçimi de bir o kadar ciddiye alınır. Ancak çoğu zaman nişan hediyesi denince akla yalnızca altın, çiçek veya ev tekstili gelir. Oysa yeni hayatlarına adım atan çiftlerin ihtiyaç listesi çok daha geniştir.
                            </p>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '3.5rem', fontSize: '2rem' }}>
                                🤔 Nişan Hediyesinde Yaşanan Klasik Sorunlar
                            </h2>

                            <p style={{ marginBottom: '1.5rem' }}>
                                Nişan törenlerinde sıkça karşılaşılan durumlar şunlardır:
                            </p>

                            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                                <li style={{ marginBottom: '0.75rem' }}>Aynı setten 3 tane çay bardağı takımı</li>
                                <li style={{ marginBottom: '0.75rem' }}>Hiç kullanılmayan dekoratif objeler</li>
                                <li style={{ marginBottom: '0.75rem' }}>Zevke uymayan ev tekstili ürünleri</li>
                                <li style={{ marginBottom: '0.75rem' }}>Çiftin zaten sahip olduğu mutfak aletleri</li>
                            </ul>

                            <p style={{ marginBottom: '1.5rem' }}>
                                Bu sorunların temel nedeni, davetlilerin çiftin gerçek ihtiyaçlarını bilmemesidir. İşte tam burada <strong>akıllı hediye listesi</strong> hayat kurtarıcı bir çözüm sunar.
                            </p>

                            <AdBanner slot="blog_middle" />

                            <h2 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', marginTop: '3.5rem', fontSize: '2rem' }}>
                                🎁 Nişan İçin Hediye Listesi Nasıl Oluşturulur?
                            </h2>

                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ffffff', marginTop: '2rem' }}>1️⃣ Çift Birlikte Karar Verir</h3>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Nişanlı çift, yeni evleri veya ortak yaşamları için gerçekten ihtiyaç duydukları ürünleri belirler. Mutfak robotundan yatak örtüsüne, kahve makinesinden valiz setine kadar her şey listeye eklenebilir.
                            </p>

                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ffffff', marginTop: '2rem' }}>2️⃣ Liste Online Paylaşılır</h3>
                            <p style={{ marginBottom: '1.5rem' }}>
                                HediyeEşleştir üzerinden oluşturulan liste, nişan davetiyesiyle birlikte veya ayrı bir mesajla paylaşılır. Davetliler linke tıklayarak listeyi görür.
                            </p>

                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ffffff', marginTop: '2rem' }}>3️⃣ Davetliler Seçim Yapar</h3>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Her davetli, kendi bütçesine uygun bir ürünü seçerek rezerve eder. Başka biri aynı ürünü alamaz, böylece tekrar riski ortadan kalkar.
                            </p>

                            <h2 style={{ color: 'var(--tertiary)', marginBottom: '1.5rem', marginTop: '3.5rem', fontSize: '2rem' }}>
                                💡 Nişan Hediye Listesine Eklenebilecek Öneriler
                            </h2>
                            
                            <ul style={{ listStyle: 'none', paddingLeft: '0', marginBottom: '2rem' }}>
                                <li style={{ marginBottom: '1rem' }}><strong>Mutfak:</strong> Tencere seti, bıçak seti, airfryer, blender, espresso makinesi</li>
                                <li style={{ marginBottom: '1rem' }}><strong>Ev Tekstili:</strong> Nevresim takımı, havlu seti, perde, yastık</li>
                                <li style={{ marginBottom: '1rem' }}><strong>Teknoloji:</strong> Robot süpürge, akıllı aydınlatma, tablet</li>
                                <li style={{ marginBottom: '1rem' }}><strong>Deneyim:</strong> Balayı katkısı, çift spa paketi, yemek kursu</li>
                                <li style={{ marginBottom: '1rem' }}><strong>Dekorasyon:</strong> Tablo, vazo, mum seti, ayna</li>
                            </ul>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '3.5rem', fontSize: '2rem' }}>
                                🌟 Nişan Hediye Listesinin Avantajları
                            </h2>

                            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#ffffff' }}>Çift İçin</h4>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Gerçekten ihtiyaç duydukları ürünleri alırlar. Yeni evlerini kurarken eksik kalmaz, fazla ürünle uğraşmazlar.
                            </p>

                            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#ffffff' }}>Davetliler İçin</h4>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Ne alacağını düşünme stresi ortadan kalkar. Bütçeye uygun seçenekler net şekilde görünür. Hediyenin işe yarayacağından emin olurlar.
                            </p>

                            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#ffffff' }}>Herkes İçin</h4>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Gereksiz iade süreçleri, tekrar eden hediyeler ve boşa giden paralar tarihe karışır.
                            </p>

                            <h2 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', marginTop: '3.5rem', fontSize: '2rem' }}>
                                💍 "Ama Biz Altın İstiyoruz" Diyorsanız?
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Hediye listesi sadece fiziksel ürünlerden ibaret değildir. Listeye <strong>"Altın katkısı"</strong> veya <strong>"Balayı fonu"</strong> gibi sembolik kalemler de eklenebilir. Böylece geleneksel beklentiler de modern bir çözümle karşılanmış olur.
                            </p>

                            <div className="card" style={{ padding: '3rem', borderRadius: '32px', textAlign: 'center', marginTop: '3rem' }}>
                                <h2 className="gradient-text" style={{ marginBottom: '1.5rem' }}>💎 Sonuç: Nişanınızı Planlı ve Stressiz Kutlayın</h2>
                                <p style={{ marginBottom: '2.5rem', fontSize: '1.2rem' }}>
                                    Nişan, iki ailenin bir araya geldiği, sevincin paylaşıldığı özel bir gündür. Hediye sürecinin bu güzel anı gölgelemesine izin vermeyin. HediyeEşleştir ile nişan hediye listenizi oluşturun, davetlilerinizle paylaşın ve herkesin memnun kaldığı bir kutlama yaşayın.
                                </p>
                                <Link href="/yonetim/olustur" className="btn btn-primary" style={{ height: '3.5rem', padding: '0 2.5rem', fontSize: '1.1rem' }}>
                                    Hemen Listenizi Oluşturun →
                                </Link>
                            </div>

                            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#ffffff' }}>İlgili Yazılar:</h3>
                                <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                                    <li style={{ marginBottom: '1rem' }}>
                                        <Link href="/blog/dugun-hediyesi-karmasasina-son-akilli-liste-sistemi" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '1.1rem' }}>
                                            Düğün Hediyesi Karmaşasına Son: Akıllı Online Hediye Listesi Sistemi (2026 Rehberi)
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NisanHediyesiBlog;
