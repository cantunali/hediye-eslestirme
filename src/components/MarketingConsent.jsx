import React from 'react';
import { Mail, Bell, Send, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const MarketingConsent = () => {
    return (
        <div className="section container animate-fade-in" style={{ padding: '4rem 2rem' }}>
            <Helmet>
                <title>HediyeEşleştir - Pazarlama İzni Metni</title>
                <meta name="description" content="Ticari elektronik ileti gönderimi ve pazarlama faaliyetleri hakkında aydınlatma ve rıza metni." />
            </Helmet>

            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <Bell size={64} />
                </div>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
                    Pazarlama <span className="gradient-text">İzni Metni</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>
                    Size daha iyi hizmet verebilmemiz için iletişim izniniz hakkında bilgi.
                </p>
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div className="card" style={{ padding: '3rem', marginBottom: '2rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
                        <Mail size={48} style={{ color: 'var(--secondary)', opacity: 0.8 }} />
                        <Send size={48} style={{ color: 'var(--primary)', opacity: 0.8 }} />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Ticari Elektronik İleti Onayı</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                        HediyeEşleştir platformu olarak, tarafınıza özel fırsatlar, yeni özellikler, güncellemeler ve hediye önerileri gibi konularda bilgilendirme yapmak isteriz.
                    </p>
                </div>

                <div className="card" style={{ padding: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <CheckCircle size={28} style={{ color: '#22c55e' }} />
                        Kapsam ve Haklarınız
                    </h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                        Bu izni verdiğinizde; kişisel verilerinizin pazarlama süreçleri kapsamında işlenmesine ve belirtilen iletişim kanalları üzerinden size ticari elektronik iletiler gönderilmesine (E-posta, SMS vb.) onay vermiş olursunuz.
                    </p>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
                            <strong>Dilediğiniz zaman vazgeçebilirsiniz:</strong> Gönderilen her iletide yer alan "Abonelikten Çık" veya "İptal" seçeneklerini kullanarak veya profil ayarlarınızdan bu izni dilediğiniz an geri alabilirsiniz.
                        </p>
                    </div>
                </div>

                <div className="glass" style={{ marginTop: '5rem', padding: '2rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        Son güncelleme: 12 Şubat 2026. Sorularınız için <strong style={{ color: 'var(--text)' }}>bilgi@hediyeesle.com</strong> adresinden bize ulaşabilirsiniz.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MarketingConsent;
