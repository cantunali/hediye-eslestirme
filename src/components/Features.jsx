import React from 'react';
import { Gift, Users, List, Sparkles, ChevronRight, CheckCircle2, Search, MousePointer2, BellRing } from 'lucide-react';

const FeaturesPage = ({ onStart }) => {
    const guestSteps = [
        {
            icon: <Search size={32} />,
            title: "Etkinliği Bul",
            description: "Etkinlik sahibinin paylaştığı etkinlik adını aratın veya size iletilen özel linke tıklayarak doğrudan listeye ulaşın.",
            color: "var(--primary)"
        },
        {
            icon: <Gift size={32} />,
            title: "Hediye Seç",
            description: "Hazırlanan hediye listesindeki ürünleri inceleyin, bütçenize ve zevkinize en uygun olanı belirleyin.",
            color: "var(--secondary)"
        },
        {
            icon: <MousePointer2 size={32} />,
            title: "Hediyeyi Al ve Bitir",
            description: "'Hediyeyi Al' butonuna tıklayarak ürünü rezerve edin. Varsa satın alma linkine giderek işleminizi tamamlayın.",
            color: "#4ade80"
        }
    ];

    const ownerSteps = [
        {
            icon: <Sparkles size={32} />,
            title: "Etkinlik Oluştur",
            description: "Düğün, doğum günü veya yeni ev için saniyeler içinde etkinliğinizi oluşturun ve bir erişim şifresi belirleyin.",
            color: "var(--primary)"
        },
        {
            icon: <List size={32} />,
            title: "Hediye Listeni Yap",
            description: "Alınmasını istediğiniz hediyeleri marka, model ve görsel detaylarıyla birlikte listenize ekleyin.",
            color: "var(--secondary)"
        },
        {
            icon: <Users size={32} />,
            title: "Davetlileri Bilgilendir",
            description: "Davetli listeni oluşturun ve özel linki sevdiklerinizle paylaşarak onların listeye erişmesini sağlayın.",
            color: "var(--accent)"
        }
    ];

    return (
        <div className="section container animate-fade-in" style={{ padding: '4rem 2rem' }}>
                        
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h1 className="animate-reveal stagger-1" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
                    Nasıl <span className="gradient-text">Çalışır?</span>
                </h1>
                <p className="animate-reveal stagger-2" style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                    Hediye seçme ve verme sürecini her iki taraf için de kusursuz hale getiriyoruz.
                </p>
            </div>

            {/* Davetli Kısmı */}
            <div style={{ marginBottom: '6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <div style={{ padding: '0.5rem 1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50px', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                        Adım 1: Davetliler İçin
                    </div>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {guestSteps.map((step, index) => (
                        <div key={index} className={`card animate-reveal stagger-${index + 3}`} style={{ position: 'relative', overflow: 'hidden', padding: '2.5rem' }}>
                            <div style={{ width: '56px', height: '56px', background: `${step.color}20`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.color, marginBottom: '1.5rem' }}>
                                {step.icon}
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{step.title}</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Davet Sahibi Kısmı */}
            <div style={{ marginBottom: '5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <div style={{ padding: '0.5rem 1rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '50px', color: 'var(--secondary)', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                        Adım 2: Davet Sahipleri İçin
                    </div>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {ownerSteps.map((step, index) => (
                        <div key={index} className={`card animate-reveal stagger-${index + 6}`} style={{ position: 'relative', overflow: 'hidden', padding: '2.5rem' }}>
                            <div style={{ width: '56px', height: '56px', background: `${step.color}20`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.color, marginBottom: '1.5rem' }}>
                                {step.icon}
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{step.title}</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass" style={{ padding: '3rem', textAlign: 'center', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05))' }}>
                <h2 style={{ marginBottom: '1rem' }}>Süreci Hemen Başlatın</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                    İster davetli olun ister davet sahibi, HediyeEşleştir ile hediyeleşmek artık çok daha keyifli.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="btn btn-primary" onClick={() => onStart ? onStart('create-event') : window.location.href = '/yonetim/olustur'}>
                        Ücretsiz Başla <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeaturesPage;
