import React from 'react';
import PrivacyPolicy from '../../src/components/PrivacyPolicy';

export const metadata = {
  title: 'HediyeEşleştir - Gizlilik Politikası',
  description: 'HediyeEşleştir gizlilik politikası ve veri güvenliği hakkında bilgiler.',
  alternates: {
    canonical: 'https://hediyeeslestir.com/gizlilik-politikasi',
  },
};

export default function Page() {
  return <PrivacyPolicy />;
}
