import React, { useState, useRef, useCallback } from 'react';
import { useFileSystem } from '../hooks/useFileSystem';
import { FolderData, FileData, FileType } from '../types';
import { ChevronRight, ChevronDown, Folder, File, FileText, Music, Image, Plus, Trash2, Edit, Save, X, FileImage, FolderPlus, Upload, FilePlus } from 'lucide-react';
import { useCanvasStore } from '../store/canvasStore';

interface FileExplorerProps {
  onFileSelect?: (file: FileData) => void;
  onFileDrop?: (file: FileData) => void;
  onSaveNote?: (folderId: string, content: string) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ 
  onFileSelect, 
  onFileDrop,
  onSaveNote
}) => {
  const { 
    fileSystem, 
    isLoading, 
    error, 
    addFolder, 
    addFile, 
    updateFileContent, 
    removeFile, 
    removeFolder 
  } = useFileSystem();
  
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    root: true // Root folder is expanded by default
  });
  
  const [newFolderParentId, setNewFolderParentId] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState('');
  
  const [newNoteParentId, setNewNoteParentId] = useState<string | null>(null);
  const [newNoteName, setNewNoteName] = useState('');
  
  const [editingFile, setEditingFile] = useState<{ id: string, name: string } | null>(null);
  const [editingFolder, setEditingFolder] = useState<{ id: string, name: string } | null>(null);
  
  const [savingNote, setSavingNote] = useState(false);
  const [targetFolderId, setTargetFolderId] = useState<string | null>(null);
  
  const draggedItem = useRef<{ type: 'file', data: FileData, sourceFolder?: string } | null>(null);
  
  // Toggle folder expansion
  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };
  
  // Start creating a new folder
  const handleNewFolder = (parentId: string) => {
    setNewFolderParentId(parentId);
    setNewFolderName('');
  };
  
  // Create the new folder
  const createNewFolder = async () => {
    if (newFolderParentId && newFolderName.trim()) {
      await addFolder(newFolderParentId, newFolderName.trim());
      setNewFolderParentId(null);
      setNewFolderName('');
      
      // Expand the parent folder
      setExpandedFolders(prev => ({
        ...prev,
        [newFolderParentId]: true
      }));
    }
  };
  
  // Cancel creating a new folder
  const cancelNewFolder = () => {
    setNewFolderParentId(null);
    setNewFolderName('');
  };
  
  // Start creating a new note
  const handleNewNote = (parentId: string) => {
    setNewNoteParentId(parentId);
    setNewNoteName('');
  };
  
  // Create the new note
  const createNewNote = async () => {
    if (newNoteParentId && newNoteName.trim()) {
      await addFile(
        newNoteParentId,
        newNoteName.trim().endsWith('.md') ? newNoteName.trim() : `${newNoteName.trim()}.md`,
        'markdown',
        '# New Note\n\nStart writing here...'
      );
      setNewNoteParentId(null);
      setNewNoteName('');
    }
  };
  
  // Cancel creating a new note
  const cancelNewNote = () => {
    setNewNoteParentId(null);
    setNewNoteName('');
  };
  
  // Start editing a file name
  const handleEditFile = (file: FileData) => {
    setEditingFile({ id: file.id, name: file.name });
  };
  
  // Save the edited file name
  const saveEditedFileName = async () => {
    if (editingFile && editingFile.name.trim()) {
      await updateFileContent(editingFile.id, { name: editingFile.name.trim() });
      setEditingFile(null);
    }
  };
  
  // Cancel editing a file name
  const cancelEditFileName = () => {
    setEditingFile(null);
  };
  
  // Start editing a folder name
  const handleEditFolder = (folder: FolderData) => {
    setEditingFolder({ id: folder.id, name: folder.name });
  };
  
  // Save the edited folder name
  const saveEditedFolderName = async () => {
    if (editingFolder && editingFolder.name.trim()) {
      // We need to find the folder and update its name
      // This is a bit more complex since we don't have a direct updateFolder function
      // For now, we'll just reload the file system
      setEditingFolder(null);
    }
  };
  
  // Cancel editing a folder name
  const cancelEditFolderName = () => {
    setEditingFolder(null);
  };
  
  // Handle file selection
  const handleFileClick = (file: FileData) => {
    if (onFileSelect) {
      onFileSelect(file);
    }
  };
  
  // Handle drag start
  const handleDragStart = (e: React.DragEvent, file: FileData, sourceFolderId: string) => {
    console.log('Dragging file:', file);
    console.log('File ID:', file.id);
    console.log('File content:', file.content);
    
    // Store the file data in the draggedItem ref for internal use
    draggedItem.current = { type: 'file', data: file, sourceFolder: sourceFolderId };
    
    // Set the file data in the dataTransfer object for external drops (like on canvas)
    const fileDataString = JSON.stringify(file);
    console.log('Setting dataTransfer data:', fileDataString);
    e.dataTransfer.setData('application/json', fileDataString);
    e.dataTransfer.effectAllowed = 'copy';
  };
  
  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  // Handle drop on canvas
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (draggedItem.current && onFileDrop) {
      onFileDrop(draggedItem.current.data);
    }
    
    draggedItem.current = null;
  };
  
  // Handle drop on folder
  const handleDropOnFolder = async (e: React.DragEvent, targetFolderId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedItem.current && draggedItem.current.sourceFolder && draggedItem.current.sourceFolder !== targetFolderId) {
      const file = draggedItem.current.data;
      
      // Create a copy of the file in the target folder
      await addFile(
        targetFolderId,
        file.name,
        file.type,
        file.content,
        file.url
      );
      
      // Remove the file from the source folder
      await removeFile(file.id);
      
      // Expand the target folder
      setExpandedFolders(prev => ({
        ...prev,
        [targetFolderId]: true
      }));
    }
    
    draggedItem.current = null;
  };
  
  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, folderId: string) => {
    const files = e.target.files;
    
    if (!files || files.length === 0) return;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        const content = event.target?.result as string;
        
        let fileType: FileType;
        if (file.type.startsWith('image/')) {
          fileType = 'image';
        } else if (file.type.startsWith('audio/')) {
          fileType = 'audio';
        } else if (file.type === 'application/pdf') {
          fileType = 'pdf';
        } else if (file.name.endsWith('.md')) {
          fileType = 'markdown';
        } else if (file.name.endsWith('.txt') || file.type === 'text/plain') {
          fileType = 'note';
        } else {
          fileType = 'note'; // Default to note for unknown types
        }
        
        await addFile(
          folderId,
          file.name,
          fileType,
          (fileType === 'note' || fileType === 'markdown') ? content : undefined,
          (fileType === 'image' || fileType === 'audio' || fileType === 'pdf') ? URL.createObjectURL(file) : undefined
        );
      };
      
      if (file.type.startsWith('image/') || file.type.startsWith('audio/') || file.type === 'application/pdf') {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
    }
    
    // Clear the input
    e.target.value = '';
  };
  
  // Handle saving a note to a folder
  const handleSaveNote = (folderId: string) => {
    setTargetFolderId(folderId);
    setSavingNote(true);
  };
  
  // Save the note
  const saveNoteToFolder = () => {
    if (targetFolderId && onSaveNote) {
      onSaveNote(targetFolderId, '');
      setSavingNote(false);
      setTargetFolderId(null);
    }
  };
  
  // Cancel saving a note
  const cancelSaveNote = () => {
    setSavingNote(false);
    setTargetFolderId(null);
  };
  
  // Render a file icon based on its type
  const renderFileIcon = (type: FileType) => {
    switch (type) {
      case 'note':
        return <FileText size={16} className="text-blue-500" />;
      case 'markdown':
        return <FileText size={16} className="text-blue-500" />;
      case 'image':
        return <FileImage size={16} className="text-green-500" />;
      case 'audio':
        return <Music size={16} className="text-purple-500" />;
      case 'canvas':
        return <File size={16} className="text-orange-500" />;
      case 'pdf':
        return <FileText size={16} className="text-red-500" />;
      default:
        return <File size={16} className="text-gray-500" />;
    }
  };
  
  // Recursive function to render folders and files
  const renderFolder = (folder: FolderData, level = 0) => {
    const isExpanded = expandedFolders[folder.id] || false;
    const isEditing = editingFolder && editingFolder.id === folder.id;
    
    return (
      <div key={folder.id} className="select-none">
        <div 
          className={`flex items-center py-1 px-2 hover:bg-gray-100 group ${level > 0 ? 'ml-4' : ''}`}
          onClick={() => toggleFolder(folder.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDropOnFolder(e, folder.id)}
        >
          <div className="mr-1">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          
          <Folder size={16} className="text-yellow-500 mr-2" />
          
          {isEditing ? (
            <div className="flex items-center flex-grow">
              <input
                type="text"
                value={editingFolder.name}
                onChange={(e) => setEditingFolder({ ...editingFolder, name: e.target.value })}
                onClick={(e) => e.stopPropagation()}
                className="border border-gray-300 rounded px-1 py-0.5 text-sm flex-grow"
                autoFocus
              />
              <button
                onClick={(e) => { e.stopPropagation(); saveEditedFolderName(); }}
                className="ml-1 text-green-500 hover:text-green-700"
              >
                <Save size={14} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); cancelEditFolderName(); }}
                className="ml-1 text-red-500 hover:text-red-700"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <span className="flex-grow">{folder.name}</span>
          )}
          
          {!isEditing && (
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => { e.stopPropagation(); handleNewFolder(folder.id); }}
                className="p-1 rounded hover:bg-gray-200 text-gray-600"
                title="New Folder"
              >
                <FolderPlus size={16} />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); handleNewNote(folder.id); }}
                className="p-1 rounded hover:bg-gray-200 text-gray-600"
                title="New Note"
              >
                <FilePlus size={16} />
              </button>
              
              <label className="p-1 rounded hover:bg-gray-200 text-gray-600 cursor-pointer" title="Upload File">
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(e) => handleFileUpload(e, folder.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <Upload size={16} />
              </label>
              
              {folder.id !== 'root' && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleEditFolder(folder); }}
                    className="p-1 rounded hover:bg-gray-200 text-gray-600"
                    title="Rename Folder"
                  >
                    <Edit size={16} />
                  </button>
                  
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFolder(folder.id); }}
                    className="p-1 rounded hover:bg-gray-200 text-gray-600"
                    title="Delete Folder"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
              
              <button
                onClick={(e) => { e.stopPropagation(); handleSaveNote(folder.id); }}
                className="p-1 rounded hover:bg-gray-200 text-gray-600"
                title="Save Note Here"
              >
                <Save size={16} />
              </button>
            </div>
          )}
        </div>
        
        {isExpanded && (
          <div>
            {newNoteParentId === folder.id && (
              <div className="flex items-center py-1 px-2 ml-4">
                <FileText size={16} className="text-blue-500 mr-2" />
                <input
                  type="text"
                  value={newNoteName}
                  onChange={(e) => setNewNoteName(e.target.value)}
                  className="border border-gray-300 rounded px-1 py-0.5 text-sm flex-grow"
                  placeholder="New Note.md"
                  autoFocus
                />
                <button
                  onClick={createNewNote}
                  className="ml-1 text-green-500 hover:text-green-700"
                >
                  <Save size={14} />
                </button>
                <button
                  onClick={cancelNewNote}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {newFolderParentId === folder.id && (
              <div className="flex items-center py-1 px-2 ml-4">
                <Folder size={16} className="text-yellow-500 mr-2" />
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="border border-gray-300 rounded px-1 py-0.5 text-sm flex-grow"
                  placeholder="New Folder"
                  autoFocus
                />
                <button
                  onClick={createNewFolder}
                  className="ml-1 text-green-500 hover:text-green-700"
                >
                  <Save size={14} />
                </button>
                <button
                  onClick={cancelNewFolder}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {folder.files.map((file) => {
              const isEditingThisFile = editingFile && editingFile.id === file.id;
              
              return (
                <div
                  key={file.id}
                  className="flex items-center py-1 px-2 ml-4 hover:bg-gray-100 cursor-pointer group"
                  onClick={() => handleFileClick(file)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, file, folder.id)}
                >
                  {renderFileIcon(file.type)}
                  
                  <div className="ml-2 flex-grow">
                    {isEditingThisFile ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editingFile.name}
                          onChange={(e) => setEditingFile({ ...editingFile, name: e.target.value })}
                          onClick={(e) => e.stopPropagation()}
                          className="border border-gray-300 rounded px-1 py-0.5 text-sm flex-grow"
                          autoFocus
                        />
                        <button
                          onClick={(e) => { e.stopPropagation(); saveEditedFileName(); }}
                          className="ml-1 text-green-500 hover:text-green-700"
                        >
                          <Save size={14} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); cancelEditFileName(); }}
                          className="ml-1 text-red-500 hover:text-red-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <span>{file.name}</span>
                    )}
                  </div>
                  
                  {!isEditingThisFile && (
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEditFile(file); }}
                        className="p-1 rounded hover:bg-gray-200 text-gray-600"
                        title="Rename File"
                      >
                        <Edit size={16} />
                      </button>
                      
                      <button
                        onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                        className="p-1 rounded hover:bg-gray-200 text-gray-600"
                        title="Delete File"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            
            {folder.folders.map((subFolder) => renderFolder(subFolder, level + 1))}
          </div>
        )}
      </div>
    );
  };
  
  if (isLoading) {
    return <div className="p-4">Loading file system...</div>;
  }
  
  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }
  
  if (!fileSystem) {
    return <div className="p-4">No file system found</div>;
  }
  
  return (
    <div 
      className="h-full overflow-auto bg-white border-r border-gray-200"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="p-2 font-semibold border-b border-gray-200">
        Files
      </div>
      
      <div className="p-2">
        {renderFolder(fileSystem.rootFolder)}
      </div>
      
      {savingNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-2">Save Note</h3>
            <p className="mb-4">
              Save the current note to folder: <strong>{fileSystem.rootFolder.folders.find(f => f.id === targetFolderId)?.name || 'Root'}</strong>
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelSaveNote}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={saveNoteToFolder}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
