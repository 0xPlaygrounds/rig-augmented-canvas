import React, { useState, useCallback } from 'react';
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
    // The Canvas component will handle this
  }, []);
  
  // Handle canvas selection
  const handleCanvasSelect = useCallback((canvasId: string) => {
    loadCanvas(canvasId);
  }, [loadCanvas]);
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {isSidebarOpen && (
        <div className="h-screen">
          <Sidebar 
            onFileSelect={handleFileSelect} 
            onFileDrop={handleFileDrop}
            onCanvasSelect={handleCanvasSelect}
          />
        </div>
      )}
      
      <div className="flex-grow h-screen">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-xl text-gray-600">Loading canvas...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-xl text-red-600">{error}</div>
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
