# Rig Augmented Canvas Refactoring Progress

This document summarizes the refactoring work that has been done and outlines the steps to continue the implementation of the component library architecture.

## Completed Work

### 1. Component Library Foundation

We've established a component library structure following the atomic design methodology:

```
/src
  /components
    /atoms        # Basic UI elements
    /molecules    # Combinations of atoms 
    /organisms    # Complex UI components
    /templates    # Page layouts
    /layouts      # Layout components
```

#### Implemented Atomic Components
- **Atoms**
  - `Button`: A versatile button component with multiple variants and sizes
  - `Card`: A container component for displaying content in a contained area
  - `Icon`: A wrapper around Lucide icons for consistent styling
  - `TextField`: A text input component with labels and error handling
  - `Tooltip`: A component for displaying information on hover

- **Molecules**
  - `ToolbarButton`: A specialized button for toolbars with tooltip support

- **Layouts**
  - `SplitPane`: A resizable split layout component for creating multi-panel interfaces

### 2. Service Layer

We've created a service abstraction layer to decouple external dependencies from components:

- **Storage Service**
  - `StorageAdapter`: Interface for storage operations
  - `IndexedDBAdapter`: Implementation using IndexedDB
  - `LocalStorageAdapter`: Implementation using localStorage as a fallback
  - `StorageProvider`: Factory to create the appropriate adapter

- **Event Service**
  - `EventService`: Interface for event pub/sub operations
  - `LocalEventService`: Implementation with in-memory event handling
  - `useEvent`: React hook for subscribing to events

- **Service Provider**
  - Centralized access to all services
  - Lazy initialization and dependency injection

### 3. Feature Modules

We've started extracting features into self-contained modules:

- **Markdown Editor**
  - Components: Editor, Preview, Toolbar
  - Hooks: useMarkdownEditor
  - Utils: Formatting utilities
  - Types: Common type definitions

- **Focus Mode** (fully implemented)
  - Components: FocusMode, FocusModeToolbar, FocusModeHeader, SettingsPanel
  - Hooks: useFocusMode
  - Types: Writing modes, Pomodoro timer, Typography settings
  - Features: Distraction-free writing, multiple writing modes, pomodoro timer, text-to-speech, word analysis

## Next Steps

### 1. Extract More Features

- **Canvas Feature** (fully implemented)
  - ✅ Extract Canvas functionality into a feature module
  - ✅ Create components: Canvas
  - ✅ Create hooks: useCanvas, useCanvasPersistence
  - ✅ Implement adapters for @xyflow/react

- **File Explorer Feature** (fully implemented)
  - ✅ Extract File Explorer functionality
  - ✅ Create components: FileExplorer, FileItem, FolderItem, FileViewer
  - ✅ Create hooks: useFileSystem
  - ✅ Extract types to feature module

- **AI Assistant Feature** (fully implemented)
  - ✅ Extract AI Assistant functionality into a feature module
  - ✅ Create components: AIAssistant, MessageBubble
  - ✅ Create hooks: useAIAssistant
  - ✅ Extract types to feature module

### 2. Refactor Existing Components

- Refactor existing components to use the new architecture:
  - ✅ Update `NoteNode` to use the Focus Mode feature
  - ✅ Update `NoteNode` to use the Markdown Editor feature
  - ✅ Update `Canvas` to use the Canvas feature
  - ✅ Update `FileViewer` to use the File Explorer feature
  - ✅ Update `FileViewer` to use the AI Assistant feature

### 3. Standardize Store Pattern

- ✅ Create a store factory to standardize store creation
- ✅ Implement store pattern for Canvas feature
- ✅ Refactor settingsStore to use the standardized store pattern

### 4. Cleanup of Duplicate Components and References

- ✅ Removed duplicate component implementations:
  - ✅ Removed `src/components/Canvas.tsx` (using `features/canvas/components/Canvas.tsx`)
  - ✅ Removed `src/components/FileViewer.tsx` (using `features/file-explorer/components/FileViewer.tsx`) 
  - ✅ Removed `src/components/FocusMode.tsx` (using `features/focus-mode/components/FocusMode.tsx`)
  - ✅ Removed `src/components/FileExplorer.tsx` (using `features/file-explorer/components/FileExplorer.tsx`)
- ✅ Updated imports in App.tsx to use feature module components
- ✅ Created REFACTORING_TODO.md to track remaining work
- ✅ Aligned hook API differences:
  - ✅ Enhanced `useCanvasPersistence` in feature module to include all functionality from old hook
  - ✅ Updated `Sidebar.tsx` to use the feature module version
  - ✅ Fixed internal path imports in file explorer components

### 5. Documentation and Testing

- Documentation completed:
  - ✅ Document Canvas component API (see below)
  - ✅ Align hook APIs between old and new implementations
  - ✅ Consolidate canvasStore implementations
  - ✅ Remove old hooks from /src/hooks/ once all components migrated
  - ✅ Documented all remaining component APIs in `src/docs/COMPONENT_API.md`:
    - ✅ NoteNode component
    - ✅ ContextMenu component
    - ✅ Sidebar component
    - ✅ FileExplorer component
    - ✅ FileViewer component
    - ✅ AIAssistant component
