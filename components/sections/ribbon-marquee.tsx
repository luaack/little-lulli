"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { Fragment, useRef } from "react";
import { cn } from "@/lib/utils";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const COPIES = 4;

function Ribbon({
  items,
  baseVelocity,
  className,
  itemClassName,
}: {
  items: string[];
  baseVelocity: number;
  className?: string;
  itemClassName?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    moveBy += direction.current * moveBy * Math.abs(f);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={cn("stitch-edge flex overflow-hidden whitespace-nowrap py-4 md:py-5", className)}>
      <motion.div className="flex shrink-0" style={{ x }}>
        {Array.from({ length: COPIES }, (_, copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0}>
            {items.map((item) => (
              <Fragment key={item}>
                <span className={cn("font-display px-6 text-2xl italic md:px-9 md:text-4xl", itemClassName)}>
                  {item}
                </span>
                <svg viewBox="-12 -12 24 24" className="size-5 shrink-0 md:size-6" aria-hidden="true">
                  {[0, 72, 144, 216, 288].map((a) => (
                    <ellipse
                      key={a}
                      cx="0"
                      cy="-6"
                      rx="3.4"
                      ry="5.6"
                      transform={`rotate(${a})`}
                      fill="currentColor"
                      opacity=".85"
                    />
                  ))}
                  <circle r="2.6" fill="#DDA955" />
                </svg>
              </Fragment>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function RibbonMarquee() {
  return (
    <section aria-label="Nossos diferenciais" className="relative z-10 -my-6 overflow-hidden py-16 md:-my-4 md:py-24">
      <div className="-rotate-[4deg] scale-[1.08]">
        <Ribbon
          baseVelocity={-2.2}
          className="bg-mint/70 text-mint-deep"
          itemClassName="text-cocoa/80"
          items={["Leves e delicados", "Acabamento impecável", "Embalados com carinho", "Pensados para encantar"]}
        />
      </div>
      <div className="-mt-12 rotate-[3deg] scale-[1.08] md:-mt-16">
        <Ribbon
          baseVelocity={2.6}
          className="bg-rose-deep text-linen shadow-[0_24px_50px_-30px_rgba(58,38,34,0.7)]"
          itemClassName="text-linen"
          items={["Bordado à mão", "Peças únicas", "Feito com amor", "Ponto a ponto"]}
        />
      </div>
    </section>
  );
}
