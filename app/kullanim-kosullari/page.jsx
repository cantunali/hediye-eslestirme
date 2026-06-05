import React from 'react';
import TermsOfService from '../../src/components/TermsOfService';

export const metadata = {
  title: 'HediyeEşleştir - Kullanım Koşulları',
  description: 'HediyeEşleştir platformu kullanıcı sözleşmesi, kullanıcı hakları ve sorumlulukları.',
  alternates: {
    canonical: 'https://hediyeeslestir.com/kullanim-kosullari',
  },
};

export default function Page() {
  return <TermsOfService />;
}
