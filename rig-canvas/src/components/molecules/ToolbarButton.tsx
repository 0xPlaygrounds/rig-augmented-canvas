import React from 'react';
import { Button, ButtonProps } from '../atoms/Button';
import { Tooltip } from '../atoms/Tooltip';

export interface ToolbarButtonProps extends Omit<ButtonProps, 'variant' | 'size'> {
  /** Tooltip content to display on hover */
  tooltip?: React.ReactNode;
  /** Whether the button is active/selected */
  active?: boolean;
}

/**
 * ToolbarButton component for toolbar actions with built-in tooltip support
 */
export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  tooltip,
  active = false,
  className,
  children,
  ...props
}) => {
  const button = (
    <Button
      variant="ghost"
      size="sm"
      className={`p-1 h-8 w-8 rounded flex items-center justify-center ${
        active ? 'bg-bg-tertiary text-accent-primary' : 'text-text-tertiary hover:text-text-primary'
      } ${className || ''}`}
      {...props}
    >
      {children}
    </Button>
  );

  if (tooltip) {
    return (
      <Tooltip content={tooltip}>
        {button}
      </Tooltip>
    );
  }

  return button;
};
