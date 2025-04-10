import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper function directly in this file to avoid import issues
function cn(...inputs: (string | boolean | undefined | null | { [key: string]: any })[]) {
  return twMerge(clsx(inputs));
}

// Define button style variants
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed select-none",
  {
    variants: {
      variant: {
        primary: "bg-accent-primary hover:bg-accent-hover text-white shadow-sm",
        secondary: "bg-background-secondary hover:bg-background-tertiary text-foreground-primary border border-border-primary",
        ghost: "bg-transparent hover:bg-background-secondary text-foreground-secondary hover:text-foreground-primary",
        destructive: "bg-destructive hover:bg-destructive/90 text-white",
        outline: "border border-border-primary bg-transparent hover:bg-background-secondary text-foreground-secondary hover:text-foreground-primary",
        link: "text-accent-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md font-medium",
        md: "h-10 px-4 text-sm rounded-md font-medium",
        lg: "h-12 px-6 text-base rounded-md font-semibold",
        icon: "h-10 w-10 p-0 rounded-full",
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
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, leftIcon, rightIcon, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 animate-spin">↻</span>
        )}
        {leftIcon && <span className="mr-2 flex-shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2 flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
