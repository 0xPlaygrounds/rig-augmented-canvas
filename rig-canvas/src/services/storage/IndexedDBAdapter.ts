import { openDB, IDBPDatabase } from 'idb';
import { StorageAdapter } from './StorageAdapter';

/**
 * Implementation of StorageAdapter using IndexedDB
 */
export class IndexedDBAdapter implements StorageAdapter {
  private dbName: string;
  private storeName: string;
  private dbPromise: Promise<IDBPDatabase> | null = null;
  private version: number;

  /**
   * Create a new IndexedDBAdapter
   * @param dbName Name of the IndexedDB database
   * @param storeName Name of the object store
   * @param version Database version
   */
  constructor(dbName: string, storeName: string = 'default', version: number = 1) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.version = version;
  }

  /**
   * Initialize the database
   */
  private async getDB(): Promise<IDBPDatabase> {
    if (!this.dbPromise) {
      this.dbPromise = openDB(this.dbName, this.version, {
        upgrade: (db) => {
          // Create the store if it doesn't exist
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName);
          }
        },
      });
    }
    return this.dbPromise;
  }

  /**
   * Save an item to storage
   * @param key The key to store the item under
   * @param value The value to store
   */
  async saveItem<T>(key: string, value: T): Promise<void> {
    const db = await this.getDB();
    await db.put(this.storeName, value, key);
  }

  /**
   * Get an item from storage
   * @param key The key of the item to retrieve
   * @returns The item or null if not found
   */
  async getItem<T>(key: string): Promise<T | null> {
    const db = await this.getDB();
    return db.get(this.storeName, key) as Promise<T | null>;
  }

  /**
   * Remove an item from storage
   * @param key The key of the item to remove
   */
  async removeItem(key: string): Promise<void> {
    const db = await this.getDB();
    await db.delete(this.storeName, key);
  }

  /**
   * Clear all items from storage
   */
  async clear(): Promise<void> {
    const db = await this.getDB();
    await db.clear(this.storeName);
  }

  /**
   * Get all keys from storage
   * @returns Array of keys
   */
  async getAllKeys(): Promise<string[]> {
    const db = await this.getDB();
    return db.getAllKeys(this.storeName) as Promise<string[]>;
  }

  /**
   * Get all items from storage
   * @returns Array of items
   */
  async getAll<T>(): Promise<T[]> {
    const db = await this.getDB();
    return db.getAll(this.storeName) as Promise<T[]>;
  }

  /**
   * Close the database connection
   */
  async close(): Promise<void> {
    if (this.dbPromise) {
      const db = await this.dbPromise;
      db.close();
      this.dbPromise = null;
    }
  }
}
