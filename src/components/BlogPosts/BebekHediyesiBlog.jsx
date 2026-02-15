import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Clock, ChevronLeft, CheckCircle2, Lightbulb, Sparkles, Baby } from 'lucide-react';
import { Link } from 'react-router-dom';

const BebekHediyesiBlog = () => {
    return (
        <div className="animate-fade-in">
            <Helmet>
                <title>Bebek Hediyesi Ne Alınır? Akıllı Liste Rehberi 2026</title>
                <meta name="description" content="Yeni doğan bebek için doğru hediyeyi seçin. Online hediye listesi ile aynı ürün riskini azaltın, ihtiyaçları kolayca karşılayın." />
            </Helmet>

            {/* Hero Section */}
            <section className="section" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
                <div className="container">
                    <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.95rem' }}>
                        <ChevronLeft size={18} /> Blog'a Geri Dön
                    </Link>

                    <div style={{ maxWidth: '800px' }}>
                        <h1 className="hero-title" style={{ marginBottom: '1.5rem', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                            👶 Bebek Hediyesi Seçmek Artık Çok Daha Kolay: <span className="gradient-text">İsteyene İstediği Hediye!</span>
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
                            src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200"
                            alt="Bebek Hediyesi Rehberi"
                            style={{ width: '100%', borderRadius: '24px', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                        />

                        <div className="blog-content" style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)' }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Bebek haberi almak dünyadaki en güzel duygulardan biri 💛 Ama ardından gelen klasik soru hep aynı: <strong>“Acaba ne hediye alsak?”</strong>
                            </p>

                            <p style={{ marginBottom: '1.5rem' }}>
                                Zıbın mı? Battaniye mi? Mama sandalyesi mi? Ve çoğu zaman sonuç: Aynı üründen 4 tane, hiç kullanılmayan hediyeler ve boşa giden bütçe…
                            </p>

                            <div className="glass" style={{ padding: '2rem', borderRadius: '20px', marginBottom: '2.5rem', border: '1px solid rgba(255,107,157,0.3)' }}>
                                <p style={{ margin: 0 }}>
                                    İşte tam bu noktada devreye giren <strong>hediye eşleştirme uygulamaları</strong>, bebek bekleyen aileler için süreci hem planlı hem de zahmetsiz hale getiriyor.
                                </p>
                            </div>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Baby size={28} /> 🍼 Bebek Sahipleri İçin Neden Hediye Listesi Şart?
                            </h2>

                            <p style={{ marginBottom: '1.5rem' }}>
                                Yeni ebeveynler için ilk aylar hem heyecanlı hem de yoğun geçer. İhtiyaçlar net ama çevredekiler çoğu zaman tahmin yürütür.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                                {[
                                    "Gerçekten ihtiyaç duyulan ürünler listeye eklenir",
                                    "Davetliler listeden seçim yapar",
                                    "Aynı ürünün birden fazla alınması engellenir",
                                    "Gereksiz harcama ve iade süreci ortadan kalkar"
                                ].map((item, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                        <CheckCircle2 size={20} style={{ color: 'var(--accent)', marginTop: '0.2rem', flexShrink: 0 }} />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <p style={{ marginBottom: '1.5rem' }}>
                                Bu sistem özellikle <strong>baby shower, doğum ziyareti ve 1 yaş kutlamaları</strong> için büyük kolaylık sağlar.
                            </p>

                            <h2 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Sparkles size={28} /> 🎁 Bebek Hediyesi Uygulaması Nasıl Çalışır?
                            </h2>

                            <div style={{ marginBottom: '2.5rem' }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>1️⃣ Aile Liste Oluşturur</h3>
                                    <ul style={{ listStyle: 'none', paddingLeft: '1.5rem' }}>
                                        <li style={{ marginBottom: '0.5rem' }}>• İhtiyaç duyulan ürünler eklenir (bez, biberon seti, bebek arabası, uyku tulumu vb.)</li>
                                        <li style={{ marginBottom: '0.5rem' }}>• İstenirse marka ve model belirtilebilir</li>
                                        <li style={{ marginBottom: '0.5rem' }}>• Fiyat aralığı eklenebilir</li>
                                    </ul>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>2️⃣ Liste Paylaşılır</h3>
                                    <ul style={{ listStyle: 'none', paddingLeft: '1.5rem' }}>
                                        <li style={{ marginBottom: '0.5rem' }}>• Özel bir link ile aile ve arkadaşlara gönderilir</li>
                                        <li style={{ marginBottom: '0.5rem' }}>• WhatsApp, Instagram veya e-posta ile kolayca paylaşılır</li>
                                    </ul>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>3️⃣ Davetliler Seçim Yapar</h3>
                                    <ul style={{ listStyle: 'none', paddingLeft: '1.5rem' }}>
                                        <li style={{ marginBottom: '0.5rem' }}>• Listedeki ürünlerden birini rezerve eder</li>
                                        <li style={{ marginBottom: '0.5rem' }}>• Böylece çakışma olmaz</li>
                                        <li style={{ marginBottom: '0.5rem' }}>• Herkes bütçesine uygun hediyeyi seçebilir</li>
                                    </ul>
                                </div>
                            </div>

                            <h2 style={{ color: 'var(--accent)', marginBottom: '2rem', marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Lightbulb size={28} /> 💡 Neden Bu Sistem Daha Mantıklı?
                            </h2>

                            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
                                <div className="card" style={{ padding: '1.5rem' }}>
                                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>🎯 Gerçek İhtiyaç Odaklı</h4>
                                    <p style={{ fontSize: '0.95rem', margin: 0 }}>Yeni doğan bir bebeğin ihtiyaçları spesifiktir. Rastgele hediye yerine, gerçekten kullanılacak ürünler alınır.</p>
                                </div>
                                <div className="card" style={{ padding: '1.5rem' }}>
                                    <h4 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>💸 Bütçe Dostu</h4>
                                    <p style={{ fontSize: '0.95rem', margin: 0 }}>Davetliler fiyat aralığını görebilir. Kimse kendini zor durumda hissetmez.</p>
                                </div>
                                <div className="card" style={{ padding: '1.5rem' }}>
                                    <h4 style={{ color: 'var(--accent-sharp)', marginBottom: '0.5rem' }}>📦 Karmaşayı Azaltır</h4>
                                    <p style={{ fontSize: '0.95rem', margin: 0 }}>4 tane aynı battaniye yerine 4 farklı ihtiyaç karşılanır.</p>
                                </div>
                                <div className="card" style={{ padding: '1.5rem' }}>
                                    <h4 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>🤍 Duygusal Değer Artar</h4>
                                    <p style={{ fontSize: '0.95rem', margin: 0 }}>Hediye alan kişi, gerçekten işe yarayan bir ürün verdiğini bilir.</p>
                                </div>
                            </div>

                            <h2 style={{ marginBottom: '1.5rem' }}>👩‍👧 Kimler İçin İdeal?</h2>
                            <ul style={{ marginBottom: '2.5rem', paddingLeft: '1.5rem' }}>
                                <li style={{ marginBottom: '0.75rem' }}>Baby shower düzenleyen anne adayları</li>
                                <li style={{ marginBottom: '0.75rem' }}>Yeni doğum yapmış aileler</li>
                                <li style={{ marginBottom: '0.75rem' }}>Kalabalık akraba çevresi olanlar</li>
                                <li style={{ marginBottom: '0.75rem' }}>Yurt dışında yaşayan ve uzaktan hediye gönderecek yakınlar</li>
                            </ul>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Sparkles size={28} /> 🤖 Gelecekte Neler Olabilir?
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>AI destekli bebek hediye uygulamaları şunları yapabilir:</p>
                            <ul style={{ marginBottom: '3rem', paddingLeft: '1.5rem' }}>
                                <li style={{ marginBottom: '0.75rem' }}>Bebeğin yaşına göre otomatik ihtiyaç listesi önerme</li>
                                <li style={{ marginBottom: '0.75rem' }}>Mevsime göre kıyafet önerisi sunma</li>
                                <li style={{ marginBottom: '0.75rem' }}>“İlk 3 ay”, “6-12 ay” gibi dönem bazlı akıllı kategori oluşturma</li>
                                <li style={{ marginBottom: '0.75rem' }}>Bebek cinsiyetine veya nötr tercihlere göre öneri filtreleme</li>
                            </ul>

                            <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px', textAlign: 'center', border: '1px solid var(--primary)' }}>
                                <h2 className="gradient-text" style={{ marginBottom: '1rem' }}>👶 Sonuç: Hem Pratik Hem Modern Bir Çözüm</h2>
                                <p style={{ marginBottom: '2rem' }}>
                                    Bebek hediyesi seçmek sevgi dolu bir jesttir. Ama bu jestin gerçekten faydalı olması çok daha değerlidir. Hediye eşleştirme uygulamaları sayesinde gereksiz hediyeler azalır, gerçek ihtiyaçlar karşılanır ve herkes mutlu olur.
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

export default BebekHediyesiBlog;
