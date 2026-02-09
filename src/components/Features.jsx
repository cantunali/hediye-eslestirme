import React from 'react';
import { Gift, Users, List, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';

import { Helmet } from 'react-helmet-async';

const FeaturesPage = ({ onStart }) => {
    // ... (steps definition remains same) ...
    const steps = [
        {
            icon: <Sparkles size={32} />,
            title: "Etkinlik Oluştur",
            description: "Hediye alınacak özel günün için (Düğün, Doğum Günü vb.) saniyeler içinde etkinliğini oluştur ve bir şifre belirle.",
            color: "var(--primary)"
        },
        {
            icon: <List size={32} />,
            title: "Hediye Listeni Yap",
            description: "Alınmasını istediğin hediyeleri marka ve model detaylarıyla birlikte listene ekle.",
            color: "var(--secondary)"
        },
        {
            icon: <Users size={32} />,
            title: "Davetlileri Belirle",
            description: "Etkinliğine katılacak sevdiklerini davetli listesine ekle ve onlara özel erişim sağla.",
            color: "var(--accent)"
        },
        {
            icon: <Gift size={32} />,
            title: "Hediye ve Katkı",
            description: "Davetliler hediyeleri rezerve edebilir veya pahalı ürünler için nakit katkıda bulunarak bütçeye ortak olabilirler.",
            color: "#4ade80"
        }
    ];

    return (
        <div className="section container animate-fade-in" style={{ padding: '4rem 2rem' }}>
            <Helmet>
                <title>HediyeEşle - Nasıl Çalışır? Özellikler</title>
                <meta name="description" content="Etkinlik oluşturma, hediye listesi yapma ve davetli yönetimi. HediyeEşle özelliklerini keşfedin." />
            </Helmet>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h1 className="animate-reveal stagger-1" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
                    Nasıl <span className="gradient-text">Çalışır?</span>
                </h1>
                <p className="animate-reveal stagger-2" style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                    En özel günlerinizde hediye karmaşasına son veriyoruz. İşte HediyeEşle'nin kolay kullanım adımları:
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
                {steps.map((step, index) => (
                    <div key={index} className={`card animate-reveal stagger-${index + 3}`} style={{ position: 'relative', overflow: 'hidden' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: `${step.color}20`,
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: step.color,
                            marginBottom: '2rem'
                        }}>
                            {step.icon}
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{step.title}</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{step.description}</p>
                        <div style={{
                            position: 'absolute',
                            right: '-10px',
                            bottom: '-10px',
                            fontSize: '8rem',
                            fontWeight: '900',
                            opacity: '0.03',
                            userSelect: 'none'
                        }}>
                            {index + 1}
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass" style={{ padding: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>İşte Bu Kadar!</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.125rem' }}>
                    HediyeEşle ile her şey planlı, her şey yolunda. Artık mükemmel hediyelere kavuşmak çok kolay.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                    <button className="btn btn-primary" onClick={() => onStart('create-event')}>
                        Hemen Başla <ChevronRight size={20} />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontWeight: '600' }}>
                        <CheckCircle2 size={24} /> %100 Ücretsiz
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesPage;
