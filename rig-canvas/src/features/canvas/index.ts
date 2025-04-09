// Export components
export { Canvas, CanvasWithProvider, default } from './components/Canvas';

// Export hooks
export { useCanvas } from './hooks/useCanvas';
export { useCanvasPersistence } from './hooks/useCanvasPersistence';
export { useNodeResize } from './hooks/useNodeResize';
export type { NodeDimensions, UseNodeResizeParams, UseNodeResizeResult } from './hooks/useNodeResize';

// Export store
export { useCanvasStore } from './store/canvasStore';

// Export utilities
export { applyForcedStyles } from './utils/styleUtils';

// Export types
export * from './types';
