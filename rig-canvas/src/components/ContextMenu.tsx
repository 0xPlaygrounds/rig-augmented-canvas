import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Link, 
  Unlink, 
  Edit, 
  ArrowRight, 
  ArrowLeft, 
  ArrowLeftRight,
  Type,
  PenTool,
  LineChart,
  Minus,
  Zap
} from 'lucide-react';
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

  const [showEdgeTypeMenu, setShowEdgeTypeMenu] = useState(false);
  const [showEdgeStyleMenu, setShowEdgeStyleMenu] = useState(false);
  const [edgeLabelInput, setEdgeLabelInput] = useState('');
  const [showLabelInput, setShowLabelInput] = useState(false);

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
  
  const handleChangeEdgeType = (edgeType: 'bezier' | 'straight' | 'smoothstep' | 'simplebezier') => {
    console.log(`Changing edge ${edgeId} type to ${edgeType}`);
    if (edgeId) {
      const edge = edges.find(e => e.id === edgeId);
      if (edge) {
        const currentStyle = edge.style || { stroke: '#555', strokeWidth: 2 };
        
        const updatedEdge = { 
          ...edge,
          style: currentStyle,
          data: {
            ...(edge.data || {}),
            edgeType
          }
        };
        
        updateEdge(edgeId, updatedEdge);
      }
    }
    setShowEdgeTypeMenu(false);
    onClose();
  };
  
  const handleChangeEdgeStyle = (style: { animated?: boolean, strokeDasharray?: string }) => {
    console.log(`Changing edge ${edgeId} style`);
    if (edgeId) {
      const edge = edges.find(e => e.id === edgeId);
      if (edge) {
        const currentStyle = edge.style || { stroke: '#555', strokeWidth: 2 };
        
        const updatedEdge = { 
          ...edge,
          style: currentStyle,
          data: {
            ...(edge.data || {}),
            animated: style.animated
          }
        };
        
        updateEdge(edgeId, updatedEdge);
      }
    }
    setShowEdgeStyleMenu(false);
    onClose();
  };
  
  const handleSetEdgeLabel = () => {
    console.log(`Setting edge ${edgeId} label to ${edgeLabelInput}`);
    if (edgeId && edgeLabelInput.trim()) {
      const edge = edges.find(e => e.id === edgeId);
      if (edge) {
        const updatedEdge = { 
          ...edge,
          data: {
            ...(edge.data || {}),
            label: edgeLabelInput.trim()
          }
        };
        
        updateEdge(edgeId, updatedEdge);
      }
    }
    setShowLabelInput(false);
    setEdgeLabelInput('');
    onClose();
  };

  console.log('Rendering ContextMenu at:', { x, y, nodeId, edgeId });
  
  return (
    <div
      className="absolute bg-bg-secondary rounded-lg shadow-md border border-border-primary py-1 z-50"
      style={{ top: y, left: x }}
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="min-w-[180px]">
        {!nodeId && !edgeId && (
          <li>
            <button
              className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
              onClick={handleAddNote}
            >
              <Plus size={16} className="text-accent-primary" />
              <span>Add Note</span>
            </button>
          </li>
        )}

        {nodeId && (
          <>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={handleDeleteNode}
              >
                <Trash2 size={16} className="text-red-500" />
                <span>Delete Note</span>
              </button>
            </li>
          </>
        )}

        {edgeId && !showEdgeTypeMenu && !showEdgeStyleMenu && !showLabelInput && (
          <>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeDirection('forward')}
              >
                <ArrowRight size={16} className="text-accent-primary" />
                <span>Forward Direction</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeDirection('backward')}
              >
                <ArrowLeft size={16} className="text-accent-primary" />
                <span>Backward Direction</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeDirection('bidirectional')}
              >
                <ArrowLeftRight size={16} className="text-accent-primary" />
                <span>Bidirectional</span>
              </button>
            </li>
            <li className="border-t border-border-primary mt-1 pt-1">
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => setShowEdgeTypeMenu(true)}
              >
                <PenTool size={16} className="text-accent-primary" />
                <span>Change Edge Type</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => setShowEdgeStyleMenu(true)}
              >
                <LineChart size={16} className="text-accent-primary" />
                <span>Edge Style</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => setShowLabelInput(true)}
              >
                <Type size={16} className="text-accent-primary" />
                <span>Add Label</span>
              </button>
            </li>
            <li className="border-t border-border-primary mt-1 pt-1">
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={handleDeleteEdge}
              >
                <Unlink size={16} className="text-red-500" />
                <span>Delete Connection</span>
              </button>
            </li>
          </>
        )}
        
        {/* Edge Type Submenu */}
        {edgeId && showEdgeTypeMenu && (
          <>
            <li className="px-4 py-2 text-text-secondary text-sm font-medium">
              Edge Type
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeType('bezier')}
              >
                <PenTool size={16} className="text-accent-primary" />
                <span>Bezier Curve</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeType('straight')}
              >
                <Minus size={16} className="text-accent-primary" />
                <span>Straight Line</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeType('smoothstep')}
              >
                <LineChart size={16} className="text-accent-primary" />
                <span>Smooth Step</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeType('simplebezier')}
              >
                <LineChart size={16} className="text-accent-primary" />
                <span>Simple Bezier</span>
              </button>
            </li>
            <li className="border-t border-border-primary mt-1 pt-1">
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => setShowEdgeTypeMenu(false)}
              >
                <ArrowLeft size={16} className="text-accent-primary" />
                <span>Back</span>
              </button>
            </li>
          </>
        )}
        
        {/* Edge Style Submenu */}
        {edgeId && showEdgeStyleMenu && (
          <>
            <li className="px-4 py-2 text-text-secondary text-sm font-medium">
              Edge Style
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeStyle({ animated: false })}
              >
                <Minus size={16} className="text-accent-primary" />
                <span>Solid Line</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeStyle({ animated: true })}
              >
                <Zap size={16} className="text-accent-primary" />
                <span>Dashed Line</span>
              </button>
            </li>
            <li className="border-t border-border-primary mt-1 pt-1">
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => setShowEdgeStyleMenu(false)}
              >
                <ArrowLeft size={16} className="text-accent-primary" />
                <span>Back</span>
              </button>
            </li>
          </>
        )}
        
        {/* Edge Label Input */}
        {edgeId && showLabelInput && (
          <>
            <li className="px-4 py-2 text-text-secondary text-sm font-medium">
              Add Label
            </li>
            <li className="px-4 py-2">
              <input
                type="text"
                value={edgeLabelInput}
                onChange={(e) => setEdgeLabelInput(e.target.value)}
                placeholder="Enter label text"
                className="w-full px-2 py-1 bg-bg-primary border border-border-primary rounded text-text-primary"
                autoFocus
              />
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={handleSetEdgeLabel}
              >
                <Type size={16} className="text-accent-primary" />
                <span>Set Label</span>
              </button>
            </li>
            <li className="border-t border-border-primary mt-1 pt-1">
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => setShowLabelInput(false)}
              >
                <ArrowLeft size={16} className="text-accent-primary" />
                <span>Back</span>
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default ContextMenu;
