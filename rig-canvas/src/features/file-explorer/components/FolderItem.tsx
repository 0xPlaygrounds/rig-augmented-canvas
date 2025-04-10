import React from 'react';
import { ChevronRight, ChevronDown, Folder, FolderPlus, FilePlus, Upload, Edit, Trash2, Save, X } from 'lucide-react';
import { FolderData, FileData } from '../../../types';
import { FileItem } from './FileItem';

interface FolderItemProps {
  folder: FolderData;
  level?: number;
  isExpanded: boolean;
  isEditing: boolean;
  editName: string;
  newFolderName: string;
  newNoteName: string;
  isCreatingFolder: boolean;
  isCreatingNote: boolean;
  editingFile: { id: string; name: string } | null;
  onToggle: (folderId: string) => void;
  onEditFolder: (folder: FolderData) => void;
  onEditNameChange: (name: string) => void;
  onSaveEditedName: () => void;
  onCancelEdit: () => void;
  onRemoveFolder: (folderId: string) => void;
  onNewFolder: (folderId: string) => void;
  onNewFolderNameChange: (name: string) => void;
  onCreateNewFolder: () => void;
  onCancelNewFolder: () => void;
  onNewNote: (folderId: string) => void;
  onNewNoteNameChange: (name: string) => void;
  onCreateNewNote: () => void;
  onCancelNewNote: () => void;
  onFileClick: (file: FileData) => void;
  onEditFile: (file: FileData) => void;
  onEditFileNameChange: (name: string) => void;
  onSaveEditedFileName: () => void;
  onCancelEditFileName: () => void;
  onRemoveFile: (fileId: string) => void;
  onSaveNote: (folderId: string) => void;
  onDragStart: (e: React.DragEvent, file: FileData, sourceFolderId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, targetFolderId: string) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, folderId: string) => void;
}

/**
 * FolderItem component renders a folder and its contents
 * Includes functionality for expanding/collapsing, creating subfolders/files,
 * editing folder name, and handling drag/drop operations
 */
