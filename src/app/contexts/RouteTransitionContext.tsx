
"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface RouteTransitionContextType {
  isTransitioning: boolean;
  startTransition: () => void;
}

const RouteTransitionContext = createContext<RouteTransitionContextType>({
  isTransitioning: false,
  startTransition: () => { },
});

export function RouteTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  const startTransition = () => {
    setIsTransitioning(true);
  };

  return (
    <RouteTransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </RouteTransitionContext.Provider>
  );
}

export const useRouteTransition = () => useContext(RouteTransitionContext);