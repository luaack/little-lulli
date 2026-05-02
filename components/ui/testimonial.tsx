"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  authorName: string;
  authorPosition: string;
  highlightedText?: string;
}

export const Testimonial = React.forwardRef<HTMLDivElement, TestimonialProps>(
  ({ 
    className, 
    quote,
    authorName,
    authorPosition,
    highlightedText,
    ...props 
  }, ref) => {
    const formattedQuote = highlightedText
      ? quote.replace(
          highlightedText,
          `<strong class="font-semibold text-primary">${highlightedText}</strong>`
        )
      : quote;

    return (
      <div
        ref={ref}
        className={cn("py-12 px-6 rounded-2xl bg-muted/50 border border-border/50 hover:border-primary/20 transition-colors", className)}
        {...props}
      >
        <div className="flex flex-col items-center text-center">
          <p 
            className="max-w-xl text-balance text-lg sm:text-xl text-foreground italic leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `"${formattedQuote}"` }}
          />
          <div className="mt-6">
            <h5 className="font-semibold text-foreground text-base">
              {authorName}
            </h5>
            <h5 className="mt-1 text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {authorPosition}
            </h5>
          </div>
        </div>
      </div>
    );
  }
);

Testimonial.displayName = "Testimonial";
