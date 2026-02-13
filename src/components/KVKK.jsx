import React from 'react';
import { ShieldCheck, FileText, Info } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const KVKK = () => {
    return (
        <div className="section container animate-fade-in" style={{ padding: '4rem 2rem' }}>
            <Helmet>
                <title>HediyeEşle - KVKK Aydınlatma Metni</title>
                <meta name="description" content="6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca hazırlanan aydınlatma metni." />
            </Helmet>

            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <ShieldCheck size={64} />
                </div>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
                    KVKK <span className="gradient-text">Aydınlatma Metni</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>
                    Kişisel verilerinizin işlenmesi ve korunması süreçleri hakkında resmi bilgilendirme.
                </p>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem' }}>I. GİRİŞ</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        6698 Sayılı Kişisel Verilerin Korunması Kanunu (“Kanun”) 7 Nisan 2016 tarihinde yürürlüğe girmiştir.
                        Kanun ile kişisel verinin tanımı yapılarak, bunların korunmasına ilişkin ilkeler ve bu verilerin işlenmesinde veri sorumlusu sıfatı taşıyanların uyacakları şartlara yer verilmiştir.
                        <strong> HediyeEşle</strong> olarak Kanun’a uygunluğun sağlanması amacıyla, ilgili mevzuatta yer alan kişisel verilerin korunması ve işlenmesine ilişkin ilkeleri benimseyerek gerekli idari ve teknik tedbirleri almaktayız.
                    </p>
                </div>

                <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem' }}>II. KİŞİSEL VERİLERİN İŞLENMESİ</h2>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '1.5rem' }}>II.I. KİŞİSEL VERİLERİN İŞLENMESİNE İLİŞKİN İLKELER</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        Anayasa’nın m. 20/III kişisel verilerin ancak kanunda öngörülen hallerde veya kişinin açık rızasıyla işlenebileceği belirtilerek kişisel verilerin korunması güvence altına alınmıştır.
                        HediyeEşle kişisel verileri aşağıdaki ilkelere uygun işlemektedir:
                    </p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '1rem' }}>
                        <li>Hukuka ve Dürüstlük Kuralına Uygun İşleme</li>
                        <li>Kişisel Verilerin Doğru ve Gerektiğinde Güncel Olmasını Sağlama</li>
                        <li>Belirli, Açık ve Meşru Amaçlarla İşleme</li>
                        <li>İşlendikleri Amaçla Bağlantılı, Sınırlı ve Ölçülü Olma</li>
                        <li>İlgili Mevzuatta Öngörülen veya İşlendikleri Amaç için Gerekli Olan Süre Kadar Muhafaza Etme</li>
                    </ul>

                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '1.5rem' }}>II.II. KİŞİSEL VERİLERİN İŞLENME ŞARTLARI VE AMAÇLARI</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        Kişisel verileriniz, platformumuzun güvenliğini sağlamak, hizmetlerimizi sunmak ve mevzuattan kaynaklanan yükümlülüklerimizi yerine getirmek amacıyla aşağıdaki şartlar doğrultusunda işlenmektedir:
                    </p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '1rem' }}>
                        <li>Hizmetlerimizin sunulması ve üyelik süreçlerinin yönetilmesi.</li>
                        <li>Platform güvenliği ve bilgi güvenliği süreçlerinin planlanması.</li>
                        <li>Hukuki yükümlülüklerin yerine getirilmesi.</li>
                        <li>Müşteri/kullanıcı memnuniyeti ve iletişim faaliyetlerinin yürütülmesi.</li>
                    </ul>
                </div>

                <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem' }}>III. KİŞİSEL VERİ SAHİBİNİN HAKLARI</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        Kanun’un 11. maddesi uyarınca veri sahibi olarak;
                    </p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '1rem' }}>
                        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                        <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,</li>
                        <li>Kişisel verilerinizin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                        <li>Eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
                        <li>Kanun ve ilgili diğer kanun hükümlerine uygun olarak işlenmiş olmasına rağmen, işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerin silinmesini veya yok edilmesini isteme</li>
                    </ul>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '1rem' }}>
                        haklarına sahipsiniz. Başvurularınızı <strong>kvkk@hediyeesle.com</strong> adresi üzerinden bize iletebilirsiniz.
                    </p>
                </div>

                <div className="glass" style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        Bu aydınlatma metni en son 13 Şubat 2026 tarihinde güncellenmiştir.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default KVKK;
