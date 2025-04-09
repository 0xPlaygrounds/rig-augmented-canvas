import { StorageAdapter } from './StorageAdapter';
import { IndexedDBAdapter } from './IndexedDBAdapter';
import { LocalStorageAdapter } from './LocalStorageAdapter';

/**
 * StorageProvider creates and returns the appropriate storage adapter
 * based on the browser's capabilities
 */
export class StorageProvider {
  /**
   * Get a storage adapter for the specified store
   * @param storeName The name of the store to use
   * @param dbName Optional database name for IndexedDB
   * @returns The appropriate storage adapter
   */
  static getAdapter(storeName: string, dbName: string = 'rig-canvas'): StorageAdapter {
    // Check if IndexedDB is available
    if (typeof window !== 'undefined' && 'indexedDB' in window) {
      try {
        return new IndexedDBAdapter(dbName, storeName);
      } catch (error) {
        console.warn('Failed to create IndexedDBAdapter, falling back to LocalStorage:', error);
      }
    }

    // Fall back to LocalStorage
    try {
      return new LocalStorageAdapter(`${dbName}.${storeName}`);
    } catch (error) {
      console.error('Failed to create any storage adapter:', error);
      throw new Error('No available storage adapter could be created');
    }
  }

  /**
   * Check if persistent storage is available
   * @returns True if persistent storage is available
   */
  static async isPersistentStorageAvailable(): Promise<boolean> {
    if (typeof navigator === 'undefined' || !navigator.storage || !navigator.storage.persist) {
      return false;
    }

    try {
      // Check if we already have persistent storage
      const isPersisted = await navigator.storage.persisted();
      if (isPersisted) {
        return true;
      }

      // Request persistent storage permission
      return await navigator.storage.persist();
    } catch (error) {
      console.warn('Error checking persistent storage:', error);
      return false;
    }
  }

  /**
   * Get approximate storage usage and quota
   * @returns Object with usage and quota in bytes, or null if not available
   */
  static async getStorageEstimate(): Promise<{ usage: number; quota: number } | null> {
    if (typeof navigator === 'undefined' || !navigator.storage || !navigator.storage.estimate) {
      return null;
    }

    try {
      const estimate = await navigator.storage.estimate();
      return {
        usage: estimate.usage || 0,
        quota: estimate.quota || 0,
      };
    } catch (error) {
      console.warn('Error getting storage estimate:', error);
      return null;
    }
  }
}
