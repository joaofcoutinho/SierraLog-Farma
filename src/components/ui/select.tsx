import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "h-12 w-full appearance-none rounded-md border border-neutral-200 bg-white px-4 pr-10 text-base text-brand-dark focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-50",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
        />
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