- Remaining tasks:

#### NoteNode Component API Documentation

```tsx
import { NoteNode } from '@/components/NoteNode';

/**
 * NoteNode Component API
 * 
 * A note component for the Canvas, supporting markdown content, resizing, and focus mode.
 * 
 * Props (extends NodeProps from @xyflow/react):
 * - id: string - Unique identifier for the node
 * - data: NoteData - Data object containing:
 *   - content: string - Markdown content of the note
 *   - width?: number - Width of the node (default: 250)
 *   - height?: number - Height of the node (default: 150)
 *   - color?: string - Background color of the node
 * - selected?: boolean - Whether the node is selected
 * - isConnectable?: boolean - Whether the node can be connected to other nodes
 * 
 * Features:
 * - Markdown editing and rendering
 * - Resizable dimensions with real-time updates
 * - Quick edit and focus mode toggling
 * - Connection handles for creating edges
 * - Deletion capability
 */

// NoteNode is usually used in the nodeTypes object passed to Canvas
const nodeTypes = { note: NoteNode };

// Basic usage example within a Canvas
<Canvas 
  nodeTypes={nodeTypes}
  // ...other Canvas props
/>
```
  - Add storybook stories for each component
  - Write unit tests for components and services

#### Canvas Component API Documentation

```tsx
import { Canvas, CanvasWithProvider } from '@/features/canvas';

/**
 * Canvas Component API
 * 
 * Props:
 * - canvasId?: string - Unique identifier for the canvas (default: 'main')
 * - className?: string - Additional CSS classes to apply
 * - children?: ReactNode - Additional content to render inside the canvas
 * - toolbarContent?: ReactNode - Custom content for the toolbar panel
 * - readOnly?: boolean - Whether the canvas is in read-only mode (default: false)
 * - nodeTypes?: NodeTypes - Custom node types mapping (default: {})
 * - edgeTypes?: EdgeTypes - Custom edge types mapping (default: {})
 * - contextMenu?: ReactNode - Custom context menu component
 * - minZoom?: number - Minimum zoom level (default: 0.1)
 * - maxZoom?: number - Maximum zoom level (default: 2)
 * - onNodeClick?: (node: Node) => void - Callback when a node is clicked
 * - onNodeDoubleClick?: (node: Node) => void - Callback when a node is double-clicked
 * - onPaneClick?: () => void - Callback when the pane is clicked
 * - onFileDrop?: (file: FileData) => void - Callback when a file is dropped onto the canvas
 */

// Basic usage example
const CanvasExample = () => {
  const handleFileDrop = (file) => {
    console.log('File dropped:', file);
  };

  return (
    <CanvasWithProvider
      canvasId="main-canvas"
      onFileDrop={handleFileDrop}
      toolbarContent={<ToolbarButtons />}
    />
  );
};
```

## Usage Examples

### Using Atomic Components

```tsx
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { TextField } from '@/components/atoms/TextField';

const MyComponent = () => {
  return (
    <Card variant="default" className="p-4">
      <h2>Login</h2>
      <TextField 
        label="Username" 
        placeholder="Enter username" 
      />
      <TextField 
        label="Password" 
        type="password" 
        placeholder="Enter password" 
      />
      <Button>Submit</Button>
    </Card>
  );
};
```

### Using Feature Modules

```tsx
import { MarkdownEditor } from '@/features/markdown-editor';

const NoteEditor = () => {
  const handleSave = (content) => {
    console.log('Saving content:', content);
  };

  return (
    <MarkdownEditor
      initialContent="# Hello World"
      onSave={handleSave}
      showToolbar={true}
      showStatusBar={true}
    />
  );
};
```

### Using Focus Mode

```tsx
import { FocusMode } from '@/features/focus-mode';

const WritingEditor = () => {
  const handleSave = (content) => {
    console.log('Saving content:', content);
  };

  const handleClose = () => {
    console.log('Focus mode closed');
  };

  return (
    <FocusMode
      initialContent="# Start writing here"
      onSave={handleSave}
      onClose={handleClose}
      initialMode="brainstorming"
      enablePomodoro={true}
    />
  );
};
```

### Using Services

```tsx
import { services } from '@/services/ServiceProvider';

// Storage service
const saveData = async () => {
  await services.canvasStorage.saveItem('canvas-1', canvasData);
};

// Event service
const setupEventListeners = () => {
  services.events.typedSubscribe('document:saved', (documentId) => {
    console.log(`Document ${documentId} saved`);
  });
};
```

## Conclusion

The refactoring process is focused on creating a more maintainable, scalable architecture by:

1. Separating concerns through a component library approach
2. Decoupling external dependencies using service adapters
3. Organizing related functionality into feature modules
4. Standardizing patterns throughout the codebase

Continue implementing the remaining components and features following the established patterns.
