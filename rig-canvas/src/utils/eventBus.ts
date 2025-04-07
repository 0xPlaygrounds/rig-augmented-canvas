import { useEffect } from 'react';

/**
 * EventBus for cross-component communication
 * 
 * Provides a publish/subscribe pattern to enable components to communicate
 * without direct dependencies.
 */

type EventCallback = (...args: any[]) => void;
type Unsubscribe = () => void;

// Define event types as string literals to avoid type issues
type EventType = 
  | 'ui:readingMode:toggle'
  | 'ui:fadeElements'
  | 'ui:animation:highlight'
  | 'document:contentChanged'
  | 'document:selectionChanged'
  | 'document:saved'
  | 'focus:session:start'
  | 'focus:session:end'
  | 'focus:pomodoro:complete'
  | 'focus:doNotDisturb'
  | 'command:execute'
  | 'command:register'
  | string; // Allow custom events

interface EventMap {
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
  
  // Custom events
  [key: `custom:${string}`]: any[]; // Restrict index signature to string-only custom events
}

class EventBus {
  private events: Map<string, Set<EventCallback>> = new Map();

  /**
   * Subscribe to an event
   * @param event Event name
   * @param callback Function to call when event is published
   * @returns Function to unsubscribe
   */
  subscribe<K extends keyof EventMap>(event: K, callback: (...args: EventMap[K]) => void): Unsubscribe {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    
    this.events.get(event)!.add(callback as EventCallback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.events.get(event);
      if (callbacks) {
        callbacks.delete(callback as EventCallback);
        if (callbacks.size === 0) {
          this.events.delete(event);
        }
      }
    };
  }

  /**
   * Publish an event with parameters
   * @param event Event name
   * @param args Arguments to pass to callbacks
   */
  publish<K extends keyof EventMap>(event: K, ...args: EventMap[K]): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(...args));
    }
  }

  /**
   * Clear all subscriptions for testing or cleanup
   */
  clear(): void {
    this.events.clear();
  }
}

// Singleton instance
export const eventBus = new EventBus();

/**
 * Hook to use event bus in React components
 * @param event Event name to subscribe to
 * @param callback Callback function
 */
export const useEventSubscription = <K extends keyof EventMap>(
  event: K,
  callback: (...args: EventMap[K]) => void
) => {
  useEffect(() => {
    return eventBus.subscribe(event, callback);
  }, [event, callback]);
};
