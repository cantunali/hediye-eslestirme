import React from 'react';
import Consent from '../../src/components/Consent';

export const metadata = {
  title: 'HediyeEşleştir - Kullanıcı Onayı',
  description: 'Devam etmek için gerekli kullanıcı onaylarını verin.',
  alternates: {
    canonical: 'https://hediyeeslestir.com/consent',
  },
};

export default function Page() {
  return <Consent />;
}
