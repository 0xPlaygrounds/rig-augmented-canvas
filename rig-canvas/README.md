# Rig Augmented Canvas

A clean, minimalist, browser-based note-taking web application with an infinite canvas. Create visual maps of your notes, ideas, and content with a simple and intuitive interface.

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue.svg)](https://github.com/0xPlaygrounds/rig-augmented-canvas)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Architecture](#architecture)
  - [Component Library Structure](#component-library-structure)
  - [Service Layer](#service-layer)
  - [Feature Modules](#feature-modules)
  - [State Management](#state-management)
- [Component API Reference](#component-api-reference)
- [Contribution Guide](#contribution-guide)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **Infinite Canvas**: Navigate and organize your thoughts spatially
- **Note Cards**: Create, edit, and delete note cards with markdown support
- **Connections**: Connect notes with edges to visualize relationships
- **Resizable Notes**: Adjust note card sizes to fit your content
- **Focus Mode**: Distraction-free writing experience with multiple writing modes
- **File Explorer**: Hierarchical file system with folder organization
- **AI Assistant**: Integrated AI co-writer for assistance with your content
- **Multiple Canvases**: Create and manage separate canvas workspaces
- **Persistence**: All data is stored locally using IndexedDB
- **Markdown Support**: Format your notes with markdown syntax
- **Edge Customization**: Style connections with different colors, types, and labels
- **Typography Settings**: Customize reading experience with typography controls

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/0xPlaygrounds/rig-augmented-canvas.git
cd rig-augmented-canvas
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173/`

## Usage

### Canvas Operations

- **Add Note**: Right-click on empty canvas area and select "Add Note" 
- **Connect Notes**: Drag from the bottom handle of one note to the top handle of another
- **Pan Canvas**: Click and drag on empty canvas space
- **Zoom Canvas**: Use mouse wheel or pinch gesture
- **Select Multiple**: Click and drag to create a selection rectangle
- **Delete Multiple**: Select multiple nodes and press Delete

### Note Operations

- **Edit Note**: Click the edit (pencil) icon on a note or double-click the note
- **Delete Note**: Click the trash icon on a note
- **Resize Note**: Drag the resize handles when the note is selected
- **Focus Mode**: Click the maximize icon on a note for distraction-free writing
- **Quick Format**: Use the toolbar in edit mode for Markdown formatting

### Edge Operations

- **Create Edge**: Drag from a source handle to a target handle
- **Style Edge**: Right-click on an edge to open the context menu with styling options
- **Add Label**: Right-click on an edge and select "Add Label"
- **Delete Edge**: Right-click on an edge and select "Delete Connection"

### File Management

- **Create Folder**: Click the + icon in the folder section
- **Upload Files**: Right-click on a folder and select "Upload File"
- **Save Note**: Right-click on a folder and select "Save Note"
- **Drag & Drop**: Move files between folders with drag and drop

### Canvas Management

- **Create Canvas**: Click the + icon in the Canvases tab
- **Switch Canvas**: Click on a canvas name in the sidebar
- **Rename Canvas**: Click the edit icon next to a canvas name
- **Delete Canvas**: Click the trash icon next to a canvas name

## Architecture

Rig Augmented Canvas uses a modular architecture that separates concerns and promotes maintainability. The codebase follows a feature-first approach with standardized patterns throughout.

### Component Library Structure

The application uses the atomic design methodology for its component library:

```
/src
  /components
    /atoms        # Basic UI elements
    /molecules    # Combinations of atoms 
    /organisms    # Complex UI components
    /templates    # Page layouts
    /layouts      # Layout components
```

#### Atomic Components

- **Atoms**: `Button`, `Card`, `Icon`, `TextField`, `Tooltip`
- **Molecules**: `ToolbarButton`
- **Layouts**: `SplitPane`

#### Usage Example

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

### Service Layer

The service layer decouples external dependencies from components through adapter interfaces and implementations:

#### Storage Service

- `StorageAdapter`: Interface for storage operations
- `IndexedDBAdapter`: Implementation using IndexedDB
- `LocalStorageAdapter`: Implementation using localStorage as a fallback
- `StorageProvider`: Factory to create the appropriate adapter

#### Event Service

- `EventService`: Interface for event pub/sub operations
- `LocalEventService`: Implementation with in-memory event handling
- `useEvent`: React hook for subscribing to events

#### Service Provider

- Centralized access to all services
- Lazy initialization and dependency injection

#### Usage Example

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

### Feature Modules

Features are organized into self-contained modules that include all related components, hooks, types, and utilities:

#### Canvas Feature

- Components: `Canvas`
- Hooks: `useCanvas`, `useCanvasPersistence`
- Store: `canvasStore`
- Types: Node, edge, and canvas-related types

#### File Explorer Feature

- Components: `FileExplorer`, `FileItem`, `FolderItem`, `FileViewer`
- Hooks: `useFileSystem`
- Types: File and folder related types

#### Focus Mode Feature

- Components: `FocusMode`, `FocusModeHeader`, `FocusModeToolbar`, `SettingsPanel`
- Hooks: `useFocusMode`
- Types: Writing modes, Pomodoro timer, Typography settings

#### Markdown Editor Feature

- Components: `MarkdownEditor`, `MarkdownPreview`, `MarkdownToolbar`
- Hooks: `useMarkdownEditor`
- Utils: Formatting utilities

#### AI Assistant Feature

- Components: `AIAssistant`, `MessageBubble`
- Hooks: `useAIAssistant`
- Types: Message and chat-related types

#### Usage Example

```tsx
import { MarkdownEditor } from '@/features/markdown-editor';
import { FocusMode } from '@/features/focus-mode';

const NoteEditor = () => {
  const handleSave = (content) => {
    console.log('Saving content:', content);
  };

  return (
    <div>
      <MarkdownEditor
        initialContent="# Hello World"
        onSave={handleSave}
        showToolbar={true}
        showStatusBar={true}
      />
      
      <button onClick={() => setShowFocusMode(true)}>Enter Focus Mode</button>
      
      {showFocusMode && (
        <FocusMode
          initialContent="# Start writing here"
          onSave={handleSave}
          onClose={() => setShowFocusMode(false)}
          initialMode="brainstorming"
          enablePomodoro={true}
        />
      )}
    </div>
  );
};
```

### State Management

The application uses a standardized store pattern for state management:

- `createStore`: Factory function for creating consistent stores
- Each feature module has its own encapsulated store when needed
- Stores provide hooks to access and update state

#### Example Store Pattern:

```tsx
// Creating a store
const useCanvasStore = createStore<CanvasState>((set) => ({
  nodes: [],
  edges: [],
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  removeNode: (nodeId) => set((state) => ({ 
    nodes: state.nodes.filter(n => n.id !== nodeId) 
  })),
}));

// Using a store
const MyComponent = () => {
  const { nodes, addNode } = useCanvasStore();
  
  return (
    <div>
      {nodes.map(node => (
        <div key={node.id}>{node.data.label}</div>
      ))}
      <button onClick={() => addNode({ id: 'new-node', data: { label: 'New Node' } })}>
        Add Node
      </button>
    </div>
  );
};
```

## Component API Reference

For detailed API documentation of all components, please see the [Component API Documentation](./src/docs/COMPONENT_API.md).

Below is a summary of key components:

### Canvas Component

The primary canvas component that renders the reactive flow diagram.

```tsx
import { Canvas, CanvasWithProvider } from '@/features/canvas';

// Basic usage example
const CanvasExample = () => {
  return (
    <CanvasWithProvider
      canvasId="main-canvas"
      onFileDrop={handleFileDrop}
      toolbarContent={<ToolbarButtons />}
    />
  );
};
```

### NoteNode Component

Represents a note on the canvas with markdown support.

```tsx
import { NoteNode } from '@/components/NoteNode';

// Used within Canvas component via nodeTypes
const nodeTypes = { note: NoteNode };

<Canvas nodeTypes={nodeTypes} />
```

### FileExplorer Component

Provides file and folder management.

```tsx
import { FileExplorer } from '@/features/file-explorer';

const FileBrowserExample = () => {
  return (
    <FileExplorer
      onFileSelect={handleFileSelect}
      onFileDrop={handleFileDrop}
      onSaveNote={handleSaveNote}
    />
  );
};
```

### AIAssistant Component

Chat interface for AI assistance.

```tsx
import { AIAssistant } from '@/features/ai-assistant';

const EditorWithAssistant = () => {
  return (
    <div className="flex">
      <Editor />
      <AIAssistant
        width="20rem"
        title="Writing Assistant"
      />
    </div>
  );
};
```

## Contribution Guide

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Follow the existing project structure
- Use feature modules for new features
- Write tests for new components and functionality
- Follow TypeScript best practices
- Use the atomic design methodology for UI components

## Technologies Used

- React for UI components
- TypeScript for type safety
- @xyflow/react (ReactFlow) for canvas interactions
- TailwindCSS for styling
- Lucide React for icons
- Vite for build tooling
- IndexedDB for local storage
- markdown-it for markdown parsing

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by tools like Obsidian, Miro, and Notion
- Built with a focus on simplicity and usability
- Refactored to follow modern React best practices and maintainable architecture
