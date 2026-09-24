"use client";

import { motion } from "motion/react";
import { EASE_SILK } from "@/components/motion";

const letters = "Little Lulli".split("");

export function FooterWordmark() {
  return (
    <motion.p
      aria-hidden="true"
      className="font-display pointer-events-none mt-6 flex select-none justify-center overflow-hidden whitespace-nowrap px-2 text-[20.5vw] italic leading-[0.78] tracking-[-0.05em] text-linen/[0.92]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ staggerChildren: 0.045 }}
    >
      {letters.map((l, i) => (
        <motion.span
          key={i}
          className="inline-block pb-[0.12em]"
          variants={{
            hidden: { y: "95%" },
            show: { y: "22%", transition: { duration: 1.2, ease: EASE_SILK } },
          }}
        >
          {l === " " ? "\u00a0" : l}
        </motion.span>
      ))}
    </motion.p>
  );
}
