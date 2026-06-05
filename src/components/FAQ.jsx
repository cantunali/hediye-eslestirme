import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

const FAQ = () => {
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

    return (
        <div className="section container animate-fade-in" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            
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
                    <details
                        key={index}
                        className="faq-item glass"
                        style={{ padding: '0', overflow: 'hidden', transition: 'all 0.3s ease' }}
                    >
                        <summary className="faq-summary">
                            <h3 className="faq-question">{faq.question}</h3>
                            <span className="faq-icon">
                                <ChevronDown size={20} />
                            </span>
                        </summary>
                        <div className="faq-content">
                            {faq.answer}
                        </div>
                    </details>
                ))}
            </div>

            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)' }}>
                    Başka bir sorunuz mu var? <a href="/iletisim" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>Bize ulaşın</a>
                </p>
            </div>

            <style>{`
                .faq-item summary::-webkit-details-marker {
                    display: none;
                }
                .faq-summary {
                    list-style: none;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem;
                    cursor: pointer;
                    user-select: none;
                    outline: none;
                }
                .faq-question {
                    font-size: 1.1rem;
                    fontWeight: 600;
                    margin: 0;
                    color: #ffffff;
                }
                .faq-icon {
                    transition: transform 0.25s ease;
                    display: flex;
                    align-items: center;
                    color: rgba(255, 255, 255, 0.5);
                }
                .faq-item:hover .faq-icon {
                    color: #ffffff;
                }
                .faq-item[open] .faq-icon {
                    transform: rotate(180deg);
                    color: #ffffff;
                }
                .faq-content {
                    padding: 1.25rem 1.5rem 1.5rem 1.5rem;
                    color: var(--on-surface-variant);
                    opacity: 0.9;
                    line-height: 1.6;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }
                .faq-item {
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: var(--radius-lg);
                }
                .faq-item:hover {
                    background: rgba(255, 255, 255, 0.07);
                    border-color: rgba(255, 255, 255, 0.15);
                }
            `}</style>
        </div>
    );
};

export default FAQ;
