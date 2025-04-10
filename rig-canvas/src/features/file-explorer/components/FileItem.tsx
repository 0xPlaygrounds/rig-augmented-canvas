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
      className="file-item ml-4 group"
      onClick={() => onFileClick(file)}
      draggable
      onDragStart={(e) => onDragStart(e, file, folderId)}
    >
      <div className="file-item-icon">{renderFileIcon(file.type)}</div>
      
      <div className="flex-grow">
        {isEditing ? (
          <div className="flex items-center">
            <input
              type="text"
              value={editName}
              onChange={(e) => onEditChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="explorer-input flex-grow text-sm"
              autoFocus
            />
            <button
              onClick={(e) => { e.stopPropagation(); onSaveEdit(); }}
              className="ml-2 explorer-action-btn text-accent-primary hover:text-accent-hover"
            >
              <Save size={15} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onCancelEdit(); }}
              className="ml-1 explorer-action-btn text-text-tertiary hover:text-red-500"
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <span className="text-text-primary font-medium">{file.name}</span>
        )}
      </div>
      
      {!isEditing && (
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); onEditFile(file); }}
            className="explorer-action-btn"
            title="Rename File"
          >
            <Edit size={15} />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); onRemoveFile(file.id); }}
            className="explorer-action-btn hover:text-red-500"
            title="Delete File"
          >
            <Trash2 size={15} />
          </button>
        </div>
      )}
    </div>
  );
};
