"use client";

import { useLenis } from "lenis/react";
import type { ComponentProps } from "react";

/** In-page anchor that glides with Lenis (and still works without JS). */
export function ScrollLink({
  href,
  onClick,
  ...props
}: ComponentProps<"a"> & { href: `#${string}` }) {
  const lenis = useLenis();

  return (
    <a
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        event.preventDefault();
        const target = href === "#" ? null : document.querySelector<HTMLElement>(href);
        if (lenis) {
          lenis.start();
          lenis.scrollTo(target ?? 0, { duration: 1.6, force: true });
        } else if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        window.history.replaceState(null, "", href === "#" ? window.location.pathname : href);
      }}
    />
  );
}
