import { openDB } from 'idb';
import { CanvasData } from '../types';

const DB_NAME = 'rig-augmented-canvas';
const STORE_NAME = 'canvas-data';
const DB_VERSION = 1;

// Initialize the database
export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create a store of objects
      db.createObjectStore(STORE_NAME);
    },
  });
  return db;
};

// Save canvas data to IndexedDB
export const saveCanvasData = async (id: string, data: CanvasData): Promise<void> => {
  const db = await initDB();
  await db.put(STORE_NAME, data, id);
};

// Load canvas data from IndexedDB
export const loadCanvasData = async (id: string): Promise<CanvasData | undefined> => {
  const db = await initDB();
  return db.get(STORE_NAME, id);
};

// Get all saved canvas IDs
export const getAllCanvasIds = async (): Promise<string[]> => {
  const db = await initDB();
  return db.getAllKeys(STORE_NAME) as Promise<string[]>;
};

// Delete a canvas by ID
export const deleteCanvas = async (id: string): Promise<void> => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};
