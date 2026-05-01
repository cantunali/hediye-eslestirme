import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Clock, ChevronLeft, CheckCircle2, Heart, Sparkles, Gift, MapPin, Globe, UserCircle, ListChecks } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdBanner from '../AdBanner';

const DugunHediyesiBlog = () => {
    const slug = "dugun-hediyesi-karmasasina-son-akilli-liste-sistemi";
    const title = "Düğün Hediyesi Karmaşasına Son: Akıllı Liste Sistemi";
    const description = "Yeni ev kurarken gereksiz hediyelerle uğraşmayın. Düğün hediye listesi oluşturun, ihtiyaçlarınız doğru karşılansın.";
    const imageUrl = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "image": [imageUrl],
        "datePublished": "2026-02-15T10:00:00+03:00",
        "dateModified": "2026-02-15T10:00:00+03:00",
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
                            💍 Düğün Hediyesi Listesi: <span className="gradient-text">Düğün Planlayan Çiftler İçin Akıllı ve Modern Çözüm</span>
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
                            alt="Düğün Hediyesi Planlama"
                            style={{ width: '100%', borderRadius: '24px', marginBottom: '3rem', boxShadow: '0 20px 40px rgba(187, 0, 39, 0.1)' }}
                        />

                        <div className="blog-content" style={{ lineHeight: '1.8', fontSize: '1.15rem', color: '#ffffff' }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Düğün hazırlıkları heyecanlı olduğu kadar detaylı ve yorucudur. Mekân seçimi, davetli listesi, organizasyon derken çiftlerin en çok düşündüğü konulardan biri de şudur: <strong>“Düğün hediyeleri nasıl yönetilecek?”</strong>
                            </p>

                            <p style={{ marginBottom: '1.5rem' }}>
                                Eskiden takı merasimi ve klasik ev eşyaları ön plandaydı. Ancak günümüzde çiftler daha bilinçli, daha planlı ve ihtiyaç odaklı bir sistem tercih ediyor. İşte bu noktada devreye giren <strong>düğün hediye listesi uygulamaları</strong>, hem çiftler hem de davetliler için büyük kolaylık sağlıyor.
                            </p>

                            <div className="card" style={{ padding: '2.5rem', borderRadius: '20px', marginBottom: '3rem', borderLeft: '6px solid var(--primary)' }}>
                                <h2 style={{ color: 'var(--primary)', marginBottom: '1rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.6rem' }}>
                                    <Gift size={32} /> 🎁 Düğün Hediye Listesi Nedir?
                                </h2>
                                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.85)' }}>
                                    Düğün hediye listesi; evlenecek çiftin ihtiyaç duyduğu ürünleri belirleyip dijital ortamda paylaştığı modern bir sistemdir.
                                </p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
                                {[
                                    "Aynı hediyenin birden fazla alınması önlenir",
                                    "Gerçekten ihtiyaç duyulan ürünler seçilir",
                                    "Davetliler ne alacağını düşünmek zorunda kalmaz",
                                    "Bütçeye uygun seçenekler sunulur"
                                ].map((item, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <CheckCircle2 size={22} style={{ color: 'var(--primary)', marginTop: '0.1rem', flexShrink: 0 }} />
                                        <span style={{ fontWeight: '500', color: '#ffffff' }}>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <AdBanner slot="blog_middle" />

                            <h2 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Heart size={32} /> 💡 Düğün Planlayan Çiftler Neden Hediye Listesi Oluşturmalı?
                            </h2>

                            <div style={{ marginBottom: '3rem' }}>
                                <div style={{ marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                                        <ListChecks size={24} /> 1️⃣ Yeni Ev İhtiyaçları Netleşir
                                    </h3>
                                    <p style={{ marginBottom: '1.5rem' }}>Çiftler hangi ürüne gerçekten ihtiyaç duyduğunu bilir:</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                        {["Küçük ev aletleri", "Mutfak setleri", "Elektronik ürünler", "Dekorasyon ürünleri", "Balayı katkı hediyeleri"].map((tag, i) => (
                                            <span key={i} style={{ padding: '0.5rem 1.25rem', background: 'rgba(255,255,255,0.1)', borderRadius: '50px', fontSize: '0.95rem', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', fontWeight: '600' }}>{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>2️⃣ Gereksiz Hediyeler Önlenir</h3>
                                    <p>3 tane tost makinesi yerine, farklı ihtiyaçlar karşılanır. Evinizde yer kaplayan değil, işinize yarayan hediyeler birikir.</p>
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>3️⃣ Şeffaf ve Pratik Sistem</h3>
                                    <p>Davetliler listeden seçim yapar ve ürün rezerve edilir. Böylece kimin ne aldığı belli olur, mükerrer hediye karmaşası yaşanmaz.</p>
                                </div>
                            </div>

                            <h2 style={{ color: 'var(--tertiary)', marginBottom: '2rem', marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Sparkles size={32} /> 💒 Düğün Hediye Uygulaması Nasıl Çalışır?
                            </h2>

                            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '4rem' }}>
                                <div className="card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div style={{ background: 'var(--primary)', color: 'white', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', flexShrink: 0, fontSize: '1.2rem' }}>1</div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.35rem', fontSize: '1.2rem', color: '#ffffff' }}>Çift Liste Oluşturur</h4>
                                        <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>İhtiyaç duyulan ürünler eklenir. Marka, model ve fiyat aralığı belirtilebilir.</p>
                                    </div>
                                </div>
                                <div className="card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div style={{ background: 'var(--secondary)', color: 'white', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', flexShrink: 0, fontSize: '1.2rem' }}>2</div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.35rem', fontSize: '1.2rem', color: '#ffffff' }}>Özel Link Paylaşılır</h4>
                                        <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>WhatsApp, davetiye QR kodu veya sosyal medya üzerinden paylaşılabilir.</p>
                                    </div>
                                </div>
                                <div className="card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div style={{ background: 'var(--tertiary)', color: 'white', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', flexShrink: 0, fontSize: '1.2rem' }}>3</div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.35rem', fontSize: '1.2rem', color: '#ffffff' }}>Davetliler Seçim Yapar</h4>
                                        <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>Seçilen ürün sistemde işaretlenir ve çakışma önlenir.</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                                {[
                                    { icon: <MapPin size={24} />, text: "Şehir dışı düğünler" },
                                    { icon: <Globe size={24} />, text: "Yurt dışındaki akrabalar" },
                                    { icon: <UserCircle size={24} />, text: "Kalabalık davetli listeleri" }
                                ].map((item, i) => (
                                    <div key={i} style={{ textAlign: 'center', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                                        <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff' }}>{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="card" style={{ padding: '3rem', borderRadius: '32px', textAlign: 'center' }}>
                                <h2 className="gradient-text" style={{ marginBottom: '1.5rem' }}>🤍 Sonuç: Stres Az, Mutluluk Çok</h2>
                                <p style={{ marginBottom: '2.5rem', fontSize: '1.2rem' }}>
                                    Düğün hediyesi almak da vermek de mutluluk verici bir deneyim olmalı. Modern düğünler artık daha planlı, daha şeffaf ve daha pratik. Hediye eşleştirme ve online düğün listesi sistemi sayesinde ihtiyaçlar doğru karşılanır, gereksiz masraf önlenir ve çiftler ev kurma sürecinde rahat eder.
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

export default DugunHediyesiBlog;
