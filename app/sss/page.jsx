import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'HediyeEşleştir - Sıkça Sorulan Sorular (SSS)',
  description: 'HediyeEşleştir kullanımı hakkında merak edilenler. Ücretlendirme, üyelik ve hediye işlemleri ile ilgili sıkça sorulan sorular.',
  alternates: {
    canonical: 'https://hediyeeslestir.com/sss',
  },
  openGraph: {
    title: 'HediyeEşleştir | Sıkça Sorulan Sorular',
    description: 'HediyeEşleştir kullanımı hakkında merak edilenler. Ücretlendirme, üyelik ve hediye işlemleri ile ilgili sıkça sorulan sorular.',
    url: 'https://hediyeeslestir.com/sss',
    type: 'website',
  },
};

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

export default function Page() {
  return (
    <div className="animate-fade-in">
      <section className="section" style={{ textAlign: 'center', paddingBottom: '2rem' }}>
        <div className="container">
          <h1 className="hero-title gradient-text">Sıkça Sorulan Sorular</h1>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            Merak ettiklerinizi sizin için cevapladık.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card"
              style={{
                marginBottom: '2rem',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}
              >
                <span style={{ color: 'var(--primary)', fontWeight: '800' }}>?</span>
                <span>{faq.question}</span>
              </h3>
              <p
                style={{
                  color: 'var(--on-surface-variant)',
                  fontSize: '1.05rem',
                  lineHeight: '1.7',
                  margin: '0',
                  paddingLeft: '1.5rem',
                }}
              >
                {faq.answer}
              </p>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p style={{ color: 'var(--on-surface-variant)', fontSize: '1.05rem' }}>
              Başka bir sorunuz mu var?{' '}
              <Link href="/iletisim" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>
                Bize ulaşın
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
