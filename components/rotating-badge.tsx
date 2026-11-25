"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const VIEWBOX = 200;
const RADIUS = 78;

/**
 * Paints the ring text once onto a canvas using the page's own font and colour.
 * SVG <textPath> inside an animated element gets re-laid out on every frame in
 * Chrome while the page scrolls, which was the main source of mobile jank.
 */
function paintRing(canvas: HTMLCanvasElement, text: string, fontSize: number) {
  const size = canvas.clientWidth;
  if (!size) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  canvas.width = canvas.height = Math.round(size * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const style = getComputedStyle(canvas);
  const scale = (size * dpr) / VIEWBOX;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, VIEWBOX, VIEWBOX);
  ctx.fillStyle = style.color;
  ctx.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  // Spread the glyphs evenly around the full circle, starting at 9 o'clock, clockwise.
  const chars = Array.from(text.toUpperCase());
  const widths = chars.map((ch) => ctx.measureText(ch).width);
  const circumference = 2 * Math.PI * RADIUS;
  const gap = (circumference - widths.reduce((a, b) => a + b, 0)) / chars.length;
  let travelled = 0;
  chars.forEach((ch, i) => {
    const angle = Math.PI + (travelled + widths[i] / 2) / RADIUS;
    travelled += widths[i] + gap;
    ctx.save();
    ctx.translate(VIEWBOX / 2 + RADIUS * Math.cos(angle), VIEWBOX / 2 + RADIUS * Math.sin(angle));
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillText(ch, 0, 0);
    ctx.restore();
  });
}

export function RotatingBadge({
  text = "bordado à mão ✿ feito com amor ✿ little lulli ✿ ",
  fontSize = 15,
  className,
  children,
}: {
  text?: string;
  /** Font size in the badge's 200-unit coordinate space. */
  fontSize?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const paint = () => paintRing(canvas, text, fontSize);
    paint();
    document.fonts?.ready.then(paint).catch(() => {});
    const observer = new ResizeObserver(paint);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [text, fontSize]);

  return (
    <div className={cn("relative grid place-items-center", className)}>
      {/* Spin an HTML wrapper so the rotation stays on the compositor. */}
      <div className="absolute inset-0 animate-spin-slow" aria-hidden="true">
        <canvas ref={canvasRef} className="size-full font-medium" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
