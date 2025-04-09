import { useCallback, useEffect, useState } from 'react';
import { Edge, Node } from '@xyflow/react';
import { services } from '../../../services/ServiceProvider';
import { useCanvasStore } from '../store/canvasStore';
import { CanvasData } from '../../../types';

// Default canvas ID
const DEFAULT_CANVAS_ID = 'default-canvas';

export interface CanvasPersistenceProps {
  canvasId?: string;
  autoSave?: boolean;
  saveInterval?: number;
}

/**
 * Hook for handling canvas persistence
 */
export const useCanvasPersistence = (options: CanvasPersistenceProps = {}) => {
  const { canvasId = DEFAULT_CANVAS_ID, autoSave = true, saveInterval = 500 } = options;
  
  // Access store directly to avoid type issues
  const {
    nodes, 
    edges, 
    setNodes, 
    setEdges, 
    initialized,
    setInitialized
  } = useCanvasStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [currentCanvasId, setCurrentCanvasId] = useState<string>(canvasId);
  const [availableCanvases, setAvailableCanvases] = useState<CanvasData[]>([]);

  // Simple importCanvas function
  const importCanvas = useCallback((data: { nodes: Node[]; edges: Edge[] }) => {
    setNodes(data.nodes || []);
    setEdges(data.edges || []);
  }, [setNodes, setEdges]);

  // Load available canvases
  const loadAvailableCanvases = useCallback(async () => {
    try {
      // Make sure service is available
      if (!services.canvasStorage) {
        console.error('Canvas storage service not available');
        return [];
      }

      const canvases = await services.canvasStorage.getItem<CanvasData[]>('available-canvases') || [];
      setAvailableCanvases(canvases);
      return canvases;
    } catch (err) {
      console.error('Failed to load available canvases:', err);
      setError('Failed to load available canvases');
      return [];
    }
  }, []);

  // Load canvas data from storage
  const loadCanvas = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const storageKey = `canvas-${id}`;
      
      // Make sure service is available
      if (!services.canvasStorage) {
        console.error('Canvas storage service not available');
        setIsLoading(false);
        return;
      }
      
      const canvasData = await services.canvasStorage.getItem<{
        nodes: Node[];
        edges: Edge[];
        lastSaved: string;
        name?: string;
      }>(storageKey);

      if (canvasData) {
        importCanvas({
          nodes: canvasData.nodes || [],
          edges: canvasData.edges || [],
        });
        
        if (canvasData.lastSaved) {
          setLastSaved(new Date(canvasData.lastSaved));
        }
      } else {
        // If canvas doesn't exist, create a new one
        setNodes([]);
        setEdges([]);
        
        const newCanvas: CanvasData = {
          id,
          name: id === DEFAULT_CANVAS_ID ? 'Default Canvas' : `Canvas ${new Date().toLocaleString()}`,
          nodes: [],
          edges: [],
          lastModified: Date.now()
        };
        
        await saveCanvasData(id, newCanvas);
      }
      
      setCurrentCanvasId(id);
      setInitialized(true);
      setError(null);
      
      // Refresh available canvases
      await loadAvailableCanvases();
    } catch (error) {
      console.error('Failed to load canvas:', error);
      setError('Failed to load canvas data');
    } finally {
      setIsLoading(false);
    }
  }, [importCanvas, loadAvailableCanvases, setEdges, setInitialized, setNodes]);

  // Create a new canvas
  const createCanvas = useCallback(async (name: string) => {
    try {
      // Make sure service is available
      if (!services.canvasStorage) {
        console.error('Canvas storage service not available');
        return null;
      }

      const id = `canvas-${Date.now()}`;
      
      const newCanvas: CanvasData = {
        id,
        name,
        nodes: [],
        edges: [],
        lastModified: Date.now()
      };
      
      await saveCanvasData(id, newCanvas);
      
      // Refresh available canvases
      await loadAvailableCanvases();
      
      return id;
    } catch (err) {
      console.error('Failed to create canvas:', err);
      setError('Failed to create canvas');
      return null;
    }
  }, [loadAvailableCanvases]);

  // Save canvas data
  const saveCanvasData = useCallback(async (id: string, data: CanvasData) => {
    try {
      // Make sure service is available
      if (!services.canvasStorage) {
        console.error('Canvas storage service not available');
        return false;
      }
      
      const storageKey = `canvas-${id}`;
      const now = new Date();
      
      await services.canvasStorage.saveItem(storageKey, {
        ...data,
        lastSaved: now.toISOString(),
      });
      
      setLastSaved(now);
      
      // Update available canvases list
      const canvases = await loadAvailableCanvases();
      const existingCanvas = canvases.find(c => c.id === id);
      
      if (existingCanvas) {
        // Update existing canvas in the list
        const updatedCanvases = canvases.map(c => 
          c.id === id ? { ...data, lastModified: Date.now() } : c
        );
        await services.canvasStorage.saveItem('available-canvases', updatedCanvases);
      } else {
        // Add new canvas to the list
        const updatedCanvases = [...canvases, data];
        await services.canvasStorage.saveItem('available-canvases', updatedCanvases);
      }
      
      if (services.events) {
        services.events.publish('canvas:saved', { canvasId: id });
      }
      
      return true;
    } catch (error) {
      console.error('Failed to save canvas:', error);
      return false;
    }
  }, [loadAvailableCanvases]);

  // Delete a canvas
  const removeCanvas = useCallback(async (id: string) => {
    try {
      if (id === currentCanvasId) {
        return false; // Cannot delete current canvas
      }
      
      // Make sure service is available
      if (!services.canvasStorage) {
        console.error('Canvas storage service not available');
        return false;
      }
      
      const storageKey = `canvas-${id}`;
      await services.canvasStorage.removeItem(storageKey);
      
      // Update available canvases list
      const canvases = await loadAvailableCanvases();
      const updatedCanvases = canvases.filter(c => c.id !== id);
      await services.canvasStorage.saveItem('available-canvases', updatedCanvases);
      
      // Refresh available canvases
      await loadAvailableCanvases();
      
      return true;
    } catch (err) {
      console.error('Failed to delete canvas:', err);
      setError('Failed to delete canvas');
      return false;
    }
  }, [currentCanvasId, loadAvailableCanvases]);

  // Auto-save functionality with enhanced node preservation
  const saveCanvas = useCallback(async () => {
    try {
      if (!currentCanvasId || !services.canvasStorage) {
        return false;
      }
      
      const existingCanvas = availableCanvases.find(c => c.id === currentCanvasId);
      
      // Process nodes to ensure all dimensions and visual properties are explicitly saved
      const processedNodes = nodes.map(node => {
        // Extract all dimensions from various sources in the node
        const nodeWidth = typeof node.width === 'number' ? node.width : 
                           (node.data?.width || 250);
        const nodeHeight = typeof node.height === 'number' ? node.height : 
                           (node.data?.height || 150);
                           
        // Ensure all style properties are properly set
        const processedNode = {
          ...node,
          // Explicitly set dimensions on both node and data
          width: nodeWidth,
          height: nodeHeight,
          // Ensure data also has dimensions
          data: {
            ...node.data,
            width: nodeWidth,
            height: nodeHeight
          },
          // Ensure draggable and selectable properties are explicitly set
          draggable: node.draggable !== false,
          selected: node.selected || false,
        };
        
        return processedNode;
      });
      
      // Process edges to ensure they have all required properties
      const processedEdges = edges.map(edge => ({
        ...edge,
        // Ensure animated property is set to improve visibility
        animated: edge.animated !== false,
        selected: edge.selected || false
      }));
      
      const data: CanvasData = {
        id: currentCanvasId,
        name: existingCanvas?.name || (currentCanvasId === DEFAULT_CANVAS_ID ? 'Default Canvas' : `Canvas ${new Date().toLocaleString()}`),
        nodes: processedNodes as any, // Type assertion to handle Node type mismatch
        edges: processedEdges as any, // Type assertion to handle Edge type mismatch
        lastModified: Date.now()
      };
      
      return await saveCanvasData(currentCanvasId, data);
    } catch (error) {
      console.error('Failed to save canvas:', error);
      return false;
    }
  }, [availableCanvases, currentCanvasId, edges, nodes, saveCanvasData]);

  // Load initial data
  useEffect(() => {
    if (!initialized) {
      const initialize = async () => {
        await loadAvailableCanvases();
        await loadCanvas(canvasId);
      };
      
      initialize();
    }
  }, [canvasId, initialized, loadAvailableCanvases, loadCanvas]);

  // Auto-save on changes
  useEffect(() => {
    if (!initialized || isLoading || !autoSave) return;
    
    const timer = setTimeout(() => {
      saveCanvas();
    }, saveInterval);
    
    return () => clearTimeout(timer);
  }, [initialized, isLoading, autoSave, saveInterval, nodes, edges, saveCanvas]);

  return {
    isLoading, 
    error, 
    lastSaved,
    currentCanvasId, 
    availableCanvases, 
    loadCanvas, 
    createCanvas, 
    removeCanvas,
    saveCanvas
  };
};
