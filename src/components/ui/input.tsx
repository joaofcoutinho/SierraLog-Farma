import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "h-12 w-full rounded-md border border-neutral-200 bg-white px-4 text-base text-brand-dark placeholder:text-neutral-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
