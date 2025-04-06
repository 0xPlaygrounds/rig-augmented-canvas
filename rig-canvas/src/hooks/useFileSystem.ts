import { useState, useCallback, useEffect } from 'react';
import {
  getFileSystem,
  createFolder,
  createFile,
  updateFile,
  deleteFile,
  deleteFolder,
  getFileById,
  moveFile
} from '../utils/indexedDB';
import { FileSystemData, FolderData, FileData, FileType } from '../types';

export const useFileSystem = () => {
  const [fileSystem, setFileSystem] = useState<FileSystemData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load file system data
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

  // Create a new folder
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

  // Create a new file
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

  // Update a file
  const updateFileContent = useCallback(async (fileId: string, updates: Partial<FileData>) => {
    console.log('updateFileContent called with fileId:', fileId);
    console.log('updates:', updates);
    
    try {
      // Get the current file to verify it exists
      const currentFile = await getFileById(fileId);
      console.log('Current file before update:', currentFile);
      
      if (!currentFile) {
        console.error('File not found with ID:', fileId);
        setError('File not found');
        return null;
      }
      
      const updatedFile = await updateFile(fileId, updates);
      console.log('Updated file result:', updatedFile);
      
      // Reload the file system to reflect changes
      await loadFileSystem();
      
      // Get the file again to verify it was updated
      const verifyFile = await getFileById(fileId);
      console.log('File after update:', verifyFile);
      
      return updatedFile;
    } catch (err) {
      console.error('Failed to update file:', err);
      setError('Failed to update file');
      return null;
    }
  }, [loadFileSystem]);

  // Delete a file
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

  // Delete a folder
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

  // Get a file by ID
  const getFile = useCallback(async (fileId: string) => {
    try {
      return await getFileById(fileId);
    } catch (err) {
      console.error('Failed to get file:', err);
      setError('Failed to get file');
      return null;
    }
  }, []);

  // Move a file to a different folder
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
    moveFileToFolder
  };
};
