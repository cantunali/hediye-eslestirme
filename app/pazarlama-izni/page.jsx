import React from 'react';
import MarketingConsent from '../../src/components/MarketingConsent';

export const metadata = {
  title: 'HediyeEşleştir - Pazarlama İzni Metni',
  description: 'Ticari elektronik ileti gönderimi ve pazarlama faaliyetleri hakkında aydınlatma ve rıza metni.',
  alternates: {
    canonical: 'https://hediyeeslestir.com/pazarlama-izni',
  },
};

export default function Page() {
  return <MarketingConsent />;
}
