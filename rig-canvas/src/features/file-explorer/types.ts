import { FileType, FileData, FolderData, FileSystemData } from '../../types';

export interface FileExplorerProps {
  onFileSelect?: (file: FileData) => void;
  onFileDrop?: (file: FileData) => void;
  onSaveNote?: (folderId: string, content: string) => void;
}

export interface FileViewerProps {
  file: FileData | null;
  onClose: () => void;
}

export interface UseFileSystemReturn {
  fileSystem: FileSystemData | null;
  isLoading: boolean;
  error: string | null;
  loadFileSystem: () => Promise<FileSystemData | null>;
  addFolder: (parentFolderId: string, name: string) => Promise<FolderData | null>;
  addFile: (
    folderId: string,
    name: string,
    type: FileType,
    content?: string,
    url?: string
  ) => Promise<FileData | null>;
  updateFileContent: (fileId: string, updates: Partial<FileData>) => Promise<FileData | null>;
  removeFile: (fileId: string) => Promise<boolean>;
  removeFolder: (folderId: string) => Promise<boolean>;
  getFile: (fileId: string) => Promise<FileData | null>;
  moveFileToFolder: (fileId: string, targetFolderId: string) => Promise<boolean>;
  renameFolder: (folderId: string, newName: string) => Promise<FolderData | null>;
  addRootFolder: (name: string) => Promise<FolderData | null>;
}

// ChatMessage moved to ai-assistant feature
