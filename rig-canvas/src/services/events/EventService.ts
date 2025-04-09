/**
 * Interface for event subscriptions and publication
 * Acts as an abstraction for the event system to allow for different
 * implementations (e.g. local events, WebSocket events, etc.)
 */
export interface EventService {
  /**
   * Subscribe to an event
   * @param event Event name
   * @param callback Function to call when event is published
   * @returns Function to unsubscribe
   */
  subscribe: <T extends string>(event: T, callback: (...args: any[]) => void) => () => void;
  
  /**
   * Publish an event with parameters
   * @param event Event name
   * @param args Arguments to pass to callbacks
   */
  publish: <T extends string>(event: T, ...args: any[]) => void;
  
  /**
   * Clear all subscriptions
   */
  clear: () => void;
}

/**
 * Type definition for event map to provide type safety for events
 */
export interface EventMap {
  // UI events
  'ui:readingMode:toggle': [isReadingMode: boolean];
  'ui:fadeElements': [shouldFade: boolean];
  'ui:animation:highlight': [elementId: string];
  
  // Document events
  'document:contentChanged': [content: string, wordCount: number];
  'document:selectionChanged': [start: number, end: number];
  'document:saved': [documentId: string];
  
  // Focus mode events
  'focus:session:start': [mode: string, goal?: string];
  'focus:session:end': [stats: { duration: number, wordsWritten: number }];
  'focus:pomodoro:complete': [isBreak: boolean];
  'focus:doNotDisturb': [enabled: boolean];
  
  // Command palette events
  'command:execute': [command: string, args?: any];
  'command:register': [command: { name: string, title: string, handler: () => void }];
  
  // Canvas events
  'canvas:node:added': [nodeId: string];
  'canvas:node:removed': [nodeId: string];
  'canvas:node:updated': [nodeId: string, data: any];
  'canvas:edge:added': [edgeId: string];
  'canvas:edge:removed': [edgeId: string];
  'canvas:edge:updated': [edgeId: string, data: any];
  
  // Custom events
  [key: `custom:${string}`]: any[]; // Allow custom events with a prefix
}

/**
 * Type-safe subscribe function
 */
export type TypedSubscribe = <K extends keyof EventMap>(
  event: K, 
  callback: (...args: EventMap[K]) => void
) => () => void;

/**
 * Type-safe publish function
 */
export type TypedPublish = <K extends keyof EventMap>(
  event: K, 
  ...args: EventMap[K]
) => void;

/**
 * Extended event service with typed methods
 */
export interface TypedEventService extends EventService {
  typedSubscribe: TypedSubscribe;
  typedPublish: TypedPublish;
}
