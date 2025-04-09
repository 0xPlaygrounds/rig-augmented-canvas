import React, { useEffect } from 'react';
import { EventService, EventMap, TypedEventService, TypedSubscribe, TypedPublish } from './EventService';

/**
 * Implementation of EventService using in-memory event handling
 */
export class LocalEventService implements TypedEventService {
  private events: Map<string, Set<(...args: any[]) => void>> = new Map();

  /**
   * Generic subscribe method
   */
  subscribe<T extends string>(event: T, callback: (...args: any[]) => void): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    
    this.events.get(event)!.add(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.events.get(event);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          this.events.delete(event);
        }
      }
    };
  }

  /**
   * Generic publish method
   */
  publish<T extends string>(event: T, ...args: any[]): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(...args));
    }
  }

  /**
   * Clear all subscriptions
   */
  clear(): void {
    this.events.clear();
  }

  /**
   * Type-safe subscribe method
   */
  typedSubscribe: TypedSubscribe = <K extends keyof EventMap>(
    event: K, 
    callback: (...args: EventMap[K]) => void
  ) => {
    return this.subscribe(event, callback as (...args: any[]) => void);
  };

  /**
   * Type-safe publish method
   */
  typedPublish: TypedPublish = <K extends keyof EventMap>(
    event: K, 
    ...args: EventMap[K]
  ) => {
    this.publish(event, ...args);
  };
}

// Create a singleton instance
export const localEventService = new LocalEventService();

/**
 * React hook for subscribing to events
 */
export const useEvent = <K extends keyof EventMap>(
  event: K,
  callback: (...args: EventMap[K]) => void,
  deps: React.DependencyList = []
): void => {
  useEffect(() => {
    return localEventService.typedSubscribe(event, callback);
  }, [event, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps
};
