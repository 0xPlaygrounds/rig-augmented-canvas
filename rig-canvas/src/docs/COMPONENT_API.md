# Component API Documentation

This document provides API documentation for key components in the Rig Augmented Canvas application.

## Table of Contents

- [NoteNode Component](#notenode-component)
- [ContextMenu Component](#contextmenu-component)
- [Sidebar Component](#sidebar-component)
- [FileExplorer Component](#fileexplorer-component)
- [FileViewer Component](#fileviewer-component)
- [AIAssistant Component](#aiassistant-component)

## NoteNode Component

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

### Key Features

- **Markdown Support**: Edit and render markdown content within nodes.
- **Resizable Interface**: Drag handles to adjust node dimensions.
- **Focus Mode**: Enter a distraction-free writing environment for the note content.
- **Connection Points**: Connect to other nodes through handles at top and bottom.
- **Edit Toolbar**: Quick access to edit, focus mode, and delete operations.

### Implementation Details

- Uses `NodeResizer` from @xyflow/react for resizing functionality
- Integrates with the feature-based `FocusMode` and `MarkdownEditor` components
- Handles real-time dimension updates during resize operations for smooth UX
- Supports customizable background color for visual organization

## ContextMenu Component

```tsx
import { ContextMenu } from '@/components/ContextMenu';

/**
 * ContextMenu Component API
 * 
 * A customizable context menu that appears when right-clicking on the canvas,
 * nodes, or edges. Provides different options based on what was clicked.
 * 
 * Props:
 * - x: number - X coordinate for menu position
 * - y: number - Y coordinate for menu position
 * - nodeId?: string - ID of the node that was right-clicked (if applicable)
 * - edgeId?: string - ID of the edge that was right-clicked (if applicable)
 * - onClose: () => void - Callback to close the context menu
 * 
 * Features:
 * - Adding new notes to the canvas
 * - Deleting nodes and edges
 * - Edge customization (direction, type, style, color, thickness)
 * - Adding labels to edges
 */

// Usage example within a Canvas component
const MyCanvasComponent = () => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    nodeId?: string;
    edgeId?: string;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent, nodeId?: string, edgeId?: string) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      nodeId,
      edgeId
    });
  };

  return (
    <>
      <Canvas 
        onContextMenu={(e) => handleContextMenu(e)}
        onNodeContextMenu={(_, node, e) => handleContextMenu(e, node.id)}
        onEdgeContextMenu={(_, edge, e) => handleContextMenu(e, undefined, edge.id)}
      />
      
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          nodeId={contextMenu.nodeId}
          edgeId={contextMenu.edgeId}
          onClose={() => setContextMenu(null)}
        />
      )}
    </>
  );
};
```

### Key Features

- **Context-Aware Options**: Shows different menu options based on what was clicked (canvas, node, or edge)
- **Edge Customization**: Comprehensive edge styling including:
  - Direction control (forward, backward, bidirectional)
  - Path type selection (bezier, straight, step, etc.)
  - Line style settings (solid, dashed, animated)
  - Color selection with preset options
  - Thickness adjustment
  - Label addition
- **Node Operations**: Options for interacting with nodes when right-clicked
- **Canvas Operations**: Options for adding new nodes when right-clicking empty canvas space

### Implementation Details

- Uses nested submenus for organizing complex options
- Interfaces with canvas store to modify nodes and edges
- Positions itself at the exact coordinates of the right-click
- Prevents event propagation to avoid unwanted canvas interactions
- Automatically closes after an action is performed

## Sidebar Component

```tsx
import { Sidebar } from '@/components/Sidebar';

/**
 * Sidebar Component API
 * 
 * A collapsible sidebar that provides navigation between files and canvases.
 * Includes file explorer, canvas management, and resizing capabilities.
 * 
 * Props:
 * - onFileSelect: (file: FileData) => void - Callback when a file is selected
 * - onFileDrop: (file: FileData) => void - Callback when a file is dragged and dropped
 * - onCanvasSelect: (canvasId: string) => void - Callback when a canvas is selected
 * 
 * Features:
 * - File browser with drag-and-drop support
 * - Canvas creation, selection, and management
 * - Collapsible interface to maximize workspace
 * - Resizable width for user preference
 */

// Usage example in a layout component
const AppLayout = () => {
  const handleFileSelect = (file: FileData) => {
    // Logic for when a file is selected
    console.log('File selected:', file);
  };
  
  const handleFileDrop = (file: FileData) => {
    // Logic for when a file is dropped (e.g., onto canvas)
    console.log('File dropped:', file);
  };
  
  const handleCanvasSelect = (canvasId: string) => {
    // Logic for when a canvas is selected
    console.log('Canvas selected:', canvasId);
  };
  
  return (
    <div className="flex h-screen">
      <Sidebar
        onFileSelect={handleFileSelect}
        onFileDrop={handleFileDrop}
        onCanvasSelect={handleCanvasSelect}
      />
      <MainContent />
    </div>
  );
};
```

### Key Features

- **Collapsible Design**: Toggle between expanded and collapsed states to maximize working space
- **Tabs Interface**: Separate tabs for files and canvases
- **Canvas Management**: Create, select, rename, and delete canvases
- **File System Integration**: Full access to the file explorer component
- **Resizable Width**: User-adjustable sidebar width with drag handle
- **Save to Folder**: Support for saving note content to specific folders

### Implementation Details

- Default width of 256px with configurable min (200px) and max (500px) width constraints
- Automatic selection of newly created canvases
- Utilizes feature module hooks: `useCanvasPersistence`, `useCanvasStore`, and `useFileSystem`
- Optimized resize handling with mouse event management
- Interactive controls with hover states for common operations

## FileExplorer Component

```tsx
import { FileExplorer } from '@/features/file-explorer';

/**
 * FileExplorer Component API
 * 
 * A file explorer interface with folders, files, and operations like creating,
 * editing, deleting, and drag/drop functionality.
 * 
 * Props:
 * - onFileSelect: (file: FileData) => void - Callback when a file is selected
 * - onFileDrop: (file: FileData) => void - Callback when a file is dragged and dropped
 * - onSaveNote: (folderId: string, content: string) => void - Callback to save note content to a folder
 * 
 * Features:
 * - Hierarchical folder structure
 * - File creation, editing, and deletion
 * - Drag and drop between folders
 * - File upload support
 * - Folder management (create, rename, delete)
 */

// Usage example in a component
const FileBrowser = () => {
  const handleFileSelect = (file: FileData) => {
    // Logic for when a file is selected
    console.log('Selected file:', file);
  };
  
  const handleFileDrop = (file: FileData) => {
    // Logic for when a file is dropped onto another component
    console.log('File dropped:', file);
  };
  
  const handleSaveNote = (folderId: string, content: string) => {
    // Logic for saving a note to a folder
    console.log(`Saving note to folder ${folderId}`);
  };
  
  return (
    <div className="h-96 border border-gray-300 rounded">
      <FileExplorer
        onFileSelect={handleFileSelect}
        onFileDrop={handleFileDrop}
        onSaveNote={handleSaveNote}
      />
    </div>
  );
};
```

### Key Features

- **Hierarchical File System**: Nested folder structure with expandable/collapsible folders
- **Drag and Drop**: Move files between folders with drag and drop
- **File Operations**: Create, edit, rename, and delete files
- **Folder Management**: Create new folders, rename, and delete existing folders
- **File Upload**: Upload files from the local file system
- **Context-Aware UI**: Different operations available based on the selected item
- **Root Folder Management**: Create and manage top-level folders

### Implementation Details

- Uses the `useFileSystem` hook for file operations
- Tracks expanded/collapsed state for folders
- Handles drag and drop events for files
- Provides file upload functionality with automatic type detection
- Manages editing states for files and folders
- Supports keyboard interaction for file creation and editing

## FileViewer Component

```tsx
import { FileViewer } from '@/features/file-explorer';

/**
 * FileViewer Component API
 * 
 * A file viewer that supports multiple file types with enhanced editing
 * capabilities for markdown and text files.
 * 
 * Props:
 * - file: FileData - The file to display
 * - onClose: () => void - Callback when the file viewer is closed
 * 
 * Features:
 * - Markdown rendering and editing
 * - Multiple writing modes
 * - Typography settings
 * - Reading mode
 * - AI co-writer integration
 * - Focus mode support
 * - Document statistics
 */

// Usage example
const DocumentViewer = () => {
  const [currentFile, setCurrentFile] = useState<FileData | null>(null);
  
  const handleFileSelect = (file: FileData) => {
    setCurrentFile(file);
  };
  
  const handleClose = () => {
    setCurrentFile(null);
  };
  
  return (
    <div className="h-screen flex">
      <FileExplorer onFileSelect={handleFileSelect} />
      
      {currentFile && (
        <div className="flex-1">
          <FileViewer file={currentFile} onClose={handleClose} />
        </div>
      )}
    </div>
  );
};
```

### Key Features

- **Markdown Support**: Edit and render markdown content with preview
- **Writing Modes**: Multiple writing modes (brainstorming, drafting, editing, reviewing)
- **Typography Settings**: Customizable line width, paragraph spacing
- **Reading Mode**: Distraction-free reading experience
- **AI Co-writer**: Integrated AI assistance panel
- **Focus Mode**: Full-screen distraction-free writing environment
- **Statistics**: Word count and estimated reading time
- **Format Toolbar**: Quick formatting options for markdown

### Implementation Details

- Toggleable panels for settings and AI co-writer
- Formatting toolbar for markdown editing
- Real-time word counting and selection statistics
- Reading mode toggle with specialized typography
- Integration with focus mode component
- Auto-scrolling chat interface for AI assistant
- Customizable writing modes with different UI treatments

## AIAssistant Component

```tsx
import { AIAssistant } from '@/features/ai-assistant';

/**
 * AIAssistant Component API
 * 
 * A chat interface for AI assistance within the application.
 * 
 * Props:
 * - initialVisible?: boolean - Whether the assistant is initially visible (default: true)
 * - initialMessages?: ChatMessage[] - Initial messages to display (default: [])
 * - onVisibilityChange?: (visible: boolean) => void - Callback when visibility changes
 * - width?: string - Width of the assistant panel (default: '18rem')
 * - bgColor?: string - Background color class (default: 'bg-bg-tertiary')
 * - title?: string - Title of the assistant panel (default: 'AI Co-writer')
 * - className?: string - Additional CSS classes (default: '')
 * 
 * Features:
 * - Chat-based interface for AI interaction
 * - Message history with user and AI messages
 * - Toggleable visibility
 * - Customizable appearance
 */

// Usage example
const DocumentEditor = () => {
  const [showAssistant, setShowAssistant] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "I'm your writing assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  
  const handleVisibilityChange = (visible: boolean) => {
    setShowAssistant(visible);
  };
  
  return (
    <div className="flex h-full">
      <div className="flex-1">
        {/* Editor content */}
      </div>
      
      <AIAssistant
        initialVisible={showAssistant}
        initialMessages={messages}
        onVisibilityChange={handleVisibilityChange}
        width="20rem"
        title="Writing Assistant"
      />
    </div>
  );
};
```

### Key Features

- **Chat Interface**: Interactive chat-style interface for AI communication
- **Message History**: Displays conversation history between user and AI
- **Toggleable Panel**: Can be shown or hidden based on user preference
- **Input Field**: Text input for sending messages to the AI
- **Customizable Appearance**: Configurable width, background color, and title
- **Dynamic Updates**: Automatic scrolling to latest messages

### Implementation Details

- Uses the `useAIAssistant` hook for message management
- Distinct styling for user and AI messages
- Auto-scrolls to the latest message when new content is added
- Handles message input via text field and send button
- Keyboard accessibility with Enter key support
- Visibility toggle with callback for parent component notification
