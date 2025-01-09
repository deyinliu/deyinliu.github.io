"use client";
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '../utils/auth';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      const loader = document.getElementById('global-loading');
      if (loader) {
        loader.remove();
      }
      router.replace('/login');
    }
  }, [pathname, router]);

  if (!auth.isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
}
