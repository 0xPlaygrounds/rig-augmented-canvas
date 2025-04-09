/**
 * Generic interface for storage adapters
 * This creates an abstraction layer to allow swapping out storage implementations
 */
export interface StorageAdapter {
  /**
   * Save an item to storage
   * @param key The key to store the item under
   * @param value The value to store
   */
  saveItem<T>(key: string, value: T): Promise<void>;
  
  /**
   * Get an item from storage
   * @param key The key of the item to retrieve
   * @returns The item or null if not found
   */
  getItem<T>(key: string): Promise<T | null>;
  
  /**
   * Remove an item from storage
   * @param key The key of the item to remove
   */
  removeItem(key: string): Promise<void>;
  
  /**
   * Clear all items from storage
   */
  clear(): Promise<void>;
  
  /**
   * Get all keys from storage
   * @returns Array of keys
   */
  getAllKeys(): Promise<string[]>;
}
