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
  // Define sidebar widths that match the padding in App.tsx
  const EXPANDED_WIDTH = 256; // 16rem in Tailwind (pl-64)
  const COLLAPSED_WIDTH = 48; // 3rem in Tailwind (pl-12)
  
  // Use the provided isCollapsed prop
  const [sidebarWidth, setSidebarWidth] = useState(EXPANDED_WIDTH); // Default width aligned with our constant
  const minWidth = EXPANDED_WIDTH - 56; // Allow some flexibility but not too small
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
      <div className="h-full flex flex-col bg-background-secondary border-r border-border-primary w-12 transition-all duration-300 shadow-md" style={{ width: `${COLLAPSED_WIDTH}px` }}>
        <button
          onClick={toggleCollapse}
          className="p-3 hover:bg-background-tertiary hover:text-accent-primary text-foreground-secondary flex justify-center items-center transition-all rounded-md m-2"
          title="Expand Sidebar"
          aria-label="Expand Sidebar"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col bg-background-secondary border-r border-border-primary relative shadow-md transition-all duration-300" style={{ width: `${sidebarWidth}px` }}>
      <div className="flex justify-between items-center p-3 border-b border-border-primary bg-background-secondary">
        <div className="font-semibold text-foreground-primary flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-accent-primary to-purple-500 rounded-md flex items-center justify-center text-white shadow-sm">
            R
          </div>
          <span className="text-lg">Rig Canvas</span>
        </div>
        <button
          onClick={toggleCollapse}
          className="p-1.5 hover:bg-background-tertiary text-foreground-secondary rounded-md transition-all hover:text-accent-primary"
          title="Collapse Sidebar"
          aria-label="Collapse Sidebar"
        >
          <ChevronLeft size={18} />
        </button>
      </div>
      
      {/* Resize handle with improved usability */}
      <div 
        className="absolute top-0 right-0 bottom-0 w-2 cursor-ew-resize z-50 transition-colors"
        style={{ transform: 'translateX(1px)' }}
        title="Resize sidebar"
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
      >
        <div className="h-full w-0.5 bg-border-primary hover:bg-accent-primary mx-auto"></div>
      </div>
      
      <div className="flex border-b border-border-primary bg-background-secondary">
        <button
          className={`flex-1 py-2.5 px-4 font-medium text-sm relative ${
            activeTab === 'files' 
              ? 'text-accent-primary' 
              : 'text-foreground-secondary hover:text-foreground-primary'
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
              : 'text-foreground-secondary hover:text-foreground-primary'
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
          <div className="flex justify-between items-center p-3 bg-background-secondary border-b border-border-primary">
            <div className="font-medium text-foreground-primary flex items-center">
              <span className="text-sm">Your Canvases</span>
            </div>
            <button
              onClick={handleNewCanvas}
              className="explorer-add-btn"
              title="New Canvas"
              aria-label="Create new canvas"
            >
              <Plus size={18} />
            </button>
          </div>
          
          <div className="p-3">
            {isCreatingCanvas && (
              <div className="create-item-form mb-3">
                <div className="create-item-icon">
                  <FileText size={16} />
                </div>
                <input
                  type="text"
                  value={newCanvasName}
                  onChange={(e) => setNewCanvasName(e.target.value)}
                  className="explorer-input flex-grow"
                  placeholder="Canvas name..."
                  autoFocus
                />
                <div className="create-item-actions">
                  <button
                    onClick={createNewCanvas}
                    className="explorer-action-btn text-accent-success hover:text-accent-success"
                    title="Create Canvas"
                  >
                    <Save size={16} />
                  </button>
                  <button
                    onClick={cancelNewCanvas}
                    className="explorer-action-btn text-accent-destructive hover:text-accent-destructive"
                    title="Cancel"
                  >
                    <X size={16} />
                  </button>
                </div>
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
                      ? 'bg-background-secondary border border-accent-primary' 
                      : 'bg-background-secondary/40 border border-border-primary hover:border-border-secondary hover:bg-background-tertiary'
                  }`}
                  onClick={() => handleCanvasSelect(canvas.id)}
                >
                  <FileText size={18} className={`mr-3 ${isActive ? 'text-accent-primary' : 'text-foreground-secondary group-hover:text-accent-primary'}`} />
                  
                  {isEditing ? (
                    <div className="flex items-center flex-grow">
                      <input
                        type="text"
                        value={editingCanvas.name}
                        onChange={(e) => setEditingCanvas({ ...editingCanvas, name: e.target.value })}
                        onClick={(e) => e.stopPropagation()}
                        className="explorer-input flex-grow"
                        autoFocus
                      />
                      <div className="create-item-actions">
                        <button
                          onClick={(e) => { e.stopPropagation(); saveEditedCanvasName(); }}
                          className="explorer-action-btn text-accent-success hover:text-accent-success"
                          title="Save"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); cancelEditCanvasName(); }}
                          className="explorer-action-btn text-accent-destructive hover:text-accent-destructive"
                          title="Cancel"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="flex-grow truncate text-foreground-primary font-medium">{canvas.name}</span>
                      
                      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEditCanvas(canvas); }}
                          className="explorer-action-btn"
                          title="Rename Canvas"
                        >
                          <Edit size={16} />
                        </button>
                        
                        {!isActive && (
                          <button
                            onClick={(e) => { e.stopPropagation(); removeCanvas(canvas.id); }}
                            className="explorer-action-btn text-foreground-muted hover:text-accent-destructive"
                            title="Delete Canvas"
                          >
                            <Trash2 size={16} />
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
