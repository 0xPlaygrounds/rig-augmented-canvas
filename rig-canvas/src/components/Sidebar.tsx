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
      <div className="h-full flex flex-col bg-gray-100 border-r border-gray-200 w-10">
        <button
          onClick={toggleCollapse}
          className="p-2 hover:bg-gray-200 text-gray-600 flex justify-center"
          title="Expand Sidebar"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200" style={{ width: `${sidebarWidth}px` }}>
      <div className="flex justify-between items-center p-2 border-b border-gray-200 bg-gray-50">
        <div className="font-semibold">Rig Canvas</div>
        <button
          onClick={toggleCollapse}
          className="p-1 hover:bg-gray-200 text-gray-600 rounded"
          title="Collapse Sidebar"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
      
      <div className="absolute top-0 right-0 bottom-0 w-1 cursor-ew-resize" 
           style={{ transform: 'translateX(50%)' }}
           onMouseDown={(e) => {
             e.preventDefault();
             const startX = e.clientX;
             const startWidth = sidebarWidth;
             
             const handleMouseMove = (moveEvent: MouseEvent) => {
               const deltaX = moveEvent.clientX - startX;
               handleResize(startWidth + deltaX);
             };
             
             const handleMouseUp = () => {
               document.removeEventListener('mousemove', handleMouseMove);
               document.removeEventListener('mouseup', handleMouseUp);
             };
             
             document.addEventListener('mousemove', handleMouseMove);
             document.addEventListener('mouseup', handleMouseUp);
           }}
      />
      
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-2 px-4 ${activeTab === 'files' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setActiveTab('files')}
        >
          Files
        </button>
        <button
          className={`flex-1 py-2 px-4 ${activeTab === 'canvases' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
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
          <div className="p-2 flex justify-between items-center border-b border-gray-200">
            <div className="font-semibold">Canvases</div>
            <button
              onClick={handleNewCanvas}
              className="p-1 hover:bg-gray-200 text-green-600 rounded"
              title="New Canvas"
            >
              <Plus size={18} />
            </button>
          </div>
          
          <div className="p-2">
            {isCreatingCanvas && (
              <div className="flex items-center py-1 px-2 mb-2 border border-gray-200 rounded">
                <FileText size={16} className="text-orange-500 mr-2" />
                <input
                  type="text"
                  value={newCanvasName}
                  onChange={(e) => setNewCanvasName(e.target.value)}
                  className="border border-gray-300 rounded px-1 py-0.5 text-sm flex-grow"
                  placeholder="New Canvas"
                  autoFocus
                />
                <button
                  onClick={createNewCanvas}
                  className="ml-1 text-green-500 hover:text-green-700"
                >
                  <Save size={14} />
                </button>
                <button
                  onClick={cancelNewCanvas}
                  className="ml-1 text-red-500 hover:text-red-700"
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
                  className={`flex items-center py-2 px-2 mb-1 rounded cursor-pointer ${
                    isActive ? 'bg-blue-100 border border-blue-300' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleCanvasSelect(canvas.id)}
                >
                  <FileText size={16} className="text-orange-500 mr-2" />
                  
                  {isEditing ? (
                    <div className="flex items-center flex-grow">
                      <input
                        type="text"
                        value={editingCanvas.name}
                        onChange={(e) => setEditingCanvas({ ...editingCanvas, name: e.target.value })}
                        onClick={(e) => e.stopPropagation()}
                        className="border border-gray-300 rounded px-1 py-0.5 text-sm flex-grow"
                        autoFocus
                      />
                      <button
                        onClick={(e) => { e.stopPropagation(); saveEditedCanvasName(); }}
                        className="ml-1 text-green-500 hover:text-green-700"
                      >
                        <Save size={14} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); cancelEditCanvasName(); }}
                        className="ml-1 text-red-500 hover:text-red-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="flex-grow truncate">{canvas.name}</span>
                      
                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEditCanvas(canvas); }}
                          className="text-blue-500 hover:text-blue-700"
                          title="Rename Canvas"
                        >
                          <Edit size={16} />
                        </button>
                        
                        {!isActive && (
                          <button
                            onClick={(e) => { e.stopPropagation(); removeCanvas(canvas.id); }}
                            className="text-red-500 hover:text-red-700"
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
