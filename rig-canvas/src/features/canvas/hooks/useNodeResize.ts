/**
 * Node Resize Hook
 * 
 * Custom hook to manage node resizing operations in a React Flow canvas.
 * This hook encapsulates the logic for updating node dimensions during 
 * resize operations, ensuring consistent state across React Flow and the store.
 */

import { useCallback, useRef } from 'react';
import { useReactFlow, useUpdateNodeInternals } from '@xyflow/react';
import { useCanvasStore } from '../store/canvasStore';
import { applyForcedStyles } from '../utils/styleUtils';

// Debug flag - ideally this would come from a central config
const DEBUG = import.meta.env.DEV;

export interface NodeDimensions {
  width: number;
  height: number;
}

export interface UseNodeResizeParams {
  nodeId: string;
  nodeData: any;
  initialDimensions: NodeDimensions;
}

export interface UseNodeResizeResult {
  dimensions: NodeDimensions;
  onResize: (event: any, params: NodeDimensions) => void;
  onResizeEnd: (event: any, params: NodeDimensions) => void;
  updateNodeElement: (element: HTMLElement | null) => void;
}

/**
 * Custom hook for managing node resize operations in React Flow
 * 
 * @param params - Node resize parameters
 * @returns Functions and state for resize operations
 */
export const useNodeResize = ({
  nodeId,
  nodeData,
  initialDimensions
}: UseNodeResizeParams): UseNodeResizeResult => {
  // Get required hooks and store functions
  const reactFlowInstance = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const { updateNode } = useCanvasStore();
  
  // Refs for tracking state
  const nodeElementRef = useRef<HTMLElement | null>(null);
  const dimensionsRef = useRef<NodeDimensions>(initialDimensions);
  
  /**
   * Update node dimensions in React Flow's internal state
   */
  const updateReactFlowNodeDimensions = useCallback((dimensions: NodeDimensions) => {
    // Get current nodes from ReactFlow
    const nodes = reactFlowInstance.getNodes();
    const nodeIndex = nodes.findIndex(node => node.id === nodeId);
    
    // If node doesn't exist in flow, do nothing
    if (nodeIndex === -1) return;
    
    const { width, height } = dimensions;
    
    // Create updated nodes array with new dimensions
    const updatedNodes = [...nodes];
    updatedNodes[nodeIndex] = {
      ...updatedNodes[nodeIndex],
      width,
      height,
      data: {
        ...updatedNodes[nodeIndex].data,
        width,
        height
      }
    };
    
    // Update ReactFlow with new nodes array
    reactFlowInstance.setNodes(updatedNodes);
    
    // Log debug info if enabled
    if (DEBUG) {
      console.log(`[DEBUG][Node ${nodeId}] Updated ReactFlow node dimensions:`, { width, height });
    }
  }, [nodeId, reactFlowInstance]);

  /**
   * Apply forced dimensions to the node DOM element
   */
  const applyDimensionsToElement = useCallback((dimensions: NodeDimensions) => {
    if (!nodeElementRef.current) return;
    
    const { width, height } = dimensions;
    
    // Apply dimensions with !important
    applyForcedStyles(nodeElementRef.current, {
      'width': `${width}px`,
      'height': `${height}px`,
      'min-width': `${width}px`,
      'min-height': `${height}px`,
      'transition': 'none',
      'box-sizing': 'border-box',
      'max-width': 'none',
      'max-height': 'none'
    });
    
    // Log debug info if enabled
    if (DEBUG) {
      console.log(`[DEBUG][Node ${nodeId}] Applied dimensions to DOM:`, { width, height });
    }
  }, [nodeId]);
  
  /**
   * Save the DOM element reference for later manipulation
   */
  const updateNodeElement = useCallback((element: HTMLElement | null) => {
    nodeElementRef.current = element;
    
    // If element exists and we have dimensions, apply them immediately
    if (element && dimensionsRef.current) {
      applyDimensionsToElement(dimensionsRef.current);
    }
  }, [applyDimensionsToElement]);

  /**
   * Handle resize during drag operation
   */
  const onResize = useCallback((event: any, dimensions: NodeDimensions) => {
    // Update dimensions ref
    dimensionsRef.current = dimensions;
    const { width, height } = dimensions;
    
    // Log resize event if debug enabled
    if (DEBUG) {
      console.log(`[DEBUG][Node ${nodeId}] RESIZE EVENT:`, { width, height, event });
    }
    
    // Apply styles to DOM element
    applyDimensionsToElement(dimensions);
    
    // Update React Flow's internal state
    updateReactFlowNodeDimensions(dimensions);
    
    // Update node internals to ensure connections are updated
    updateNodeInternals(nodeId);
    
    if (DEBUG) {
      console.log(`[DEBUG][Node ${nodeId}] After updateNodeInternals during resize`);
    }
  }, [nodeId, applyDimensionsToElement, updateReactFlowNodeDimensions, updateNodeInternals]);

  /**
   * Handle resize end - commit changes to the store
   */
  const onResizeEnd = useCallback((event: any, dimensions: NodeDimensions) => {
    const { width, height } = dimensions;
    dimensionsRef.current = dimensions;
    
    // Log resize end if debug enabled
    if (DEBUG) {
      console.log(`[DEBUG][Node ${nodeId}] RESIZE END:`, { width, height, event });
    }
    
    // Apply styles to DOM element to ensure final dimensions are applied
    applyDimensionsToElement(dimensions);
    
    // Final update of React Flow internal state
    updateReactFlowNodeDimensions(dimensions);
    
    // Update the store with new dimensions
    setTimeout(() => {
      updateNode(nodeId, { 
        data: { 
          ...nodeData, 
          width, 
          height 
        } 
      });
      
      if (DEBUG) {
        console.log(`[DEBUG][Node ${nodeId}] Updated store with new dimensions:`, { width, height });
      }
      
      // Make sure connections are updated
      updateNodeInternals(nodeId);
      
      // One more update for good measure
      setTimeout(() => {
        updateNodeInternals(nodeId);
        if (DEBUG) {
          console.log(`[DEBUG][Node ${nodeId}] Final updateNodeInternals after resize`);
        }
      }, 100);
    }, 10);
  }, [nodeId, nodeData, applyDimensionsToElement, updateReactFlowNodeDimensions, updateNode, updateNodeInternals]);

  return {
    dimensions: dimensionsRef.current,
    onResize,
    onResizeEnd,
    updateNodeElement
  };
};
