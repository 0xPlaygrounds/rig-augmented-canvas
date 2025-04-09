import { create, StateCreator, StoreApi, UseBoundStore } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

/**
 * Configuration options for creating a store
 */
export interface CreateStoreOptions<T> {
  /** Store name for persistence */
  name: string;
  /** Whether to persist the store to localStorage */
  persist?: boolean;
  /** Custom persist options */
  persistOptions?: Partial<PersistOptions<T>>;
}

/**
 * Creates a Zustand store with optional persistence
 * 
 * @param initialState The initial state of the store
 * @param stateCreator Function that defines the store actions
 * @param options Store configuration options
 * @returns A Zustand store
 */
export function createStore<
  T extends object,
  A extends object
>(
  initialState: T,
  stateCreator: (set: (fn: (state: T) => T) => void, get: () => T & A) => A,
  options: CreateStoreOptions<T & A> = { name: 'store', persist: true }
): UseBoundStore<StoreApi<T & A>> {
  const creator: StateCreator<T & A> = (set, get) => ({
    ...initialState,
    ...stateCreator(set, get),
  });

  // Apply persistence if enabled
  if (options.persist) {
    const persistOptions: PersistOptions<T & A> = {
      name: options.name,
      ...(options.persistOptions || {}),
    };
    
    return create<T & A>()(
      persist(creator, persistOptions)
    );
  }

  // Create store without persistence
  return create<T & A>()(creator);
}
