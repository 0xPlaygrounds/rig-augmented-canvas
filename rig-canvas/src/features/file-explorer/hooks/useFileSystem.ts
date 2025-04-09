import { useState, useCallback, useEffect } from 'react';
import {
  getFileSystem,
  createFolder,
  createFile,
  updateFile,
  deleteFile,
  deleteFolder,
  getFileById,
  moveFile,
  updateFolderName,
  createRootFolder
} from '../../../utils/indexedDB';
import { FileSystemData, FolderData, FileData, FileType } from '../../../types';
import { UseFileSystemReturn } from '../types';

/**
 * A hook for interacting with the file system
 * Provides methods for creating, updating, and deleting files and folders
 */
export const useFileSystem = (): UseFileSystemReturn => {
  const [fileSystem, setFileSystem] = useState<FileSystemData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load file system data
   */
  const loadFileSystem = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getFileSystem();
      setFileSystem(data);
      setError(null);
      return data;
    } catch (err) {
      console.error('Failed to load file system:', err);
      setError('Failed to load file system');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Create a new folder
   * @param parentFolderId - The ID of the parent folder
   * @param name - The name of the new folder
   */
  const addFolder = useCallback(async (parentFolderId: string, name: string) => {
    try {
      const newFolder = await createFolder(parentFolderId, name);
      await loadFileSystem();
      return newFolder;
    } catch (err) {
      console.error('Failed to create folder:', err);
      setError('Failed to create folder');
      return null;
    }
  }, [loadFileSystem]);

  /**
   * Create a new file
   * @param folderId - The ID of the parent folder
   * @param name - The name of the new file
   * @param type - The type of the new file
   * @param content - The content of the new file (optional)
   * @param url - The URL of the new file (optional, for images, audio, etc.)
   */
  const addFile = useCallback(async (
    folderId: string,
    name: string,
    type: FileType,
    content?: string,
    url?: string
  ) => {
    try {
      const newFile = await createFile(folderId, name, type, content, url);
      await loadFileSystem();
      return newFile;
    } catch (err) {
      console.error('Failed to create file:', err);
      setError('Failed to create file');
      return null;
    }
  }, [loadFileSystem]);

  /**
   * Update a file
   * @param fileId - The ID of the file to update
   * @param updates - Partial updates to apply to the file
   */
  const updateFileContent = useCallback(async (fileId: string, updates: Partial<FileData>) => {
    try {
      // Get the current file to verify it exists
      const currentFile = await getFileById(fileId);
      
      if (!currentFile) {
        console.error('File not found with ID:', fileId);
        setError('File not found');
        return null;
      }
      
      const updatedFile = await updateFile(fileId, updates);
      
      // Reload the file system to reflect changes
      await loadFileSystem();
      
      return updatedFile;
    } catch (err) {
      console.error('Failed to update file:', err);
      setError('Failed to update file');
      return null;
    }
  }, [loadFileSystem]);

  /**
   * Delete a file
   * @param fileId - The ID of the file to delete
   */
  const removeFile = useCallback(async (fileId: string) => {
    try {
      const success = await deleteFile(fileId);
      await loadFileSystem();
      return success;
    } catch (err) {
      console.error('Failed to delete file:', err);
      setError('Failed to delete file');
      return false;
    }
  }, [loadFileSystem]);

  /**
   * Delete a folder
   * @param folderId - The ID of the folder to delete
   */
  const removeFolder = useCallback(async (folderId: string) => {
    try {
      const success = await deleteFolder(folderId);
      await loadFileSystem();
      return success;
    } catch (err) {
      console.error('Failed to delete folder:', err);
      setError('Failed to delete folder');
      return false;
    }
  }, [loadFileSystem]);
  
  /**
   * Rename a folder
   * @param folderId - The ID of the folder to rename
   * @param newName - The new name for the folder
   */
  const renameFolder = useCallback(async (folderId: string, newName: string) => {
    try {
      const updatedFolder = await updateFolderName(folderId, newName);
      await loadFileSystem();
      return updatedFolder;
    } catch (err) {
      console.error('Failed to rename folder:', err);
      setError('Failed to rename folder');
      return null;
    }
  }, [loadFileSystem]);
  
  /**
   * Add a new root folder
   * @param name - The name of the new root folder
   */
  const addRootFolder = useCallback(async (name: string) => {
    try {
      const newRootFolder = await createRootFolder(name);
      await loadFileSystem();
      return newRootFolder;
    } catch (err) {
      console.error('Failed to create root folder:', err);
      setError('Failed to create root folder');
      return null;
    }
  }, [loadFileSystem]);

  /**
   * Get a file by ID
   * @param fileId - The ID of the file to retrieve
   */
  const getFile = useCallback(async (fileId: string) => {
    try {
      return await getFileById(fileId);
    } catch (err) {
      console.error('Failed to get file:', err);
      setError('Failed to get file');
      return null;
    }
  }, []);

  /**
   * Move a file to a different folder
   * @param fileId - The ID of the file to move
   * @param targetFolderId - The ID of the target folder
   */
  const moveFileToFolder = useCallback(async (fileId: string, targetFolderId: string) => {
    try {
      const success = await moveFile(fileId, targetFolderId);
      await loadFileSystem();
      return success;
    } catch (err) {
      console.error('Failed to move file:', err);
      setError('Failed to move file');
      return false;
    }
  }, [loadFileSystem]);

  // Load file system on mount
  useEffect(() => {
    loadFileSystem();
  }, [loadFileSystem]);

  return {
    fileSystem,
    isLoading,
    error,
    loadFileSystem,
    addFolder,
    addFile,
    updateFileContent,
    removeFile,
    removeFolder,
    getFile,
    moveFileToFolder,
    renameFolder,
    addRootFolder
  };
};
