/**
 * ContextMenu Component
 * 
 * A customizable context menu that appears when right-clicking on the canvas,
 * nodes, or edges. Provides different options based on what was clicked.
 * 
 * Features:
 * - Adding new notes to the canvas
 * - Deleting nodes and edges
 * - Edge customization (direction, type, style, color, thickness)
 * - Adding labels to edges
 */

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
  Zap,
  Palette,
  StretchHorizontal
} from 'lucide-react';
import { useCanvasStore } from '../store/canvasStore';
import { useReactFlow } from '@xyflow/react';

/**
 * Props for the ContextMenu component
 */
interface ContextMenuProps {
  /** X coordinate for menu position */
  x: number;
  /** Y coordinate for menu position */
  y: number;
  /** ID of the node that was right-clicked (if applicable) */
  nodeId?: string;
  /** ID of the edge that was right-clicked (if applicable) */
  edgeId?: string;
  /** Callback to close the context menu */
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

  /**
   * Creates a new note at the context menu position
   */
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

  /**
   * Deletes the selected node
   */
  const handleDeleteNode = () => {
    if (nodeId) {
      removeNode(nodeId);
    }
    onClose();
  };

  /**
   * Deletes the selected edge
   */
  const handleDeleteEdge = () => {
    if (edgeId) {
      removeEdge(edgeId);
    }
    onClose();
  };

  // State for managing submenus and input fields
  /** Controls visibility of the edge type submenu */
  const [showEdgeTypeMenu, setShowEdgeTypeMenu] = useState(false);
  /** Controls visibility of the edge style submenu */
  const [showEdgeStyleMenu, setShowEdgeStyleMenu] = useState(false);
  /** Controls visibility of the edge color submenu */
  const [showEdgeColorMenu, setShowEdgeColorMenu] = useState(false);
  /** Controls visibility of the edge thickness submenu */
  const [showEdgeThicknessMenu, setShowEdgeThicknessMenu] = useState(false);
  /** Stores the user input for edge labels */
  const [edgeLabelInput, setEdgeLabelInput] = useState('');
  /** Controls visibility of the label input field */
  const [showLabelInput, setShowLabelInput] = useState(false);

  /**
   * Changes the direction of an edge (forward, backward, or bidirectional)
   * This affects the arrow markers displayed on the edge
   */
  const handleChangeEdgeDirection = (direction: 'forward' | 'backward' | 'bidirectional') => {
    if (edgeId) {
      // Find the current edge
      const edge = edges.find(e => e.id === edgeId);
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
        
        // Update the edge in the store
        updateEdge(edgeId, updatedEdge);
      }
    }
    onClose();
  };
  
  /**
   * Changes the edge path type (bezier, straight, step, etc.)
   * This determines how the path is drawn between nodes
   */
  const handleChangeEdgeType = (edgeType: 'bezier' | 'straight' | 'smoothstep' | 'simplebezier') => {
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
  
  /**
   * Changes edge style properties like animation (solid vs dashed)
   */
  const handleChangeEdgeStyle = (style: { animated?: boolean }) => {
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
  
  /**
   * Changes the edge color
   */
  const handleChangeEdgeColor = (color: string) => {
    if (edgeId) {
      const edge = edges.find(e => e.id === edgeId);
      if (edge) {
        const currentStyle = edge.style || {};
        
        const updatedEdge = { 
          ...edge,
          style: {
            ...currentStyle,
            stroke: color
          }
        };
        
        updateEdge(edgeId, updatedEdge);
      }
    }
    setShowEdgeColorMenu(false);
    onClose();
  };
  
  /**
   * Changes the edge line thickness
   */
  const handleChangeEdgeThickness = (thickness: number) => {
    if (edgeId) {
      const edge = edges.find(e => e.id === edgeId);
      if (edge) {
        const currentStyle = edge.style || {};
        
        const updatedEdge = { 
          ...edge,
          style: {
            ...currentStyle,
            strokeWidth: thickness
          }
        };
        
        updateEdge(edgeId, updatedEdge);
      }
    }
    setShowEdgeThicknessMenu(false);
    onClose();
  };
  
  /**
   * Sets a text label on the edge
   */
  const handleSetEdgeLabel = () => {
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

        {edgeId && !showEdgeTypeMenu && !showEdgeStyleMenu && !showEdgeColorMenu && !showEdgeThicknessMenu && !showLabelInput && (
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
                onClick={() => setShowEdgeColorMenu(true)}
              >
                <Palette size={16} className="text-accent-primary" />
                <span>Edge Color</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => setShowEdgeThicknessMenu(true)}
              >
                <StretchHorizontal size={16} className="text-accent-primary" />
                <span>Edge Thickness</span>
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
        
        {/* Edge Color Submenu */}
        {edgeId && showEdgeColorMenu && (
          <>
            <li className="px-4 py-2 text-text-secondary text-sm font-medium">
              Edge Color
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeColor('#555')}
              >
                <div className="w-4 h-4 rounded-full bg-gray-600"></div>
                <span>Gray</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeColor('#3b82f6')}
              >
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span>Blue</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeColor('#10b981')}
              >
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Green</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeColor('#ef4444')}
              >
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span>Red</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeColor('#f59e0b')}
              >
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span>Yellow</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeColor('#8b5cf6')}
              >
                <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                <span>Purple</span>
              </button>
            </li>
            <li className="border-t border-border-primary mt-1 pt-1">
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => setShowEdgeColorMenu(false)}
              >
                <ArrowLeft size={16} className="text-accent-primary" />
                <span>Back</span>
              </button>
            </li>
          </>
        )}
        
        {/* Edge Thickness Submenu */}
        {edgeId && showEdgeThicknessMenu && (
          <>
            <li className="px-4 py-2 text-text-secondary text-sm font-medium">
              Edge Thickness
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeThickness(1)}
              >
                <div className="w-12 h-1 bg-gray-600 rounded"></div>
                <span>Thin</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeThickness(2)}
              >
                <div className="w-12 h-2 bg-gray-600 rounded"></div>
                <span>Medium</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeThickness(3)}
              >
                <div className="w-12 h-3 bg-gray-600 rounded"></div>
                <span>Thick</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => handleChangeEdgeThickness(4)}
              >
                <div className="w-12 h-4 bg-gray-600 rounded"></div>
                <span>Very Thick</span>
              </button>
            </li>
            <li className="border-t border-border-primary mt-1 pt-1">
              <button
                className="w-full text-left px-4 py-2 hover:bg-bg-tertiary text-text-primary flex items-center gap-2 transition-colors"
                onClick={() => setShowEdgeThicknessMenu(false)}
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
