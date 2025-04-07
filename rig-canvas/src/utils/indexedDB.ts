import { openDB } from 'idb';
import { CanvasData, FileSystemData, FileData, FolderData, FileType } from '../types';

const DB_NAME = 'rig-augmented-canvas';
const CANVAS_STORE = 'canvas-data';
const FILE_SYSTEM_STORE = 'file-system';
const DB_VERSION = 2;

// Database instance
let dbPromise: Promise<any> | null = null;

// Initialize the database
export const initDB = async () => {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion, newVersion) {
        // Create stores if they don't exist
        if (!db.objectStoreNames.contains(CANVAS_STORE)) {
          db.createObjectStore(CANVAS_STORE);
        }
        
        if (!db.objectStoreNames.contains(FILE_SYSTEM_STORE)) {
          const fileSystemStore = db.createObjectStore(FILE_SYSTEM_STORE);
          
          // Initialize the file system with a root folder
          const rootFolder: FolderData = {
            id: 'root',
            name: 'Root',
            files: [],
            folders: [],
            lastModified: Date.now()
          };
          
          const fileSystem: FileSystemData = {
            rootFolder
          };
          
          // Add the file system to the store
          fileSystemStore.put(fileSystem, 'file-system');
        }
      },
    });
  }
  
  return dbPromise;
};

// Canvas operations

// Save canvas data to IndexedDB
export const saveCanvasData = async (id: string, data: CanvasData): Promise<void> => {
  const db = await initDB();
  await db.put(CANVAS_STORE, data, id);
};

// Load canvas data from IndexedDB
export const loadCanvasData = async (id: string): Promise<CanvasData | undefined> => {
  const db = await initDB();
  return db.get(CANVAS_STORE, id);
};

// Get all saved canvases
export const getAllCanvases = async (): Promise<CanvasData[]> => {
  const db = await initDB();
  const keys = await db.getAllKeys(CANVAS_STORE);
  const canvases = await Promise.all(
    keys.map(async (key: string) => {
      return await db.get(CANVAS_STORE, key);
    })
  );
  return canvases as CanvasData[];
};

// Delete a canvas by ID
export const deleteCanvas = async (id: string): Promise<void> => {
  const db = await initDB();
  await db.delete(CANVAS_STORE, id);
};

// File system operations

// Get the file system
export const getFileSystem = async (): Promise<FileSystemData> => {
  const db = await initDB();
  const fileSystem = await db.get(FILE_SYSTEM_STORE, 'file-system');
  
  if (!fileSystem) {
    // Initialize the file system if it doesn't exist
    const rootFolder: FolderData = {
      id: 'root',
      name: 'Root',
      files: [],
      folders: [],
      lastModified: Date.now()
    };
    
    const newFileSystem: FileSystemData = {
      rootFolder
    };
    
    await db.put(FILE_SYSTEM_STORE, newFileSystem, 'file-system');
    return newFileSystem;
  }
  
  return fileSystem;
};

// Save the file system
export const saveFileSystem = async (fileSystem: FileSystemData): Promise<void> => {
  const db = await initDB();
  await db.put(FILE_SYSTEM_STORE, fileSystem, 'file-system');
};

