import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Clock, ChevronLeft, CheckCircle2, Lightbulb, Sparkles, Gift, Target, Brain, Layout, BarChart, UserCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const GenelHediyeRehberiBlog = () => {
    return (
        <div className="animate-fade-in">
            <Helmet>
                <title>Hediye Eşleştirme Uygulaması: Akıllı Hediye Listesi Rehberi</title>
                <meta name="description" content="Hediye seçme stresine son! HediyeEşle ile etkinlikleriniz için akıllı listeler oluşturun, sevdiklerinizin ihtiyaçlarını kolayca karşılayın ve mükemmel hediyeyi bulun." />
            </Helmet>

            {/* Hero Section */}
            <section className="section" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
                <div className="container">
                    <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.95rem' }}>
                        <ChevronLeft size={18} /> Blog'a Geri Dön
                    </Link>

                    <div style={{ maxWidth: '800px' }}>
                        <h1 className="hero-title" style={{ marginBottom: '1.5rem', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                            🎁 Hediye Eşleştirme Uygulaması: <span className="gradient-text">Artık Doğru Hediyeyi Bulmak Çok Kolay!</span>
                        </h1>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={16} /> 15 Şubat 2026</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><User size={16} /> HediyeEşle Editör</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16} /> 3 Dakika Okuma</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section" style={{ paddingTop: '0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px' }}>
                        <img
                            src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=1200"
                            alt="Hediye Eşleştirme Rehberi"
                            style={{ width: '100%', borderRadius: '24px', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                        />

                        <div className="blog-content" style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)' }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Hayatımızdaki özel anlar — doğum günleri, yıl dönümleri, mezuniyetler veya yılbaşı gibi kutlamalar — sevdiklerimize hediyeler vermeyi güzel kılar. Ancak <strong>“Ne hediye alsam?”</strong> sorusu çoğumuz için hala büyük bir stres kaynağı.
                            </p>

                            <p style={{ marginBottom: '1.5rem' }}>
                                İşte tam bu noktada devreye giren yeni nesil hediye eşleştirme uygulamaları, hediye seçme sürecini hem eğlenceli hem de akıllı bir deneyime dönüştürüyor.
                            </p>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Target size={28} /> 🎯 HediyeEşle Nedir?
                            </h2>

                            <p style={{ marginBottom: '1.5rem' }}>
                                <strong>HediyeEşle</strong> gibi dijital platformlar, etkinlik oluşturma, hediye listesi paylaşma ve katılımcılarla akıllı eşleştirme yapma imkanı sunar. Kullanıcılar; düğün, doğum günü veya yılbaşı gibi etkinlikler için hediye listesi hazırlayabilir ve davetli kitlesi içinden kişilerin isteklerine uygun hediyeleri kolayca eşleştirebilirler.
                            </p>

                            <div className="glass" style={{ padding: '2rem', borderRadius: '20px', marginBottom: '2.5rem', border: '1px solid var(--secondary)' }}>
                                <p style={{ margin: 0 }}>
                                    Bu sayede hem hediye alan hem de veren taraf için süreç çok daha şeffaf, hızlı ve keyifli olur.
                                </p>
                            </div>

                            <h2 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Brain size={28} /> 🧠 Neden Bir Hediye Eşleştirme Uygulaması?
                            </h2>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <Lightbulb size={24} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                                    <h4 style={{ marginBottom: '0.5rem' }}>Kişiye özel öneriler</h4>
                                    <p style={{ fontSize: '0.95rem', margin: 0, color: 'var(--text-muted)' }}>İlgi alanı, yaş grubu ve etkinlik türüne göre akıllı öneriler sunulur.</p>
                                </div>
                                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <Layout size={24} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
                                    <h4 style={{ marginBottom: '0.5rem' }}>Hediye listesi yönetimi</h4>
                                    <p style={{ fontSize: '0.95rem', margin: 0, color: 'var(--text-muted)' }}>Kendi wishlist’inizi oluşturabilir, paylaşabilir ve güncelleyebilirisiniz.</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                                <CheckCircle2 size={24} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.2rem' }} />
                                <p style={{ margin: 0 }}><strong>Kolay eşleştirme:</strong> Davetliler, listede yer alan hediyeleri görebilir ve uygun olanı seçebilir; böylece aynı hediyenin birden fazla alınmasının önüne geçilir.</p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '3rem' }}>
                                <Zap size={24} style={{ color: 'var(--accent-sharp)', flexShrink: 0, marginTop: '0.2rem' }} />
                                <p style={{ margin: 0 }}><strong>Zaman kazandırır:</strong> “Ne alsam?” karmaşasından kurtarır ve hediye planlamasını keyifli bir deneyime dönüştürür.</p>
                            </div>

                            <h2 style={{ color: 'var(--accent)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Sparkles size={28} /> 🌟 Akıllı Öneri Sistemleri ile Hediyeni Keşfet
                            </h2>
                            <p style={{ marginBottom: '2.5rem' }}>
                                Bugün hediye önerisi sunan bazı uygulamalar ve siteler, kullanıcıdan aldıkları basit detaylara dayanarak hediye fikirleri oluşturuyor. Alıcıların ilgi alanlarına, kişisel profillerine ve özel günlere göre akıllı eşleştirme yapmak hediye seçimini hem hızlı hem de anlamlı kılıyor.
                            </p>

                            <h2 style={{ marginBottom: '1.5rem' }}>🛠 Geliştirilmiş Özellikler</h2>

                            <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
                                {[
                                    { icon: <Calendar size={20} />, title: "Etkinlik takvimi", desc: "Yaklaşan özel günlerini hatırlatan hatırlatıcılar." },
                                    { icon: <BarChart size={20} />, title: "Öneri puanı", desc: "Her hediye için “uygunluk skoru” (match score) ile ideal seçimi gösterme." },
                                    { icon: <UserCircle size={20} />, title: "Kişisel profil", desc: "Sevilen renkler, hobiler, beden bilgisi gibi detaylarla daha doğru eşleştirme." },
                                    { icon: <Brain size={20} />, title: "AI destekli fikir oluşturma", desc: "Yalnızca birkaç bilgi ile yaratıcı hediye fikirleri sunma." }
                                ].map((feature, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ color: 'var(--primary)' }}>{feature.icon}</div>
                                        <div>
                                            <h4 style={{ fontSize: '1rem', margin: 0 }}>{feature.title}</h4>
                                            <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text-muted)' }}>{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>🛍 Kullanıcılar İçin Avantajlar</h2>
                            <ul style={{ marginBottom: '3rem', paddingLeft: '1.5rem' }}>
                                <li style={{ marginBottom: '0.75rem' }}>Hediye verme süreci stresini azaltır</li>
                                <li style={{ marginBottom: '0.75rem' }}>Sevdiklerin gerçekte ne istediğini bilmek kolaylaşır</li>
                                <li style={{ marginBottom: '0.75rem' }}>Aynı hediyenin birden fazla alınma ihtimali azalır</li>
                                <li style={{ marginBottom: '0.75rem' }}>Online liste paylaşımıyla herkesin fikrini almak mümkün olur</li>
                            </ul>

                            <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px', textAlign: 'center', border: '1px solid var(--secondary)' }}>
                                <h2 className="gradient-text" style={{ marginBottom: '1rem' }}>🎁 Sonuç: Sevgiyle Eşleşen Hediyeler</h2>
                                <p style={{ marginBottom: '2rem' }}>
                                    Hediye eşleştirme teknolojileri sayesinde artık “ne hediye alsam?” sorusuna yanıt bulmak hem eğlenceli hem pratik bir hale geliyor. Her kutlamada doğru hediyeyi bulmak hiç bu kadar kolay olmamıştı!
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

export default GenelHediyeRehberiBlog;
