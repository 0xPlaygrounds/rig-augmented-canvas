/**
 * CustomEdge Component
 * 
 * A highly configurable edge component for connecting nodes in the canvas.
 * Supports different edge types (bezier, straight, smoothstep, simplebezier),
 * directional arrows, labels, and interactive hover states.
 */

import React, { useState } from 'react';
import { 
  EdgeProps, 
  getBezierPath,
  getSmoothStepPath, 
  getSimpleBezierPath, 
  getStraightPath,
  EdgeLabelRenderer
} from '@xyflow/react';

/**
 * CustomEdge component renders a connection between two nodes with various styling options
 * 
 * Features:
 * - Multiple edge types (bezier, straight, smoothstep, simplebezier)
 * - Directional arrows (forward, backward, bidirectional)
 * - Optional labels with background
 * - Interactive hover state
 * - Wider invisible path for easier selection
 */
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
  
  // Get the direction from the edge data or default to forward
  const direction = data?.direction || 'forward';
  
  /**
   * Calculate the SVG path and label position for the edge
   * based on the edge type and direction
   */
  let edgePath = '';
  let labelX = 0;
  let labelY = 0;
  
  // Base parameters for path generation - same for all edge types
  const pathParams = {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  };
  
  // Special case: bidirectional bezier edges need more curvature to display both arrows clearly
  if (direction === 'bidirectional' && edgeType === 'bezier') {
    // Calculate the distance between source and target
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Use higher curvature for bidirectional edges to make both arrows visible
    const curvedPathParams = {
      ...pathParams,
      curvature: 0.5, // Higher curvature value creates a more curved path
    };
    
    // Generate the bezier path with the custom curvature
    const [bezierPath, bezierLabelX, bezierLabelY] = getBezierPath(curvedPathParams);
    edgePath = bezierPath;
    labelX = bezierLabelX;
    labelY = bezierLabelY;
  } else {
    // For all other cases, select the path type based on edgeType
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
  }
  
  // Get the label from props or data
  // Ensure we specifically check for data.label
  const edgeLabel = label || (data && 'label' in data ? data.label : '');

  /**
   * Arrow configuration based on the edge direction
   * - 'forward': show arrow at target end
   * - 'backward': show arrow at source end
   * - 'bidirectional': show arrows at both ends
   */
  const showStartArrow = direction === 'backward' || direction === 'bidirectional';
  const showEndArrow = direction === 'forward' || direction === 'bidirectional';

  // Create unique marker IDs for this edge to prevent SVG conflicts
  const startArrowId = `${id}-start-arrow`;
  const endArrowId = `${id}-end-arrow`;

  // Use the edge's stroke color for the arrow markers
  const strokeColor = style?.stroke || 'var(--edge-color)';
  
  /**
   * Visual enhancement: dynamic stroke width
   * - Default: base width (1.5px)
   * - Hovered: 125% of base width
   * - Selected: 150% of base width
   * This provides visual feedback when interacting with edges
   */
  const baseStrokeWidth = typeof style.strokeWidth === 'number' ? style.strokeWidth : 1.5;
  const effectiveStrokeWidth = selected 
    ? 2 // Selected edges are 2px wide
    : isHovered 
      ? baseStrokeWidth * 1.25 
      : baseStrokeWidth;
      
  /**
   * Create a dashed line effect if the edge is animated
   * Used to represent special relationships like weak links or temporary connections
   */
  const isAnimated = data?.animated || false;
  const dashArray = isAnimated ? '5 5' : undefined;
  
  return (
    <>
      {/* Define the markers */}
      <defs>
        {showStartArrow && (
          <marker
            id={startArrowId}
            viewBox="0 0 12 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path 
              d="M 0 0 L 12 5 L 0 10 L 3 5 Z" 
              fill={strokeColor} 
            />
          </marker>
        )}
        {showEndArrow && (
          <marker
            id={endArrowId}
            viewBox="0 0 12 10"
            refX="12"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path 
              d="M 0 0 L 12 5 L 0 10 L 3 5 Z" 
              fill={strokeColor}
            />
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
      
      {/* Edge Label using EdgeLabelRenderer for better display */}
      {edgeLabel && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: 'var(--background-secondary)',
              color: 'var(--foreground-primary)',
              padding: '4px 8px',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 500,
              border: '1px solid var(--border-primary)',
              boxShadow: 'var(--shadow-sm)',
              pointerEvents: 'all',
              whiteSpace: 'nowrap',
            }}
            className="nodrag nopan"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {typeof edgeLabel === 'string' ? edgeLabel : 'Label'}
          </div>
        </EdgeLabelRenderer>
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
