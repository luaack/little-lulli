"use client";

import Lenis from "lenis";
import { useSyncExternalStore } from "react";

/*
 * Lenis only smooths wheel/trackpad input. On touch screens it adds nothing, and
 * it toggles classes on <html> at the start and end of every fling, which forces
 * a full-document style recalculation — the "sticky" feel on phones. So it only
 * runs on devices with a fine pointer; everything else keeps native scrolling.
 */

let instance: Lenis | null = null;
let locked = false;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

export function startSmoothScroll() {
  if (instance || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  instance = new Lenis({ lerp: 0.09, autoRaf: true });
  if (locked) instance.stop();
  notify();
}

export function stopSmoothScroll() {
  instance?.destroy();
  instance = null;
  notify();
}

export function useSmoothScroll() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => instance,
    () => null,
  );
}

/** Freeze page scrolling (intro curtain, mobile menu) with or without Lenis. */
export function setScrollLocked(value: boolean) {
  locked = value;
  if (value) instance?.stop();
  else instance?.start();
  document.documentElement.style.overflow = value ? "hidden" : "";
}
