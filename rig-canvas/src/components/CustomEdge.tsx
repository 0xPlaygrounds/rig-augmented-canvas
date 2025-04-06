import React, { useState } from 'react';
import { EdgeProps, getBezierPath, MarkerType } from '@xyflow/react';

const CustomEdge: React.FC<EdgeProps> = ({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  selected,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the path for the edge
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Get the direction from the edge data
  const direction = data?.direction || 'forward';

  // Determine markers based on direction
  const showStartArrow = direction === 'backward' || direction === 'bidirectional';
  const showEndArrow = direction === 'forward' || direction === 'bidirectional';

  // Define marker IDs
  const startArrowId = `${id}-start-arrow`;
  const endArrowId = `${id}-end-arrow`;

  // Extract stroke color from style for the markers
  const strokeColor = style?.stroke || 'var(--accent-primary)';
  
  // Determine the effective stroke width based on hover/selected state
  const baseStrokeWidth = typeof style.strokeWidth === 'number' ? style.strokeWidth : 2;
  const effectiveStrokeWidth = selected 
    ? baseStrokeWidth * 1.5 
    : isHovered 
      ? baseStrokeWidth * 1.25 
      : baseStrokeWidth;
  
  return (
    <>
      {/* Define the markers */}
      <defs>
        {showStartArrow && (
          <marker
            id={startArrowId}
            viewBox="0 0 10 8"
            refX="0"
            refY="4"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            {/* More modern, cleaner arrow shape */}
            <path d="M 0 0 L 10 4 L 0 8 L 3 4 Z" fill={strokeColor} />
          </marker>
        )}
        {showEndArrow && (
          <marker
            id={endArrowId}
            viewBox="0 0 10 8"
            refX="10"
            refY="4"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            {/* More modern, cleaner arrow shape */}
            <path d="M 0 0 L 10 4 L 0 8 L 3 4 Z" fill={strokeColor} />
          </marker>
        )}
      </defs>
      
      {/* The edge path with hover effects */}
      <path
        id={id}
        style={{
          ...style,
          strokeWidth: effectiveStrokeWidth,
          cursor: 'pointer',
          transition: 'stroke-width 0.2s ease-in-out, stroke 0.2s ease-in-out',
        }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={showEndArrow ? `url(#${endArrowId})` : undefined}
        markerStart={showStartArrow ? `url(#${startArrowId})` : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      
      {/* Invisible wider path for easier selection */}
      <path
        style={{
          stroke: 'transparent',
          strokeWidth: 15, // Increased from 10 to 15 for even easier selection
          fill: 'none',
          cursor: 'pointer',
        }}
        d={edgePath}
        className="react-flow__edge-interaction"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </>
  );
};

export default CustomEdge;
