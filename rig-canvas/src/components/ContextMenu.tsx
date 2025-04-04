import React from 'react';
import { Plus, Trash2, Link, Unlink, Edit } from 'lucide-react';
import { useCanvasStore } from '../store/canvasStore';
import { useReactFlow } from 'reactflow';

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
  const { removeNode, removeEdge } = useCanvasStore();
  const { project, addNodes } = useReactFlow();

  const { addNode } = useCanvasStore();

  const handleAddNote = () => {
    const id = `note-${Date.now()}`;
    const position = project({ x, y });
    
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
          <li>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              onClick={handleDeleteEdge}
            >
              <Unlink size={16} />
              <span>Delete Connection</span>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ContextMenu;
