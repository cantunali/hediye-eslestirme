import React from 'react';
import ResetPassword from '../../src/components/ResetPassword';

export const metadata = {
  title: 'HediyeEşleştir - Şifre Sıfırlama',
  description: 'Hesabınız için yeni bir şifre belirleyin.',
  alternates: {
    canonical: 'https://hediyeeslestir.com/reset-password',
  },
};

export default function Page() {
  return <ResetPassword />;
}