export const FolderItem: React.FC<FolderItemProps> = ({
  folder,
  level = 0,
  isExpanded,
  isEditing,
  editName,
  newFolderName,
  newNoteName,
  isCreatingFolder,
  isCreatingNote,
  editingFile,
  onToggle,
  onEditFolder,
  onEditNameChange,
  onSaveEditedName,
  onCancelEdit,
  onRemoveFolder,
  onNewFolder,
  onNewFolderNameChange,
  onCreateNewFolder,
  onCancelNewFolder,
  onNewNote,
  onNewNoteNameChange,
  onCreateNewNote,
  onCancelNewNote,
  onFileClick,
  onEditFile,
  onEditFileNameChange,
  onSaveEditedFileName,
  onCancelEditFileName,
  onRemoveFile,
  onSaveNote,
  onDragStart,
  onDragOver,
  onDrop,
  onFileUpload
}) => {
  return (
    <div key={folder.id} className="folder-item">
      <div 
        className={`folder-item-header group ${isExpanded ? 'folder-item-active' : ''}`}
        onClick={() => onToggle(folder.id)}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, folder.id)}
      >
        <div className={`folder-chevron ${isExpanded ? 'folder-chevron-expanded' : ''}`}>
          {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>
        
        <Folder size={18} className="folder-item-icon" />
        
        {isEditing ? (
          <div className="flex items-center flex-grow">
            <input
              type="text"
              value={editName}
              onChange={(e) => onEditNameChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="explorer-input flex-grow"
              autoFocus
            />
            <div className="flex ml-2">
              <button
                onClick={(e) => { e.stopPropagation(); onSaveEditedName(); }}
                className="explorer-action-btn text-accent-primary hover:text-accent-hover"
                title="Save"
              >
                <Save size={16} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onCancelEdit(); }}
                className="explorer-action-btn text-accent-destructive hover:text-accent-destructive"
                title="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <span className="flex-grow font-medium truncate">{folder.name}</span>
        )}
        
        {!isEditing && (
          <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.stopPropagation(); onNewFolder(folder.id); }}
              className="explorer-action-btn"
              title="New Folder"
            >
              <FolderPlus size={16} />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); onNewNote(folder.id); }}
              className="explorer-action-btn"
              title="New Note"
            >
              <FilePlus size={16} />
            </button>
            
            <label className="explorer-action-btn cursor-pointer" title="Upload File">
              <input
                type="file"
                className="hidden"
                multiple
                onChange={(e) => onFileUpload(e, folder.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <Upload size={16} />
            </label>
            
            <button
              onClick={(e) => { e.stopPropagation(); onEditFolder(folder); }}
              className="explorer-action-btn"
              title="Rename Folder"
            >
              <Edit size={16} />
            </button>
            
            {folder.id !== 'root' && (
              <button
                onClick={(e) => { e.stopPropagation(); onRemoveFolder(folder.id); }}
                className="explorer-action-btn text-foreground-muted hover:text-accent-destructive"
                title="Delete Folder"
              >
                <Trash2 size={16} />
              </button>
            )}
            
            <button
              onClick={(e) => { e.stopPropagation(); onSaveNote(folder.id); }}
              className="explorer-action-btn text-foreground-muted hover:text-accent-success"
              title="Save Note Here"
            >
              <Save size={16} />
            </button>
          </div>
        )}
      </div>
      
      {isExpanded && (
        <div className="folder-content">
          {isCreatingNote && (
            <div className="create-item-form">
              <div className="create-item-icon">
                <FilePlus size={16} />
              </div>
              <input
                type="text"
                value={newNoteName}
                onChange={(e) => onNewNoteNameChange(e.target.value)}
                className="explorer-input flex-grow"
                placeholder="New Note.md"
                autoFocus
              />
              <div className="create-item-actions">
                <button
                  onClick={onCreateNewNote}
                  className="explorer-action-btn text-accent-success hover:text-accent-success"
                  title="Create Note"
                >
                  <Save size={16} />
                </button>
                <button
                  onClick={onCancelNewNote}
                  className="explorer-action-btn text-accent-destructive hover:text-accent-destructive"
                  title="Cancel"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
          
          {isCreatingFolder && (
            <div className="create-item-form">
              <div className="create-item-icon">
                <Folder size={16} />
              </div>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => onNewFolderNameChange(e.target.value)}
                className="explorer-input flex-grow"
                placeholder="New Folder"
                autoFocus
              />
              <div className="create-item-actions">
                <button
                  onClick={onCreateNewFolder}
                  className="explorer-action-btn text-accent-success hover:text-accent-success"
                  title="Create Folder"
                >
                  <Save size={16} />
                </button>
                <button
                  onClick={onCancelNewFolder}
                  className="explorer-action-btn text-accent-destructive hover:text-accent-destructive"
                  title="Cancel"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
          
          {folder.files.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              folderId={folder.id}
              isEditing={editingFile?.id === file.id}
              editName={editingFile?.id === file.id ? editingFile.name : ''}
              onEditChange={onEditFileNameChange}
              onFileClick={onFileClick}
              onEditFile={onEditFile}
              onSaveEdit={onSaveEditedFileName}
              onCancelEdit={onCancelEditFileName}
              onRemoveFile={onRemoveFile}
              onDragStart={onDragStart}
            />
          ))}
          
          {folder.folders.map((subFolder) => (
            <FolderItem
              key={subFolder.id}
              folder={subFolder}
              level={level + 1}
              isExpanded={isExpanded}
              isEditing={isEditing && editName === subFolder.name}
              editName={editName}
              newFolderName={newFolderName}
              newNoteName={newNoteName}
              isCreatingFolder={isCreatingFolder}
              isCreatingNote={isCreatingNote}
              editingFile={editingFile}
              onToggle={onToggle}
              onEditFolder={onEditFolder}
              onEditNameChange={onEditNameChange}
              onSaveEditedName={onSaveEditedName}
              onCancelEdit={onCancelEdit}
              onRemoveFolder={onRemoveFolder}
              onNewFolder={onNewFolder}
              onNewFolderNameChange={onNewFolderNameChange}
              onCreateNewFolder={onCreateNewFolder}
              onCancelNewFolder={onCancelNewFolder}
              onNewNote={onNewNote}
              onNewNoteNameChange={onNewNoteNameChange}
              onCreateNewNote={onCreateNewNote}
              onCancelNewNote={onCancelNewNote}
              onFileClick={onFileClick}
              onEditFile={onEditFile}
              onEditFileNameChange={onEditFileNameChange}
              onSaveEditedFileName={onSaveEditedFileName}
              onCancelEditFileName={onCancelEditFileName}
              onRemoveFile={onRemoveFile}
              onSaveNote={onSaveNote}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onFileUpload={onFileUpload}
            />
          ))}
        </div>
      )}
    </div>
  );
};
