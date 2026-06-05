
import React from 'react';
import { ShieldCheck, Eye, Lock, FileText, Settings, UserCheck } from 'lucide-react';

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
                    Verilerinizin güvenliği, gizliliği ve yasal haklarınız bizim için son derece önemlidir.
                </p>
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gap: '3.5rem' }}>
                    
                    {/* Veri Sorumlusu */}
                    <section>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <UserCheck size={24} style={{ color: 'var(--primary)' }} />
                            <h2 style={{ fontSize: '1.75rem' }}>Veri Sorumlusu ve İletişim</h2>
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                            6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Genel Veri Koruma Yönetmeliği (GDPR) kapsamında, HediyeEşleştir platformu (hediyeeslestir.com) veri sorumlusu olarak hareket etmektedir. Her türlü gizlilik ve veri güvenliği sorularınız için bizimle <strong>bilgi@hediyeeslestir.com</strong> adresi üzerinden iletişime geçebilirsiniz.
                        </p>
                    </section>

                    {/* Veri Güvenliği */}
                    <section>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <Lock size={24} style={{ color: 'var(--primary)' }} />
                            <h2 style={{ fontSize: '1.75rem' }}>Veri Güvenliği ve Saklanması</h2>
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                            HediyeEşleştir olarak, platformumuzu kullanırken paylaştığınız tüm kişisel verileri güvenli sunucularda saklıyor ve gizliliğinizi korumak için güncel SSL/TLS şifreleme teknolojileri dahil olmak üzere gerekli teknik ve idari güvenlik önlemlerini alıyoruz. Oluşturduğunuz etkinlikler, davetli listeleri ve kullanıcı bilgileriniz, yetkisiz erişime karşı korunan güvenli veritabanlarımızda barındırılmaktadır.
                        </p>
                    </section>

                    {/* Toplanan Bilgiler ve Amacı */}
                    <section>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <Eye size={24} style={{ color: 'var(--secondary)' }} />
                            <h2 style={{ fontSize: '1.75rem' }}>Toplanan Bilgiler ve İşleme Amaçları</h2>
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '1rem' }}>
                            Platformumuzun temel işlevlerini yerine getirebilmesi için minimum düzeyde veri topluyoruz:
                        </p>
                        <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><strong>Hesap Bilgileri:</strong> Kayıt olurken girdiğiniz ad, soyad ve e-posta adresi, hesabınızın oluşturulması ve kimlik doğrulama amacıyla işlenir.</li>
                            <li><strong>Etkinlik ve Liste Verileri:</strong> Oluşturduğunuz etkinliklerin detayları (etkinlik türü, şifresi) ve hediye/davetli listeleri, hediye eşleştirme hizmetinin tarafınıza sunulması amacıyla işlenir.</li>
                            <li><strong>Gezinme ve Analiz Verileri:</strong> Web sitemizi ziyaret ettiğinizde, deneyimi iyileştirmek amacıyla tarayıcı türü, ziyaret zamanları gibi anonim gezinme bilgileri toplanabilir.</li>
                        </ul>
                    </section>

                    {/* Google AdSense ve Reklam Çerezleri */}
                    <section>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <FileText size={24} style={{ color: 'var(--accent)' }} />
                            <h2 style={{ fontSize: '1.75rem' }}>Google AdSense ve Çerez (Cookie) Politikası</h2>
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '1rem' }}>
                            Sitemizde, kullanıcı deneyimini geliştirmek, güvenli oturum yönetimi sağlamak ve web sitemizin sürdürülebilirliğini desteklemek amacıyla reklamlar sunmak için çerezler (cookies) kullanılmaktadır. Google, sitemizde ve diğer internet sitelerinde reklam sunmak amacıyla çerezleri kullanan üçüncü taraf satıcılardan biridir.
                        </p>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '1rem' }}>
                            <strong>DoubleClick DART Çerezi:</strong> Google dahil üçüncü taraf satıcılar, kullanıcıların sitemize veya internetteki diğer sitelere yaptıkları önceki ziyaretlere dayalı olarak reklam sunmak için çerezleri kullanır. Google'ın DART çerezlerini kullanması, kendisine ve ortaklarına bu sitemizdeki ve/veya internetteki diğer sitelerdeki ziyaretlerine dayalı olarak reklam sunma olanağı tanır.
                        </p>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                            <strong>Üçüncü Taraf Reklam Ağları:</strong> Google AdSense aracılığıyla sitemizde gösterilen reklamlar, diğer üçüncü taraf reklam ağlarının veya reklam sunucularının çerezlerini de içerebilir. Bu çerezler, reklamların etkinliğini ölçmek ve reklam içeriğini kişiselleştirmek amacıyla ilgili reklam ağlarının kendi gizlilik politikaları çerçevesinde kullanılır.
                        </p>
                    </section>

                    {/* Çerezlerin Devre Dışı Bırakılması */}
                    <section>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <Settings size={24} style={{ color: 'var(--primary)' }} />
                            <h2 style={{ fontSize: '1.75rem' }}>Çerezleri ve Reklam Tercihlerini Yönetme</h2>
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '1rem' }}>
                            Kullanıcılarımız, kişiselleştirilmiş reklam tercihlerini diledikleri zaman kontrol etme hakkına sahiptir:
                        </p>
                        <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li>Kişiselleştirilmiş reklamları devre dışı bırakmak için <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 600 }}>Google Reklam Ayarları</a> sayfasını ziyaret edebilirsiniz.</li>
                            <li>Diğer üçüncü taraf satıcıların kişiselleştirilmiş reklamcılık çerezlerini kullanmasını engellemek için <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 600 }}>www.aboutads.info</a> adresini ziyaret edebilirsiniz.</li>
                            <li>Sitemizi ziyaret ettiğinizde karşınıza çıkan çerez onay banner'ı üzerinden tercihlerinizi değiştirebilir veya tarayıcınızın ayarlarından tüm çerezleri engelleyebilirsiniz.</li>
                        </ul>
                    </section>

                </div>

                <div className="glass" style={{ marginTop: '5rem', padding: '2.5rem', borderRadius: '24px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Son güncelleme: 31 Mayıs 2026. Gizlilik politikamızla veya kişisel verilerinizin işlenmesiyle ilgili her türlü sorunuz için <strong style={{ color: 'var(--text)' }}>bilgi@hediyeeslestir.com</strong> adresinden bize ulaşabilirsiniz.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
