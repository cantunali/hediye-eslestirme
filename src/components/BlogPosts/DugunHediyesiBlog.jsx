import React from 'react';
import { Calendar, User, Clock, ChevronLeft, CheckCircle2, Heart, Sparkles, Gift, MapPin, Globe, UserCircle, ListChecks, Info, AlertCircle, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '../AdBanner';

const DugunHediyesiBlog = () => {
    const slug = "dugun-hediyesi-karmasasina-son-akilli-liste-sistemi";
    const title = "Düğün Hediyesi Karmaşasına Son: Akıllı Online Hediye Listesi Sistemi (2026 Rehberi)";
    const description = "Yeni ev kurarken gereksiz hediyelerle uğraşmayın. Düğün hediye listesi oluşturun, ihtiyaçlarınız doğru karşılansın.";
    const imageUrl = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "image": [imageUrl],
        "datePublished": "2026-02-15T10:00:00+03:00",
        "dateModified": "2026-05-04T10:00:00+03:00",
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
                        <h1 className="hero-title" style={{ marginBottom: '1.5rem', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', color: '#ffffff', lineHeight: '1.2' }}>
                            {title}
                        </h1>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={16} /> 15 Şubat 2026 (Güncelleme: Mayıs 2026)</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><User size={16} /> HediyeEşleştir Editör</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16} /> 12 Dakika Okuma</span>
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
                            alt="Düğün hediye listesi oluşturan mutlu çift — online hediye planlama"
                            style={{ width: '100%', borderRadius: '24px', marginBottom: '3rem', boxShadow: '0 20px 40px rgba(187, 0, 39, 0.1)' }}
                        />

                        <div className="blog-content" style={{ lineHeight: '1.8', fontSize: '1.15rem', color: '#ffffff' }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Düğün hazırlıkları heyecanlı olduğu kadar detaylı ve yorucudur. Mekân seçimi, davetli listesi, organizasyon firma görüşmeleri derken çiftlerin en çok düşündüğü konulardan biri şudur: <strong>"Düğün hediyeleri nasıl yönetilecek?"</strong>
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Hepimiz o sahneyi biliriz: Evlenen arkadaşınız üçüncü tost makinesini açarken gülümsemeye çalışır, siz de "Acaba borcam mı alsaydım?" diye düşünürsünüz. Türkiye'de düğün hediye kültürü geleneksel olarak altın ve takıya dayanır; ancak 2026'da çiftlerin beklentileri değişti. Yeni nesil çiftler, ihtiyaç odaklı ve planlı bir yaklaşımı tercih ediyor.
                            </p>
                            <p style={{ marginBottom: '2.5rem' }}>
                                İşte bu noktada devreye giren online düğün hediye listesi sistemi, hem çiftler hem de davetliler için büyük bir kolaylık sağlıyor. Bu rehberde düğün hediye listesinin ne olduğunu, nasıl oluşturulacağını ve neden artık vazgeçilmez hale geldiğini adım adım anlatıyoruz.
                            </p>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.8rem' }}>
                                <Gift size={32} /> Düğün Hediye Listesi Nedir?
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Düğün hediye listesi, evlenecek çiftin yeni yaşamları için ihtiyaç duyduğu ürünleri dijital ortamda listeleyip davetlileriyle paylaştığı modern bir planlama aracıdır. Kavram yurt dışında "wedding registry" olarak bilinir ve onlarca yıllık bir geçmişe sahiptir. Türkiye'de ise özellikle son birkaç yılda dijital platformlar sayesinde hızla yaygınlaşmaktadır.
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Temel mantık oldukça basittir. Çift, bir hediye listesi platformuna üye olur ve evin ihtiyaçlarını — küçük ev aletlerinden dekorasyon ürünlerine, elektronik eşyalardan balayı katkı fonuna kadar — listeye ekler. Oluşturulan özel link davetlilerle paylaşılır. Davetliler listeye göz atar, bütçelerine uygun bir ürünü seçer ve "ben bunu alacağım" diye işaretler. Böylece sistem üzerinden o ürün başka biri tarafından tekrar seçilemez.
                            </p>
                            <p style={{ marginBottom: '1.5rem', fontWeight: '600' }}>Bu sistemin sağladığı temel avantajlar şunlardır:</p>
                            <div className="card" style={{ padding: '2rem', borderRadius: '20px', marginBottom: '3rem', background: 'rgba(255,255,255,0.03)' }}>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
                                    {[
                                        { t: "Mükerrer hediye önlenir:", d: "Aynı ürünün birden fazla alınmasının önüne geçilir." },
                                        { t: "İhtiyaç odaklı seçim:", d: "Çift, gerçekten kullanacağı ürünleri belirler." },
                                        { t: "Davetli konforu:", d: "Misafirler \"Ne alsam?\" stresinden kurtulur." },
                                        { t: "Bütçe esnekliği:", d: "Farklı fiyat aralıklarında seçenekler sunulur." },
                                        { t: "Şeffaf takip:", d: "Kimin ne aldığı anlık olarak görülebilir." }
                                    ].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '0.75rem', fontSize: '1.05rem' }}>
                                            <CheckCircle2 size={18} style={{ color: 'var(--primary)', marginTop: '0.2rem', flexShrink: 0 }} />
                                            <span><strong>{item.t}</strong> {item.d}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.8rem' }}>
                                <Heart size={32} /> Düğün Planlayan Çiftler Neden Hediye Listesi Oluşturmalı?
                            </h2>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--secondary)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Yeni Ev İhtiyaçları Netleşir</h3>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Yeni bir hayata adım atan çiftlerin ev kurma süreci oldukça maliyetlidir. Çeyiz listesi hazırlamak ile hediye listesi oluşturmak birbirini tamamlayan süreçlerdir. Çiftler, çeyiz alışverişi sırasında hangi ürünlerin eksik kaldığını tespit eder ve bu ihtiyaçları hediye listesine ekleyebilir.
                            </p>
                            <p style={{ marginBottom: '1.25rem', fontWeight: '600' }}>Tipik bir düğün hediye listesinde yer alan kategoriler şunlardır:</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                {[
                                    { title: "Küçük ev aletleri", items: "Kahve makinesi, blender, tost makinesi, ütü, el mikseri" },
                                    { title: "Mutfak gereçleri", items: "Tencere seti, bıçak takımı, cam saklama kapları, kesme tahtası seti" },
                                    { title: "Ev tekstili", items: "Nevresim takımı, havlu seti, masa örtüsü, perde" },
                                    { title: "Elektronik ürünler", items: "Robot süpürge, akıllı hoparlör, tablet" },
                                    { title: "Dekorasyon ürünleri", items: "Duvar saati, ayna, vazo, tablo, mum seti" },
                                    { title: "Deneyim ve katkı fonları", items: "Balayı fonu, ev dekorasyon fonu, yemek kursu hediye çeki" }
                                ].map((cat, i) => (
                                    <div key={i} style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>{cat.title}</h4>
                                        <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>{cat.items}</p>
                                    </div>
                                ))}
                            </div>

                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--secondary)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Gereksiz ve Tekrarlayan Hediyeler Önlenir</h3>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Düğün sonrası en sık duyulan şikayetlerden biri aynı üründen birden fazla almanaktır. Üç tane tost makinesi, iki blender, beş set havlu... Liste sistemi olmadan davetliler birbirinden bağımsız karar verir ve kaçınılmaz çakışmalar yaşanır. Online hediye listesi bu sorunu kökten çözer: <strong>Bir davetli bir ürünü işaretlediğinde, o ürün listede "alındı" olarak görünür.</strong>
                            </p>

                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--secondary)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Davetliler İçin Rehberlik Sağlar</h3>
                            <p style={{ marginBottom: '1.5rem' }}>
                                "Düğün hediyesi ne alınır?" sorusu Türkiye'de her yıl on binlerce kez aranmaktadır. Davetlilerin büyük bölümü ne alacağını bilemez, yanlış hediye alma korkusu yaşar veya "herkesin altın taktığı ortamda ben ne yapayım" ikileminde kalır. Hediye listesi, bu belirsizliği ortadan kaldırır ve herkese somut bir yol haritası sunar.
                            </p>

                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--secondary)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Uzak Mesafedeki Misafirler Dahil Olur</h3>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Şehir dışı veya yurt dışındaki akrabalar düğüne katılamasa bile online hediye listesi üzerinden hediye seçebilir. Bu özellik özellikle farklı şehirlerde yaşayan geniş aileleri olan çiftler için büyük kolaylıktır.
                            </p>

                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--secondary)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Bütçe Dengesini Korur</h3>
                            <p style={{ marginBottom: '1.5rem' }}>
                                İyi hazırlanmış bir düğün hediye listesi, farklı fiyat aralıklarını kapsar. Bu sayede hem yakın dostlar hem de iş arkadaşları kendilerine uygun bir hediye bulabilir. Genel öneriler şöyledir:
                            </p>
                            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}><strong>Ekonomik seçenekler (0–300 ₺):</strong> Mum seti, mutfak aksesuarı, havlu takımı, dekoratif tabak</div>
                                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}><strong>Orta bütçeli seçenekler (300–1.000 ₺):</strong> Nevresim takımı, küçük ev aletleri, kahve makinesi</div>
                                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}><strong>Yüksek bütçeli seçenekler (1.000 ₺ ve üzeri):</strong> Robot süpürge, büyük ev aleti, balayı katkısı</div>
                            </div>

                            <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(187, 0, 39, 0.05)', borderLeft: '4px solid var(--primary)', marginBottom: '3rem' }}>
                                <p style={{ margin: 0, fontSize: '1.05rem' }}>
                                    <Info size={20} style={{ color: 'var(--primary)', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                    <strong>İpucu:</strong> Listeye davetli sayınızın en az yarısı kadar ürün ekleyin. 100 davetli bekliyorsanız minimum 50 ürünlük, farklı bütçeleri kapsayan dengeli bir liste oluşturmanız tavsiye edilir.
                                </p>
                            </div>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.8rem' }}>
                                <Sparkles size={32} /> Online Düğün Hediye Listesi Nasıl Oluşturulur? (Adım Adım)
                            </h2>
                            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
                                {[
                                    { t: "Adım 1: Platform Seçin ve Hesap Oluşturun", d: "HediyeEşleştir gibi Türkçe destekli ve KVKK uyumlu bir platform tercih edin. Kayıt işlemi ücretsizdir ve birkaç dakika sürer. Hesabınızı oluşturduktan sonra etkinlik türü olarak \"Düğün\" seçeneğini işaretleyin." },
                                    { t: "Adım 2: İhtiyaç Listesini Birlikte Hazırlayın", d: "Eşinizle birlikte oturup eviniz için nelere ihtiyacınız olduğunu konuşun. Çeyiz alışverişinde eksik kalan ürünleri, yeni evin dekorasyonu için gereken parçaları ve hayalinizdeki deneyimleri (balayı, yemek kursu vb.) listeye ekleyin. Her ürün için marka, model veya fiyat aralığı belirtebilirsiniz." },
                                    { t: "Adım 3: Listeyi Kategorilere Ayırın", d: "Davetlilerin kolayca gezinebilmesi için ürünleri kategorilere bölün: Mutfak, yatak odası, banyo, salon, elektronik, deneyimler gibi. Bu düzenleme, listenin kullanıcı dostu olmasını sağlar." },
                                    { t: "Adım 4: Özel Bağlantınızı Paylaşın", d: "Platform size özel bir link oluşturur. Bu linki WhatsApp, Davetiye QR Kodu, Sosyal Medya veya E-posta kanallarından paylaşabilirsiniz." },
                                    { t: "Adım 5: Takip Edin ve Güncelleyin", d: "Düğüne kadar listeyi düzenli olarak kontrol edin. Yeni ihtiyaçlar ortaya çıkabilir veya bazı ürünleri çeyiz alışverişinde kendiniz almış olabilirsiniz. Listeyi güncel tutmak, davetlilerinize doğru bilgi sunmanızı sağlar." }
                                ].map((step, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0, marginTop: '0.2rem' }}>{i+1}</div>
                                        <div>
                                            <h4 style={{ marginBottom: '0.35rem', color: '#ffffff' }}>{step.t}</h4>
                                            <p style={{ margin: 0, fontSize: '1rem', color: 'rgba(255,255,255,0.8)' }}>{step.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.8rem' }}>
                                <ListChecks size={32} /> Hediye Listesi Sistemi Kimler İçin Özellikle Uygundur?
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>Her çift hediye listesinden fayda görebilir, ancak bazı durumlarda bu sistem adeta zorunluluk haline gelir:</p>
                            <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
                                {[
                                    { t: "Şehir dışı veya kır düğünleri:", d: "Fiziksel hediye taşımak zor olduğunda online sistem kolaylık sağlar." },
                                    { t: "Yurt dışı bağlantılı aileler:", d: "Uzaktan hediye seçimi mümkün olur." },
                                    { t: "Kalabalık davetli listeleri:", d: "200+ kişilik düğünlerde çakışma riski katlanarak artar." },
                                    { t: "İkinci evlilikler:", d: "Çiftlerin zaten bir evi varsa, gerçekten ihtiyaç duydukları spesifik ürünleri belirtmek çok daha anlamlıdır." },
                                    { t: "Minimalist çiftler:", d: "Gereksiz eşya biriktirmek istemeyen çiftler, tam olarak neye ihtiyaçları varsa onu alır." }
                                ].map((item, i) => (
                                    <div key={i} style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <strong>{item.t}</strong> {item.d}
                                    </div>
                                ))}
                            </div>

                            <AdBanner slot="blog_middle" />

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.8rem' }}>
                                <Globe size={32} /> Türkiye'de Düğün Hediye Listesi Kültürü: Gelenekten Dijitale
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Türkiye'de düğün hediyesi denince akla ilk gelen geleneksel uygulamalar, altın takma ve para takma törenleridir. Bu gelenek bugün de devam etmekle birlikte, yeni nesil çiftler arasında dijital hediye listesi kavramı hızla benimseniyor.
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Bu dönüşümün ardındaki nedenlerden biri, çiftlerin artık daha geç yaşta evlenmesi ve çoğunun evlilik öncesinde kendi evlerinde yaşıyor olmasıdır. Bu durumda "ne eksikleri var?" sorusunun cevabı, eskisi kadar net değildir. Hediye listesi tam da bu noktada devreye girerek çiftin gerçek ihtiyaçlarını şeffaf bir şekilde ortaya koyar.
                            </p>
                            <p style={{ marginBottom: '3rem' }}>
                                Ayrıca balayı fonları, deneyim hediyeleri (yemek kursu, spa paketi, seyahat katkısı) gibi "maddi olmayan" hediye seçenekleri de dijital liste platformlarında sunulabilmektedir. Bu da geleneksel "ev eşyası" odaklı hediye anlayışını genişleten önemli bir yeniliktir.
                            </p>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.8rem' }}>
                                <AlertCircle size={32} /> Düğün Hediye Listesi Oluştururken Yapılan 5 Yaygın Hata
                            </h2>
                            <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
                                {[
                                    "Sadece Pahalı Ürünler Eklemek: Farklı bütçelere hitap eden dengeli bir liste oluşturun.",
                                    "Listeyi Çok Geç Paylaşmak: İdeal zamanlama, düğünden 6–8 hafta öncedir.",
                                    "Listeyi Güncellememek: Aldığınız ürünleri listeden çıkarmayı unutmayın.",
                                    "Açıklama Eklememek: \"Kahve makinesi\" yazmak yerine daha spesifik açıklamalar ekleyin.",
                                    "Sadece Bir Kategoride Kalmak: Tüm yaşam alanlarını kapsayan çeşitli bir liste hazırlayın."
                                ].map((error, i) => (
                                    <div key={i} style={{ padding: '1rem 1.5rem', background: 'rgba(187, 0, 39, 0.05)', borderRadius: '12px', border: '1px solid rgba(187, 0, 39, 0.1)', color: 'rgba(255,255,255,0.9)', fontSize: '1rem' }}>
                                        <strong style={{ color: 'var(--primary)' }}>{i+1}.</strong> {error}
                                    </div>
                                ))}
                            </div>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.8rem' }}>
                                <UserCircle size={32} /> Davetliler İçin Rehber: Düğün Hediyesi Ne Alınır?
                            </h2>
                            <p style={{ marginBottom: '1.5rem' }}>Eğer çiftin hediye listesi varsa: Doğrudan listeyi inceleyin ve bütçenizde bir ürün seçin. Liste yoksa aşağıdaki öneriler yol gösterici olabilir:</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
                                {[
                                    { t: "Yakın arkadaşa:", d: "Kişiye özel tasarım ürünler, ortak hobiler." },
                                    { t: "İş arkadaşına:", d: "Şık ev aksesuarları, kahve veya çay seti." },
                                    { t: "Akrabaya:", d: "Altın, ev tekstili, mutfak seti." },
                                    { t: "Uzaktan katılım:", d: "Online hediye kartı, balayı katkısı." }
                                ].map((item, i) => (
                                    <div key={i} style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
                                        <h5 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>{item.t}</h5>
                                        <p style={{ margin: 0, fontSize: '0.9rem' }}>{item.d}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="card" style={{ padding: '2.5rem', borderRadius: '24px', marginBottom: '4rem', background: 'linear-gradient(135deg, rgba(187, 0, 39, 0.1) 0%, rgba(0, 0, 0, 0) 100%)' }}>
                                <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.6rem', color: 'var(--primary)' }}>HediyeEşleştir ile Düğün Listenizi Kolayca Oluşturun</h2>
                                <p style={{ marginBottom: '1.5rem' }}>HediyeEşleştir, Türkiye'ye özel geliştirilmiş bir hediye eşleştirme platformudur.</p>
                                <ul style={{ marginBottom: '2rem', display: 'grid', gap: '0.75rem', paddingLeft: '1.25rem' }}>
                                    <li><strong>Tek tıkla liste oluşturma:</strong> Kategoriler halinde ürünlerinizi hızlıca ekleyin.</li>
                                    <li><strong>Kolay paylaşım:</strong> WhatsApp, QR kod veya sosyal medya ile tek link paylaşın.</li>
                                    <li><strong>Gerçek zamanlı takip:</strong> Kimin hangi hediyeyi seçtiğini anlık olarak görün.</li>
                                    <li><strong>Tamamen ücretsiz:</strong> Kayıt ücreti veya gizli maliyet yoktur.</li>
                                </ul>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                    <Link href="/yonetim/olustur" className="btn btn-primary">👉 Hemen Ücretsiz Listenizi Oluşturun</Link>
                                </div>
                            </div>

                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.8rem' }}>
                                <HelpCircle size={32} /> Sıkça Sorulan Sorular (SSS)
                            </h2>
                            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '4rem' }}>
                                {[
                                    { q: "Düğün hediye listesi nedir?", a: "Düğün hediye listesi, evlenecek çiftin ihtiyaç duyduğu ürünleri dijital ortamda listeleyip davetlileriyle paylaştığı modern bir planlama aracıdır." },
                                    { q: "Düğün hediye listesi kullanmak ayıp mı?", a: "Hayır, ayıp değildir. Aksine, davetlilerin çoğunluğu rehberlik ister. Hediye listesi hem çiftin işini kolaylaştırır hem de davetlileri yanlış hediye alma endişesinden kurtarır." },
                                    { q: "Hediye listesine kaç ürün eklemeliyim?", a: "Davetli sayınızın en az yarısı kadar ürün eklemeniz önerilir. Farklı bütçe aralıklarını kapsayan dengeli bir dağılım yapın." },
                                    { q: "Hediye listesinde balayı katkısı olabilir mi?", a: "Evet. Fiziksel ürünlerin yanı sıra balayı fonu veya deneyim hediye çeki gibi seçenekler de eklenebilir." },
                                    { q: "Hediye listesi sadece düğün için mi kullanılır?", a: "Hayır. Nişan, bebek mevlidi, doğum günü, ev taşıma ve ofis etkinlikleri için de kullanılabilir." }
                                ].map((faq, i) => (
                                    <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
                                        <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>{faq.q}</h4>
                                        <p style={{ margin: 0, fontSize: '1rem', color: 'rgba(255,255,255,0.7)' }}>{faq.a}</p>
                                    </div>
                                ))}
                                <Link href="/sss" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>Tüm Soruları Gör →</Link>
                            </div>

                            <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '32px', marginBottom: '4rem' }}>
                                <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Sonuç: Akıllı Planlama, Mutlu Başlangıç</h2>
                                <p style={{ marginBottom: '1.5rem' }}>Düğün hediyesi almak da vermek de mutluluk verici bir deneyim olmalıdır. Online düğün hediye listesi sayesinde çiftler gerçek ihtiyaçlarını karşılar, davetliler doğru hediyeyi seçer ve herkes bu özel günden memnun ayrılır.</p>
                                <p style={{ marginBottom: '2.5rem' }}>Düğün planınıza akıllı bir adım ekleyin — hediye listenizi bugün oluşturun.</p>
                                <Link href="/yonetim/olustur" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>👉 HediyeEşleştir ile Hemen Başlayın</Link>
                            </div>

                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '3rem' }}>
                                <h3 style={{ marginBottom: '1.5rem' }}>İlginizi Çekebilir</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                    <Link href="/blog/hediye-eslestirme-uygulamasi-akilli-hediye-listesi-rehberi" style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', textDecoration: 'none', color: '#ffffff', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Akıllı Hediye Listesi Rehberi</h4>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>Okumaya Devam Et →</span>
                                    </Link>
                                    <Link href="/blog/bebek-hediyesi-ne-alinir-akilli-liste-rehberi-2026" style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', textDecoration: 'none', color: '#ffffff', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Bebek Hediyesi Rehberi 2026</h4>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>Okumaya Devam Et →</span>
                                    </Link>
                                    <Link href="/hakkimizda" style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', textDecoration: 'none', color: '#ffffff', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Hakkımızda</h4>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>Bizi Tanıyın →</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DugunHediyesiBlog;
