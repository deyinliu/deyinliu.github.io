import { useRouter } from 'next/navigation';
import { useRouteTransition } from '../contexts/RouteTransitionContext';

export function useRouteNavigate() {
  const router = useRouter();
  const { startTransition } = useRouteTransition();

  const navigate = (path: string) => {
    startTransition();
    router.push(path);
  };

  const replace = (path: string) => {
    startTransition();
    router.replace(path);
  };

  return {
    navigate,
    replace
  };
}
