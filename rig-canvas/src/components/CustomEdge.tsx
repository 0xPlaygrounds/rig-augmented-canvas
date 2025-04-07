import React, { useState } from 'react';
import { 
  EdgeProps, 
  getBezierPath, 
  getSmoothStepPath, 
  getSimpleBezierPath, 
  getStraightPath,
  MarkerType 
} from '@xyflow/react';

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
  label,
  labelStyle,
  labelShowBg = true,
  labelBgStyle,
  labelBgPadding = [4, 2],
  labelBgBorderRadius = 4,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the edge type from data or default to bezier
  const edgeType = data?.edgeType || 'bezier';
  
  // Get the path for the edge based on the edge type
  let edgePath = '';
  let labelX = 0;
  let labelY = 0;
  
  const pathParams = {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  };
  
  // Get path based on edge type
  switch (edgeType) {
    case 'smoothstep':
      const [smoothPath, smoothLabelX, smoothLabelY] = getSmoothStepPath(pathParams);
      edgePath = smoothPath;
      labelX = smoothLabelX;
      labelY = smoothLabelY;
      break;
    case 'straight':
      const [straightPath, straightLabelX, straightLabelY] = getStraightPath(pathParams);
      edgePath = straightPath;
      labelX = straightLabelX;
      labelY = straightLabelY;
      break;
    case 'simplebezier':
      const [simplePath, simpleLabelX, simpleLabelY] = getSimpleBezierPath(pathParams);
      edgePath = simplePath;
      labelX = simpleLabelX;
      labelY = simpleLabelY;
      break;
    case 'bezier':
    default:
      const [bezierPath, bezierLabelX, bezierLabelY] = getBezierPath(pathParams);
      edgePath = bezierPath;
      labelX = bezierLabelX;
      labelY = bezierLabelY;
      break;
  }

  // Get the direction from the edge data or default to forward
  const direction = data?.direction || 'forward';
  
  // Get the label from props or data
  const edgeLabel = label || data?.label || '';

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
      
  // Determine if the edge should be animated (dashed)
  const isAnimated = data?.animated || false;
  const dashArray = isAnimated ? '5 5' : undefined;
  
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
          strokeDasharray: dashArray,
        }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={showEndArrow ? `url(#${endArrowId})` : undefined}
        markerStart={showStartArrow ? `url(#${startArrowId})` : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      
      {/* Edge Label */}
      {edgeLabel && (
        <g
          transform={`translate(${labelX}, ${labelY})`}
          className="react-flow__edge-label"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {labelShowBg && (
            <rect
              x={-labelBgPadding[0]}
              y={-labelBgPadding[1]}
              width={typeof edgeLabel === 'string' ? edgeLabel.length * 8 + labelBgPadding[0] * 2 : 100}
              height={20 + labelBgPadding[1] * 2}
              style={{
                fill: '#ffffff',
                stroke: 'none',
                ...labelBgStyle,
              }}
              rx={labelBgBorderRadius}
              ry={labelBgBorderRadius}
            />
          )}
          <text
            style={{
              fontFamily: 'sans-serif',
              fontSize: 12,
              pointerEvents: 'all',
              fill: '#222',
              ...labelStyle,
            }}
            dominantBaseline="central"
            textAnchor="middle"
          >
            {typeof edgeLabel === 'string' ? edgeLabel : ''}
          </text>
        </g>
      )}
      
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
