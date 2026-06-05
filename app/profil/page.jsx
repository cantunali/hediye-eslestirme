import React from 'react';
import Profile from '../../src/components/Profile';

export const metadata = {
  title: 'HediyeEşleştir - Profil Ayarları',
  description: 'Kişisel bilgilerinizi ve hesap güvenliğinizi yönetin.',
  robots: 'noindex, nofollow',
  alternates: {
    canonical: 'https://hediyeeslestir.com/profil',
  },
};

export default function Page() {
  return <Profile />;
}
