import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Handle, Position, NodeProps, NodeResizer, useUpdateNodeInternals } from '@xyflow/react';

/**
 * Note Node Component
 * 
 * A customizable node component that represents a note in the canvas
 * with editing capabilities and resize functionality.
 */
export type NoteNodeData = {
  label?: string;
  text: string;
  onChange?: (text: string) => void;
  width?: number;
  height?: number;
  initialWidth?: number;
  initialHeight?: number;
};

const NoteNode = ({ 
  id, 
  data, 
  selected, 
  isConnectable = true 
}: NodeProps) => {
  // Cast data to our expected type
  const nodeData = data as NoteNodeData;
  const updateNodeInternals = useUpdateNodeInternals();
  
  // Update node internals when mounting or selection changes
  useEffect(() => {
    updateNodeInternals(id);
    const timeoutIds = [50, 100, 200].map(delay => 
      setTimeout(() => updateNodeInternals(id), delay)
    );
    return () => timeoutIds.forEach(clearTimeout);
  }, [id, selected, updateNodeInternals]);

  // Handle custom resize events
  useEffect(() => {
    const handleNodeResize = (event: CustomEvent) => {
      const detail = event.detail;
      if (detail && detail.id === id) {
        const nodeElement = document.querySelector(`[data-id="${id}"]`);
        if (nodeElement) {
          nodeElement.setAttribute('style', `
            width: ${detail.width}px !important;
            height: ${detail.height}px !important;
            min-width: ${detail.width}px !important;
            min-height: ${detail.height}px !important;
          `);
          updateNodeInternals(id);
        }
      }
    };
    
    document.addEventListener('node-resize', handleNodeResize as EventListener);
    return () => {
      document.removeEventListener('node-resize', handleNodeResize as EventListener);
    };
  }, [id, updateNodeInternals]);

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(nodeData.text || '');
  const [showSizeMenu, setShowSizeMenu] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  // Handle text changes
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    if (nodeData.onChange) {
      nodeData.onChange(newText);
    }
  }, [nodeData.onChange]);

  // Toggle edit mode
  const toggleEditMode = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
    
    if (!isEditing && textareaRef.current) {
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 10);
    }
    
    if (isEditing && nodeData.onChange) {
      nodeData.onChange(text);
    }
  }, [isEditing, text, nodeData.onChange]);

  // Handle delete button
  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Delete node:', id);
  }, [id]);

  // Handle size menu toggle
  const handleSizeMenuToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSizeMenu(!showSizeMenu);
  }, [showSizeMenu]);

  // Size presets
  const sizePresets = [
    { name: 'Small', width: 200, height: 100 },
    { name: 'Medium', width: 250, height: 150 },
    { name: 'Large', width: 300, height: 200 },
    { name: 'Wide', width: 350, height: 120 },
    { name: 'Tall', width: 200, height: 250 }
  ];

  // Apply resize based on preset
  const applySize = useCallback((width: number, height: number) => {
    if (nodeData.onChange) {
      nodeData.onChange(text);
    }
    
    // Dispatch a resize event with exact dimensions
    const event = new CustomEvent('node-resize-preset', {
      detail: {
        id,
        width,
        height
      }
    });
    document.dispatchEvent(event);
    
    // Close the size menu
    setShowSizeMenu(false);
  }, [id, nodeData, text]);

  return (
    <>
      {/* Node resizer */}
      <NodeResizer 
        minWidth={100}
        minHeight={50}
        isVisible={selected}
        lineClassName="node-resizer-line"
        handleClassName="node-resizer-handle"
      />
      
      {/* Connection handles */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      
      {/* Note container */}
      <div className={`note-node ${selected ? 'selected' : ''}`} ref={nodeRef}>
        {/* Node header */}
        <div className="note-node-header">
          <h3 className="note-node-title">{nodeData.label || `Note ${id}`}</h3>
          <div className="note-node-controls">
            <button 
              className="note-node-size"
              onClick={handleSizeMenuToggle}
              title="Resize"
              aria-label="Open resize menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6"></path>
                <path d="M9 21H3v-6"></path>
                <path d="M21 3l-7 7"></path>
                <path d="M3 21l7-7"></path>
              </svg>
            </button>
            <button 
              className="note-node-delete"
              onClick={handleDelete}
              title="Delete"
              aria-label="Delete node"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Note content */}
        <div className="note-node-content">
          {isEditing ? (
            <textarea
              ref={textareaRef}
              className="note-textarea"
              value={text}
              onChange={handleTextChange}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={(e) => e.stopPropagation()}
              aria-label="Note content"
            />
          ) : (
            <div 
              className="note-textarea" 
              onClick={toggleEditMode}
              role="button"
              tabIndex={0}
              aria-label="Click to edit note"
            >
              {text || 'Click to edit'}
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom handle for connections */}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
      
      {/* Size menu - absolutely positioned to the right edge of the node */}
      {showSizeMenu && (
        <div className="note-size-menu" role="dialog" aria-label="Node size options">
          <div className="note-size-menu-header">
            Note Size
          </div>
          <div className="note-size-menu-options">
            {sizePresets.map((preset) => (
              <button 
                key={preset.name}
                className="note-size-menu-option"
                onClick={() => applySize(preset.width, preset.height)}
              >
                {preset.name} ({preset.width}×{preset.height})
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NoteNode;
