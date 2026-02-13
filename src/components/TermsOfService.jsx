import React from 'react';
import { FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
    return (
        <div className="section container animate-fade-in" style={{ padding: '4rem 2rem' }}>
            <Helmet>
                <title>HediyeEşle - Kullanım Koşulları</title>
                <meta name="description" content="HediyeEşle platformu kullanıcı sözleşmesi, kullanıcı hakları ve sorumlulukları." />
            </Helmet>

            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <FileText size={64} />
                </div>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
                    Kullanım <span className="gradient-text">Koşulları</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>
                    Platformumuzu kullanarak aşağıdaki şartları ve veri işleme koşullarını kabul etmiş olursunuz.
                </p>
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div className="card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
                        A- KİŞİSEL VERİLERİN İŞLENMESİNE DAİR BİLGİ VE ONAY
                    </h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        HediyeEşle platformu olarak, talep ettiğiniz hizmetlerin sunulması kapsamında tarafınıza ait kişisel bilgileri (ad, soyad, e-posta, etkinlik tarihleri vb.) işlemekteyiz.
                        Platformumuzu kullanarak kampanya, özel indirim ve hizmetlerimizi anlatan bildirimler almayı kabul etmiş olursunuz.
                    </p>
                </div>

                <div className="card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
                        B- KULLANICI SÖZLEŞMESİ
                    </h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1rem' }}>
                        HediyeEşle, özel etkinlikleriniz için hediye listeleri oluşturmanızı sağlayan bir organizasyon platformudur.
                        Platformda yer alan üçüncü taraf ürünlerin (Amazon, Hepsiburada vb.) sahibi veya doğrudan satıcısı değiliz; yalnızca bir ticaret ve organizasyon platformu oluşturmaktayız.
                    </p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        <li>Kullanıcılar platformu yasal amaçlar doğrultusunda kullanmayı taahhüt eder.</li>
                        <li>Verilen bilgilerin doğruluğundan kullanıcı sorumludur.</li>
                        <li>Üçüncü taraf linklerindeki içerik ve fiyat değişikliklerinden platformumuz sorumlu tutulamaz.</li>
                    </ul>
                </div>

                <div className="card" style={{ padding: '3rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>HAKLAR VE SORUMLULUKLAR</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        Her zaman kendinizle ilgili kişisel verilerin işlenip işlenmediğini öğrenme, yanlış verilerin düzeltilmesini isteme ve silinmesini talep etme hakkına sahipsiniz.
                        Bu haklarınızı <strong>destek@hediyeesle.com</strong> üzerinden bize ulaşarak kullanabilirsiniz.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
