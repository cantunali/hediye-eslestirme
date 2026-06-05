import React from 'react';
import Contact from '../../src/components/Contact';

export const metadata = {
  title: 'HediyeEşleştir - İletişim',
  description: 'Sorularınız, görüşleriniz veya işbirlikleri için bize ulaşın. HediyeEşleştir ekibi size yardımcı olmaktan mutluluk duyar.',
  alternates: {
    canonical: 'https://hediyeeslestir.com/iletisim',
  },
};

export default function Page() {
  return <Contact />;
}
