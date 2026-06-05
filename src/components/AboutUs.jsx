
import React from 'react';
import { Heart, Sparkles, Target, Users } from 'lucide-react';

const AboutUs = () => {
    return (
        <div className="section container animate-fade-in" style={{ padding: '4rem 2rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
                    Hakkımızda <span className="gradient-text">HediyeEşleştir</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
                    Özel anlarınızı daha stressiz ve anlamlı hale getirmek için buradayız.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
                <div className="card">
                    <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}><Target size={40} /></div>
                    <h3 style={{ marginBottom: '1rem' }}>Vizyonumuz</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        Hediye verme sanatını teknoloji ile birleştirerek, insanların sevdiklerine tam olarak ihtiyaç duydukları ve hayal ettikleri hediyeleri sunmalarını sağlamak.
                    </p>
                </div>
                <div className="card">
                    <div style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}><Heart size={40} /></div>
                    <h3 style={{ marginBottom: '1rem' }}>Neden Biz?</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        Karmaşık liste yönetimlerine son veriyoruz. Sade, estetik ve grup çalışmasına uygun arayüzümüzle hediyeleşme sürecini keyifli bir deneyime dönüştürüyoruz.
                    </p>
                </div>
                <div className="card">
                    <div style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}><Users size={40} /></div>
                    <h3 style={{ marginBottom: '1rem' }}>Ekibimiz</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        Kullanıcı deneyimine odaklanmış tutkulu bir ekip olarak, her adımda geri bildirimlerinizi dinliyor ve uygulamamızı sizin için geliştiriyoruz.
                    </p>
                </div>
            </div>

            <div className="glass" style={{ padding: '4rem', textAlign: 'center' }}>
                <Sparkles size={48} style={{ color: 'var(--primary)', marginBottom: '2rem' }} />
                <h2 style={{ marginBottom: '1.5rem' }}>Mutluluğu Paylaşmak İçin Tasarlandı</h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto', fontSize: '1.125rem', lineHeight: '1.8' }}>
                    HediyeEşleştir, düğün hazırlığı sürecinde yaşanan hediye karmaşasından ilham alınarak doğdu. Bugün ise doğum günlerinden yeni ev ziyaretlerine kadar her türlü özel günde yüzlerce insanın hedeflerine ulaşmasına yardımcı oluyor.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
