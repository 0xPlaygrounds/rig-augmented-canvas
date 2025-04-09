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
  variant?: 'default' | 'filled';
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
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full', className)}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-tertiary">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={id}
            className={cn(
              'border rounded-md bg-bg-secondary text-text-primary focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-bg-tertiary',
              error ? 'border-red-500' : 'border-border-primary',
              variant === 'default' && 'bg-bg-secondary',
              variant === 'filled' && 'bg-bg-tertiary',
              size === 'sm' && 'py-1 text-sm',
              size === 'md' && 'py-2 text-base',
              size === 'lg' && 'py-3 text-lg',
              leftIcon ? 'pl-10' : 'pl-3',
              rightIcon ? 'pr-10' : 'pr-3',
              fullWidth && 'w-full'
            )}
            aria-invalid={error ? 'true' : 'false'}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-tertiary">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <p
            className={cn(
              'text-xs',
              error ? 'text-red-500' : 'text-text-tertiary'
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