// Create a new folder
export const createFolder = async (parentFolderId: string, name: string): Promise<FolderData> => {
  const fileSystem = await getFileSystem();
  
  const newFolder: FolderData = {
    id: `folder-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    name,
    files: [],
    folders: [],
    lastModified: Date.now()
  };
  
  // Helper function to find and update a folder
  const updateFolder = (folder: FolderData): boolean => {
    if (folder.id === parentFolderId) {
      folder.folders.push(newFolder);
      folder.lastModified = Date.now();
      return true;
    }
    
    for (const subFolder of folder.folders) {
      if (updateFolder(subFolder)) {
        return true;
      }
    }
    
    return false;
  };
  
  updateFolder(fileSystem.rootFolder);
  await saveFileSystem(fileSystem);
  
  return newFolder;
};

// Create a new file
export const createFile = async (
  folderId: string, 
  name: string, 
  type: FileType, 
  content?: string,
  url?: string
): Promise<FileData> => {
  const fileSystem = await getFileSystem();
  
  const newFile: FileData = {
    id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    name,
    type,
    content,
    url,
    lastModified: Date.now(),
    size: content?.length || 0
  };
  
  // Helper function to find and update a folder
  const updateFolder = (folder: FolderData): boolean => {
    if (folder.id === folderId) {
      folder.files.push(newFile);
      folder.lastModified = Date.now();
      return true;
    }
    
    for (const subFolder of folder.folders) {
      if (updateFolder(subFolder)) {
        return true;
      }
    }
    
    return false;
  };
  
  updateFolder(fileSystem.rootFolder);
  await saveFileSystem(fileSystem);
  
  return newFile;
};

// Update a folder name
export const updateFolderName = async (folderId: string, newName: string): Promise<FolderData | null> => {
  const fileSystem = await getFileSystem();
  let updatedFolder: FolderData | null = null;
  
  // Helper function to find and update a folder's name
  const findAndUpdateFolder = (folder: FolderData, isRoot = false): boolean => {
    if (folder.id === folderId) {
      folder.name = newName;
      folder.lastModified = Date.now();
      updatedFolder = folder;
      return true;
    }
    
    for (let i = 0; i < folder.folders.length; i++) {
      if (findAndUpdateFolder(folder.folders[i])) {
        return true;
      }
    }
    
    return false;
  };
  
  // If it's the root folder or a normal folder
  if (folderId === 'root') {
    fileSystem.rootFolder.name = newName;
    fileSystem.rootFolder.lastModified = Date.now();
    updatedFolder = fileSystem.rootFolder;
  } else {
    findAndUpdateFolder(fileSystem.rootFolder);
  }
  
  if (updatedFolder) {
    await saveFileSystem(fileSystem);
    return updatedFolder;
  }
  
  return null;
};

// Create a new root folder
export const createRootFolder = async (name: string): Promise<FolderData> => {
  const fileSystem = await getFileSystem();
  
  const newRootFolder: FolderData = {
    id: `folder-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    name,
    files: [],
    folders: [],
    lastModified: Date.now()
  };
  
  // Add the new root folder directly to the file system structure
  fileSystem.rootFolders = fileSystem.rootFolders || [fileSystem.rootFolder];
  
  // If rootFolders array doesn't exist yet, migrate the structure
  if (!fileSystem.rootFolders.some((folder: FolderData) => folder.id === 'root')) {
    fileSystem.rootFolders.push(fileSystem.rootFolder);
  }
  
  fileSystem.rootFolders.push(newRootFolder);
  
  await saveFileSystem(fileSystem);
  return newRootFolder;
};

// Update a file
export const updateFile = async (fileId: string, updates: Partial<FileData>): Promise<FileData | null> => {
  console.log('updateFile called with fileId:', fileId);
  console.log('updates:', updates);
  
  const fileSystem = await getFileSystem();
  console.log('Current file system:', fileSystem);
  
  let updatedFile: FileData | null = null;
  let fileFound = false;
  
  // Helper function to find and update a file
  const findAndUpdateFile = (folder: FolderData): boolean => {
    console.log('Searching in folder:', folder.name, 'with ID:', folder.id);
    console.log('Folder contains files:', folder.files.map(f => ({ id: f.id, name: f.name })));
    
    for (let i = 0; i < folder.files.length; i++) {
      console.log('Checking file:', folder.files[i].id, folder.files[i].name);
      
      if (folder.files[i].id === fileId) {
        console.log('Found file to update:', folder.files[i]);
        fileFound = true;
        
        // Create the updated file object
        const updatedFileObj = {
          ...folder.files[i],
          ...updates,
          lastModified: Date.now()
        };
        
        console.log('Updated file object:', updatedFileObj);
        
        // Update the file in the folder
        folder.files[i] = updatedFileObj;
        updatedFile = folder.files[i];
        folder.lastModified = Date.now();
        
        return true;
      }
    }
    
    // Recursively search in subfolders
    for (const subFolder of folder.folders) {
      if (findAndUpdateFile(subFolder)) {
        return true;
      }
    }
    
    return false;
  };
  
  findAndUpdateFile(fileSystem.rootFolder);
  
  if (!fileFound) {
    console.error('File not found with ID:', fileId);
  }
  
  if (updatedFile) {
    console.log('Saving updated file system with updated file:', updatedFile);
    await saveFileSystem(fileSystem);
    return updatedFile;
  }
  
  return null;
};

