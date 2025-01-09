"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/login') {
      const loader = document.getElementById('global-loading');
      if (loader) {
        loader.remove();
      }
      setMounted(true);
      return;
    }

    setMounted(true);
    const loader = document.getElementById('global-loading');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 300);
    }
  }, [pathname]);

  if (!mounted) return null;

  return children;
}
