import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // setIsTransitioning(true);
    // 等待下一个 tick，确保页面内容已经更新
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 30);

    return () => clearTimeout(timer);
  }, [pathname]);

  return isTransitioning;
}
