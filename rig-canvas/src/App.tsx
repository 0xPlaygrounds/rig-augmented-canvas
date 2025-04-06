import React, { useState, useCallback, useEffect } from 'react';
import CanvasWithProvider from './components/Canvas';
import Sidebar from './components/Sidebar';
import FileViewer from './components/FileViewer';
import { useCanvasPersistence } from './hooks/useCanvasPersistence';
import { FileData } from './types';

function App() {
  const { 
    isLoading, 
    error, 
    currentCanvasId, 
    loadCanvas 
  } = useCanvasPersistence();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [viewMode, setViewMode] = useState<'canvas' | 'file'>('canvas');
  
  // Always use dark mode
  useEffect(() => {
    document.body.classList.remove('light-mode');
  }, []);
  
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
  
  return (
    <div className="min-h-screen flex">
      {isSidebarOpen && (
        <div className="h-screen">
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
    </div>
  );
}

export default App;
