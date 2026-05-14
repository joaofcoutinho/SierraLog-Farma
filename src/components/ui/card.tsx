import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-display text-xl font-semibold text-brand-dark", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-2 text-base leading-relaxed text-neutral-600", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export { Card, CardTitle, CardDescription };
