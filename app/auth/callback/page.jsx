import React from 'react';
import AuthCallback from '../../../src/components/AuthCallback';

export const metadata = {
  title: 'HediyeEşleştir - Giriş Doğrulanıyor',
  description: 'Google girişi doğrulanıyor, lütfen bekleyin.',
  alternates: {
    canonical: 'https://hediyeeslestir.com/auth/callback',
  },
};

export default function Page() {
  return <AuthCallback />;
}
