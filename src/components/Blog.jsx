import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: "Bebek Hediyesi Ne Alınır? Akıllı Liste Rehberi 2026",
            excerpt: "Yeni doğan bebek için doğru hediyeyi seçin. Online hediye listesi ile aynı ürün riskini azaltın, ihtiyaçları kolayca karşılayın.",
            date: "15 Şubat 2026",
            author: "HediyeEşle Editör",
            slug: "bebek-hediyesi-ne-alinir-akilli-liste-rehberi-2026",
            image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "Hediye Eşleştirme Uygulaması: Akıllı Hediye Listesi Rehberi",
            excerpt: "Hediye seçme stresine son! HediyeEşle ile etkinlikleriniz için akıllı listeler oluşturun, sevdiklerinizin ihtiyaçlarını kolayca karşılayın.",
            date: "15 Şubat 2026",
            author: "HediyeEşle Editör",
            slug: "hediye-eslestirme-uygulamasi-akilli-hediye-listesi-rehberi",
            image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            title: "Düğün Hediyesi Karmaşasına Son: Akıllı Liste Sistemi",
            excerpt: "Yeni ev kurarken gereksiz hediyelerle uğraşmayın. Düğün hediye listesi oluşturun, ihtiyaçlarınız doğru karşılansın.",
            date: "15 Şubat 2026",
            author: "HediyeEşle Editör",
            slug: "dugun-hediyesi-karmasasina-son-akilli-liste-sistemi",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <div className="animate-fade-in">
            <Helmet>
                <title>Blog - HediyeEşle | Hediye Rehberi ve İpuçları</title>
                <meta name="description" content="Hediye seçimi, etkinlik planlama ve hdiye listesi oluşturma konularında en güncel ipuçları ve rehberler." />
            </Helmet>

            <section className="section hero-section" style={{ textAlign: 'center', paddingBottom: '2rem' }}>
                <div className="container">
                    <h1 className="hero-title gradient-text">Blog</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                        Hediyeleşme sanatına dair ipuçları, rehberler ve ilham verici içerikler.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="grid-mobile-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                to={`/blog/${post.slug}`}
                                className="card animate-reveal"
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    padding: '0',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s ease, border-color 0.3s ease'
                                }}
                            >
                                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} /> {post.date}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><User size={14} /> {post.author}</span>
                                    </div>
                                    <h3 style={{ marginBottom: '1rem', fontSize: '1.4rem', lineHeight: '1.3' }}>{post.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                                        {post.excerpt}
                                    </p>
                                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '600' }}>
                                        Devamını Oku <ArrowRight size={18} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
