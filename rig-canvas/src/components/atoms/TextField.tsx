import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper function
function cn(...inputs: (string | boolean | undefined | null | { [key: string]: any })[]) {
  return twMerge(clsx(inputs));
}

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Input variant */
  variant?: 'default' | 'filled' | 'outline';
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Full width */
  fullWidth?: boolean;
}

/**
 * TextField component for text input
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      size = 'md',
      variant = 'default',
      leftIcon,
      rightIcon,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const id = props.id || props.name || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={cn('flex flex-col gap-2', fullWidth && 'w-full', className)}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-foreground-secondary mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-foreground-muted">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={id}
            className={cn(
              'border rounded-md transition-all duration-150 focus:outline-none focus-visible:shadow-outline focus:border-accent-primary',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error ? 'border-destructive focus:border-destructive focus-visible:ring-destructive/30' : 'border-border-primary',
              variant === 'default' && 'bg-background-secondary text-foreground-primary',
              variant === 'filled' && 'bg-background-tertiary text-foreground-primary',
              variant === 'outline' && 'bg-transparent text-foreground-primary',
              size === 'sm' && 'py-1.5 px-3 text-xs',
              size === 'md' && 'py-2 px-3 text-sm',
              size === 'lg' && 'py-2.5 px-4 text-base',
              leftIcon ? 'pl-10' : '',
              rightIcon ? 'pr-10' : '',
              fullWidth && 'w-full'
            )}
            aria-invalid={error ? 'true' : 'false'}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-foreground-muted">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <p
            className={cn(
              'text-xs mt-1',
              error ? 'text-destructive' : 'text-foreground-muted'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
