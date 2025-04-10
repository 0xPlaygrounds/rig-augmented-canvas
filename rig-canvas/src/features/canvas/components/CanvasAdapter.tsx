import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import CanvasFlowComponent from '../../../components/CanvasFlow';
import { CanvasProps } from '../types';

/**
 * Canvas Adapter Component
 * 
 * This component serves as an adapter between the existing Canvas interface
 * and our new CanvasFlow implementation. It maps properties appropriately
 * to ensure compatibility with the rest of the application.
 */
const CanvasAdapter: React.FC<CanvasProps> = ({
  canvasId = 'main',
  className = '',
  children,
  toolbarContent,
  readOnly = false,
  onNodeClick,
  onNodeDoubleClick,
  onPaneClick,
  onFileDrop,
}) => {
  // Map the existing Canvas properties to our CanvasFlow component
  return (
    <div className={`w-full h-full relative ${className}`}>
      <ReactFlowProvider>
        <CanvasFlowComponent
          readOnly={readOnly}
          onNodeSelect={onNodeClick}
          canvasId={canvasId}
          onFileDrop={onFileDrop}
        />
        
        {/* Render toolbar content if provided */}
        {toolbarContent && (
          <div className="absolute top-4 right-4 z-10">
            {toolbarContent}
          </div>
        )}
        
        {/* Render any additional children */}
        {children}
      </ReactFlowProvider>
    </div>
  );
};

/**
 * Exported Canvas component with ReactFlowProvider
 */
export const Canvas = CanvasAdapter;

/**
 * Default export with provider (maintains API compatibility)
 */
export const CanvasWithProvider = CanvasAdapter;

export default CanvasAdapter;
