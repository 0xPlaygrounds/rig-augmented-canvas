# Rig Canvas - System Design Document

## Table of Contents

1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Component Architecture](#component-architecture)
4. [Data Flow](#data-flow)
5. [State Management](#state-management)
6. [Data Persistence](#data-persistence)
7. [File System](#file-system)
8. [Canvas System](#canvas-system)
9. [UI/UX Design](#uiux-design)
10. [Styling Architecture](#styling-architecture)
11. [Performance Considerations](#performance-considerations)
12. [Future Enhancements](#future-enhancements)

## Introduction

Rig Canvas is a web-based application for creating and managing interactive canvas workspaces with notes, connections, and file attachments. It provides a flexible environment for organizing thoughts, creating mind maps, and visualizing relationships between different pieces of information.

The application is built using modern web technologies:
- **React**: For building the user interface
- **TypeScript**: For type safety and improved developer experience
- **@xyflow/react**: For the interactive canvas and node-based interface
- **Zustand**: For state management
- **IndexedDB**: For client-side data persistence
- **TailwindCSS**: For styling
- **Vite**: For fast development and optimized builds

## System Architecture

Rig Canvas follows a client-side architecture with all processing and data storage happening in the browser. The application is structured as a single-page application (SPA) with the following high-level architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interface                        │
│  ┌─────────┐  ┌─────────────┐  ┌───────────┐  ┌──────────┐  │
│  │ Sidebar │  │    Canvas   │  │FileViewer │  │ Controls │  │
│  └─────────┘  └─────────────┘  └───────────┘  └──────────┘  │
├─────────────────────────────────────────────────────────────┤
│                      State Management                        │
│  ┌─────────────┐  ┌───────────────────┐  ┌───────────────┐  │
│  │CanvasStore  │  │FileSystem Hooks   │  │Canvas Hooks   │  │
│  └─────────────┘  └───────────────────┘  └───────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                      Data Persistence                        │
│                  ┌───────────────────────┐                   │
│                  │      IndexedDB        │                   │
│                  └───────────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

### Key Architectural Patterns

1. **Component-Based Architecture**: The UI is composed of reusable React components
2. **Custom Hooks**: Business logic is encapsulated in custom hooks
3. **State Management**: Zustand is used for global state management
4. **Persistence Layer**: IndexedDB is used for client-side data storage
5. **Event-Driven Architecture**: Components communicate through events and state changes

## Component Architecture

The application is structured into the following key components:

### Core Components

1. **App.tsx**: The root component that orchestrates the overall application layout and state
2. **Canvas.tsx**: The main canvas component that renders the interactive workspace
3. **Sidebar.tsx**: The sidebar component that provides file and canvas management
4. **NoteNode.tsx**: The component for rendering and interacting with note nodes
5. **FileViewer.tsx**: The component for viewing and editing files
6. **FileExplorer.tsx**: The component for browsing and managing files
7. **ContextMenu.tsx**: The context menu for nodes and edges
8. **CustomEdge.tsx**: Custom edge component for connections between nodes
9. **FocusMode.tsx**: Component for focused editing of notes
10. **NoteToolbar.tsx**: Toolbar for formatting note content

### Component Hierarchy

```
App
├── Sidebar
│   └── FileExplorer
├── Canvas
│   ├── NoteNode
│   │   └── NoteToolbar
│   ├── CustomEdge
│   ├── ContextMenu
│   └── FocusMode
└── FileViewer
```

## Data Flow

The application follows a unidirectional data flow pattern:

1. **User Interactions**: User interacts with the UI components
2. **State Updates**: Actions trigger state updates through Zustand stores or React hooks
3. **Component Re-rendering**: State changes cause components to re-render
4. **Persistence**: State changes are persisted to IndexedDB
5. **Feedback**: UI reflects the updated state

### Example Data Flow: Creating a Note

```
User clicks "Add Note" → Canvas component calls addNode → 
CanvasStore updates nodes state → Canvas re-renders with new node → 
useCanvasPersistence hook saves to IndexedDB
```

### Example Data Flow: Editing a Note

```
User edits note content → NoteNode updates local state → 
User saves → NoteNode calls updateNode → CanvasStore updates node data → 
If linked to file, updateFileContent is called → IndexedDB is updated
```

## State Management

Rig Canvas uses Zustand for state management, with the following key stores:

### Canvas Store (canvasStore.ts)

The Canvas Store manages the state of the canvas, including nodes, edges, and context menu:

```typescript
interface CanvasState {
  nodes: Node[];
  edges: Edge[];
  contextMenu: ContextMenuPosition | null;
  
  addNode: (node: Node) => void;
  updateNode: (id: string, data: Partial<Node>) => void;
  removeNode: (id: string) => void;
  
  addEdge: (edge: Edge) => void;
  updateEdge: (id: string, data: Partial<Edge>) => void;
  removeEdge: (id: string) => void;
  
  setContextMenu: (position: ContextMenuPosition | null) => void;
  
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  
  clearCanvas: () => void;
}
```

### Custom Hooks

In addition to the Zustand store, the application uses custom hooks to manage specific aspects of the application state:

1. **useCanvasPersistence**: Manages loading and saving canvas data to IndexedDB
2. **useFileSystem**: Manages the file system operations and state

## Data Persistence

Rig Canvas uses IndexedDB for client-side data persistence, with the following stores:

### IndexedDB Structure

```
Database: rig-augmented-canvas (version 2)
├── ObjectStore: canvas-data
│   └── Key-Value pairs of canvas ID to canvas data
└── ObjectStore: file-system
    └── Key: 'file-system', Value: FileSystemData
```

### Data Models

#### Canvas Data

```typescript
interface CanvasData {
  nodes: Node[];
  edges: Edge[];
  id: string;
  name: string;
  lastModified: number;
}
```

#### File System Data

```typescript
interface FileSystemData {
  rootFolder: FolderData;
}

interface FolderData {
  id: string;
  name: string;
  files: FileData[];
  folders: FolderData[];
  lastModified: number;
}

interface FileData {
  id: string;
  name: string;
  type: FileType;
  content?: string;
  url?: string;
  lastModified: number;
  size?: number;
}

type FileType = 'note' | 'image' | 'audio' | 'canvas' | 'pdf' | 'markdown';
```

### Persistence Operations

The application provides the following persistence operations:

1. **Canvas Operations**:
   - `saveCanvasData`: Save canvas data to IndexedDB
   - `loadCanvasData`: Load canvas data from IndexedDB
   - `getAllCanvases`: Get all saved canvases
   - `deleteCanvas`: Delete a canvas by ID

2. **File System Operations**:
   - `getFileSystem`: Get the file system
   - `saveFileSystem`: Save the file system
   - `createFolder`: Create a new folder
   - `createFile`: Create a new file
   - `updateFile`: Update a file
   - `deleteFile`: Delete a file
   - `deleteFolder`: Delete a folder
   - `getFileById`: Get a file by ID
   - `moveFile`: Move a file to a different folder

## File System

Rig Canvas implements a virtual file system that allows users to organize their notes and files in a hierarchical structure.

### File System Structure

The file system is structured as a tree of folders and files:

```
RootFolder
├── Files
│   ├── File 1
│   ├── File 2
│   └── ...
└── Folders
    ├── Folder 1
    │   ├── Files
    │   │   ├── File 3
    │   │   └── ...
    │   └── Folders
    │       └── ...
    └── Folder 2
        └── ...
```

### File Types

The file system supports the following file types:

1. **Note**: Text notes with markdown support
2. **Image**: Image files with URL references
3. **Audio**: Audio files with URL references
4. **Canvas**: References to saved canvases
5. **PDF**: PDF files with URL references
6. **Markdown**: Markdown files

### File Operations

The file system supports the following operations:

1. **Create**: Create new files and folders
2. **Read**: Read file content
3. **Update**: Update file content and metadata
4. **Delete**: Delete files and folders
5. **Move**: Move files between folders

## Canvas System

The canvas system is built on top of @xyflow/react (formerly React Flow) and provides an interactive workspace for creating and connecting notes.

### Canvas Elements

1. **Nodes**: Represent notes or files on the canvas
2. **Edges**: Represent connections between nodes
3. **Controls**: UI controls for zooming, panning, and interacting with the canvas
4. **Background**: Grid background for the canvas
5. **MiniMap**: Miniature view of the canvas for navigation

### Node Types

The application currently supports the following node types:

1. **Note Node**: A node for displaying and editing text notes with markdown support

### Edge Types

The application supports custom edges with the following features:

1. **Direction**: Edges can be directional (forward, backward, bidirectional)
2. **Style**: Edges can have custom styles (color, width, animation)
3. **Interaction**: Edges can be selected, deleted, and have their direction changed

### Canvas Interactions

The canvas supports the following interactions:

1. **Add Node**: Add a new note to the canvas
2. **Edit Node**: Edit the content of a note
3. **Resize Node**: Resize a note using handles
4. **Delete Node**: Remove a note from the canvas
5. **Connect Nodes**: Create connections between nodes
6. **Drag and Drop**: Drag files from the file explorer onto the canvas
7. **Context Menu**: Right-click on nodes, edges, or the canvas to access context menu options
8. **Focus Mode**: Enter a focused editing mode for notes

## UI/UX Design

Rig Canvas follows a modern, minimalist design approach with a focus on usability and productivity.

### Layout

The application has a responsive layout with the following main sections:

1. **Sidebar**: Left sidebar for file and canvas management
2. **Canvas**: Main workspace for creating and connecting notes
3. **File Viewer**: Overlay for viewing and editing files

### Color Scheme

The application uses a dark color scheme with the following key colors:

1. **Background**: Dark gray (#1f2937)
2. **Accent**: Blue (#3b82f6)
3. **Text**: White/Light gray
4. **Borders**: Medium gray (#374151)

### Responsive Design

The application is designed to be responsive, with the following features:

1. **Resizable Sidebar**: The sidebar can be resized or collapsed
2. **Responsive Canvas**: The canvas adapts to the available screen space
3. **Focus Mode**: Full-screen mode for focused editing

## Styling Architecture

Rig Canvas uses TailwindCSS for styling, with the following architecture:

### TailwindCSS Configuration

The application uses a custom TailwindCSS configuration with extended themes for colors, spacing, and other design tokens.

### CSS Modules

In addition to TailwindCSS, the application uses CSS modules for component-specific styles:

1. **controls.css**: Styles for canvas controls
2. **markdown.css**: Styles for markdown rendering

### CSS Variables

The application uses CSS variables for theming and consistent styling:

```css
:root {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --bg-tertiary: #374151;
  --text-primary: #f9fafb;
  --text-secondary: #e5e7eb;
  --text-tertiary: #9ca3af;
  --accent-primary: #3b82f6;
  --accent-hover: #2563eb;
  --border-primary: #374151;
  --border-secondary: #4b5563;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --grid-color: rgba(55, 65, 81, 0.5);
  --handle-color: #3b82f6;
  --node-border: #4b5563;
  --node-border-selected: #3b82f6;
}
```

## Performance Considerations

Rig Canvas implements several performance optimizations:

### React Optimizations

1. **useMemo**: Used to memoize expensive computations
2. **useCallback**: Used to memoize callback functions
3. **React.memo**: Used to prevent unnecessary re-renders

### Canvas Optimizations

1. **Virtualization**: @xyflow/react provides virtualization for efficient rendering of large canvases
2. **Debounced Saving**: Canvas changes are debounced before saving to IndexedDB
3. **Lazy Loading**: Components and resources are loaded only when needed

### IndexedDB Optimizations

1. **Batch Operations**: Related operations are batched when possible
2. **Selective Updates**: Only changed data is updated in IndexedDB
3. **Caching**: Frequently accessed data is cached in memory

## Future Enhancements

Potential future enhancements for Rig Canvas include:

1. **Additional Node Types**: Support for more specialized node types (e.g., code blocks, diagrams)
2. **Collaboration**: Real-time collaboration features
3. **Cloud Sync**: Synchronization with cloud storage services
4. **Export/Import**: Enhanced export and import capabilities
5. **Templates**: Pre-defined canvas templates for common use cases
6. **Plugins**: Extensibility through plugins
7. **Mobile Support**: Enhanced support for mobile devices
8. **Offline Mode**: Improved offline capabilities
9. **AI Integration**: Integration with AI services for content generation and analysis
10. **Version History**: Track changes and restore previous versions
