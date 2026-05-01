import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Clock, ChevronLeft, CheckCircle2, Lightbulb, Sparkles, Target, Brain, Layout, BarChart, UserCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdBanner from '../AdBanner';

const GenelHediyeRehberiBlog = () => {
    const slug = "hediye-eslestirme-uygulamasi-akilli-hediye-listesi-rehberi";
    const title = "Hediye Eşleştirme Uygulaması: Akıllı Hediye Listesi Rehberi";
    const description = "Hediye seçme stresine son! HediyeEşleştir ile etkinlikleriniz için akıllı listeler oluşturun, sevdiklerinizin ihtiyaçlarını kolayca karşılayın.";
    const imageUrl = "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=1200";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "image": [imageUrl],
        "datePublished": "2026-02-15T09:00:00+03:00",
        "dateModified": "2026-02-15T09:00:00+03:00",
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
                        <h1 className="hero-title" style={{ marginBottom: '1.5rem', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--on-surface)' }}>
                            🎁 Hediye Eşleştirme Uygulaması: <span className="gradient-text">Artık Doğru Hediyeyi Bulmak Çok Kolay!</span>
                        </h1>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'var(--on-surface-variant)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={16} /> 15 Şubat 2026</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><User size={16} /> HediyeEşleştir Editör</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16} /> 3 Dakika Okuma</span>
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
                            alt="Hediye Eşleştirme Rehberi"
                            style={{ width: '100%', borderRadius: '24px', marginBottom: '3rem', boxShadow: '0 20px 40px rgba(187, 0, 39, 0.1)' }}
                        />

                        <div className="blog-content" style={{ lineHeight: '1.8', fontSize: '1.15rem', color: 'var(--on-surface)' }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Hayatımızdaki özel anlar — doğum günleri, yıl dönümleri, mezuniyetler veya yılbaşı gibi kutlamalar — sevdiklerimize hediyeler vermeyi güzel kılar. Ancak <strong>“Ne hediye alsam?”</strong> sorusu çoğumuz için hala büyük bir stres kaynağı.
                            </p>

                            <p style={{ marginBottom: '1.5rem' }}>
                                İşte tam bu noktada devreye giren yeni nesil hediye eşleştirme uygulamaları, hediye seçme sürecini hem eğlenceli hem de akıllı bir deneyime dönüştürüyor.
                            </p>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Target size={32} /> 🎯 HediyeEşleştir Nedir?
                            </h2>

                            <p style={{ marginBottom: '1.5rem' }}>
                                <strong>HediyeEşleştir</strong> gibi dijital platformlar, etkinlik oluşturma, hediye listesi paylaşma ve katılımcılarla akıllı eşleştirme yapma imkanı sunar. Kullanıcılar; düğün, doğum günü veya yılbaşı gibi etkinlikler için hediye listesi hazırlayabilir ve davetli kitlesi içinden kişilerin isteklerine uygun hediyeleri kolayca eşleştirebilirler.
                            </p>

                            <div className="card" style={{ padding: '2.5rem', borderRadius: '20px', marginBottom: '3rem', borderLeft: '6px solid var(--secondary)' }}>
                                <p style={{ margin: 0, color: 'var(--on-surface-variant)', fontStyle: 'italic' }}>
                                    Bu sayede hem hediye alan hem de veren taraf için süreç çok daha şeffaf, hızlı ve keyifli olur.
                                </p>
                            </div>

                            <AdBanner slot="blog_middle" />

                            <h2 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Brain size={32} /> 🧠 Neden Bir Hediye Eşleştirme Uygulaması?
                            </h2>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
                                <div className="card" style={{ padding: '2rem' }}>
                                    <Lightbulb size={28} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                                    <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>Kişiye özel öneriler</h4>
                                    <p style={{ fontSize: '0.95rem', margin: 0, color: 'var(--on-surface-variant)' }}>İlgi alanı, yaş grubu ve etkinlik türüne göre akıllı öneriler sunulur.</p>
                                </div>
                                <div className="card" style={{ padding: '2rem' }}>
                                    <Layout size={28} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
                                    <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>Hediye listesi yönetimi</h4>
                                    <p style={{ fontSize: '0.95rem', margin: 0, color: 'var(--on-surface-variant)' }}>Kendi wishlist’inizi oluşturabilir, paylaşabilir ve güncelleyebilirisiniz.</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem', padding: '1.25rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                <CheckCircle2 size={24} style={{ color: 'var(--tertiary)', flexShrink: 0, marginTop: '0.2rem' }} />
                                <p style={{ margin: 0 }}><strong>Kolay eşleştirme:</strong> Davetliler, listede yer alan hediyeleri görebilir ve uygun olanı seçebilir; böylece aynı hediyenin birden fazla alınmasının önüne geçilir.</p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '3.5rem', padding: '1.25rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                <Zap size={24} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '0.2rem' }} />
                                <p style={{ margin: 0 }}><strong>Zaman kazandırır:</strong> “Ne alsam?” karmaşasından kurtarır ve hediye planlamasını keyifli bir deneyime dönüştürür.</p>
                            </div>

                            <h2 style={{ color: 'var(--tertiary)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Sparkles size={32} /> 🌟 Akıllı Öneri Sistemleri ile Hediyeni Keşfet
                            </h2>
                            <p style={{ marginBottom: '2.5rem' }}>
                                Bugün hediye önerisi sunan bazı uygulamalar ve siteler, kullanıcıdan aldıkları basit detaylara dayanarak hediye fikirleri oluşturuyor. Alıcıların ilgi alanlarına, kişisel profillerine ve özel günlere göre akıllı eşleştirme yapmak hediye seçimini hem hızlı hem de anlamlı kılıyor.
                            </p>

                            <h2 style={{ marginBottom: '1.5rem', color: '#ffffff' }}>🛠 Geliştirilmiş Özellikler</h2>

                            <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '4rem' }}>
                                {[
                                    { icon: <Calendar size={20} />, title: "Etkinlik takvimi", desc: "Yaklaşan özel günlerini hatırlatan hatırlatıcılar." },
                                    { icon: <BarChart size={20} />, title: "Öneri puanı", desc: "Her hediye için “uygunluk skoru” (match score) ile ideal seçimi gösterme." },
                                    { icon: <UserCircle size={20} />, title: "Kişisel profil", desc: "Sevilen renkler, hobiler, beden bilgisi gibi detaylarla daha doğru eşleştirme." },
                                    { icon: <Brain size={20} />, title: "AI destekli fikir oluşturma", desc: "Yalnızca birkaç bilgi ile yaratıcı hediye fikirleri sunma." }
                                ].map((feature, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <div style={{ color: 'var(--primary)', background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '12px' }}>{feature.icon}</div>
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem', margin: '0 0 0.25rem', color: '#ffffff' }}>{feature.title}</h4>
                                            <p style={{ fontSize: '0.9rem', margin: 0, color: 'rgba(255,255,255,0.7)' }}>{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="card" style={{ padding: '3rem', borderRadius: '32px', textAlign: 'center' }}>
                                <h2 className="gradient-text" style={{ marginBottom: '1.5rem' }}>🎁 Sonuç: Sevgiyle Eşleşen Hediyeler</h2>
                                <p style={{ marginBottom: '2.5rem', fontSize: '1.2rem' }}>
                                    Hediye eşleştirme teknolojileri sayesinde artık “ne hediye alsam?” sorusuna yanıt bulmak hem eğlenceli hem pratik bir hale geliyor. Her kutlamada doğru hediyeyi bulmak hiç bu kadar kolay olmamıştı!
                                </p>
                                <Link to="/yonetim/olustur" className="btn btn-primary" style={{ height: '3.5rem', padding: '0 2.5rem', fontSize: '1.1rem', background: 'var(--secondary)' }}>
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
