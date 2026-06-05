import React from 'react';
import { Calendar, User, Clock, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '../AdBanner';

const DogumGunuHediyesiBlog = () => {
    const slug = "dogum-gunu-hediyesi-secmek-neden-bu-kadar-zor-akilli-liste-ile-cozum";
    const title = "Doğum Günü Hediyesi Seçmek Neden Bu Kadar Zor? Akıllı Liste ile Çözüm!";
    const description = "Doğum günü hediyesi seçerken herkes zorlanır. Akıllı hediye listesi ile sevdiklerinizin gerçekten istediği hediyeyi verin, boşa harcamayı önleyin.";
    const imageUrl = "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=1200";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "image": [imageUrl],
        "datePublished": "2026-05-15T10:00:00+03:00",
        "author": [{
            "@type": "Organization",
            "name": "HediyeEşleştir",
            "url": "https://hediyeeslestir.com"
        }]
    };

    return (
        <div className="animate-fade-in">
            
            <section className="section" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
                <div className="container">
                    <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.95rem', fontWeight: '700' }}>
                        <ChevronLeft size={18} /> Blog'a Geri Dön
                    </Link>

                    <div style={{ maxWidth: '850px' }}>
                        <h1 className="hero-title" style={{ marginBottom: '1.5rem', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#ffffff' }}>
                            {title}
                        </h1>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={16} /> 15 Mayıs 2026</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><User size={16} /> HediyeEşleştir Editör</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16} /> 4 Dakika Okuma</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                        <img
                            src={imageUrl}
                            alt="Renkli doğum günü pastası ve hediye kutuları"
                            style={{ width: '100%', borderRadius: '24px', marginBottom: '3rem', boxShadow: '0 20px 40px rgba(187, 0, 39, 0.1)' }}
                        />

                        <div className="blog-content" style={{ lineHeight: '1.8', fontSize: '1.15rem', color: '#ffffff' }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Sevdiğiniz birinin doğum günü yaklaşıyor ve aklınızda hep aynı soru: <strong>"Ne alsam?"</strong> 🤔
                            </p>

                            <p style={{ marginBottom: '1.5rem' }}>
                                Parfüm mü? Kitap mı? Elektronik aksesuar mı? Yoksa klasik hediye kartı mı? Saatlerce düşünürsünüz, mağaza mağaza gezersiniz ve sonunda aldığınız hediye büyük ihtimalle ya zaten var olan bir şeydir ya da hiç kullanılmaz.
                            </p>

                            <p style={{ marginBottom: '1.5rem' }}>
                                Doğum günü hediyesi seçmek, herkesin yaşadığı ama kimsenin çözemediği evrensel bir sorundur. Ta ki <strong>akıllı hediye listesi</strong> devreye girene kadar.
                            </p>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '3.5rem', fontSize: '2rem' }}>
                                🎯 Doğum Günü Hediye Listesi Nedir?
                            </h2>

                            <p style={{ marginBottom: '1.5rem' }}>
                                Doğum günü hediye listesi, doğum gününü kutlayacak kişinin gerçekten istediği ürünleri bir listeye ekleyip çevresiyle paylaşmasıdır. Böylece:
                            </p>

                            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                                <li style={{ marginBottom: '0.75rem' }}>Hediye alan kişi gerçekten istediği şeyi alır</li>
                                <li style={{ marginBottom: '0.75rem' }}>Hediye veren kişi ne alacağını düşünmek zorunda kalmaz</li>
                                <li style={{ marginBottom: '0.75rem' }}>Aynı hediyenin birden fazla kişi tarafından alınması engellenir</li>
                                <li style={{ marginBottom: '0.75rem' }}>Herkes kendi bütçesine uygun bir seçenek bulur</li>
                            </ul>

                            <AdBanner slot="blog_middle" />

                            <h2 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', marginTop: '3.5rem', fontSize: '2rem' }}>
                                🛠️ Nasıl Çalışır?
                            </h2>

                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ffffff', marginTop: '2rem' }}>1️⃣ Listeyi Oluşturun</h3>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Doğum gününüz yaklaşıyorsa, istediğiniz ürünleri HediyeEşleştir üzerinden bir listeye ekleyin. Teknolojik ürünlerden kitaplara, giyimden deneyim hediyelerine kadar her şeyi ekleyebilirsiniz. İsterseniz fiyat aralığı ve marka tercihi de belirtebilirsiniz.
                            </p>

                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ffffff', marginTop: '2rem' }}>2️⃣ Paylaşın</h3>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Oluşturduğunuz listeyi WhatsApp, Instagram veya e-posta ile arkadaşlarınıza ve ailenize gönderin. Tek bir link yeterli.
                            </p>

                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ffffff', marginTop: '2rem' }}>3️⃣ Arkadaşlarınız Seçsin</h3>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Listeyi gören kişiler, bütçelerine uygun bir ürünü rezerve eder. Diğer kişiler aynı ürünü göremez, böylece çakışma yaşanmaz.
                            </p>

                            <h2 style={{ color: 'var(--tertiary)', marginBottom: '1.5rem', marginTop: '3.5rem', fontSize: '2rem' }}>
                                💡 Doğum Günü Listesi İçin İlham Veren Fikirler
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>Listenize ne ekleyeceğinizi bilmiyorsanız, işte bazı popüler kategoriler:</p>
                            
                            <ul style={{ listStyle: 'none', paddingLeft: '0', marginBottom: '2rem' }}>
                                <li style={{ marginBottom: '1rem' }}><strong>Teknoloji:</strong> Kablosuz kulaklık, akıllı saat, taşınabilir şarj cihazı</li>
                                <li style={{ marginBottom: '1rem' }}><strong>Kişisel Bakım:</strong> Parfüm seti, cilt bakım ürünleri, masaj aleti</li>
                                <li style={{ marginBottom: '1rem' }}><strong>Deneyim:</strong> Konser bileti, spa günü, yemek kursu, uçuş deneyimi</li>
                                <li style={{ marginBottom: '1rem' }}><strong>Ev & Yaşam:</strong> Kahve makinesi, dekoratif objeler, bitki seti</li>
                                <li style={{ marginBottom: '1rem' }}><strong>Hobi:</strong> Resim malzemesi, puzzle, kamp ekipmanı, kitap serisi</li>
                            </ul>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '3.5rem', fontSize: '2rem' }}>
                                🎈 Neden Doğum Günü İçin Liste Oluşturmalısınız?
                            </h2>

                            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#ffffff' }}>Sürpriz Bozulmaz</h4>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Liste paylaşmak sürprizi bozmaz, aksine daha anlamlı kılar. Karşı taraf ne alacağını bilmez ama siz ne alırsanız alın, işe yarayacağından emin olursunuz.
                            </p>

                            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#ffffff' }}>Gereksiz Hediye Döngüsü Biter</h4>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Yılda bir kez gelen özel günde aldığınız hediyenin çekmecede kalması üzücüdür. Liste sistemi ile bu döngü sona erer.
                            </p>

                            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#ffffff' }}>Her Yaş İçin Geçerli</h4>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Çocuk doğum günlerinden 50. yaş kutlamalarına kadar her yaş grubu için hediye listesi oluşturulabilir. Ebeveynler, çocukları için de liste hazırlayabilir.
                            </p>

                            <div className="card" style={{ padding: '3rem', borderRadius: '32px', textAlign: 'center', marginTop: '3rem' }}>
                                <h2 className="gradient-text" style={{ marginBottom: '1.5rem' }}>🎂 Sonuç: Doğum Günlerini Daha Anlamlı Kutlayın</h2>
                                <p style={{ marginBottom: '2.5rem', fontSize: '1.2rem' }}>
                                    Hediye vermek güzel bir jesttir. Ama bu jestin karşı tarafı gerçekten mutlu etmesi çok daha değerlidir. HediyeEşleştir ile doğum günü hediye listenizi oluşturun, sevdiklerinizle paylaşın ve herkesin mutlu olduğu bir kutlama yaşayın.
                                </p>
                                <Link href="/yonetim/olustur" className="btn btn-primary" style={{ height: '3.5rem', padding: '0 2.5rem', fontSize: '1.1rem' }}>
                                    Hemen Listenizi Oluşturun →
                                </Link>
                            </div>

                            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#ffffff' }}>İlgili Yazılar:</h3>
                                <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                                    <li style={{ marginBottom: '1rem' }}>
                                        <Link href="/blog/hediye-eslestirme-uygulamasi-akilli-hediye-listesi-rehberi" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '1.1rem' }}>
                                            Hediye Eşleştirme Uygulaması: Akıllı Hediye Listesi Rehberi
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DogumGunuHediyesiBlog;
