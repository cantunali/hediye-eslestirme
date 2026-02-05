import React from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const FAQ = () => {
    const [openIndex, setOpenIndex] = React.useState(null);

    const faqs = [
        {
            question: "HediyeEşle ücretli mi?",
            answer: "Hayır, HediyeEşle tamamen ücretsiz bir platformdur. Etkinlik oluşturmak, davetli eklemek ve hediye listesi oluşturmak için herhangi bir ücret ödemezsiniz."
        },
        {
            question: "Davetlilerimin üye olması gerekiyor mu?",
            answer: "Hayır, davetlilerinizin üye olmasına gerek yoktur. Sadece paylaştığınız etkinlik adı ve etkinlik için belirlediğiniz şifre ile anında sisteme giriş yapabilirler."
        },
        {
            question: "Hediye listemi hangi sitelerden oluşturabilirim?",
            answer: "HediyeEşle, Hepsiburada ve Amazon başta olmak üzere tüm e-ticaret sitelerinden ürün eklemenize olanak tanır. Linkleri manuel olarak ekleyerek listenizi zenginleştirebilirsiniz."
        },
        {
            question: "Bir hediyeyi birden fazla kişi alabilir mi?",
            answer: "Evet, 'Nakit Katıl' özelliği sayesinde pahalı hediyeler için birden fazla davetli nakit katkıda bulunabilir. Bu durumda hediye listede 'Mevcut' kalmaya devam eder, tam alım yapıldığında ise 'Alındı' olarak işaretlenir."
        },
        {
            question: "Etkinlik bilgilerimi sonradan değiştirebilir mi?",
            answer: "Evet, etkinlik yöneticisi olarak panelinize giriş yaptıktan sonra etkinlik tarihi, şifresi ve diğer detayları dilediğiniz zaman güncelleyebilirsiniz."
        },
        {
            question: "Gizliliğim nasıl korunuyor?",
            answer: "Verileriniz şifrelenerek saklanmaktadır. Etkinliğinize sadece belirlediğiniz şifreye sahip davetliler erişebilir. Detaylı bilgi için Gizlilik Politikamızı inceleyebilirsiniz."
        }
    ];

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="section container animate-fade-in" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <Helmet>
                <title>HediyeEşle - Sıkça Sorulan Sorular (SSS)</title>
                <meta name="description" content="HediyeEşle kullanımı hakkında merak edilenler. Ücretlendirme, üyelik ve hediye işlemleri ile ilgili sıkça sorulan sorular." />
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
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>{faq.question}</h3>
                            {openIndex === index ? <ChevronUp size={20} color="var(--primary)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
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
