import React from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper function
function cn(...inputs: (string | boolean | undefined | null | { [key: string]: any })[]) {
  return twMerge(clsx(inputs));
}

export interface IconProps {
  /** The Lucide icon component */
  icon: LucideIcon;
  /** Optional size in pixels */
  size?: number;
  /** Optional CSS class names */
  className?: string;
  /** Optional color */
  color?: string;
  /** Optional stroke width */
  strokeWidth?: number;
  /** Additional props */
  [x: string]: any;
}

/**
 * Icon component wraps Lucide icons for consistent styling
 */
export const Icon: React.FC<IconProps> = ({
  icon: LucideIcon,
  size = 24,
  className,
  color,
  strokeWidth = 2,
  ...props
}) => {
  return (
    <LucideIcon
      size={size}
      className={cn('flex-shrink-0', className)}
      color={color}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
};
