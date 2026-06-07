import React from 'react';
import { Calendar, User, Clock, ChevronLeft, CheckCircle2, Lightbulb, Sparkles, Baby } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '../AdBanner';

const BebekHediyesiBlog = () => {
    const slug = "bebek-hediyesi-ne-alinir-akilli-liste-rehberi-2026";
    const title = "Bebek Hediyesi Ne Alınır? Bütçeye Göre Akıllı Liste Rehberi [2026]";
    const description = "Bebek hediyesi ne alınır? Bütçeye göre 30+ hediye önerisi, sık yapılan hatalar ve online hediye listesi ile aynı ürün alma riskini sıfırlayın. 2026 güncel rehber.";
    const imageUrl = "/blog-images/bebek-hediyesi.jpg";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "image": [imageUrl],
        "datePublished": "2026-02-15T10:00:00+03:00",
        "dateModified": "2026-05-06T10:00:00+03:00",
        "author": [{
            "@type": "Organization",
            "name": "HediyeEşleştir",
            "url": "https://hediyeeslestir.com"
        }]
    };

    return (
        <div className="animate-fade-in">
            
            {/* Hero Section */}
            <section className="section" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
                <div className="container">
                    <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.95rem', fontWeight: '700' }}>
                        <ChevronLeft size={18} /> Blog'a Geri Dön
                    </Link>

                    <div style={{ maxWidth: '850px' }}>
                        <h1 className="hero-title" style={{ marginBottom: '1.5rem', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#ffffff' }}>
                            Bebek Hediyesi Ne Alınır? Bütçeye Göre Akıllı Liste Rehberi (2026)
                        </h1>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={16} /> 15 Şubat 2026 | Son güncelleme: 6 Mayıs 2026</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><User size={16} /> HediyeEşleştir Editör</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16} /> 8 Dakika Okuma</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section">
                <div className="container">
                    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                        <img
                            src={imageUrl}
                            alt="Pastel renkli hediye paketleri içinde yenidoğan bebek kıyafetleri ve oyuncaklar"
                            style={{ width: '100%', borderRadius: '24px', marginBottom: '3rem', boxShadow: '0 20px 40px rgba(187, 0, 39, 0.1)' }}
                        />

                        <div className="blog-content" style={{ lineHeight: '1.8', fontSize: '1.15rem', color: '#ffffff' }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Yakın çevrenizden bebek haberi mi aldınız? İlk duygudan sonra aklınıza gelen soru büyük olasılıkla şudur: "Acaba ne hediye alsak?" Zıbın mı, battaniye mi, mama sandalyesi mi? Çoğu zaman sonuç hep aynıdır: aynı üründen dört tane, hiç kullanılmayan hediyeler ve boşa giden bütçe.
                            </p>

                            <p style={{ marginBottom: '1.5rem' }}>
                                Bu rehberde bebek hediyesi ne alınır sorusuna bütçeye göre sıralanmış önerilerle, kaçınılması gereken hatalarla ve modern bir çözüm olan online hediye listesi sistemiyle kapsamlı bir yanıt veriyoruz.
                            </p>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '3.5rem', fontSize: '2rem' }}>
                                Bebek Hediyesi Seçerken Dikkat Edilmesi Gerekenler
                            </h2>

                            <p style={{ marginBottom: '1.5rem' }}>
                                Bebek hediyesi almak sanıldığı kadar basit değildir. Yanlış beden, uygun olmayan mevsim veya bebeğe zararlı bir materyal seçimi hem hediyenin işe yaramamasına hem de ailenin zor durumda kalmasına neden olabilir. İşte hediye seçerken göz önünde bulundurmanız gereken temel noktalar:
                            </p>
                            
                            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Doğru beden seçimi her şeyden önemlidir.</strong> En sık yapılan hata yenidoğan bedeni almaktır. Yenidoğan bedeni kıyafetler çok kısa süre giyilir; bazı bebekler doğduğunda zaten bu bedeni geçmiş olur. Bunun yerine 3-6 ay bedeni tercih etmek çok daha mantıklıdır. Bebek bu kıyafetleri daha uzun süre kullanır ve ebeveynler bu tercihi takdir eder.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Mevsimi mutlaka hesaplayın.</strong> Kışın doğan bir bebeğe 3-6 ay sonrasında giyeceği yazlık kıyafet almak daha faydalıdır. Doğum tarihine 3-6 ay ekleyerek hangi mevsimde olacağınızı hesaplayın ve kıyafetin mevsime uygunluğundan emin olun.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Güvenlik kriterlerini gözetin.</strong> Parfümlü ürünler bebek cildine zararlı olabilir. Çok küçük parçalı oyuncaklar boğulma riski taşır. Organik pamuklu, BPA içermeyen ve CE belgeli ürünleri tercih edin.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Büyük hediyelerden kaçının.</strong> Yürüteç, salıncak ve bebek arabası gibi büyük parçalar genellikle aile tarafından önceden alınmış olur. Sürpriz olarak bu tür hediyeleri almadan önce mutlaka aileye danışın.</li>
                            </ul>

                            <AdBanner slot="blog_middle" />

                            <h2 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', marginTop: '3.5rem', fontSize: '2rem' }}>
                                Bütçeye Göre Bebek Hediyesi Önerileri
                            </h2>

                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ffffff', marginTop: '2rem' }}>100-300 TL Arası Hediye Fikirleri</h3>
                            <p style={{ marginBottom: '1.5rem' }}>Bu bütçe aralığı, düşünceli ve kullanışlı bir hediye vermek için oldukça yeterlidir. İş arkadaşları, komşular veya uzak akrabalar için idealdir.</p>
                            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Organik pamuklu body/zıbın seti:</strong> 3-6 ay bedeni, mevsime uygun. Her bebeğin en çok ihtiyaç duyduğu temel parçalardandır.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Müslin örtü seti:</strong> Emzirme, örtünme ve kundaklama gibi pek çok amaçla kullanılır. Pratik ve uzun ömürlüdür.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Bebek bakım seti:</strong> Tırnak makası, burun aspiratörü, termometre içeren setler ebeveynlerin işini çok kolaylaştırır.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Diş kaşıyıcı ve çıngırak seti:</strong> Doğal ahşap veya silikon malzemeden üretilmiş olanlar hem güvenli hem de eğlencelidir.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Anı defteri veya bebek günlüğü:</strong> Ailenin en güzel anlarını kayıt altına almasını sağlayan uzun ömürlü bir hediye.</li>
                            </ul>

                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ffffff', marginTop: '2rem' }}>300-700 TL Arası Hediye Fikirleri</h3>
                            <p style={{ marginBottom: '1.5rem' }}>Yakın arkadaşlar ve aile üyeleri için uygun bir bütçe dilimi. Bu aralıkta hem kaliteli hem işlevsel ürünler bulmak mümkündür.</p>
                            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Bebek battaniyesi:</strong> Yüzde yüz pamuklu, dört mevsim kullanılabilir modeller. İsim işlemeli olanlar ayrıca anı değeri taşır.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Biberon ve emzik seti:</strong> Kaliteli markalardan kolik önleyici biberon setleri ebeveynlerin hayatını kurtarır.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Bebek telsizi:</strong> Sesli veya görüntülü modeller, ebeveynler için güvenlik açısından çok değerli bir hediyedir.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Uyku tulumu:</strong> Bebeğin güvenli uyuması için battaniye yerine tercih edilen modern bir ürün.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Hediye sepeti:</strong> Kıyafet, bakım ürünü ve oyuncak içeren karma setler hem görsel olarak etkileyici hem de kullanışlıdır.</li>
                            </ul>

                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ffffff', marginTop: '2rem' }}>700 TL ve Üzeri Hediye Fikirleri</h3>
                            <p style={{ marginBottom: '1.5rem' }}>Çok yakın aile üyeleri veya grup hediyesi organizasyonları için uygundur.</p>
                            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Bebek arabası aksesuarları:</strong> Puset organizer, yağmurluk seti, uyku pedi gibi ürünler.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Yenidoğan fotoğraf çekimi hediyesi:</strong> Profesyonel bir fotoğraf çekimi, ailenin ömür boyu saklayacağı anılar üretir.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Elektronik beşik veya sallanır ana kucağı:</strong> Mutlaka aileye danışarak alın.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Hediye kartı:</strong> Ebeveynlerin ihtiyaçlarına göre kendi seçimlerini yapmasını sağlayan pratik bir alternatif.</li>
                            </ul>


                            <h2 style={{ color: 'var(--tertiary)', marginBottom: '1.5rem', marginTop: '3.5rem', fontSize: '2rem' }}>
                                Bebek Görmeye Giderken Ne Hediye Alınır?
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Hastaneye bebek görmeye gitmek ayrı bir incelik gerektirir. Odanın küçük olduğunu ve ailenin yoğun bir dönemden geçtiğini göz önünde bulundurun.
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                <strong>Hastane ziyareti için en uygun hediyeler:</strong> küçük ve taşıması kolay ürünlerdir. Bebek nazar iğnesi, altın takı (bilezik, iğne), organik kıyafet seti ve hediyelik çikolata kutusu en klasik ve en çok takdir edilen seçenekler arasındadır.
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                <strong>Kaçınmanız gerekenler:</strong> Yer kaplayan büyük hediyeler, kokulu çiçekler (yoğun bakımda yasak olabilir) ve plastik ambalajlı hediyelikler.
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                <strong>Bir ipucu:</strong> Hastane ziyaretinizi kısa tutun, hediyenizi bırakın ve ailenin dinlenmesine izin verin. Uzun ziyaretler yeni doğum yapmış bir anne için yorucu olabilir.
                            </p>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '3.5rem', fontSize: '2rem' }}>
                                Aynı Hediyeyi Alma Sorununa Modern Çözüm: Online Hediye Listesi
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Bebek hediyesi almayı zorlaştıran en büyük problem aynı üründen birden fazla alınmasıdır. Araştırmalar, yeni ebeveynlerin aldıkları hediyelerin yaklaşık yüzde 30'unu ya değiştirmek ya da hiç kullanmadan kaldırmak zorunda kaldığını göstermektedir.
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                İşte bu noktada online hediye eşleştirme sistemi devreye giriyor.
                            </p>

                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ffffff', marginTop: '2rem' }}>Hediye Listesi Nasıl Çalışır?</h3>
                            <p style={{ marginBottom: '1.5rem' }}>Sistem üç basit adımdan oluşur:</p>
                            <ul style={{ listStyle: 'none', paddingLeft: '0', marginBottom: '2rem' }}>
                                <li style={{ marginBottom: '1rem' }}><strong>Adım 1: Aile ihtiyaç listesini oluşturur.</strong> Bebek bezi, biberon seti, bebek arabası, uyku tulumu gibi gerçekten ihtiyaç duyulan ürünler listeye eklenir. İsteğe bağlı olarak marka, model ve fiyat aralığı da belirtilebilir.</li>
                                <li style={{ marginBottom: '1rem' }}><strong>Adım 2: Liste paylaşılır.</strong> Özel bir bağlantı (link) oluşturulur ve bu link WhatsApp, Instagram, e-posta veya SMS ile aile ve arkadaşlara gönderilir. Herhangi bir uygulama indirmeye gerek yoktur.</li>
                                <li style={{ marginBottom: '1rem' }}><strong>Adım 3: Davetliler seçim yapar.</strong> Listeye giren kişiler bütçelerine uygun bir ürünü seçip rezerve eder. Başka biri aynı ürünü göremez; böylece çakışma tamamen önlenir.</li>
                            </ul>

                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ffffff', marginTop: '2rem' }}>Online Hediye Listesinin Avantajları</h3>
                            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Gerçek ihtiyaçlar karşılanır.</strong> Yenidoğanın ihtiyaçları çok spesifiktir. Rastgele seçilen bir hediye yerine gerçekten kullanılacak ürünler alınır.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Bütçe dostu bir sistemdir.</strong> Davetliler fiyat aralığını görebildiği için kimse kendini baskı altında hissetmez. 100 TL ile de 1.000 TL ile de listeden anlamlı bir hediye seçmek mümkündür.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Hediye çakışması ortadan kalkar.</strong> Dört tane aynı battaniye yerine dört farklı ihtiyaç karşılanır. Hem hediye veren memnun olur hem de aile gerçekten işe yarayan ürünler alır.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Duygusal değer artar.</strong> Hediye veren kişi, seçtiği ürünün gerçekten kullanılacağını ve işe yarayacağını bilir. Bu da hediyenin anlamını artırır.</li>
                            </ul>

                            <h2 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', marginTop: '3.5rem', fontSize: '2rem' }}>
                                Kız Bebek ve Erkek Bebek İçin Hediye Farkları
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Bebek hediyesinde cinsiyet belirleyici bir etken olabilir, ancak günümüzde unisex hediyeler de çok popülerdir.
                            </p>
                            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Kız bebeğe hediye alırken</strong> pembe tonları, çiçekli ve fiyonklu tasarımlar klasik tercihler arasındadır. Saç bantları, elbise setleri ve pelüş oyuncaklar sıkça tercih edilir.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Erkek bebeğe hediye seçerken</strong> mavi tonları, hayvan figürlü tasarımlar ve arabalı motifler öne çıkar. Tulum setleri, şapkalar ve figürlü emzik zincirleri popüler seçeneklerdendir.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>Cinsiyetten bağımsız hediyeler ise</strong> her durumda işe yarar: müslin örtüler, bebek battaniyeleri, bakım setleri, biberon setleri ve hediye kartları her bebek için uygun evrensel seçeneklerdir.</li>
                            </ul>

                            <h2 style={{ color: 'var(--tertiary)', marginBottom: '1.5rem', marginTop: '3.5rem', fontSize: '2rem' }}>
                                Sıkça Sorulan Sorular (SSS)
                            </h2>
                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#ffffff' }}>Bebek hediyesi olarak ne alınır?</h4>
                                <p style={{ marginBottom: '1.5rem' }}>En çok tercih edilen ve işe yarayan bebek hediyeleri organik pamuklu kıyafet setleri (3-6 ay beden), müslin örtü seti, bebek bakım seti, biberon seti, bebek battaniyesi ve anı defteridir. Bütçeye göre 100-500 TL arasında kaliteli seçenekler bulmak mümkündür. En önemli kural: bebeğin yaşına, mevsime ve gerçek ihtiyaçlarına uygun bir ürün seçmektir.</p>
                                
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#ffffff' }}>Bebek görmeye giderken ne hediye alınır?</h4>
                                <p style={{ marginBottom: '1.5rem' }}>Hastaneye bebek görmeye giderken küçük, taşıması kolay hediyeler tercih edilmelidir. Bebek nazar iğnesi, altın takı, organik kıyafet seti ve hediyelik çikolata en uygun seçeneklerdir. Büyük ve yer kaplayan hediyelerden ve kokulu çiçeklerden kaçınılmalıdır.</p>
                                
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#ffffff' }}>Bebek hediyesinde hangi beden alınmalı?</h4>
                                <p style={{ marginBottom: '1.5rem' }}>En sık yapılan hata yenidoğan bedeni almaktır. Yenidoğan bedeni çok kısa süre giyilir. Bunun yerine 3-6 ay bedeni alın ve bebeğin doğum tarihine göre mevsim hesaplaması yapın. Kışın doğan bir bebeğe 3-6 ay sonrasında giyeceği yazlık kıyafet almak çok daha faydalıdır.</p>
                                
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#ffffff' }}>Online bebek hediye listesi nasıl çalışır?</h4>
                                <p style={{ marginBottom: '1.5rem' }}>Aile ihtiyaç duyduğu ürünleri bir listeye ekler ve bu listeyi özel bir link ile paylaşır. Davetliler listeden bütçelerine uygun bir ürünü seçip rezerve eder. Böylece aynı hediyeden birden fazla alınması engellenir ve gerçek ihtiyaçlar karşılanır. HediyeEşleştir ile birkaç dakikada ücretsiz liste oluşturabilirsiniz.</p>
                                
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#ffffff' }}>Bebek hediyesi için ne kadar bütçe ayırmalıyım?</h4>
                                <p style={{ marginBottom: '1.5rem' }}>Bütçe yakınlık derecesine göre değişir. Yakın arkadaş veya aile için 300-1000 TL, iş arkadaşı veya tanıdık için 100-300 TL makul bir aralıktır. Önemli olan fiyat değil, düşünceli ve ihtiyaca yönelik bir seçim yapmaktır.</p>
                                
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#ffffff' }}>Bebek hediyesinde hangi ürünlerden kaçınılmalı?</h4>
                                <p style={{ marginBottom: '1.5rem' }}>Parfümlü ürünler (bebek cildine zararlı), çok küçük parçalı oyuncaklar (boğulma riski), yenidoğan bedeni kıyafetler (çok kısa süre giyilir) ve büyük mobilya türü hediyeler (aile zaten almış olabilir) kaçınılması gereken başlıca hediyelerdir.</p>
                            </div>

                            <div className="card" style={{ padding: '3rem', borderRadius: '32px', textAlign: 'center' }}>
                                <h2 className="gradient-text" style={{ marginBottom: '1.5rem' }}>Sonuç: Hediye Seçmek Artık Daha Kolay</h2>
                                <p style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                                    Bebek hediyesi seçmek sevgi dolu bir jesttir. Ancak bu jestin gerçekten faydalı olması çok daha değerlidir. Doğru beden, doğru mevsim ve gerçek ihtiyaçlara yönelik bir seçim yaptığınızda hem hediyeniz anlam kazanır hem de aileyi mutlu edersiniz.
                                </p>
                                <p style={{ marginBottom: '2.5rem', fontSize: '1.2rem' }}>
                                    Hediye eşleştirme sistemiyle gereksiz hediyeler azalır, gerçek ihtiyaçlar karşılanır ve herkes mutlu olur. Birkaç dakikada ücretsiz hediye listenizi oluşturabilir ve sevdiklerinizle paylaşabilirsiniz.
                                </p>
                                <Link href="/yonetim/olustur" className="btn btn-primary" style={{ height: '3.5rem', padding: '0 2.5rem', fontSize: '1.1rem' }}>
                                    Hemen Ücretsiz Listenizi Oluşturun →
                                </Link>
                            </div>

                            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#ffffff' }}>İlgili Yazılar:</h3>
                                <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                                    <li style={{ marginBottom: '1rem' }}>
                                        <Link href="/blog/hediye-eslestirme-uygulamasi-akilli-hediye-listesi-rehberi-2026" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '1.1rem' }}>
                                            Hediye Eşleştirme Uygulaması: Akıllı Hediye Listesi Rehberi (2026)
                                        </Link>
                                    </li>
                                    <li style={{ marginBottom: '1rem' }}>
                                        <Link href="/blog/dugun-hediyesi-ne-alinir-akilli-liste-rehberi" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '1.1rem' }}>
                                            Düğün Hediyesi Karmaşasına Son: Akıllı Liste Sistemi
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

export default BebekHediyesiBlog;