// Delete a file
export const deleteFile = async (fileId: string): Promise<boolean> => {
  const fileSystem = await getFileSystem();
  
  // Helper function to find and delete a file
  const findAndDeleteFile = (folder: FolderData): boolean => {
    const fileIndex = folder.files.findIndex(file => file.id === fileId);
    
    if (fileIndex !== -1) {
      folder.files.splice(fileIndex, 1);
      folder.lastModified = Date.now();
      return true;
    }
    
    for (const subFolder of folder.folders) {
      if (findAndDeleteFile(subFolder)) {
        return true;
      }
    }
    
    return false;
  };
  
  const deleted = findAndDeleteFile(fileSystem.rootFolder);
  
  if (deleted) {
    await saveFileSystem(fileSystem);
  }
  
  return deleted;
};

// Delete a folder
export const deleteFolder = async (folderId: string): Promise<boolean> => {
  if (folderId === 'root') {
    return false; // Cannot delete root folder
  }
  
  const fileSystem = await getFileSystem();
  
  // Helper function to find and delete a folder
  const findAndDeleteFolder = (folder: FolderData): boolean => {
    const folderIndex = folder.folders.findIndex(f => f.id === folderId);
    
    if (folderIndex !== -1) {
      folder.folders.splice(folderIndex, 1);
      folder.lastModified = Date.now();
      return true;
    }
    
    for (const subFolder of folder.folders) {
      if (findAndDeleteFolder(subFolder)) {
        return true;
      }
    }
    
    return false;
  };
  
  const deleted = findAndDeleteFolder(fileSystem.rootFolder);
  
  if (deleted) {
    await saveFileSystem(fileSystem);
  }
  
  return deleted;
};

// Get a file by ID
export const getFileById = async (fileId: string): Promise<FileData | null> => {
  const fileSystem = await getFileSystem();
  
  // Helper function to find a file
  const findFile = (folder: FolderData): FileData | null => {
    for (const file of folder.files) {
      if (file.id === fileId) {
        return file;
      }
    }
    
    for (const subFolder of folder.folders) {
      const found = findFile(subFolder);
      if (found) {
        return found;
      }
    }
    
    return null;
  };
  
  return findFile(fileSystem.rootFolder);
};

// Move a file to a different folder
export const moveFile = async (fileId: string, targetFolderId: string): Promise<boolean> => {
  const fileSystem = await getFileSystem();
  let fileToMove: FileData | null = null;
  
  // Helper function to find and remove a file
  const findAndRemoveFile = (folder: FolderData): boolean => {
    const fileIndex = folder.files.findIndex(file => file.id === fileId);
    
    if (fileIndex !== -1) {
      fileToMove = folder.files[fileIndex];
      folder.files.splice(fileIndex, 1);
      folder.lastModified = Date.now();
      return true;
    }
    
    for (const subFolder of folder.folders) {
      if (findAndRemoveFile(subFolder)) {
        return true;
      }
    }
    
    return false;
  };
  
  // Helper function to add file to target folder
  const addFileToFolder = (folder: FolderData): boolean => {
    if (folder.id === targetFolderId) {
      if (fileToMove) {
        folder.files.push(fileToMove);
        folder.lastModified = Date.now();
      }
      return true;
    }
    
    for (const subFolder of folder.folders) {
      if (addFileToFolder(subFolder)) {
        return true;
      }
    }
    
    return false;
  };
  
  const removed = findAndRemoveFile(fileSystem.rootFolder);
  
  if (removed && fileToMove) {
    const added = addFileToFolder(fileSystem.rootFolder);
    
    if (added) {
      await saveFileSystem(fileSystem);
      return true;
    }
  }
  
  return false;
};
