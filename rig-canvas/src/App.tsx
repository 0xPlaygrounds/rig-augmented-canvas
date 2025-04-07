import React, { useState, useCallback, useEffect } from 'react';
import CanvasWithProvider from './components/Canvas';
import Sidebar from './components/Sidebar';
import FileViewer from './components/FileViewer';
import CommandPalette from './components/CommandPalette';
import { UIVisibilityProvider } from './context/UIVisibilityContext';
import { useCanvasPersistence } from './hooks/useCanvasPersistence';
import { useSettingsStore } from './store/settingsStore';
import { FileData } from './types';

// Import styles
import './styles/typography.css';

function App() {
  const { 
    isLoading, 
    error, 
    currentCanvasId, 
    loadCanvas 
  } = useCanvasPersistence();
  
  const { settings } = useSettingsStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [viewMode, setViewMode] = useState<'canvas' | 'file'>('canvas');
  
  // Always use dark mode
  useEffect(() => {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    
    // Apply any global typography settings
    document.documentElement.style.setProperty(
      '--paragraph-spacing', 
      `${settings.typography.paragraphSpacing}rem`
    );
  }, [settings.typography.paragraphSpacing]);
  
  // Handle file selection from the sidebar
  const handleFileSelect = useCallback((file: FileData) => {
    setSelectedFile(file);
    setViewMode('file');
  }, []);
  
  // Handle closing the file viewer
  const handleCloseFileViewer = useCallback(() => {
    setSelectedFile(null);
    setViewMode('canvas');
  }, []);
  
  // Handle file drop onto the canvas
  const handleFileDrop = useCallback((file: FileData) => {
    console.log('File dropped onto canvas:', file);
    // This function is passed to both Sidebar and Canvas
    // The actual handling is done in the Canvas component
    setViewMode('canvas'); // Switch to canvas view when a file is dropped
  }, []);
  
  // Handle canvas selection
  const handleCanvasSelect = useCallback((canvasId: string) => {
    loadCanvas(canvasId);
  }, [loadCanvas]);
  
  // Toggle sidebar
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  return (
    <UIVisibilityProvider>
      <div className={`min-h-screen flex ${settings.ui.fadeInUiElements ? 'fade-ui-enabled' : ''}`}>
        {isSidebarOpen && (
          <div className="h-screen sidebar">
            <Sidebar 
              onFileSelect={handleFileSelect} 
              onFileDrop={handleFileDrop}
              onCanvasSelect={handleCanvasSelect}
            />
          </div>
        )}
        
        <div className="flex-grow h-screen relative">
          
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-xl text-text-secondary">Loading canvas...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-xl text-red-500">{error}</div>
            </div>
          ) : viewMode === 'canvas' ? (
            <CanvasWithProvider onFileDrop={handleFileDrop} />
          ) : (
            <FileViewer file={selectedFile} onClose={handleCloseFileViewer} />
          )}
        </div>
        
        {/* Command palette */}
        <CommandPalette />
      </div>
    </UIVisibilityProvider>
  );
}

export default App;
