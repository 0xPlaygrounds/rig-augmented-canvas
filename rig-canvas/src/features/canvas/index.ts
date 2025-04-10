// Export components 
import { Canvas, CanvasWithProvider, default as CanvasDefault } from './components/CanvasAdapter';
export { Canvas, CanvasWithProvider };
export default CanvasDefault;

// Export NoteNode component
export { default as NoteNode } from '../../components/NoteNode';
export type { NoteNodeData } from '../../components/NoteNode';

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
