/**
 * Sidebar Component
 * 
 * A collapsible sidebar that provides navigation between files and canvases.
 * Includes file explorer, canvas management, and resizing capabilities.
 * 
 * Features:
 * - File browser with drag-and-drop support
 * - Canvas creation, selection, and management
 * - Collapsible interface to maximize workspace
 * - Resizable width for user preference
 */

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  FileText 
} from 'lucide-react';

// Components
import { FileExplorer } from '../features/file-explorer';

// Hooks
import { useCanvasPersistence, useCanvasStore } from '../features/canvas';
import { useFileSystem } from '../features/file-explorer';

// Types
import { FileData, CanvasData } from '../types';

/**
 * Props for the Sidebar component
 */
interface SidebarProps {
  /** Callback when a file is selected */
  onFileSelect: (file: FileData) => void;
  /** Callback when a file is dragged and dropped */
  onFileDrop: (file: FileData) => void;
  /** Callback when a canvas is selected */
  onCanvasSelect: (canvasId: string) => void;
  /** Callback when the sidebar is toggled (collapsed/expanded) */
  onToggle?: () => void;
  /** Whether the sidebar is in collapsed state (narrow) */
  isCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onFileSelect, 
  onFileDrop, 
  onCanvasSelect, 
  onToggle,
  isCollapsed = false
}) => {
  // Use the provided isCollapsed prop
  const [sidebarWidth, setSidebarWidth] = useState(256); // Default width: 256px
  const minWidth = 200;
  const maxWidth = 500;
  const [activeTab, setActiveTab] = useState<'files' | 'canvases'>('files');
  const [isCreatingCanvas, setIsCreatingCanvas] = useState(false);
  const [newCanvasName, setNewCanvasName] = useState('');
  const [editingCanvas, setEditingCanvas] = useState<{ id: string, name: string } | null>(null);
  
  const { 
    currentCanvasId, 
    availableCanvases, 
    loadCanvas, 
    createCanvas, 
    removeCanvas 
  } = useCanvasPersistence();
  
  const { addFile } = useFileSystem();
  const { nodes } = useCanvasStore();
  
  /**
   * Toggles the sidebar between collapsed and expanded states
   */
  const toggleCollapse = () => {
    // Call the external toggle callback if provided
    if (onToggle) {
      onToggle();
    }
    // Note: The collapsed state is now controlled by the parent component
  };
  
  /**
   * Handles selection of a canvas from the list
   * Loads the canvas and notifies parent component
   */
  const handleCanvasSelect = (canvasId: string) => {
    loadCanvas(canvasId);
    onCanvasSelect(canvasId);
  };
  
  /**
   * Initiates the canvas creation UI
   */
  const handleNewCanvas = () => {
    setIsCreatingCanvas(true);
    setNewCanvasName('');
  };
  
  /**
   * Creates a new canvas with the provided name
   * and selects it automatically
   */
  const createNewCanvas = async () => {
    if (newCanvasName.trim()) {
      const canvasId = await createCanvas(newCanvasName.trim());
      if (canvasId) {
        handleCanvasSelect(canvasId);
      }
      setIsCreatingCanvas(false);
      setNewCanvasName('');
    }
  };
  
  /**
   * Cancels the new canvas creation process
   */
  const cancelNewCanvas = () => {
    setIsCreatingCanvas(false);
    setNewCanvasName('');
  };
  
  /**
   * Initiates editing of a canvas name
   */
  const handleEditCanvas = (canvas: CanvasData) => {
    setEditingCanvas({ id: canvas.id, name: canvas.name });
  };
  
  /**
   * Saves the updated canvas name
   */
  const saveEditedCanvasName = async () => {
    if (editingCanvas && editingCanvas.name.trim()) {
      // We need to update the canvas name
      // For now, we'll just reload the canvases
      setEditingCanvas(null);
    }
  };
  
  /**
   * Cancels the canvas name editing process
   */
  const cancelEditCanvasName = () => {
    setEditingCanvas(null);
  };
  
  /**
   * Saves the content of a selected note to a folder
   * Creates a new file in the specified folder
   */
  const handleSaveNote = async (folderId: string, content: string) => {
    // Find the selected node (if any)
    const selectedNode = nodes.find(node => node.selected);
    
    if (selectedNode && selectedNode.data) {
      const noteContent = typeof selectedNode.data.content === 'string' ? selectedNode.data.content : '';
      
      // Create a new file in the folder
      await addFile(
        folderId,
        `Note ${new Date().toLocaleString()}`,
        'note',
        noteContent
      );
    }
  };
  
  /**
   * Handles resize of the sidebar width
   * Ensures width stays within min/max constraints
   */
  const handleResize = (newWidth: number) => {
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setSidebarWidth(newWidth);
    }
  };

  if (isCollapsed) {
    return (
      <div className="h-full flex flex-col bg-node-bg border-r border-node-border w-sidebar-collapsed transition-all duration-300 shadow-node">
        <button
          onClick={toggleCollapse}
          className="p-3 hover:bg-bg-tertiary hover:text-accent-primary text-text-secondary flex justify-center items-center transition-all rounded-md m-2"
          title="Expand Sidebar"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col bg-node-bg border-r border-node-border relative shadow-node transition-all duration-300" style={{ width: `${sidebarWidth}px` }}>
      <div className="flex justify-between items-center p-3 border-b border-node-border bg-bg-secondary">
        <div className="font-semibold text-text-primary flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-accent-primary to-purple-500 rounded-md flex items-center justify-center text-white shadow-sm">
            R
          </div>
          <span className="text-lg">Rig Canvas</span>
        </div>
        <button
          onClick={toggleCollapse}
          className="p-1.5 hover:bg-bg-tertiary text-text-secondary rounded-md transition-all hover:text-accent-primary"
          title="Collapse Sidebar"
        >
          <ChevronLeft size={18} />
        </button>
      </div>
      
      {/* Resize handle - styled like node resizer */}
      <div className="absolute top-0 right-0 bottom-0 w-1 cursor-ew-resize z-50 transition-all group hover:w-2 hover:bg-accent-primary/20"
        style={{ transform: 'translateX(0)' }}
        onMouseDown={(e) => {
          e.preventDefault();
          const startX = e.clientX;
          const startWidth = sidebarWidth;
          
          // Add active resize class to body
          document.body.classList.add('resizing');
          
          const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - startX;
            handleResize(startWidth + deltaX);
          };
          
          const handleMouseUp = () => {
            // Remove active resize class from body
            document.body.classList.remove('resizing');
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
          };
          
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }}
      />
      
      <div className="flex border-b border-node-border bg-bg-secondary">
        <button
          className={`flex-1 py-2.5 px-4 font-medium text-sm relative ${
            activeTab === 'files' 
              ? 'text-accent-primary' 
              : 'text-text-secondary hover:text-text-primary'
          } transition-all`}
          onClick={() => setActiveTab('files')}
        >
          Files
          {activeTab === 'files' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-primary"></div>
          )}
        </button>
        <button
          className={`flex-1 py-2.5 px-4 font-medium text-sm relative ${
            activeTab === 'canvases' 
              ? 'text-accent-primary' 
              : 'text-text-secondary hover:text-text-primary'
          } transition-all`}
          onClick={() => setActiveTab('canvases')}
        >
          Canvases
          {activeTab === 'canvases' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-primary"></div>
          )}
        </button>
      </div>
      
      {activeTab === 'files' ? (
        <div className="flex-grow overflow-hidden">
          <FileExplorer 
            onFileSelect={onFileSelect} 
            onFileDrop={onFileDrop}
            onSaveNote={handleSaveNote}
          />
        </div>
      ) : (
        <div className="flex-grow overflow-auto">
          <div className="flex justify-between items-center p-3 bg-bg-secondary border-b border-node-border">
            <div className="font-medium text-text-primary flex items-center">
              <span className="text-sm">Your Canvases</span>
            </div>
            <button
              onClick={handleNewCanvas}
              className="p-1.5 hover:bg-bg-tertiary text-accent-primary rounded-md transition-all hover:scale-105"
              title="New Canvas"
            >
              <Plus size={18} />
            </button>
          </div>
          
          <div className="p-3">
            {isCreatingCanvas && (
              <div className="flex items-center py-3 px-4 mb-3 border border-node-border rounded-md shadow-sm bg-bg-secondary">
                <FileText size={16} className="text-accent-primary mr-3" />
                <input
                  type="text"
                  value={newCanvasName}
                  onChange={(e) => setNewCanvasName(e.target.value)}
                  className="bg-bg-tertiary/30 border border-node-border rounded-md px-3 py-1.5 text-sm flex-grow text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                  placeholder="Canvas name..."
                  autoFocus
                />
                <button
                  onClick={createNewCanvas}
                  className="ml-2 text-accent-primary hover:text-accent-hover p-1.5 hover:bg-bg-tertiary rounded-md transition-all"
                >
                  <Save size={16} />
                </button>
                <button
                  onClick={cancelNewCanvas}
                  className="ml-1 text-text-tertiary hover:text-text-secondary p-1.5 hover:bg-bg-tertiary rounded-md transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            
            {availableCanvases.map((canvas) => {
              const isActive = canvas.id === currentCanvasId;
              const isEditing = editingCanvas && editingCanvas.id === canvas.id;
              
              return (
                <div
                  key={canvas.id}
                  className={`flex items-center py-2.5 px-3 mb-3 rounded-md cursor-pointer group transition-all shadow-sm ${
                    isActive 
                      ? 'bg-bg-secondary border border-accent-primary' 
                      : 'bg-bg-secondary/40 border border-node-border hover:border-node-border-selected hover:bg-bg-secondary'
                  }`}
                  onClick={() => handleCanvasSelect(canvas.id)}
                >
                  <FileText size={18} className={`mr-3 ${isActive ? 'text-accent-primary' : 'text-text-secondary group-hover:text-accent-primary'}`} />
                  
                  {isEditing ? (
                    <div className="flex items-center flex-grow">
                      <input
                        type="text"
                        value={editingCanvas.name}
                        onChange={(e) => setEditingCanvas({ ...editingCanvas, name: e.target.value })}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-bg-tertiary/30 border border-node-border rounded-md px-3 py-1.5 text-sm flex-grow text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                        autoFocus
                      />
                      <button
                        onClick={(e) => { e.stopPropagation(); saveEditedCanvasName(); }}
                        className="ml-2 text-accent-primary hover:text-accent-hover p-1.5 hover:bg-bg-tertiary rounded-md transition-all"
                      >
                        <Save size={16} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); cancelEditCanvasName(); }}
                        className="ml-1 text-text-tertiary hover:text-text-secondary p-1.5 hover:bg-bg-tertiary rounded-md transition-all"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="flex-grow truncate text-text-primary font-medium">{canvas.name}</span>
                      
                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEditCanvas(canvas); }}
                          className="p-1.5 rounded-md hover:bg-bg-tertiary text-text-tertiary hover:text-text-primary transition-all"
                          title="Rename Canvas"
                        >
                          <Edit size={15} />
                        </button>
                        
                        {!isActive && (
                          <button
                            onClick={(e) => { e.stopPropagation(); removeCanvas(canvas.id); }}
                            className="p-1.5 rounded-md hover:bg-bg-tertiary text-text-tertiary hover:text-accent-primary transition-all"
                            title="Delete Canvas"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
