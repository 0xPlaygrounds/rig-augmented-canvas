import React from 'react';
import { File, FileText, Music, FileImage, Trash2, Edit, Save, X } from 'lucide-react';
import { FileData, FileType } from '../../../types';

interface FileItemProps {
  file: FileData;
  folderId: string;
  isEditing: boolean;
  editName: string;
  onEditChange: (name: string) => void;
  onFileClick: (file: FileData) => void;
  onEditFile: (file: FileData) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onRemoveFile: (fileId: string) => void;
  onDragStart: (e: React.DragEvent, file: FileData, sourceFolderId: string) => void;
}

/**
 * FileItem component renders a file in the file explorer
 * Supports editing, dragging, and other file operations
 */
export const FileItem: React.FC<FileItemProps> = ({
  file,
  folderId,
  isEditing,
  editName,
  onEditChange,
  onFileClick,
  onEditFile,
  onSaveEdit,
  onCancelEdit,
  onRemoveFile,
  onDragStart
}) => {
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

  return (
    <div
      key={file.id}
      className="flex items-center py-1 px-2 ml-4 hover:bg-bg-tertiary cursor-pointer group"
      onClick={() => onFileClick(file)}
      draggable
      onDragStart={(e) => onDragStart(e, file, folderId)}
    >
      {renderFileIcon(file.type)}
      
      <div className="ml-2 flex-grow">
        {isEditing ? (
          <div className="flex items-center">
            <input
              type="text"
              value={editName}
              onChange={(e) => onEditChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="bg-bg-secondary border border-border-secondary rounded px-2 py-1 text-sm flex-grow text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
              autoFocus
            />
            <button
              onClick={(e) => { e.stopPropagation(); onSaveEdit(); }}
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
          <span className="text-text-secondary">{file.name}</span>
        )}
      </div>
      
      {!isEditing && (
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); onEditFile(file); }}
            className="p-1 rounded hover:bg-bg-primary text-text-tertiary hover:text-text-secondary transition-colors"
            title="Rename File"
          >
            <Edit size={16} />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); onRemoveFile(file.id); }}
            className="p-1 rounded hover:bg-bg-primary text-text-tertiary hover:text-text-secondary transition-colors"
            title="Delete File"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
