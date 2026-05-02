"use client";

import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import React, { useRef } from "react";

export const VelocityText = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const scrollVelocity = useVelocity(scrollYProgress);

  const skewXRaw = useTransform(
    scrollVelocity,
    [-0.5, 0.5],
    ["45deg", "-45deg"]
  );
  const skewX = useSpring(skewXRaw, { mass: 3, stiffness: 400, damping: 50 });

  const x = useTransform(scrollYProgress, [0, 0.85], ["0%", "-100%"]);

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 0.95], [0, 1, 1, 0]);

  return (
    <section
      ref={targetRef}
      className="relative z-10 h-[400vh] bg-background text-foreground no-scrollbar pt-[7vh]"
    >
      <div className="sticky top-1/2 -translate-y-1/2 flex h-[30vh] items-center overflow-hidden">
        <motion.p
          style={{ skewX, x, opacity }}
          className="relative left-1/2 origin-bottom-left whitespace-nowrap text-5xl font-black uppercase leading-[0.85] md:text-7xl md:leading-[0.85]"
        >
          No atêlie Little Lulli, os laços são feitos por mãos de quem entende que cada nascimento é único.
        </motion.p>
      </div>
    </section>
  );
};
