import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import CanvasFlow from './CanvasFlow';

// CanvasFlowWithProvider props
interface CanvasFlowWithProviderProps {
  onNodeSelect?: (node: any) => void;
  readOnly?: boolean;
  canvasId?: string;
  onFileDrop?: (file: any) => void;
}

/**
 * CanvasFlowWithProvider Component
 * 
 * Wraps the CanvasFlow component with ReactFlowProvider to ensure proper context is available
 */
const CanvasFlowWithProvider: React.FC<CanvasFlowWithProviderProps> = (props) => {
  return (
    <ReactFlowProvider>
      <div className="app">
        <CanvasFlow {...props} />
      </div>
    </ReactFlowProvider>
  );
};

export default CanvasFlowWithProvider;
