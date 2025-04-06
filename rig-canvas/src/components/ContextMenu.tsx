import React from 'react';
import { Plus, Trash2, Link, Unlink, Edit, ArrowRight, ArrowLeft, ArrowLeftRight } from 'lucide-react';
import { useCanvasStore } from '../store/canvasStore';
import { useReactFlow, MarkerType } from '@xyflow/react';
import { Edge as EdgeType } from '../types';

interface ContextMenuProps {
  x: number;
  y: number;
  nodeId?: string;
  edgeId?: string;
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  nodeId,
  edgeId,
  onClose,
}) => {
  const { removeNode, removeEdge, updateEdge, edges } = useCanvasStore();
  const reactFlowInstance = useReactFlow();

  const { addNode } = useCanvasStore();

  const handleAddNote = () => {
    const id = `note-${Date.now()}`;
    const position = reactFlowInstance.screenToFlowPosition({ x, y });
    
    const newNode = {
      id,
      type: 'note' as const,
      position,
      data: { 
        content: 'New note',
        width: 250,  // Default width
        height: 150  // Default height
      },
    };
    
    // Add node to the store instead of directly to ReactFlow
    addNode(newNode);
    
    onClose();
  };


  const handleDeleteNode = () => {
    if (nodeId) {
      removeNode(nodeId);
    }
    onClose();
  };

  const handleDeleteEdge = () => {
    if (edgeId) {
      removeEdge(edgeId);
    }
    onClose();
  };

  const handleChangeEdgeDirection = (direction: 'forward' | 'backward' | 'bidirectional') => {
    console.log(`Changing edge ${edgeId} direction to ${direction}`);
    if (edgeId) {
      // Find the current edge
      const edge = edges.find(e => e.id === edgeId);
      console.log("Current edge:", edge);
      if (edge) {
        // Get the current style or use default
        const currentStyle = edge.style || { stroke: '#555', strokeWidth: 2 };
        
        // Create the updated edge object
        const updatedEdge = { 
          ...edge,
          // Keep the current style (including selected state)
          style: currentStyle,
          data: {
            ...(edge.data || {}),
            direction
          }
        };
        console.log("Updated edge:", updatedEdge);
        
        // Update the edge in the store
        updateEdge(edgeId, updatedEdge);
        
        // Log the edges after update
        setTimeout(() => {
          console.log("Edges after update:", useCanvasStore.getState().edges);
        }, 100);
      }
    }
    onClose();
  };

  console.log('Rendering ContextMenu at:', { x, y, nodeId, edgeId });
  
  return (
    <div
      className="absolute bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
      style={{ top: y, left: x }}
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="min-w-[150px]">
        {!nodeId && !edgeId && (
          <li>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              onClick={handleAddNote}
            >
              <Plus size={16} />
              <span>Add Note</span>
            </button>
          </li>
        )}

        {nodeId && (
          <>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                onClick={handleDeleteNode}
              >
                <Trash2 size={16} />
                <span>Delete Note</span>
              </button>
            </li>
          </>
        )}

        {edgeId && (
          <>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => handleChangeEdgeDirection('forward')}
              >
                <ArrowRight size={16} />
                <span>Forward Direction</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => handleChangeEdgeDirection('backward')}
              >
                <ArrowLeft size={16} />
                <span>Backward Direction</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => handleChangeEdgeDirection('bidirectional')}
              >
                <ArrowLeftRight size={16} />
                <span>Bidirectional</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                onClick={handleDeleteEdge}
              >
                <Unlink size={16} />
                <span>Delete Connection</span>
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default ContextMenu;
