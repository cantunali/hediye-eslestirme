import React from 'react';
import { FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
    return (
        <div className="section container animate-fade-in" style={{ padding: '4rem 2rem' }}>
            <Helmet>
                <title>HediyeEşle - Kullanım Koşulları</title>
                <meta name="description" content="HediyeEşle platformu kullanım koşulları, kullanıcı hakları ve sorumlulukları." />
            </Helmet>

            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <FileText size={64} />
                </div>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
                    Kullanım <span className="gradient-text">Koşulları</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>
                    Platformumuzu kullanarak aşağıdaki şartları kabul etmiş olursunuz.
                </p>
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div className="card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <CheckCircle size={28} style={{ color: 'var(--secondary)' }} />
                        Hizmetin Kullanımı
                    </h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1rem' }}>
                        HediyeEşle, kullanıcıların özel günleri için hediye listeleri oluşturmasına ve paylaşmasına olanak tanıyan bir platformdur. Kullanıcılar, platformu yalnızca yasal amaçlar için kullanmayı taahhüt eder.
                    </p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        <li>Etkinlik oluştururken verilen bilgilerin doğruluğundan kullanıcı sorumludur.</li>
                        <li>Platform üzerinden paylaşılan içeriklerin telif haklarına ve kişilik haklarına saygılı olunmalıdır.</li>
                        <li>Kötü niyetli yazılım veya saldırı girişimlerinde bulunmak yasaktır.</li>
                    </ul>
                </div>

                <div className="card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <AlertTriangle size={28} style={{ color: 'var(--accent)' }} />
                        Sorumluluk Reddi
                    </h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        HediyeEşle, kullanıcılar arasındaki hediye alışverişinin fiziksel gerçekleşmesini garanti etmez. Platform sadece bir organizasyon aracıdır. Üçüncü taraf e-ticaret sitelerindeki (Amazon, Hepsiburada vb.) fiyat değişikliklerinden veya stok durumlarından HediyeEşle sorumlu tutulamaz.
                    </p>
                </div>

                <div className="card" style={{ padding: '3rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Değişiklik Hakları</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        HediyeEşle, bu kullanım koşullarını önceden haber vermeksizin değiştirme hakkını saklı tutar. Kullanıcılar, platformu kullanmaya devam ederek güncellenen koşulları kabul etmiş sayılırlar.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
