import React from 'react';
import Script from 'next/script';
import '../src/index.css';
import { AuthProvider } from '../src/context/AuthContext';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import CookieConsent from '../src/components/CookieConsent';
import CanonicalLinkManager from '../src/components/CanonicalLinkManager';

export const metadata = {
  title: 'HediyeEşleştir | Hediye Eşleştirme ve Liste Yönetimi',
  description: 'HediyeEşleştir ile etkinlik oluştur, hediye listeni paylaş, davetlilerinle kolayca eşleş. Düğün, doğum günü ve özel günler için pratik hediye çözümü.',
  metadataBase: new URL('https://hediyeeslestir.com'),
  verification: {
    google: 'DeopyxvmBqwnpNBw1GjaW8k6xwM2J9YWJBDK4teigEA',
  },
  openGraph: {
    type: 'website',
    siteName: 'HediyeEşleştir',
    title: 'HediyeEşleştir | Hediye Eşleştirme ve Liste Yönetimi',
    description: 'Etkinlik oluştur, liste paylaş, davetlilerle kolayca hediye eşleştir.',
    url: 'https://hediyeeslestir.com/',
    images: [
      {
        url: '/og.jpg?v=2',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        {/* Google AdSense */}
        <Script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7740189048271049"
          crossorigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Analytics (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-E8ZDR4MXM8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E8ZDR4MXM8');
          `}
        </Script>
        <link rel="icon" type="image/jpeg" href="/favicon.jpg" />
      </head>
      <body>
        <AuthProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CanonicalLinkManager />
            <Navbar />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
            <CookieConsent />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
