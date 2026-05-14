import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold rounded-md transition-all disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow-md",
        secondary:
          "border-2 border-brand text-brand bg-transparent hover:bg-brand hover:text-white",
        ghost:
          "bg-white text-brand-dark hover:bg-neutral-50 shadow-sm",
        link: "text-accent hover:text-accent-hover underline-offset-4 hover:underline",
      },
      size: {
        md: "h-12 px-6 py-3 text-base",
        lg: "h-14 px-8 py-4 text-lg",
        sm: "h-10 px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
