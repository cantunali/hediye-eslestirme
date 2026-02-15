import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Clock, ChevronLeft, CheckCircle2, Heart, Sparkles, Gift, Share2, MousePointer2, ListChecks, MapPin, Globe, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const DugunHediyesiBlog = () => {
    return (
        <div className="animate-fade-in">
            <Helmet>
                <title>Düğün Hediyesi Karmaşasına Son: Akıllı Liste Sistemi</title>
                <meta name="description" content="Yeni ev kurarken gereksiz hediyelerle uğraşmayın. Düğün hediye listesi oluşturun, ihtiyaçlarınız doğru karşılansın." />
            </Helmet>

            {/* Hero Section */}
            <section className="section" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
                <div className="container">
                    <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.95rem' }}>
                        <ChevronLeft size={18} /> Blog'a Geri Dön
                    </Link>

                    <div style={{ maxWidth: '800px' }}>
                        <h1 className="hero-title" style={{ marginBottom: '1.5rem', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                            💍 Düğün Hediyesi Listesi: <span className="gradient-text">Düğün Planlayan Çiftler İçin Akıllı ve Modern Çözüm</span>
                        </h1>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={16} /> 15 Şubat 2026</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><User size={16} /> HediyeEşle Editör</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16} /> 4 Dakika Okuma</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section" style={{ paddingTop: '0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px' }}>
                        <img
                            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200"
                            alt="Düğün Hediyesi Planlama"
                            style={{ width: '100%', borderRadius: '24px', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                        />

                        <div className="blog-content" style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)' }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Düğün hazırlıkları heyecanlı olduğu kadar detaylı ve yorucudur. Mekân seçimi, davetli listesi, organizasyon derken çiftlerin en çok düşündüğü konulardan biri de şudur: <strong>“Düğün hediyeleri nasıl yönetilecek?”</strong>
                            </p>

                            <p style={{ marginBottom: '1.5rem' }}>
                                Eskiden takı merasimi ve klasik ev eşyaları ön plandaydı. Ancak günümüzde çiftler daha bilinçli, daha planlı ve ihtiyaç odaklı bir sistem tercih ediyor. İşte bu noktada devreye giren <strong>düğün hediye listesi uygulamaları</strong>, hem çiftler hem de davetliler için büyük kolaylık sağlıyor.
                            </p>

                            <div className="glass" style={{ padding: '2rem', borderRadius: '20px', marginBottom: '2.5rem', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                                <h2 style={{ color: 'var(--primary)', marginBottom: '1rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem' }}>
                                    <Gift size={28} /> 🎁 Düğün Hediye Listesi Nedir?
                                </h2>
                                <p style={{ margin: 0 }}>
                                    Düğün hediye listesi; evlenecek çiftin ihtiyaç duyduğu ürünleri belirleyip dijital ortamda paylaştığı modern bir sistemdir.
                                </p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                                {[
                                    "Aynı hediyenin birden fazla alınması önlenir",
                                    "Gerçekten ihtiyaç duyulan ürünler seçilir",
                                    "Davetliler ne alacağını düşünmek zorunda kalmaz",
                                    "Bütçeye uygun seçenekler sunulur"
                                ].map((item, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                        <CheckCircle2 size={20} style={{ color: 'var(--accent)', marginTop: '0.2rem', flexShrink: 0 }} />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <h2 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Heart size={28} /> 💡 Düğün Planlayan Çiftler Neden Hediye Listesi Oluşturmalı?
                            </h2>

                            <div style={{ marginBottom: '2.5rem' }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <ListChecks size={20} style={{ color: 'var(--primary)' }} /> 1️⃣ Yeni Ev İhtiyaçları Netleşir
                                    </h3>
                                    <p style={{ marginBottom: '1rem' }}>Çiftler hangi ürüne gerçekten ihtiyaç duyduğunu bilir:</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                        {["Küçük ev aletleri", "Mutfak setleri", "Elektronik ürünler", "Dekorasyon ürünleri", "Balayı katkı hediyeleri"].map((tag, i) => (
                                            <span key={i} style={{ padding: '0.4rem 1rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '50px', fontSize: '0.9rem', border: '1px solid rgba(139, 92, 246, 0.2)' }}>{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>2️⃣ Gereksiz Hediyeler Önlenir</h3>
                                    <p>3 tane tost makinesi yerine, farklı ihtiyaçlar karşılanır. Evinizde yer kaplayan değil, işinize yarayan hediyeler birikir.</p>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>3️⃣ Şeffaf ve Pratik Sistem</h3>
                                    <p>Davetliler listeden seçim yapar ve ürün rezerve edilir. Böylece kimin ne aldığı belli olur, mükerrer hediye karmaşası yaşanmaz.</p>
                                </div>
                            </div>

                            <h2 style={{ color: 'var(--accent)', marginBottom: '2rem', marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Sparkles size={28} /> 💒 Düğün Hediye Uygulaması Nasıl Çalışır?
                            </h2>

                            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
                                <div className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div style={{ background: 'var(--primary)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>✓</div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.25rem' }}>Çift Liste Oluşturur</h4>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>İhtiyaç duyulan ürünler eklenir. Marka, model ve fiyat aralığı belirtilebilir.</p>
                                    </div>
                                </div>
                                <div className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div style={{ background: 'var(--secondary)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>✓</div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.25rem' }}>Özel Link Paylaşılır</h4>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>WhatsApp, davetiye QR kodu veya sosyal medya üzerinden paylaşılabilir.</p>
                                    </div>
                                </div>
                                <div className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div style={{ background: 'var(--accent)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>✓</div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.25rem' }}>Davetliler Seçim Yapar</h4>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>Seçilen ürün sistemde işaretlenir ve çakışma önlenir.</p>
                                    </div>
                                </div>
                            </div>

                            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Target size={28} style={{ color: 'var(--primary)' }} /> 🎯 Modern Düğünlerin Yeni Trendi
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>Günümüzde birçok çift artık fiziksel mağaza listesi yerine online sistem kullanıyor, balayı fonu ekliyor ve ev kurma sürecini planlı yönetiyor.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
                                {[
                                    { icon: <MapPin size={20} />, text: "Şehir dışı düğünler" },
                                    { icon: <Globe size={20} />, text: "Yurt dışındaki akrabalar" },
                                    { icon: <UserCircle size={20} />, text: "Kalabalık davetli listeleri" }
                                ].map((item, i) => (
                                    <div key={i} style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ color: 'var(--primary)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                                        <span style={{ fontSize: '1rem', fontWeight: '500' }}>{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px', textAlign: 'center', border: '1px solid var(--primary)' }}>
                                <h2 className="gradient-text" style={{ marginBottom: '1rem' }}>🤍 Sonuç: Stres Az, Mutluluk Çok</h2>
                                <p style={{ marginBottom: '2rem' }}>
                                    Düğün hediyesi almak da vermek de mutluluk verici bir deneyim olmalı. Modern düğünler artık daha planlı, daha şeffaf ve daha pratik. Hediye eşleştirme ve online düğün listesi sistemi sayesinde ihtiyaçlar doğru karşılanır, gereksiz masraf önlenir ve çiftler ev kurma sürecinde rahat eder.
                                </p>
                                <Link to="/yonetim/olustur" className="btn btn-primary" style={{ display: 'inline-flex' }}>
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
