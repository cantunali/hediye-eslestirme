import React from 'react';
import Link from 'next/link';
import { blogPostsMeta } from '../../src/data/blogPostsMeta';

export const metadata = {
  title: 'Blog - HediyeEşleştir | Hediye Rehberi ve İpuçları',
  description: 'Hediye seçimi, etkinlik planlama ve hediye listesi oluşturma konularında en güncel ipuçları ve rehberler.',
  alternates: {
    canonical: 'https://hediyeeslestir.com/blog',
  },
  openGraph: {
    title: 'HediyeEşleştir Blog | Hediye Rehberleri',
    description: 'Hediyeleşme sanatına dair ipuçları, rehberler ve ilham verici içerikler.',
    url: 'https://hediyeeslestir.com/blog',
    type: 'website',
  },
};

export default function Page() {
  const sortedPosts = [...blogPostsMeta].sort((a, b) => b.dateIso.localeCompare(a.dateIso));

  return (
    <div className="animate-fade-in">
      <section className="section" style={{ textAlign: 'center', paddingBottom: '3rem' }}>
        <div className="container">
          <h1 className="hero-title gradient-text">Hediye Rehberi Blog</h1>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            En doğru hediyeyi seçmek ve sevdiklerinizi mutlu etmek için ihtiyacınız olan tüm rehberler burada.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {sortedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card animate-reveal"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: '0',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="blog-image"
                  />
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--primary)', color: 'white', padding: '0.4rem 1rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: '700' }}>
                    {post.category || 'Rehber'}
                  </div>
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', color: 'var(--on-surface-variant)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                      {post.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {post.readingTime || '5 dk'}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      {post.author}
                    </span>
                  </div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', lineHeight: '1.3', color: 'var(--on-surface)' }}>{post.title}</h3>
                  <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                    {post.excerpt}
                  </p>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '700', fontSize: '0.95rem' }}>
                    Yazıyı Oku
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
