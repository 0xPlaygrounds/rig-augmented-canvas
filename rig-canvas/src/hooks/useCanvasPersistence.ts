import { useEffect, useState } from 'react';
import { useCanvasStore } from '../store/canvasStore';
import { saveCanvasData, loadCanvasData } from '../utils/indexedDB';
import { CanvasData } from '../types';

// Default canvas ID
const DEFAULT_CANVAS_ID = 'default-canvas';

export const useCanvasPersistence = () => {
  const { nodes, edges, setNodes, setEdges } = useCanvasStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load canvas data on mount
  useEffect(() => {
    const loadCanvas = async () => {
      try {
        setIsLoading(true);
        const savedData = await loadCanvasData(DEFAULT_CANVAS_ID);
        
        if (savedData) {
          setNodes(savedData.nodes);
          setEdges(savedData.edges);
        }
        
        setError(null);
      } catch (err) {
        console.error('Failed to load canvas data:', err);
        setError('Failed to load canvas data');
      } finally {
        setIsLoading(false);
      }
    };

    loadCanvas();
  }, [setNodes, setEdges]);

  // Save canvas data when nodes or edges change
  useEffect(() => {
    const saveCanvas = async () => {
      try {
        if (!isLoading) {
          const data: CanvasData = { nodes, edges };
          await saveCanvasData(DEFAULT_CANVAS_ID, data);
        }
      } catch (err) {
        console.error('Failed to save canvas data:', err);
        setError('Failed to save canvas data');
      }
    };

    saveCanvas();
  }, [nodes, edges, isLoading]);

  return { isLoading, error };
};
