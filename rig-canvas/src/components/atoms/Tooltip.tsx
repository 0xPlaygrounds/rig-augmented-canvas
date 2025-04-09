import React, { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createPortal } from 'react-dom';

// Helper function
function cn(...inputs: (string | boolean | undefined | null | { [key: string]: any })[]) {
  return twMerge(clsx(inputs));
}

export interface TooltipProps {
  /** Content to display in the tooltip */
  content: React.ReactNode;
  /** Element to attach the tooltip to */
  children: React.ReactElement;
  /** Tooltip position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing tooltip (ms) */
  delay?: number;
  /** Additional classes for tooltip container */
  className?: string;
}

/**
 * Tooltip component that shows additional information on hover
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 300,
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const targetRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // Calculate position when tooltip becomes visible
  useEffect(() => {
    if (!visible || !targetRef.current || !tooltipRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    let x = 0;
    let y = 0;

    switch (position) {
      case 'top':
        x = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
        y = targetRect.top - tooltipRect.height - 8;
        break;
      case 'bottom':
        x = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
        y = targetRect.bottom + 8;
        break;
      case 'left':
        x = targetRect.left - tooltipRect.width - 8;
        y = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
        break;
      case 'right':
        x = targetRect.right + 8;
        y = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
        break;
    }

    // Make sure tooltip stays within viewport
    x = Math.max(8, Math.min(x, window.innerWidth - tooltipRect.width - 8));
    y = Math.max(8, Math.min(y, window.innerHeight - tooltipRect.height - 8));

    setCoords({ x, y });
  }, [visible, position]);

  // Handle mouse events
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  // Clone children with event handlers
  const childWithHandlers = React.cloneElement(children, {
    ref: (node: HTMLElement) => {
      targetRef.current = node;
      
      // Forward ref if original child has it
      const { ref } = children as any;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    onMouseEnter: (e: React.MouseEvent) => {
      handleMouseEnter();
      if (children.props.onMouseEnter) children.props.onMouseEnter(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouseLeave();
      if (children.props.onMouseLeave) children.props.onMouseLeave(e);
    },
  });

  return (
    <>
      {childWithHandlers}
      {visible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={cn(
              'fixed z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-sm',
              'pointer-events-none opacity-90 transition-opacity',
              className
            )}
            style={{
              left: `${coords.x}px`,
              top: `${coords.y}px`,
            }}
          >
            {content}
            <div
              className={cn(
                'absolute w-2 h-2 bg-gray-900 rotate-45',
                position === 'top' && 'bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
                position === 'bottom' && 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
                position === 'left' && 'right-0 top-1/2 -translate-x-1/2 -translate-y-1/2',
                position === 'right' && 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2'
              )}
            />
          </div>,
          document.body
        )}
    </>
  );
};
