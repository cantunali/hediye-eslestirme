import React from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const FAQ = () => {
    const [openIndex, setOpenIndex] = React.useState(null);

    const faqs = [
        {
            question: "HediyeEşleştir ücretli mi?",
            answer: "Hayır, HediyeEşleştir tamamen ücretsiz bir platformdur. Etkinlik oluşturmak, davetli eklemek ve hediye listesi oluşturmak için herhangi bir ücret ödemezsiniz."
        },
        {
            question: "Davetlilerimin üye olması veya uygulama indirmesi gerekiyor mu?",
            answer: "Hayır, davetlilerinizin üye olmasına veya herhangi bir uygulama indirmesine gerek yoktur. Paylaştığınız etkinlik adını seçip bilgilerini girerek anında listenize ulaşabilirler."
        },
        {
            question: "Hediye listemi hangi sitelerden oluşturabilirim?",
            answer: "HediyeEşleştir; Hepsiburada, Amazon, Trendyol ve diğer tüm e-ticaret siteleriyle uyumludur. Ürün görselini ve linkini ekleyerek davetlilerinizi doğrudan ilgili siteye yönlendirebilirsiniz."
        },
        {
            question: "Bir hediyenin rezerve edilmesi ne anlama gelir?",
            answer: "Bir davetli hediyeyi seçip 'Hediyeyi Al' dediğinde, o ürün listede 'Alındı' olarak işaretlenir. Bu sayede aynı hediyenin mükerrer olarak alınması engellenmiş olur."
        },
        {
            question: "Kişisel verilerim güvende mi?",
            answer: "Evet, verileriniz Supabase altyapısıyla güvenli bir şekilde saklanmaktadır. Sadece belirlediğiniz şifreye sahip kişiler etkinliğinize erişebilir."
        },
        {
            question: "Hizmet şartları ve KVKK hakkında bilgi alabilir miyim?",
            answer: "Sitemizin alt kısmında (footer) yer alan Kullanım Koşulları ve KVKK Aydınlatma Metni sayfalarından tüm detaylara ulaşabilirsiniz."
        }
    ];

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="section container animate-fade-in" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <Helmet>
                <title>HediyeEşleştir - Sıkça Sorulan Sorular (SSS)</title>
                <meta name="description" content="HediyeEşleştir kullanımı hakkında merak edilenler. Ücretlendirme, üyelik ve hediye işlemleri ile ilgili sıkça sorulan sorular." />
            </Helmet>

            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <HelpCircle size={64} />
                </div>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    Sıkça Sorulan <span className="gradient-text">Sorular</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>
                    Merak ettiklerinizi sizin için cevapladık.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="glass"
                        style={{ padding: '0', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s ease' }}
                        onClick={() => toggleAccordion(index)}
                    >
                        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0, color: '#ffffff' }}>{faq.question}</h3>
                            {openIndex === index ? <ChevronUp size={20} color="#ffffff" /> : <ChevronDown size={20} color="rgba(255,255,255,0.5)" />}
                        </div>
                        {openIndex === index && (
                            <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: 'var(--text-muted)', lineHeight: '1.6', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ paddingTop: '1rem' }}>
                                    {faq.answer}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)' }}>
                    Başka bir sorunuz mu var? <a href="/iletisim" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>Bize ulaşın</a>
                </p>
            </div>
        </div>
    );
};

export default FAQ;
