"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { useIntro } from "@/components/providers";
import { BOW_VIEWBOX, bowPaths } from "@/components/decor";
import { EASE_SILK } from "@/components/motion";
import { setScrollLocked } from "@/lib/smooth-scroll";

/** Total intro length, measured from navigation start (not hydration). */
const INTRO_MS = 4000;

const drawn = [
  { d: bowPaths.loopLeft, fill: "#D49A9C" },
  { d: bowPaths.loopRight, fill: "#D49A9C" },
  { d: bowPaths.tailLeft, fill: "#B4636C" },
  { d: bowPaths.tailRight, fill: "#B4636C" },
  { d: bowPaths.knot, fill: "#9E4D58" },
];
const letters = "Little Lulli".split("");

export function IntroCurtain() {
  const { done, finish } = useIntro();

  useEffect(() => {
    const skip =
      document.documentElement.dataset.intro === "skip" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The drawing runs in CSS from first paint, so time the exit from navigation start.
    const remaining = skip ? 0 : Math.max(0, INTRO_MS - performance.now());
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem("lulli-intro", "1");
      } catch {}
      finish();
    }, remaining);
    return () => window.clearTimeout(timer);
  }, [finish]);

  useEffect(() => {
    setScrollLocked(!done);
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="curtain"
          data-intro-curtain
          aria-hidden="true"
          className="linen fixed inset-0 z-[150] grid touch-none place-items-center"
          initial={{ clipPath: "ellipse(160% 125% at 50% 0%)" }}
          exit={{ clipPath: "ellipse(160% 0% at 50% 0%)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="flex flex-col items-center"
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE_SILK }}
          >
            <div className="intro-wiggle">
              <svg viewBox={BOW_VIEWBOX} className="w-28 overflow-visible md:w-36" fill="none">
                {drawn.map(({ d, fill }, i) => (
                  <path
                    key={d}
                    d={d}
                    pathLength={1}
                    fill={fill}
                    stroke="#3A2622"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="intro-draw"
                    style={{ animationDelay: `${0.15 + i * 0.14}s, 2s` }}
                  />
                ))}
              </svg>
            </div>

            <p className="font-display mt-6 flex overflow-hidden text-4xl italic text-cocoa md:text-5xl">
              {letters.map((l, i) => (
                <span
                  key={i}
                  className="intro-rise inline-block"
                  style={{ animationDelay: `${0.9 + i * 0.05}s` }}
                >
                  {l === " " ? "\u00a0" : l}
                </span>
              ))}
            </p>

            <p className="intro-fade mt-3 text-[11px] uppercase tracking-[0.35em] text-cocoa-soft">
              Ateliê de laços bordados à mão
            </p>

            <span className="intro-line mt-8 block h-[1.5px] w-44 rounded-full bg-rose-deep" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
