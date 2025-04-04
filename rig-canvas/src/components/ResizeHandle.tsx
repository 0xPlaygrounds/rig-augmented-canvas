import React, { useCallback } from 'react';

// Define the positions for resize handles
export type ResizeHandlePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface ResizeHandleProps {
  position: ResizeHandlePosition;
  onResize: (deltaWidth: number, deltaHeight: number) => void;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ position, onResize }) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [startPos, setStartPos] = React.useState({ x: 0, y: 0 });

  // Determine cursor style based on position
  const getCursorStyle = (): string => {
    switch (position) {
      case 'top-left':
        return 'nwse-resize';
      case 'top-right':
        return 'nesw-resize';
      case 'bottom-left':
        return 'nesw-resize';
      case 'bottom-right':
        return 'nwse-resize';
      default:
        return 'nwse-resize';
    }
  };

  // Determine position styles based on handle position
  const getPositionStyles = (): React.CSSProperties => {
    switch (position) {
      case 'top-left':
        return { top: '-4px', left: '-4px' };
      case 'top-right':
        return { top: '-4px', right: '-4px' };
      case 'bottom-left':
        return { bottom: '-4px', left: '-4px' };
      case 'bottom-right':
        return { bottom: '-4px', right: '-4px' };
      default:
        return { bottom: '-4px', right: '-4px' };
    }
  };

  // Critical: This is the function that prevents drag behavior in the parent
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    
    // These two lines are critical for ReactFlow to not interpret this as a drag
    if (e.currentTarget.setPointerCapture) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging) return;

    let deltaWidth = e.clientX - startPos.x;
    let deltaHeight = e.clientY - startPos.y;

    // Adjust deltas based on which corner is being dragged
    switch (position) {
      case 'top-left':
        deltaWidth = -deltaWidth;
        deltaHeight = -deltaHeight;
        break;
      case 'top-right':
        deltaHeight = -deltaHeight;
        break;
      case 'bottom-left':
        deltaWidth = -deltaWidth;
        break;
      // bottom-right is already correct
    }

    onResize(deltaWidth, deltaHeight);
    setStartPos({ x: e.clientX, y: e.clientY });
  }, [isDragging, onResize, position, startPos]);

  const handlePointerUp = useCallback((e: PointerEvent) => {
    setIsDragging(false);
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
    
    // Release pointer capture
    if (e.target && 'releasePointerCapture' in e.target) {
      try {
        (e.target as Element).releasePointerCapture(e.pointerId);
      } catch (err) {
        // Handle any errors silently
      }
    }
  }, [handlePointerMove]);

  React.useEffect(() => {
    return () => {
      // Clean up event listeners when component unmounts
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return (
    <div
      className="resize-handle"
      onPointerDown={handlePointerDown}
      style={{
        position: 'absolute',
        width: '12px',
        height: '12px',
        backgroundColor: position === 'bottom-right' ? '#f3f4f6' : 'transparent',
        border: position === 'bottom-right' ? '1px solid #aaa' : 'none',
        boxShadow: position === 'bottom-right' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
        borderRadius: '2px',
        cursor: getCursorStyle(),
        zIndex: 20,
        touchAction: 'none', // Critical for proper touch handling
        ...getPositionStyles()
      }}
    >
      {position === 'bottom-right' && (
        <svg
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', top: '2px', left: '2px' }}
        >
          <path
            d="M1 6V1H6"
            stroke="#666"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default ResizeHandle;