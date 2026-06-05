import React from 'react';
import AboutUs from '../../src/components/AboutUs';

export const metadata = {
  title: 'HediyeEşleştir - Hakkımızda',
  description: 'HediyeEşleştir, özel günlerinizde hediye seçimini kolaylaştıran, sevdiklerinizle aranızdaki bağı güçlendiren bir platformdur.',
  alternates: {
    canonical: 'https://hediyeeslestir.com/hakkimizda',
  },
};

export default function Page() {
  return <AboutUs />;
}
