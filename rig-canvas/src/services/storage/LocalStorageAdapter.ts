import { StorageAdapter } from './StorageAdapter';

/**
 * Implementation of StorageAdapter using LocalStorage
 */
export class LocalStorageAdapter implements StorageAdapter {
  private prefix: string;

  /**
   * Create a new LocalStorageAdapter
   * @param prefix Prefix for all keys to avoid collisions
   */
  constructor(prefix: string = 'rig-canvas') {
    this.prefix = prefix;
  }

  /**
   * Get the prefixed key
   * @param key The key to prefix
   * @returns The prefixed key
   */
  private getPrefixedKey(key: string): string {
    return `${this.prefix}:${key}`;
  }

  /**
   * Save an item to storage
   * @param key The key to store the item under
   * @param value The value to store
   */
  async saveItem<T>(key: string, value: T): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.getPrefixedKey(key), serialized);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      throw error;
    }
  }

  /**
   * Get an item from storage
   * @param key The key of the item to retrieve
   * @returns The item or null if not found
   */
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const serialized = localStorage.getItem(this.getPrefixedKey(key));
      if (serialized === null) {
        return null;
      }
      return JSON.parse(serialized) as T;
    } catch (error) {
      console.error('Error retrieving from localStorage:', error);
      return null;
    }
  }

  /**
   * Remove an item from storage
   * @param key The key of the item to remove
   */
  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(this.getPrefixedKey(key));
  }

  /**
   * Clear all items from storage with this prefix
   */
  async clear(): Promise<void> {
    // Only remove items with this prefix
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`${this.prefix}:`)) {
        localStorage.removeItem(key);
      }
    }
  }

  /**
   * Get all keys from storage with this prefix
   * @returns Array of keys (without the prefix)
   */
  async getAllKeys(): Promise<string[]> {
    const keys: string[] = [];
    const prefixWithColon = `${this.prefix}:`;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefixWithColon)) {
        // Remove the prefix from the key
        keys.push(key.substring(prefixWithColon.length));
      }
    }

    return keys;
  }

  /**
   * Get all items from storage with this prefix
   * @returns Array of key-value pairs
   */
  async getAll<T>(): Promise<Array<{ key: string; value: T }>> {
    const items: Array<{ key: string; value: T }> = [];
    const keys = await this.getAllKeys();

    for (const key of keys) {
      const value = await this.getItem<T>(key);
      if (value !== null) {
        items.push({ key, value });
      }
    }

    return items;
  }
}
