"use client";

import { MotionConfig } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { startSmoothScroll, stopSmoothScroll } from "@/lib/smooth-scroll";

type IntroState = { done: boolean; finish: () => void };

const IntroContext = createContext<IntroState>({ done: true, finish: () => {} });

export function useIntro() {
  return useContext(IntroContext);
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => setDone(true), []);
  const intro = useMemo(() => ({ done, finish }), [done, finish]);

  useEffect(() => {
    startSmoothScroll();
    return stopSmoothScroll;
  }, []);

  // Pause decorative CSS loops in sections that are off screen (see globals.css).
  useEffect(() => {
    const sections = document.querySelectorAll("main > section, main > div, footer");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.toggleAttribute("data-offscreen", !entry.isIntersecting);
      },
      { rootMargin: "150px 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={intro}>{children}</IntroContext.Provider>
    </MotionConfig>
  );
}
