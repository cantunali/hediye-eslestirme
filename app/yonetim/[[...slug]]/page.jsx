import React from 'react';
import YonetimClient from '../../../src/components/YonetimClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const path = slug && slug.length > 0 ? `/yonetim/${slug.join('/')}` : '/yonetim';
  return {
    title: 'HediyeEşleştir - Etkinlik Yönetimi',
    description: 'Hediye listenizi ve davetlilerinizi yönetin.',
    robots: 'noindex, nofollow',
    alternates: {
      canonical: `https://hediyeeslestir.com${path}`,
    },
  };
}

export async function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ['olustur'] },
    { slug: ['dashboard'] }
  ];
}

export default function Page() {
  return <YonetimClient />;
}
