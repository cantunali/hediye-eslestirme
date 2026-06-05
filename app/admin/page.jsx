import React from 'react';
import AdminDashboard from '../../src/components/AdminDashboard';

export const metadata = {
  title: 'HediyeEşleştir - Sistem Admin Paneli',
  description: 'Sistem yönetimi paneli.',
  robots: 'noindex, nofollow',
  alternates: {
    canonical: 'https://hediyeeslestir.com/admin',
  },
};

export default function Page() {
  return <AdminDashboard />;
}
