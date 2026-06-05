import React from 'react';
import GuestPortal from '../../src/components/GuestPortal';

export const metadata = {
  title: 'HediyeEşleştir - Davetli Girişi',
  description: 'HediyeEşleştir davetli paneline giriş yapın ve sevdiklerinizin hediye listesine ulaşın.',
  robots: 'noindex, nofollow',
  alternates: {
    canonical: 'https://hediyeeslestir.com/davetli-girisi',
  },
};

export default function Page() {
  return <GuestPortal />;
}
