import { StorageAdapter } from './storage/StorageAdapter';
import { StorageProvider } from './storage/StorageProvider';
import { TypedEventService } from './events/EventService';
import { localEventService } from './events/LocalEventService';

/**
 * ServiceProvider class that initializes and provides access to all application services
 */
export class ServiceProvider {
  private static instance: ServiceProvider;
  
  // Service instances
  private _eventService: TypedEventService;
  private _canvasStorage: StorageAdapter;
  private _settingsStorage: StorageAdapter;
  private _fileStorage: StorageAdapter;
  
  /**
   * Create a new ServiceProvider
   * @param eventService Event service instance
   * @param canvasStorage Canvas storage instance
   * @param settingsStorage Settings storage instance
   * @param fileStorage File storage instance
   */
  private constructor(
    eventService: TypedEventService,
    canvasStorage: StorageAdapter,
    settingsStorage: StorageAdapter,
    fileStorage: StorageAdapter
  ) {
    this._eventService = eventService;
    this._canvasStorage = canvasStorage;
    this._settingsStorage = settingsStorage;
    this._fileStorage = fileStorage;
    
    // Set isReady when all services are initialized
    this.isReady = true;
  }
  
  /**
   * Indicates if the service provider is ready for use
   */
  public isReady: boolean = false;
  
  /**
   * Get the service provider instance
   * @returns ServiceProvider instance
   */
  public static getInstance(): ServiceProvider {
    if (!ServiceProvider.instance) {
      // Initialize service instances
      const eventService = localEventService;
      
      // Initialize storage services
      const canvasStorage = StorageProvider.getAdapter('canvas-data');
      const settingsStorage = StorageProvider.getAdapter('settings');
      const fileStorage = StorageProvider.getAdapter('file-system');
      
      ServiceProvider.instance = new ServiceProvider(
        eventService,
        canvasStorage,
        settingsStorage,
        fileStorage
      );
    }
    
    return ServiceProvider.instance;
  }
  
  /**
   * Access the event service
   */
  public get events(): TypedEventService {
    return this._eventService;
  }
  
  /**
   * Access the canvas storage service
   */
  public get canvasStorage(): StorageAdapter {
    return this._canvasStorage;
  }
  
  /**
   * Access the settings storage service
   */
  public get settingsStorage(): StorageAdapter {
    return this._settingsStorage;
  }
  
  /**
   * Access the file storage service
   */
  public get fileStorage(): StorageAdapter {
    return this._fileStorage;
  }
  
  /**
   * Initialize all services
   * @returns Promise that resolves when all services are initialized
   */
  public static async initialize(): Promise<ServiceProvider> {
    const instance = ServiceProvider.getInstance();
    
    // Request persistent storage permission
    await StorageProvider.isPersistentStorageAvailable();
    
    return instance;
  }
}

// Export a singleton instance
export const services = ServiceProvider.getInstance();
