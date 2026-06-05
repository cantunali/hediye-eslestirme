import React from 'react';
import FeaturesClient from './FeaturesClient';

export const metadata = {
  title: 'HediyeEşleştir - Nasıl Çalışır? Özellikler',
  description: 'Hediye listesi oluşturma ve davetli yönetimi nasıl çalışır? HediyeEşleştir kullanım rehberi.',
  alternates: {
    canonical: 'https://hediyeeslestir.com/ozellikler',
  },
};

export default function Page() {
  return (
    <div className="section container">
      <FeaturesClient />
    </div>
  );
}
