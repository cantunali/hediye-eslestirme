import React from 'react';
import Login from '../../src/components/Login';

export const metadata = {
  title: 'HediyeEşleştir - Giriş Yap',
  description: 'Hesabınıza erişerek etkinliklerinizi ve hediye listelerinizi yönetin.',
  alternates: {
    canonical: 'https://hediyeeslestir.com/login',
  },
};

export default function Page() {
  return <Login />;
}
