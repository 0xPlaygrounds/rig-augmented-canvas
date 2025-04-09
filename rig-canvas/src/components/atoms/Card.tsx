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
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-md',
        // Background variants
        variant === 'default' && 'bg-bg-secondary',
        variant === 'secondary' && 'bg-bg-tertiary',
        variant === 'ghost' && 'bg-transparent',
        // Border
        border && 'border',
        border && isSelected ? 'border-accent-primary' : 'border-border-primary',
        // Hover effects
        hover && 'transition-colors duration-200',
        hover && variant === 'default' && 'hover:bg-bg-tertiary',
        hover && variant === 'secondary' && 'hover:bg-bg-secondary',
        hover && variant === 'ghost' && 'hover:bg-bg-tertiary',
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
