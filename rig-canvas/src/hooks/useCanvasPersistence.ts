import { useEffect, useState, useCallback } from 'react';
import { useCanvasStore } from '../store/canvasStore';
import { saveCanvasData, loadCanvasData, getAllCanvases, deleteCanvas } from '../utils/indexedDB';
import { CanvasData } from '../types';

// Default canvas ID
const DEFAULT_CANVAS_ID = 'default-canvas';

export interface CanvasPersistenceProps {
  canvasId?: string;
}

export const useCanvasPersistence = ({ canvasId = DEFAULT_CANVAS_ID }: CanvasPersistenceProps = {}) => {
  const { nodes, edges, setNodes, setEdges } = useCanvasStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCanvasId, setCurrentCanvasId] = useState<string>(canvasId);
  const [availableCanvases, setAvailableCanvases] = useState<CanvasData[]>([]);

  // Load available canvases
  const loadAvailableCanvases = useCallback(async () => {
    try {
      const canvases = await getAllCanvases();
      setAvailableCanvases(canvases);
      return canvases;
    } catch (err) {
      console.error('Failed to load available canvases:', err);
      setError('Failed to load available canvases');
      return [];
    }
  }, []);

  // Load canvas data
  const loadCanvas = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const savedData = await loadCanvasData(id);
      
      if (savedData) {
        setNodes(savedData.nodes);
        setEdges(savedData.edges);
        setCurrentCanvasId(id);
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
        setCurrentCanvasId(id);
        
        // Refresh available canvases
        await loadAvailableCanvases();
      }
      
      setError(null);
    } catch (err) {
      console.error('Failed to load canvas data:', err);
      setError('Failed to load canvas data');
    } finally {
      setIsLoading(false);
    }
  }, [setNodes, setEdges, loadAvailableCanvases]);

  // Create a new canvas
  const createCanvas = useCallback(async (name: string) => {
    try {
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

  // Delete a canvas
  const removeCanvas = useCallback(async (id: string) => {
    try {
      if (id === currentCanvasId) {
        return false; // Cannot delete current canvas
      }
      
      await deleteCanvas(id);
      
      // Refresh available canvases
      await loadAvailableCanvases();
      
      return true;
    } catch (err) {
      console.error('Failed to delete canvas:', err);
      setError('Failed to delete canvas');
      return false;
    }
  }, [currentCanvasId, loadAvailableCanvases]);

  // Load canvas data on mount
  useEffect(() => {
    const initialize = async () => {
      await loadAvailableCanvases();
      await loadCanvas(canvasId);
    };

    initialize();
  }, [canvasId, loadAvailableCanvases, loadCanvas]);

  // Save canvas data when nodes or edges change
  useEffect(() => {
    const saveCanvas = async () => {
      try {
        if (!isLoading) {
          const existingCanvas = await loadCanvasData(currentCanvasId);
          
          const data: CanvasData = {
            id: currentCanvasId,
            name: existingCanvas?.name || (currentCanvasId === DEFAULT_CANVAS_ID ? 'Default Canvas' : `Canvas ${new Date().toLocaleString()}`),
            nodes,
            edges,
            lastModified: Date.now()
          };
          
          await saveCanvasData(currentCanvasId, data);
          
          // Refresh available canvases to update last modified time
          await loadAvailableCanvases();
        }
      } catch (err) {
        console.error('Failed to save canvas data:', err);
        setError('Failed to save canvas data');
      }
    };

    // Use a debounce to avoid saving too frequently
    const timeoutId = setTimeout(() => {
      saveCanvas();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [nodes, edges, isLoading, currentCanvasId, loadAvailableCanvases]);

  return { 
    isLoading, 
    error, 
    currentCanvasId, 
    availableCanvases, 
    loadCanvas, 
    createCanvas, 
    removeCanvas 
  };
};
