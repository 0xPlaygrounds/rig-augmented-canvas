import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper function
function cn(...inputs: (string | boolean | undefined | null | { [key: string]: any })[]) {
  return twMerge(clsx(inputs));
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card background type */
  variant?: 'default' | 'secondary' | 'ghost';
  /** Card border style */
  border?: boolean;
  /** Card hover effect */
  hover?: boolean;
  /** Card padding */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Card is selected */
  isSelected?: boolean;
  /** Card shadow */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Card is interactive */
  interactive?: boolean;
}

/**
 * Card component for displaying content in a contained box
 */
export const Card: React.FC<CardProps> = ({
  className,
  variant = 'default',
  border = true,
  hover = false,
  padding = 'md',
  isSelected = false,
  shadow = 'none',
  interactive = false,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-lg transition-all duration-150',
        // Background variants
        variant === 'default' && 'bg-background-secondary',
        variant === 'secondary' && 'bg-background-tertiary',
        variant === 'ghost' && 'bg-transparent',
        // Border
        border && 'border',
        border && isSelected ? 'border-accent-primary' : 'border-border-primary',
        // Shadows
        shadow === 'sm' && 'shadow-sm',
        shadow === 'md' && 'shadow-md',
        shadow === 'lg' && 'shadow-lg',
        shadow === 'xl' && 'shadow-xl',
        // Interactive states
        interactive && 'cursor-pointer',
        // Hover effects
        hover && interactive && variant === 'default' && 'hover:bg-background-tertiary hover:border-border-secondary',
        hover && interactive && variant === 'secondary' && 'hover:bg-background-secondary',
        hover && interactive && variant === 'ghost' && 'hover:bg-background-tertiary',
        hover && interactive && 'hover:shadow-md',
        // Selected state
        isSelected && '!border-accent-primary !shadow-md',
        // Padding
        padding === 'none' && 'p-0',
        padding === 'sm' && 'p-2',
        padding === 'md' && 'p-4',
        padding === 'lg' && 'p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
