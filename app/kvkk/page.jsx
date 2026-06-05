import React from 'react';
import KVKK from '../../src/components/KVKK';

export const metadata = {
  title: 'HediyeEşleştir - KVKK Aydınlatma Metni',
  description: '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca hazırlanan aydınlatma metni.',
  alternates: {
    canonical: 'https://hediyeeslestir.com/kvkk',
  },
};

export default function Page() {
  return <KVKK />;
}
