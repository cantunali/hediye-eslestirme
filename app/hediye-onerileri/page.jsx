import React from 'react';
import FeaturedGifts from '../../src/components/FeaturedGifts';

export const metadata = {
  title: 'HediyeEşleştir - Hediye Önerileri',
  description: 'Özenle seçilmiş hediye önerileri. Sevdikleriniz için en güzel hediye fikirleri.',
  alternates: {
    canonical: 'https://hediyeeslestir.com/hediye-onerileri',
  },
};

export default function Page() {
  return (
    <div className="section container">
      <FeaturedGifts />
    </div>
  );
}
