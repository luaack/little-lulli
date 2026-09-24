"use client";

import { useCallback, useSyncExternalStore } from "react";

/** SSR-safe media query subscription (always `false` on the server). */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
export const useFinePointer = () =>
  useMediaQuery("(hover: hover) and (pointer: fine)");
