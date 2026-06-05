import React from 'react';
import ForgotPassword from '../../src/components/ForgotPassword';

export const metadata = {
  title: 'HediyeEşleştir - Şifremi Unuttum',
  description: 'Şifrenizi sıfırlamak için e-posta adresinizi girin.',
  alternates: {
    canonical: 'https://hediyeeslestir.com/forgot-password',
  },
};

export default function Page() {
  return <ForgotPassword />;
}
