# Refactoring TODO

This document outlines the remaining refactoring work needed to complete the migration to the feature module architecture.

## Completed Migration Tasks ✅

### 1. Hook Migrations ✅

#### useCanvasPersistence ✅

The feature module version and the original version had different APIs, but this has been resolved:

- **Old API (src/hooks/useCanvasPersistence.ts)**:
  ```typescript
  {
    isLoading, 
    error, 
    currentCanvasId, 
    availableCanvases, 
    loadCanvas, 
    createCanvas, 
    removeCanvas 
  }
  ```

- **New Enhanced API (src/features/canvas/hooks/useCanvasPersistence.ts)**:
  ```typescript
  {
    isLoading, 
    error, 
    lastSaved,
    currentCanvasId, 
    availableCanvases, 
    loadCanvas, 
    createCanvas, 
    removeCanvas,
    saveCanvas
  }
  ```

Components migrated to use the new hook:
- `src/components/Sidebar.tsx` ✅

#### useFileSystem ✅

The feature module version is now properly imported:
- `src/features/file-explorer/components/FileExplorer.tsx` ✅
- `src/features/file-explorer/components/FileViewer.tsx` ✅

Both components now import from the feature index file instead of directly from the hooks folder.

### 2. Internal Path Imports ✅

Components have been updated to import from feature module exports rather than internal relative paths.

### 3. API Alignment ✅

The feature module hooks have been enhanced to include all functionality from the old hooks, ensuring a smooth transition.

### 4. Store Migrations ✅

- ✅ `canvasStore` consolidated into the feature module version at `/src/features/canvas/store/canvasStore.ts`
- ✅ Old `canvasStore` at `/src/store/canvasStore.ts` removed
- ✅ Components updated to use the consolidated store

### 5. Cleanup ✅

- ✅ Removed old hooks from `/src/hooks/` after migrating all components
- ✅ Updated the REFACTORING_PROGRESS.md document to reflect the completed work

## Remaining Tasks

### 1. Documentation ✅

Document APIs for remaining components:

- NoteNode component ✅
- ContextMenu component ✅
- Sidebar component ✅
- FileExplorer component ✅
- FileViewer component ✅
- AIAssistant component ✅

API documentation has been added to `src/docs/COMPONENT_API.md` with comprehensive details about each component's props, features, and implementation details.

### 2. Testing

- Add Storybook stories for each component
- Write unit tests for components and services
