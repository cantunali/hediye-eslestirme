import React from 'react';
import Signup from '../../src/components/Signup';

export const metadata = {
  title: 'HediyeEşleştir - Kayıt Ol',
  description: 'Ücretsiz hesabınızı oluşturun, etkinliklerinizi ve hediye listelerinizi yönetmeye başlayın.',
  alternates: {
    canonical: 'https://hediyeeslestir.com/signup',
  },
};

export default function Page() {
  return <Signup />;
}
