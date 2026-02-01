import React from 'react';
import { ShieldCheck, Eye, Lock, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="section container animate-fade-in" style={{ padding: '4rem 2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <ShieldCheck size={64} />
                </div>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
                    Gizlilik <span className="gradient-text">Politikası</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>
                    Verilerinizin güvenliği ve gizliliği bizim bir numaralı önceliğimizdir.
                </p>
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gap: '3rem' }}>
                    <section>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <Lock size={24} style={{ color: 'var(--primary)' }} />
                            <h2 style={{ fontSize: '1.75rem' }}>Veri Güvenliği</h2>
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                            HediyeEşle olarak, paylaştığınız tüm kişisel verileri endüstri standartlarındaki şifreleme yöntemleri ile koruyoruz. Oluşturduğunuz etkinlik şifreleri ve kullanıcı bilgileriniz, yetkisiz erişime karşı güvenli sunucularımızda saklanmaktadır.
                        </p>
                    </section>

                    <section>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <Eye size={24} style={{ color: 'var(--secondary)' }} />
                            <h2 style={{ fontSize: '1.75rem' }}>Toplanan Bilgiler</h2>
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                            Yalnızca hizmetlerimizi sunabilmemiz için gerekli olan minimum düzeyde bilgiyi topluyoruz. Bunlar arasında etkinlik adı, yönetici e-postası ve oluşturduğunuz hediye/davetli listeleri yer alır. Bu bilgiler kesinlikle üçüncü taraflarla reklam amacıyla paylaşılmaz.
                        </p>
                    </section>

                    <section>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <FileText size={24} style={{ color: 'var(--accent)' }} />
                            <h2 style={{ fontSize: '1.75rem' }}>Çerez Politikası</h2>
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                            Deneyiminizi geliştirmek ve oturum yönetiminizi sağlamak için teknik çerezler kullanmaktayız. Çerez ayarlarınızı tarayıcınız üzerinden dilediğiniz zaman değiştirebilirsiniz.
                        </p>
                    </section>
                </div>

                <div className="glass" style={{ marginTop: '5rem', padding: '2rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        Son güncelleme: 31 Ocak 2026. Herhangi bir sorunuz için <strong style={{ color: 'var(--text)' }}>destek@hediyeesle.com</strong> adresinden bize ulaşabilirsiniz.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
