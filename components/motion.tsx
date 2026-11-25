"use client";

import {
  motion,
  transform,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import { useId, useRef } from "react";
import { cn } from "@/lib/utils";

export const EASE_SILK = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll-linked range mapping that always runs on the JS path.
 * motion's native ScrollTimeline acceleration resolves `target` before a parent
 * ref is attached and falls back to page progress, so we opt out of it here.
 */
export function useRange<T extends number | string>(
  value: MotionValue<number>,
  input: number[],
  output: T[],
) {
  const map = transform(input, output);
  return useTransform(value, (v) => map(v));
}

/* ------------------------------------------------------------------ */
/* RevealText — word-by-word masked rise                               */
/* ------------------------------------------------------------------ */

type Segment = string | { text: string; className?: string };

const revealTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
};

/*
 * Reveals animate a full `transform` string so motion hands them to WAAPI and they run
 * on the compositor (x/y/rotate shorthands are composed in JS on every frame). The
 * reduced-motion variant keeps identical values — so SSR markup matches — but snaps.
 */
const WORD_HIDDEN = "translateY(115%) rotate(5deg)";
const WORD_SHOWN = "translateY(0%) rotate(0deg)";

const wordVariants: Variants = {
  hidden: { transform: WORD_HIDDEN },
  show: { transform: WORD_SHOWN, transition: { duration: 1.05, ease: EASE_SILK } },
};

const wordVariantsReduced: Variants = {
  hidden: { transform: WORD_HIDDEN },
  show: { transform: WORD_SHOWN, transition: { duration: 0 } },
};

type Token = { kind: "word"; text: string; className?: string } | { kind: "br" };

function tokenize(segments: Segment[]): Token[] {
  const tokens: Token[] = [];
  for (const seg of segments) {
    const { text, className } = typeof seg === "string" ? { text: seg, className: undefined } : seg;
    text.split(/(\n)/).forEach((part) => {
      if (part === "\n") {
        tokens.push({ kind: "br" });
        return;
      }
      part
        .split(" ")
        .filter(Boolean)
        .forEach((word) => tokens.push({ kind: "word", text: word, className }));
    });
  }
  return tokens;
}

export function RevealText({
  as = "h2",
  id,
  segments,
  className,
  delay = 0,
  stagger = 0.06,
  play,
}: {
  as?: keyof typeof revealTags;
  id?: string;
  segments: Segment[];
  className?: string;
  delay?: number;
  stagger?: number;
  /** When provided, the reveal is controlled; otherwise it plays on scroll-in. */
  play?: boolean;
}) {
  const Tag = revealTags[as];
  const tokens = tokenize(segments);
  const controlled = play !== undefined;
  const reduce = useReducedMotion();

  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      animate={controlled ? (play ? "show" : "hidden") : undefined}
      whileInView={controlled ? undefined : "show"}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={reduce ? undefined : { staggerChildren: stagger, delayChildren: delay }}
    >
      {tokens.map((token, i) =>
        token.kind === "br" ? (
          <br key={i} />
        ) : (
          <span key={i}>
            <span className="-mb-[0.18em] -mr-[0.08em] inline-block overflow-hidden pb-[0.18em] pr-[0.08em] align-bottom">
              <motion.span
                className={cn("inline-block origin-bottom-left", token.className)}
                variants={reduce ? wordVariantsReduced : wordVariants}
              >
                {token.text}
              </motion.span>
            </span>{" "}
          </span>
        ),
      )}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* FadeIn                                                              */
/* ------------------------------------------------------------------ */

const fadeTags = {
  div: motion.div,
  li: motion.li,
  p: motion.p,
  span: motion.span,
};

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: keyof typeof fadeTags;
}) {
  const Comp = fadeTags[as];
  const reduce = useReducedMotion();
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, transform: `translateY(${y}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: 1,
        delay,
        ease: EASE_SILK,
        transform: reduce ? { duration: 0 } : { duration: 1, delay, ease: EASE_SILK },
      }}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic — element leans toward the cursor                           */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  return (
    <motion.div
      ref={ref}
      className={cn("inline-flex", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* StitchPath — a dashed "running stitch" that sews itself in           */
/* ------------------------------------------------------------------ */

export function StitchPath({
  d,
  viewBox,
  className,
  progress,
  color = "currentColor",
  strokeWidth = 2,
  dash = "7 7",
  march = true,
  delay = 0,
  duration = 2.2,
  play,
  preserveAspectRatio,
}: {
  d: string;
  viewBox: string;
  className?: string;
  /** Scroll-linked progress (0 → 1). If omitted, it draws in on view. */
  progress?: MotionValue<number>;
  color?: string;
  strokeWidth?: number;
  dash?: string;
  march?: boolean;
  delay?: number;
  duration?: number;
  play?: boolean;
  preserveAspectRatio?: string;
}) {
  const id = `stitch-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const controlled = play !== undefined;

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      className={className}
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden="true"
    >
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse">
          {progress ? (
            <motion.path
              d={d}
              stroke="white"
              strokeWidth={strokeWidth + 6}
              strokeLinecap="round"
              style={{ pathLength: progress }}
            />
          ) : (
            <motion.path
              d={d}
              stroke="white"
              strokeWidth={strokeWidth + 6}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={controlled ? { pathLength: play ? 1 : 0 } : undefined}
              whileInView={controlled ? undefined : { pathLength: 1 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration, delay, ease: [0.65, 0, 0.35, 1] }}
            />
          )}
        </mask>
      </defs>
      <path
        d={d}
        mask={`url(#${id})`}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dash}
        strokeLinecap="round"
        className={march ? "animate-march" : undefined}
      />
    </svg>
  );
}
