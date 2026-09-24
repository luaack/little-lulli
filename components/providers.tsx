"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

type IntroState = { done: boolean; finish: () => void };

const IntroContext = createContext<IntroState>({ done: true, finish: () => {} });

export function useIntro() {
  return useContext(IntroContext);
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => setDone(true), []);
  const intro = useMemo(() => ({ done, finish }), [done, finish]);

  return (
    <ReactLenis root options={{ lerp: 0.09, autoRaf: true }}>
      <MotionConfig reducedMotion="user">
        <IntroContext.Provider value={intro}>{children}</IntroContext.Provider>
      </MotionConfig>
    </ReactLenis>
  );
}
