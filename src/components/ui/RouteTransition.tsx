"use client";

import { usePathname } from "next/navigation";

/**
 * Route entrance. Keying on the pathname remounts the subtree on navigation,
 * which restarts the CSS animation. There is no exit animation on purpose:
 * delaying a navigation to play one out makes a site feel slower, not more
 * polished. Reduced motion collapses the duration to nothing.
 */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="route-in">
      {children}
    </div>
  );
}
