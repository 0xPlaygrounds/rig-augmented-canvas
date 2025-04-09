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
    <div key={folder.id} className="select-none">
      <div 
        className={`flex items-center py-1 px-2 hover:bg-bg-tertiary group ${level > 0 ? 'ml-4' : ''}`}
        onClick={() => onToggle(folder.id)}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, folder.id)}
      >
        <div className="mr-1 text-text-tertiary">
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
        
        <Folder size={16} className="text-accent-primary mr-2" />
        
        {isEditing ? (
          <div className="flex items-center flex-grow">
            <input
              type="text"
              value={editName}
              onChange={(e) => onEditNameChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="bg-bg-secondary border border-border-secondary rounded px-2 py-1 text-sm flex-grow text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
              autoFocus
            />
            <button
              onClick={(e) => { e.stopPropagation(); onSaveEditedName(); }}
              className="ml-1 text-accent-primary hover:text-accent-hover"
            >
              <Save size={14} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onCancelEdit(); }}
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
              onClick={(e) => { e.stopPropagation(); onNewFolder(folder.id); }}
              className="p-1 rounded hover:bg-bg-primary text-text-tertiary hover:text-text-secondary transition-colors"
              title="New Folder"
            >
              <FolderPlus size={16} />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); onNewNote(folder.id); }}
              className="p-1 rounded hover:bg-bg-primary text-text-tertiary hover:text-text-secondary transition-colors"
              title="New Note"
            >
              <FilePlus size={16} />
            </button>
            
            <label className="p-1 rounded hover:bg-bg-primary text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer" title="Upload File">
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
              className="p-1 rounded hover:bg-bg-primary text-text-tertiary hover:text-text-secondary transition-colors"
              title="Rename Folder"
            >
              <Edit size={16} />
            </button>
            
            {folder.id !== 'root' && (
              <button
                onClick={(e) => { e.stopPropagation(); onRemoveFolder(folder.id); }}
                className="p-1 rounded hover:bg-bg-primary text-text-tertiary hover:text-text-secondary transition-colors"
                title="Delete Folder"
              >
                <Trash2 size={16} />
              </button>
            )}
            
            <button
              onClick={(e) => { e.stopPropagation(); onSaveNote(folder.id); }}
              className="p-1 rounded hover:bg-bg-primary text-text-tertiary hover:text-text-secondary transition-colors"
              title="Save Note Here"
            >
              <Save size={16} />
            </button>
          </div>
        )}
      </div>
      
      {isExpanded && (
        <div>
          {isCreatingNote && (
            <div className="flex items-center py-1 px-2 ml-4">
              <div className="mr-2 text-blue-500">
                <FilePlus size={16} />
              </div>
              <input
                type="text"
                value={newNoteName}
                onChange={(e) => onNewNoteNameChange(e.target.value)}
                className="bg-bg-secondary border border-border-secondary rounded px-2 py-1 text-sm flex-grow text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                placeholder="New Note.md"
                autoFocus
              />
              <button
                onClick={onCreateNewNote}
                className="ml-1 text-accent-primary hover:text-accent-hover"
              >
                <Save size={14} />
              </button>
              <button
                onClick={onCancelNewNote}
                className="ml-1 text-red-500 hover:text-red-700"
              >
                <X size={14} />
              </button>
            </div>
          )}
          
          {isCreatingFolder && (
            <div className="flex items-center py-1 px-2 ml-4">
              <div className="mr-2 text-accent-primary">
                <Folder size={16} />
              </div>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => onNewFolderNameChange(e.target.value)}
                className="bg-bg-secondary border border-border-secondary rounded px-2 py-1 text-sm flex-grow text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                placeholder="New Folder"
                autoFocus
              />
              <button
                onClick={onCreateNewFolder}
                className="ml-1 text-accent-primary hover:text-accent-hover"
              >
                <Save size={14} />
              </button>
              <button
                onClick={onCancelNewFolder}
                className="ml-1 text-red-500 hover:text-red-700"
              >
                <X size={14} />
              </button>
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
