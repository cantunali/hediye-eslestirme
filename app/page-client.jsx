"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Gift, Users, ArrowRight, Star, Check, Shield, Globe, Coins, Sparkles, Clock } from 'lucide-react';
import AdBanner from '../src/components/AdBanner';
import { blogPostsMeta } from '../src/data/blogPostsMeta';

export default function Page() {
  const router = useRouter();

  const latestPosts = [...blogPostsMeta]
    .sort((a, b) => b.dateIso.localeCompare(a.dateIso))
    .slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="section hero-section" style={{ textAlign: 'center', paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="container">
          <h1 className="animate-reveal stagger-1" style={{ marginBottom: '1.5rem' }}>
            Sevdiklerinle <span className="gradient-text">Hayallerindeki Hediyeleri</span> <br />
            Buluştur
          </h1>
          <p className="animate-reveal stagger-2" style={{ fontSize: 'clamp(1.125rem, 3vw, 1.35rem)', color: 'var(--on-surface-variant)', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
            Düğün, doğum veya yeni ev hazırlığında... İhtiyaçlarını belirle, sevdiklerinle paylaş ve mükemmel eşleşmeyi sağla.
          </p>
          <div className="animate-reveal stagger-3" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <button
              className="btn btn-primary"
              style={{ flex: '1 1 240px', height: '4rem', fontSize: '1.1rem' }}
              onClick={() => router.push('/davetli-girisi')}
            >
              Davetli Girişi <Users size={22} />
            </button>
            <button
              className="btn btn-outline"
              style={{ flex: '1 1 240px', height: '4rem', fontSize: '1.1rem' }}
              onClick={() => router.push('/yonetim/olustur')}
            >
              Etkinlik Başlat <ArrowRight size={22} />
            </button>
          </div>

          <div className="animate-reveal stagger-4" style={{ marginTop: '3rem' }}>
            <Link
              href="/ozellikler"
              className="btn btn-outline"
              style={{
                width: 'auto',
                padding: '0.75rem 1.75rem',
                fontSize: '1rem',
                borderRadius: '50px',
                textDecoration: 'none',
                background: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              Özellikleri Keşfet <Star size={18} style={{ color: '#ffffff' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Nasıl Çalışır Section */}
      <section className="section" style={{ borderBottom: '1px solid var(--outline-variant)', background: 'rgba(255, 255, 255, 0.01)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>Nasıl Çalışır?</h2>
            <p style={{ color: 'var(--on-surface-variant)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              4 kolay adımda hayalinizdeki hediye listesini oluşturun ve sevdiklerinizle paylaşın.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>
            <div className="card" style={{ position: 'relative', padding: '3rem 2rem 2.5rem', height: '100%', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '3rem', height: '3rem', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: '800' }}>1</div>
              <h3 style={{ marginTop: '0.5rem', marginBottom: '1rem', fontSize: '1.25rem' }}>Etkinlik Başlat</h3>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Düğün, nişan, baby shower veya doğum günü için kolayca bir etkinlik oluşturun.
              </p>
            </div>

            <div className="card" style={{ position: 'relative', padding: '3rem 2rem 2.5rem', height: '100%', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '3rem', height: '3rem', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: '800' }}>2</div>
              <h3 style={{ marginTop: '0.5rem', marginBottom: '1rem', fontSize: '1.25rem' }}>Hediyeleri Ekleyin</h3>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Dilediğiniz online mağazadan (Amazon, Trendyol vb.) ürün görselini, linkini ve açıklamasını ekleyerek listenizi hazırlayın.
              </p>
            </div>

            <div className="card" style={{ position: 'relative', padding: '3rem 2rem 2.5rem', height: '100%', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '3rem', height: '3rem', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: '800' }}>3</div>
              <h3 style={{ marginTop: '0.5rem', marginBottom: '1rem', fontSize: '1.25rem' }}>Listenizi Paylaşın</h3>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Davetlilerinizin üye olmasına veya uygulama indirmesine gerek yok. Özel etkinlik linkini sevdiklerinizle paylaşmanız yeterli.
              </p>
            </div>

            <div className="card" style={{ position: 'relative', padding: '3rem 2rem 2.5rem', height: '100%', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '3rem', height: '3rem', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: '800' }}>4</div>
              <h3 style={{ marginTop: '0.5rem', marginBottom: '1rem', fontSize: '1.25rem' }}>Eşleşmeleri İzleyin</h3>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Davetliler almak istedikleri hediyeleri listeden seçip rezerve ederler. Böylece mükerrer veya gereksiz hediye riski sıfıra iner!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platformun Faydaları Section */}
      <section className="section" style={{ borderBottom: '1px solid var(--outline-variant)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>Neden HediyeEşleştir?</h2>
            <p style={{ color: 'var(--on-surface-variant)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Hediyeleşme sürecini hem sizin hem sevdikleriniz için sıfır stresli ve tamamen keyifli bir hale getiriyoruz.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ color: 'var(--primary)', flexShrink: 0 }}>
                <Coins size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>%100 Ücretsiz</h3>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Platformumuzu kullanmak, liste oluşturmak ve davetli eklemek tamamen ücretsizdir. Hiçbir gizli ücret veya komisyon yoktur.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ color: 'var(--primary)', flexShrink: 0 }}>
                <Globe size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>Tüm Sitelerle Uyumlu</h3>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Trendyol, Hepsiburada, Amazon, IKEA veya istediğiniz herhangi bir mağazadaki ürünün linkini ve görselini listenize ekleyebilirsiniz.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ color: 'var(--primary)', flexShrink: 0 }}>
                <Shield size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>Güvenli ve Gizli</h3>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Etkinliğinize sadece sizin şifrenizi paylaştığınız kişiler erişebilir. Kişisel verileriniz Supabase altyapısında güvenle saklanır.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ color: 'var(--primary)', flexShrink: 0 }}>
                <Sparkles size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>Uygulama İndirme Şartı Yok</h3>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Davetlileriniz üye olmak ya da uygulama indirmek zorunda değil. Paylaştığınız linke tıklayarak listenize anında erişirler.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ color: 'var(--primary)', flexShrink: 0 }}>
                <Check size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>Mükerrer Hediyeleri Önler</h3>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Alınan her hediye listede rezerve edildiği için aynı hediyenin birden fazla davetli tarafından alınması engellenir.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ color: 'var(--primary)', flexShrink: 0 }}>
                <Clock size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>Zaman Kazandırır</h3>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  "Ne alsam?" karmaşasına son verin. Davetliler neye ihtiyacınız olduğunu bilir ve saniyeler içinde karar verip satın alır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Son Blog Yazıları Section */}
      <section className="section" style={{ paddingBottom: '6rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Hediye Rehberi & İpuçları</h2>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '1.1rem', maxWidth: '600px', margin: '0' }}>
                Hediye seçimi, etkinlik planlama ve en trend hediye fikirleri için rehber yazılarımızı inceleyin.
              </p>
            </div>
            <Link href="/blog" className="btn btn-outline" style={{ textDecoration: 'none', height: 'fit-content', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Tüm Yazıları Gör <ArrowRight size={18} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: '0',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--primary)', color: 'white', padding: '0.4rem 1rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: '700' }}>
                    {post.category || 'Rehber'}
                  </div>
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.35rem', lineHeight: '1.3', color: '#ffffff' }}>{post.title}</h3>
                  <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.6', flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '700', fontSize: '0.95rem', marginTop: 'auto' }}>
                    Yazıyı Oku <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Section */}
      <div className="container">
        <AdBanner slot="homepage_bottom" />
      </div>
    </div>
  );
}
