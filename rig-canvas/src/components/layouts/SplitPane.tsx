import React, { useState, useCallback, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper function
function cn(...inputs: (string | boolean | undefined | null | { [key: string]: any })[]) {
  return twMerge(clsx(inputs));
}

export interface SplitPaneProps {
  /** Left/top panel content */
  left: React.ReactNode;
  /** Right/bottom panel content */
  right: React.ReactNode;
  /** Split direction */
  direction?: 'horizontal' | 'vertical';
  /** Initial split ratio (0-1) */
  initialRatio?: number;
  /** Minimum size of left/top panel in pixels */
  minLeftSize?: number;
  /** Maximum size of left/top panel in pixels */
  maxLeftSize?: number;
  /** Whether resizing is allowed */
  resizable?: boolean;
  /** Additional CSS class */
  className?: string;
  /** CSS class for the divider */
  dividerClassName?: string;
  /** CSS class for the left/top panel */
  leftClassName?: string;
  /** CSS class for the right/bottom panel */
  rightClassName?: string;
}

/**
 * SplitPane component for creating resizable split layouts
 */
export const SplitPane: React.FC<SplitPaneProps> = ({
  left,
  right,
  direction = 'horizontal',
  initialRatio = 0.5,
  minLeftSize = 100,
  maxLeftSize = Infinity,
  resizable = true,
  className,
  dividerClassName,
  leftClassName,
  rightClassName,
}) => {
  const [ratio, setRatio] = useState(initialRatio);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startPos = useRef(0);
  const startRatio = useRef(0);
  
  // Handle mouse down on divider
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!resizable) return;
    
    isDragging.current = true;
    startPos.current = direction === 'horizontal' ? e.clientX : e.clientY;
    startRatio.current = ratio;
    e.preventDefault();
    
    // Add capture event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [direction, ratio, resizable]);
  
  // Handle mouse move while dragging
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerSize = direction === 'horizontal' ? containerRect.width : containerRect.height;
    
    const curPos = direction === 'horizontal' ? e.clientX : e.clientY;
    const positionDelta = curPos - startPos.current;
    const ratioDelta = positionDelta / containerSize;
    
    let newRatio = startRatio.current + ratioDelta;
    
    // Apply min/max constraints
    if (minLeftSize) {
      newRatio = Math.max(newRatio, minLeftSize / containerSize);
    }
    if (maxLeftSize) {
      newRatio = Math.min(newRatio, maxLeftSize / containerSize);
    }
    
    // Clamp between 0.1 and 0.9 to prevent panels from disappearing completely
    newRatio = Math.min(Math.max(newRatio, 0.1), 0.9);
    
    setRatio(newRatio);
  }, [direction, minLeftSize, maxLeftSize]);
  
  // Handle mouse up after dragging
  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);
  
  // Clean up event listeners on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        'flex w-full h-full overflow-hidden',
        direction === 'horizontal' ? 'flex-row' : 'flex-col',
        className
      )}
    >
      <div
        className={cn(
          'overflow-auto',
          direction === 'horizontal' ? 'h-full' : 'w-full',
          leftClassName
        )}
        style={{
          [direction === 'horizontal' ? 'width' : 'height']: `${ratio * 100}%`,
        }}
      >
        {left}
      </div>
      
      {/* Divider */}
      <div
        className={cn(
          'flex-shrink-0 bg-border-primary cursor-col-resize transition-colors',
          direction === 'horizontal' 
            ? 'w-px hover:w-1 hover:-ml-[0.5px] hover:-mr-[0.5px]' 
            : 'h-px hover:h-1 hover:-mt-[0.5px] hover:-mb-[0.5px]',
          resizable ? 'cursor-col-resize' : 'cursor-default',
          isDragging.current ? 'bg-accent-primary' : 'hover:bg-accent-primary',
          dividerClassName
        )}
        onMouseDown={handleMouseDown}
      />
      
      <div
        className={cn(
          'overflow-auto',
          direction === 'horizontal' ? 'h-full' : 'w-full',
          rightClassName
        )}
        style={{
          [direction === 'horizontal' ? 'width' : 'height']: `${(1 - ratio) * 100}%`,
        }}
      >
        {right}
      </div>
    </div>
  );
};
