'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function CanonicalLinkManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Find the canonical link tag in the document
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    const absoluteUrl = `https://hediyeeslestir.com${pathname === '/' ? '' : pathname}`;

    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute('href', absoluteUrl);
  }, [pathname]);

  return null;
}
