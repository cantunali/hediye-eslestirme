import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      padding: '4rem 0 2rem',
      marginTop: 'auto',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(10px)'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '3rem',
        marginBottom: '3rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
          >
            <h3 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em', margin: 0 }}>HediyeEşleştir</h3>
          </Link>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Sevdiklerinizle en doğru hediyeleri buluşturmanın en akıllı yolu. Etkinlik oluşturun, listenizi paylaşın ve mükemmel eşleşmeyi sağlayın.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                border: '1px solid rgba(255, 255, 255, 0.2)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'var(--transition)'
              }}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '700' }}>Hızlı Menü</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { t: 'Hakkımızda', p: '/hakkimizda' },
              { t: 'Özellikler', p: '/ozellikler' },
              { t: 'Sıkça Sorulan Sorular', p: '/sss' },
              { t: 'İletişim', p: '/iletisim' }
            ].map((link, i) => (
              <Link key={i} href={link.p} style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.95rem', transition: 'var(--transition)' }}>{link.t}</Link>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '700' }}>Hediye Rehberleri</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { t: 'Bebek Hediyesi Rehberi', p: '/blog/bebek-hediyesi-ne-alinir-akilli-liste-rehberi-2026' },
              { t: 'Akıllı Hediye Listesi', p: '/blog/hediye-eslestirme-uygulamasi-akilli-hediye-listesi-rehberi' },
              { t: 'Düğün Hediyesi Sistemi', p: '/blog/dugun-hediyesi-karmasasina-son-akilli-liste-sistemi' },
              { t: 'Tüm Blog Yazıları', p: '/blog' }
            ].map((link, i) => (
              <Link key={i} href={link.p} style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.95rem', transition: 'var(--transition)' }}>{link.t}</Link>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '700' }}>Yasal</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { t: 'Kullanım Şartları', p: '/kullanim-kosullari' },
              { t: 'Gizlilik Politikası', p: '/gizlilik-politikasi' },
              { t: 'KVKK Metni', p: '/kvkk' },
              { t: 'Pazarlama İzni', p: '/pazarlama-izni' }
            ].map((link, i) => (
              <Link key={i} href={link.p} style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.95rem', transition: 'var(--transition)' }}>{link.t}</Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center'
      }}>
        <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem' }}>
          &copy; 2026 HediyeEşleştir. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
