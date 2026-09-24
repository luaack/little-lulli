import { useId } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Bow                                                                  */
/* ------------------------------------------------------------------ */

export const BOW_VIEWBOX = "0 0 120 90";

export const bowPaths = {
  loopLeft:
    "M58 40 C 50 30, 38 16, 22 13 C 9 11, 3 22, 5 36 C 7 50, 13 60, 27 59 C 40 58, 52 48, 58 40 Z",
  loopRight:
    "M62 40 C 70 30, 82 16, 98 13 C 111 11, 117 22, 115 36 C 113 50, 107 60, 93 59 C 80 58, 68 48, 62 40 Z",
  foldLeft: "M56 40 C 44 38, 28 41, 12 49",
  foldRight: "M64 40 C 76 38, 92 41, 108 49",
  stitchLeft: "M47 30 C 38 22, 28 18, 20 18 C 12 19, 9 28, 10 38 C 11 46, 14 52, 21 54",
  stitchRight:
    "M73 30 C 82 22, 92 18, 100 18 C 108 19, 111 28, 110 38 C 109 46, 106 52, 99 54",
  tailLeft: "M55 46 C 52 58, 46 70, 38 82 L 47 79 L 51 88 C 57 75, 61 60, 61 48 Z",
  tailRight: "M65 46 C 68 58, 74 70, 82 82 L 73 79 L 69 88 C 63 75, 59 60, 59 48 Z",
  knot: "M59 29 h2 a8 8 0 0 1 8 8 v6 a8 8 0 0 1 -8 8 h-2 a8 8 0 0 1 -8 -8 v-6 a8 8 0 0 1 8 -8 Z",
  knotFold: "M54 35 C 58 33, 62 33, 66 35",
};

const bowTones = {
  rose: { fill: "#D49A9C", dark: "#B4636C" },
  mint: { fill: "#8ECFC1", dark: "#4F9E8E" },
  blush: { fill: "#F2D6D3", dark: "#D49A9C" },
  gold: { fill: "#E6C07F", dark: "#C08A3E" },
  cocoa: { fill: "#6E5550", dark: "#3A2622" },
} as const;

export type BowTone = keyof typeof bowTones;

export function BowMark({
  tone = "rose",
  className,
  title,
}: {
  tone?: BowTone;
  className?: string;
  title?: string;
}) {
  const { fill, dark } = bowTones[tone];
  return (
    <svg
      viewBox={BOW_VIEWBOX}
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path d={bowPaths.loopLeft} fill={fill} />
      <path d={bowPaths.loopRight} fill={fill} />
      <path d={bowPaths.foldLeft} stroke={dark} strokeOpacity=".35" strokeWidth="1.4" strokeLinecap="round" />
      <path d={bowPaths.foldRight} stroke={dark} strokeOpacity=".35" strokeWidth="1.4" strokeLinecap="round" />
      <path d={bowPaths.stitchLeft} stroke="#FFFDF9" strokeOpacity=".85" strokeWidth="1.4" strokeDasharray="2.5 3" strokeLinecap="round" />
      <path d={bowPaths.stitchRight} stroke="#FFFDF9" strokeOpacity=".85" strokeWidth="1.4" strokeDasharray="2.5 3" strokeLinecap="round" />
      <path d={bowPaths.tailLeft} fill={dark} fillOpacity=".88" />
      <path d={bowPaths.tailRight} fill={dark} fillOpacity=".88" />
      <path d={bowPaths.knot} fill={dark} />
      <path d={bowPaths.knotFold} stroke={fill} strokeOpacity=".6" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Embroidered daisy (lazy-daisy petals + french-knot centre)          */
/* ------------------------------------------------------------------ */

const PETALS = Array.from({ length: 11 }, (_, i) => (i * 360) / 11);
const KNOTS: [number, number][] = [
  [0, 0], [5, 2], [-4, 4], [-5, -3], [3, -5], [6, -3], [-1, 6.5],
  [-7, 1], [1, -8], [4.5, 6], [-4.5, -7.2], [7.5, 2.5], [-7, 5.5],
];

export function Daisy({
  className,
  petal = "#FFFDF9",
  center = "#DDA955",
}: {
  className?: string;
  petal?: string;
  center?: string;
}) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true">
      {PETALS.map((angle) => (
        <g key={angle} transform={`rotate(${angle.toFixed(2)})`}>
          <path
            d="M0 -9 C 7 -17, 7.5 -36, 0 -43 C -7.5 -36, -7 -17, 0 -9 Z"
            fill={petal}
            stroke="#E6D8C6"
            strokeWidth="1.1"
          />
          <path
            d="M0 -14 L0 -37"
            stroke="#E3D5C3"
            strokeWidth="1.1"
            strokeDasharray="2.4 2.4"
            strokeLinecap="round"
          />
        </g>
      ))}
      <circle r="12" fill={center} />
      {KNOTS.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="2.3" fill="#C8892F" />
          <circle cx={x - 0.7} cy={y - 0.7} r="0.9" fill="#F0C987" />
        </g>
      ))}
    </svg>
  );
}

/* Tiny rosette made of french knots — used as scattered decoration. */
export function Rosette({
  className,
  color = "#8ECFC1",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="-12 -12 24 24" className={className} aria-hidden="true">
      {[0, 72, 144, 216, 288].map((a) => (
        <circle
          key={a}
          cx={Math.cos((a * Math.PI) / 180) * 5.5}
          cy={Math.sin((a * Math.PI) / 180) * 5.5}
          r="4.2"
          fill={color}
        />
      ))}
      <circle r="3.4" fill="#FFFDF9" opacity=".85" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Needle & thread                                                     */
/* ------------------------------------------------------------------ */

export function NeedleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.5 3.5 6 18l-2 2.5 2.5-2L21 4" />
      <ellipse cx="18.6" cy="5.4" rx="1.9" ry=".75" transform="rotate(-45 18.6 5.4)" />
      <path d="M18.4 5.6c3.8 4.5-3 9.2-7.4 6.8-3.6-2-7 .3-7.6 3" strokeDasharray="2 2.4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Rotating circular badge                                             */
/* ------------------------------------------------------------------ */

export function RotatingBadge({
  text = "bordado à mão ✿ feito com amor ✿ little lulli ✿ ",
  className,
  textClassName,
  children,
}: {
  text?: string;
  className?: string;
  textClassName?: string;
  children?: React.ReactNode;
}) {
  const id = `badge-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <div className={cn("relative grid place-items-center", className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text
          className={cn("fill-current text-[15px] font-medium uppercase tracking-[0.28em]", textClassName)}
        >
          <textPath href={`#${id}`} textLength="486" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}
