import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Clock, ChevronLeft, CheckCircle2, Lightbulb, Sparkles, Baby } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdBanner from '../AdBanner';

const BebekHediyesiBlog = () => {
    const slug = "bebek-hediyesi-ne-alinir-akilli-liste-rehberi-2026";
    const title = "Bebek Hediyesi Ne Alınır? Akıllı Liste Rehberi 2026";
    const description = "Yeni doğan bebek için doğru hediyeyi seçin. Online hediye listesi ile aynı ürün riskini azaltın, ihtiyaçları kolayca karşılayın.";
    const imageUrl = "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "image": [imageUrl],
        "datePublished": "2026-02-15T08:00:00+03:00",
        "dateModified": "2026-02-15T08:00:00+03:00",
        "author": [{
            "@type": "Organization",
            "name": "HediyeEşleştir",
            "url": "https://hediyeeslestir.com"
        }]
    };

    return (
        <div className="animate-fade-in">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`https://hediyeeslestir.com/blog/${slug}`} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://hediyeeslestir.com/blog/${slug}`} />
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Helmet>

            {/* Hero Section */}
            <section className="section" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
                <div className="container">
                    <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.95rem', fontWeight: '700' }}>
                        <ChevronLeft size={18} /> Blog'a Geri Dön
                    </Link>

                    <div style={{ maxWidth: '850px' }}>
                        <h1 className="hero-title" style={{ marginBottom: '1.5rem', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#ffffff' }}>
                            👶 Bebek Hediyesi Seçmek Artık Çok Daha Kolay: <span className="gradient-text">İsteyene İstediği Hediye!</span>
                        </h1>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={16} /> 15 Şubat 2026</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><User size={16} /> HediyeEşleştir Editör</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16} /> 4 Dakika Okuma</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section">
                <div className="container">
                    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                        <img
                            src={imageUrl}
                            alt="Bebek Hediyesi Rehberi"
                            style={{ width: '100%', borderRadius: '24px', marginBottom: '3rem', boxShadow: '0 20px 40px rgba(187, 0, 39, 0.1)' }}
                        />

                        <div className="blog-content" style={{ lineHeight: '1.8', fontSize: '1.15rem', color: '#ffffff' }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Bebek haberi almak dünyadaki en güzel duygulardan biri 💛 Ama ardından gelen klasik soru hep aynı: <strong>“Acaba ne hediye alsak?”</strong>
                            </p>

                            <p style={{ marginBottom: '1.5rem' }}>
                                Zıbın mı? Battaniye mi? Mama sandalyesi mi? Ve çoğu zaman sonuç: Aynı üründen 4 tane, hiç kullanılmayan hediyeler ve boşa giden bütçe…
                            </p>

                            <div className="card" style={{ padding: '2.5rem', borderRadius: '20px', marginBottom: '3rem', borderLeft: '6px solid var(--primary)' }}>
                                <p style={{ margin: 0, fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.85)' }}>
                                    İşte tam bu noktada devreye giren <strong>hediye eşleştirme uygulamaları</strong>, bebek bekleyen aileler için süreci hem planlı hem de zahmetsiz hale getiriyor.
                                </p>
                            </div>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Baby size={32} /> 🍼 Bebek Sahipleri İçin Neden Hediye Listesi Şart?
                            </h2>

                            <p style={{ marginBottom: '1.5rem' }}>
                                Yeni ebeveynler için ilk aylar hem heyecanlı hem de yoğun geçer. İhtiyaçlar net ama çevredekiler çoğu zaman tahmin yürütür.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
                                {[
                                    "Gerçekten ihtiyaç duyulan ürünler listeye eklenir",
                                    "Davetliler listeden seçim yapar",
                                    "Aynı ürünün birden fazla alınması engellenir",
                                    "Gereksiz harcama ve iade süreci ortadan kalkar"
                                ].map((item, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <CheckCircle2 size={22} style={{ color: 'var(--primary)', marginTop: '0.1rem', flexShrink: 0 }} />
                                        <span style={{ fontWeight: '500', color: '#ffffff' }}>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <AdBanner slot="blog_middle" />

                            <h2 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Sparkles size={32} /> 🎁 Bebek Hediyesi Uygulaması Nasıl Çalışır?
                            </h2>

                            <div style={{ marginBottom: '3rem' }}>
                                <div style={{ marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>1️⃣ Aile Liste Oluşturur</h3>
                                    <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
                                        <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>• <span>İhtiyaç duyulan ürünler eklenir (bez, biberon seti, bebek arabası, uyku tulumu vb.)</span></li>
                                        <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>• <span>İstenirse marka ve model belirtilebilir</span></li>
                                        <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>• <span>Fiyat aralığı eklenebilir</span></li>
                                    </ul>
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>2️⃣ Liste Paylaşılır</h3>
                                    <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
                                        <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>• <span>Özel bir link ile aile ve arkadaşlara gönderilir</span></li>
                                        <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>• <span>WhatsApp, Instagram veya e-posta ile kolayca paylaşılır</span></li>
                                    </ul>
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>3️⃣ Davetliler Seçim Yapar</h3>
                                    <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
                                        <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>• <span>Listedeki ürünlerden birini rezerve eder</span></li>
                                        <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>• <span>Böylece çakışma olmaz</span></li>
                                        <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>• <span>Herkes bütçesine uygun hediyeyi seçebilir</span></li>
                                    </ul>
                                </div>
                            </div>

                            <h2 style={{ color: 'var(--tertiary)', marginBottom: '2rem', marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Lightbulb size={32} /> 💡 Neden Bu Sistem Daha Mantıklı?
                            </h2>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                                <div className="card" style={{ padding: '2rem' }}>
                                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.75rem', fontSize: '1.2rem' }}>🎯 Gerçek İhtiyaç Odaklı</h4>
                                    <p style={{ fontSize: '1rem', margin: 0, color: 'rgba(255, 255, 255, 0.85)' }}>Yeni doğan bir bebeğin ihtiyaçları spesifiktir. Rastgele hediye yerine, gerçekten kullanılacak ürünler alınır.</p>
                                </div>
                                <div className="card" style={{ padding: '2rem' }}>
                                    <h4 style={{ color: 'var(--secondary)', marginBottom: '0.75rem', fontSize: '1.2rem' }}>💸 Bütçe Dostu</h4>
                                    <p style={{ fontSize: '1rem', margin: 0, color: 'rgba(255, 255, 255, 0.85)' }}>Davetliler fiyat aralığını görebilir. Kimse kendini zor durumda hissetmez.</p>
                                </div>
                                <div className="card" style={{ padding: '2rem' }}>
                                    <h4 style={{ color: 'var(--tertiary)', marginBottom: '0.75rem', fontSize: '1.2rem' }}>📦 Karmaşayı Azaltır</h4>
                                    <p style={{ fontSize: '1rem', margin: 0, color: 'rgba(255, 255, 255, 0.85)' }}>4 tane aynı battaniye yerine 4 farklı ihtiyaç karşılanır.</p>
                                </div>
                                <div className="card" style={{ padding: '2rem' }}>
                                    <h4 style={{ color: 'var(--error)', marginBottom: '0.75rem', fontSize: '1.2rem' }}>🤍 Duygusal Değer Artar</h4>
                                    <p style={{ fontSize: '1rem', margin: 0, color: 'rgba(255, 255, 255, 0.85)' }}>Hediye alan kişi, gerçekten işe yarayan bir ürün verdiğini bilir.</p>
                                </div>
                            </div>

                            <div className="card" style={{ padding: '3rem', borderRadius: '32px', textAlign: 'center' }}>
                                <h2 className="gradient-text" style={{ marginBottom: '1.5rem' }}>👶 Sonuç: Hem Pratik Hem Modern Bir Çözüm</h2>
                                <p style={{ marginBottom: '2.5rem', fontSize: '1.2rem' }}>
                                    Bebek hediyesi seçmek sevgi dolu bir jesttir. Ama bu jestin gerçekten faydalı olması çok daha değerlidir. Hediye eşleştirme uygulamaları sayesinde gereksiz hediyeler azalır, gerçek ihtiyaçlar karşılanır ve herkes mutlu olur.
                                </p>
                                <Link to="/yonetim/olustur" className="btn btn-primary" style={{ height: '3.5rem', padding: '0 2.5rem', fontSize: '1.1rem' }}>
                                    Hemen Listenizi Oluşturun
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BebekHediyesiBlog;
