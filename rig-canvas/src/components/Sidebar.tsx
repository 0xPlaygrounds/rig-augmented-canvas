import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2, Edit, Save, X, FileText, FolderPlus, Upload } from 'lucide-react';
import ResizeHandle from './ResizeHandle';
import FileExplorer from './FileExplorer';
import { useCanvasPersistence } from '../hooks/useCanvasPersistence';
import { useFileSystem } from '../hooks/useFileSystem';
import { FileData, CanvasData } from '../types';
import { useCanvasStore } from '../store/canvasStore';

interface SidebarProps {
  onFileSelect: (file: FileData) => void;
  onFileDrop: (file: FileData) => void;
  onCanvasSelect: (canvasId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onFileSelect, onFileDrop, onCanvasSelect }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
  
  // Toggle sidebar collapse
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  // Handle canvas selection
  const handleCanvasSelect = (canvasId: string) => {
    loadCanvas(canvasId);
    onCanvasSelect(canvasId);
  };
  
  // Start creating a new canvas
  const handleNewCanvas = () => {
    setIsCreatingCanvas(true);
    setNewCanvasName('');
  };
  
  // Create the new canvas
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
  
  // Cancel creating a new canvas
  const cancelNewCanvas = () => {
    setIsCreatingCanvas(false);
    setNewCanvasName('');
  };
  
  // Start editing a canvas name
  const handleEditCanvas = (canvas: CanvasData) => {
    setEditingCanvas({ id: canvas.id, name: canvas.name });
  };
  
  // Save the edited canvas name
  const saveEditedCanvasName = async () => {
    if (editingCanvas && editingCanvas.name.trim()) {
      // We need to update the canvas name
      // For now, we'll just reload the canvases
      setEditingCanvas(null);
    }
  };
  
  // Cancel editing a canvas name
  const cancelEditCanvasName = () => {
    setEditingCanvas(null);
  };
  
  // Handle saving a note to a folder
  const handleSaveNote = async (folderId: string, content: string) => {
    // Find the selected node (if any)
    const selectedNode = nodes.find(node => node.selected);
    
    if (selectedNode) {
      const noteContent = selectedNode.data.content || '';
      
      // Create a new file in the folder
      await addFile(
        folderId,
        `Note ${new Date().toLocaleString()}`,
        'note',
        noteContent
      );
    }
  };
  
  const handleResize = (newWidth: number) => {
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setSidebarWidth(newWidth);
    }
  };

  if (isCollapsed) {
    return (
      <div className="h-full flex flex-col bg-bg-secondary border-r border-border-primary w-sidebar-collapsed">
        <button
          onClick={toggleCollapse}
          className="p-2 hover:bg-bg-tertiary text-text-secondary flex justify-center transition-colors"
          title="Expand Sidebar"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col bg-bg-secondary border-r border-border-primary relative" style={{ width: `${sidebarWidth}px` }}>
      <div className="flex justify-between items-center p-3 border-b border-border-primary">
        <div className="font-semibold text-text-primary flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-accent-primary to-purple-500 rounded-md flex items-center justify-center text-white">
            R
          </div>
          Rig Canvas
        </div>
        <button
          onClick={toggleCollapse}
          className="p-1 hover:bg-bg-tertiary text-text-secondary rounded transition-colors"
          title="Collapse Sidebar"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
      
      {/* Resize handle - positioned exactly on the border */}
      <div 
        className="absolute top-0 right-0 bottom-0 w-2 cursor-ew-resize z-50 hover:bg-accent-primary transition-colors"
        style={{ transform: 'translateX(1px)' }}
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
      
      <div className="flex border-b border-border-primary">
        <button
          className={`flex-1 py-2 px-4 font-medium text-sm ${
            activeTab === 'files' 
              ? 'bg-accent-primary text-white' 
              : 'bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80'
          } transition-colors`}
          onClick={() => setActiveTab('files')}
        >
          Files
        </button>
        <button
          className={`flex-1 py-2 px-4 font-medium text-sm ${
            activeTab === 'canvases' 
              ? 'bg-accent-primary text-white' 
              : 'bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80'
          } transition-colors`}
          onClick={() => setActiveTab('canvases')}
        >
          Canvases
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
          <div className="p-3 flex justify-between items-center border-b border-border-primary">
            <div className="font-medium text-text-primary">Canvases</div>
            <button
              onClick={handleNewCanvas}
              className="p-1 hover:bg-bg-tertiary text-accent-primary rounded transition-colors"
              title="New Canvas"
            >
              <Plus size={18} />
            </button>
          </div>
          
          <div className="p-3">
            {isCreatingCanvas && (
              <div className="flex items-center py-2 px-3 mb-2 border border-border-secondary rounded bg-bg-tertiary">
                <FileText size={16} className="text-accent-primary mr-2" />
                <input
                  type="text"
                  value={newCanvasName}
                  onChange={(e) => setNewCanvasName(e.target.value)}
                  className="bg-bg-secondary border border-border-secondary rounded px-2 py-1 text-sm flex-grow text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                  placeholder="New Canvas"
                  autoFocus
                />
                <button
                  onClick={createNewCanvas}
                  className="ml-2 text-accent-primary hover:text-accent-hover"
                >
                  <Save size={14} />
                </button>
                <button
                  onClick={cancelNewCanvas}
                  className="ml-1 text-text-tertiary hover:text-text-secondary"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {availableCanvases.map((canvas) => {
              const isActive = canvas.id === currentCanvasId;
              const isEditing = editingCanvas && editingCanvas.id === canvas.id;
              
              return (
                <div
                  key={canvas.id}
                  className={`flex items-center py-2 px-3 mb-2 rounded cursor-pointer group ${
                    isActive 
                      ? 'bg-bg-tertiary border border-accent-primary' 
                      : 'hover:bg-bg-tertiary border border-transparent'
                  } transition-colors`}
                  onClick={() => handleCanvasSelect(canvas.id)}
                >
                  <FileText size={16} className="text-accent-primary mr-2" />
                  
                  {isEditing ? (
                    <div className="flex items-center flex-grow">
                      <input
                        type="text"
                        value={editingCanvas.name}
                        onChange={(e) => setEditingCanvas({ ...editingCanvas, name: e.target.value })}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-bg-secondary border border-border-secondary rounded px-2 py-1 text-sm flex-grow text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                        autoFocus
                      />
                      <button
                        onClick={(e) => { e.stopPropagation(); saveEditedCanvasName(); }}
                        className="ml-2 text-accent-primary hover:text-accent-hover"
                      >
                        <Save size={14} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); cancelEditCanvasName(); }}
                        className="ml-1 text-text-tertiary hover:text-text-secondary"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="flex-grow truncate text-text-primary">{canvas.name}</span>
                      
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEditCanvas(canvas); }}
                          className="p-1 rounded hover:bg-bg-secondary text-text-tertiary hover:text-text-secondary transition-colors"
                          title="Rename Canvas"
                        >
                          <Edit size={16} />
                        </button>
                        
                        {!isActive && (
                          <button
                            onClick={(e) => { e.stopPropagation(); removeCanvas(canvas.id); }}
                            className="p-1 rounded hover:bg-bg-secondary text-text-tertiary hover:text-text-secondary transition-colors"
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
