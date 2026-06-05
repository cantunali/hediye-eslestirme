"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Features from '../../src/components/Features';

export default function FeaturesClient() {
  const router = useRouter();
  return <Features onStart={() => router.push('/yonetim/olustur')} />;
}
