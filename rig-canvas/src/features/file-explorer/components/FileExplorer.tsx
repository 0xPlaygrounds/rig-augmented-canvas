import React, { useState, useRef, useCallback } from 'react';
import { PlusCircle, Folder, Save, X } from 'lucide-react';
import { FolderData, FileData, FileType } from '../../../types';
import { useFileSystem } from '../';
import { FileExplorerProps } from '../types';
import { FolderItem } from './FolderItem';

/**
 * FileExplorer component provides a file explorer interface
 * with folders, files, and operations like creating, editing, deleting,
 * and drag/drop functionality
 */
export const FileExplorer: React.FC<FileExplorerProps> = ({ 
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
    removeFolder,
    renameFolder,
    addRootFolder
  } = useFileSystem();
  
  // State for creating a new root folder
  const [creatingRootFolder, setCreatingRootFolder] = useState(false);
  const [newRootFolderName, setNewRootFolderName] = useState('');
  
  // State for expanded folders
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    root: true // Root folder is expanded by default
  });
  
  // State for creating a new folder
  const [newFolderParentId, setNewFolderParentId] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState('');
  
  // State for creating a new note
  const [newNoteParentId, setNewNoteParentId] = useState<string | null>(null);
  const [newNoteName, setNewNoteName] = useState('');
  
  // State for editing files and folders
  const [editingFile, setEditingFile] = useState<{ id: string, name: string } | null>(null);
  const [editingFolder, setEditingFolder] = useState<{ id: string, name: string } | null>(null);
  
  // State for saving notes
  const [savingNote, setSavingNote] = useState(false);
  const [targetFolderId, setTargetFolderId] = useState<string | null>(null);
  
  // Ref for tracking dragged items
  const draggedItem = useRef<{ type: 'file', data: FileData, sourceFolder?: string } | null>(null);
  
  // Toggle folder expansion
  const toggleFolder = useCallback((folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  }, []);
  
  // Start creating a new folder
  const handleNewFolder = useCallback((parentId: string) => {
    setNewFolderParentId(parentId);
    setNewFolderName('');
  }, []);
  
  // Create the new folder
  const createNewFolder = useCallback(async () => {
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
  }, [addFolder, newFolderParentId, newFolderName]);
  
  // Cancel creating a new folder
  const cancelNewFolder = useCallback(() => {
    setNewFolderParentId(null);
    setNewFolderName('');
  }, []);
  
  // Start creating a new note
  const handleNewNote = useCallback((parentId: string) => {
    setNewNoteParentId(parentId);
    setNewNoteName('');
  }, []);
  
  // Create the new note
  const createNewNote = useCallback(async () => {
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
  }, [addFile, newNoteParentId, newNoteName]);
  
  // Cancel creating a new note
  const cancelNewNote = useCallback(() => {
    setNewNoteParentId(null);
    setNewNoteName('');
  }, []);
  
  // Start editing a file name
  const handleEditFile = useCallback((file: FileData) => {
    setEditingFile({ id: file.id, name: file.name });
  }, []);
  
  // Save the edited file name
  const saveEditedFileName = useCallback(async () => {
    if (editingFile && editingFile.name.trim()) {
      await updateFileContent(editingFile.id, { name: editingFile.name.trim() });
      setEditingFile(null);
    }
  }, [editingFile, updateFileContent]);
  
  // Cancel editing a file name
  const cancelEditFileName = useCallback(() => {
    setEditingFile(null);
  }, []);
  
  // Start editing a folder name
  const handleEditFolder = useCallback((folder: FolderData) => {
    setEditingFolder({ id: folder.id, name: folder.name });
  }, []);
  
  // Save the edited folder name
  const saveEditedFolderName = useCallback(async () => {
    if (editingFolder && editingFolder.name.trim()) {
      await renameFolder(editingFolder.id, editingFolder.name.trim());
      setEditingFolder(null);
    }
  }, [editingFolder, renameFolder]);
  
  // Create a new root folder
  const handleAddRootFolder = useCallback(() => {
    setCreatingRootFolder(true);
    setNewRootFolderName('');
  }, []);
  
  // Save the new root folder
  const createNewRootFolder = useCallback(async () => {
    if (newRootFolderName.trim()) {
      await addRootFolder(newRootFolderName.trim());
      setCreatingRootFolder(false);
      setNewRootFolderName('');
    }
  }, [addRootFolder, newRootFolderName]);
  
  // Cancel creating a new root folder
  const cancelNewRootFolder = useCallback(() => {
    setCreatingRootFolder(false);
    setNewRootFolderName('');
  }, []);
  
  // Cancel editing a folder name
  const cancelEditFolderName = useCallback(() => {
    setEditingFolder(null);
  }, []);
  
  // Handle file selection
  const handleFileClick = useCallback((file: FileData) => {
    if (onFileSelect) {
      onFileSelect(file);
    }
  }, [onFileSelect]);
  
  // Handle drag start
  const handleDragStart = useCallback((e: React.DragEvent, file: FileData, sourceFolderId: string) => {
    // Store the file data in the draggedItem ref for internal use
    draggedItem.current = { type: 'file', data: file, sourceFolder: sourceFolderId };
    
    // Set the file data in the dataTransfer object for external drops (like on canvas)
    const fileDataString = JSON.stringify(file);
    e.dataTransfer.setData('application/json', fileDataString);
    e.dataTransfer.effectAllowed = 'copy';
  }, []);
  
  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);
  
  // Handle drop on canvas
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
    if (draggedItem.current && onFileDrop) {
      onFileDrop(draggedItem.current.data);
    }
    
    draggedItem.current = null;
  }, [onFileDrop]);
  
  // Handle drop on folder
  const handleDropOnFolder = useCallback(async (e: React.DragEvent, targetFolderId: string) => {
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
  }, [addFile, removeFile]);
  
  // Handle file upload
  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>, folderId: string) => {
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
  }, [addFile]);
  
  // Handle saving a note to a folder
  const handleSaveNote = useCallback((folderId: string) => {
    setTargetFolderId(folderId);
    setSavingNote(true);
  }, []);
  
  // Save the note
  const saveNoteToFolder = useCallback(() => {
    if (targetFolderId && onSaveNote) {
      onSaveNote(targetFolderId, '');
      setSavingNote(false);
      setTargetFolderId(null);
    }
  }, [targetFolderId, onSaveNote]);
  
  // Cancel saving a note
  const cancelSaveNote = useCallback(() => {
    setSavingNote(false);
    setTargetFolderId(null);
  }, []);

  // Display loading, error, or no file system states
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
      className="file-explorer"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="explorer-header">
        <span>Your Files</span>
        <button
          onClick={handleAddRootFolder}
          className="explorer-add-btn"
          title="Add Root Folder"
        >
          <PlusCircle size={18} />
        </button>
      </div>
      
      <div className="explorer-content">
        {creatingRootFolder && (
          <div className="create-item-form mb-3">
            <div className="create-item-icon">
              <Folder size={16} />
            </div>
            <input
              type="text"
              value={newRootFolderName}
              onChange={(e) => setNewRootFolderName(e.target.value)}
              className="explorer-input flex-grow"
              placeholder="New Root Folder"
              autoFocus
            />
            <div className="create-item-actions">
              <button
                onClick={createNewRootFolder}
                className="explorer-action-btn text-accent-success hover:text-accent-success"
                title="Create Folder"
              >
                <Save size={16} />
              </button>
              <button
                onClick={cancelNewRootFolder}
                className="explorer-action-btn text-accent-destructive hover:text-accent-destructive"
                title="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
        
        {fileSystem.rootFolders ? (
          fileSystem.rootFolders.map(folder => (
            <FolderItem
              key={folder.id}
              folder={folder}
              level={0}
              isExpanded={expandedFolders[folder.id] || false}
              isEditing={editingFolder?.id === folder.id}
              editName={editingFolder?.id === folder.id ? editingFolder.name : ''}
              newFolderName={newFolderName}
              newNoteName={newNoteName}
              isCreatingFolder={newFolderParentId === folder.id}
              isCreatingNote={newNoteParentId === folder.id}
              editingFile={editingFile}
              onToggle={toggleFolder}
              onEditFolder={handleEditFolder}
              onEditNameChange={(name) => setEditingFolder(prev => prev ? { ...prev, name } : null)}
              onSaveEditedName={saveEditedFolderName}
              onCancelEdit={cancelEditFolderName}
              onRemoveFolder={removeFolder}
              onNewFolder={handleNewFolder}
              onNewFolderNameChange={setNewFolderName}
              onCreateNewFolder={createNewFolder}
              onCancelNewFolder={cancelNewFolder}
              onNewNote={handleNewNote}
              onNewNoteNameChange={setNewNoteName}
              onCreateNewNote={createNewNote}
              onCancelNewNote={cancelNewNote}
              onFileClick={handleFileClick}
              onEditFile={handleEditFile}
              onEditFileNameChange={(name) => setEditingFile(prev => prev ? { ...prev, name } : null)}
              onSaveEditedFileName={saveEditedFileName}
              onCancelEditFileName={cancelEditFileName}
              onRemoveFile={removeFile}
              onSaveNote={handleSaveNote}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDropOnFolder}
              onFileUpload={handleFileUpload}
            />
          ))
        ) : (
          <FolderItem
            key={fileSystem.rootFolder.id}
            folder={fileSystem.rootFolder}
            level={0}
            isExpanded={expandedFolders[fileSystem.rootFolder.id] || false}
            isEditing={editingFolder?.id === fileSystem.rootFolder.id}
            editName={editingFolder?.id === fileSystem.rootFolder.id ? editingFolder.name : ''}
            newFolderName={newFolderName}
            newNoteName={newNoteName}
            isCreatingFolder={newFolderParentId === fileSystem.rootFolder.id}
            isCreatingNote={newNoteParentId === fileSystem.rootFolder.id}
            editingFile={editingFile}
            onToggle={toggleFolder}
            onEditFolder={handleEditFolder}
            onEditNameChange={(name) => setEditingFolder(prev => prev ? { ...prev, name } : null)}
            onSaveEditedName={saveEditedFolderName}
            onCancelEdit={cancelEditFolderName}
            onRemoveFolder={removeFolder}
            onNewFolder={handleNewFolder}
            onNewFolderNameChange={setNewFolderName}
            onCreateNewFolder={createNewFolder}
            onCancelNewFolder={cancelNewFolder}
            onNewNote={handleNewNote}
            onNewNoteNameChange={setNewNoteName}
            onCreateNewNote={createNewNote}
            onCancelNewNote={cancelNewNote}
            onFileClick={handleFileClick}
            onEditFile={handleEditFile}
            onEditFileNameChange={(name) => setEditingFile(prev => prev ? { ...prev, name } : null)}
            onSaveEditedFileName={saveEditedFileName}
            onCancelEditFileName={cancelEditFileName}
            onRemoveFile={removeFile}
            onSaveNote={handleSaveNote}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDropOnFolder}
            onFileUpload={handleFileUpload}
          />
        )}
      </div>
      
      {savingNote && (
        <div className="explorer-modal">
          <div className="explorer-modal-content">
            <h3 className="explorer-modal-title">Save Note</h3>
            <p className="text-foreground-primary mb-4">
              Save the current note to folder: 
              <strong className="ml-1 text-accent-primary">
                {fileSystem.rootFolder.folders.find(f => f.id === targetFolderId)?.name || 'Root'}
              </strong>
            </p>
            <div className="explorer-modal-footer">
              <button
                onClick={cancelSaveNote}
                className="px-4 py-2 bg-background-tertiary text-foreground-primary rounded-md hover:bg-background-tertiary/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveNoteToFolder}
                className="px-4 py-2 bg-accent-primary text-white rounded-md hover:bg-accent-hover transition-colors"
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
