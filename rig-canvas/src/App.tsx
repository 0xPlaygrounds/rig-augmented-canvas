import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { FileViewer } from './features/file-explorer';
import CommandPalette from './components/CommandPalette';
import { UIVisibilityProvider } from './context/UIVisibilityContext';
import { CanvasWithProvider } from './features/canvas';
import { useSettingsStore } from './store/settingsStore';
import { FileData } from './types';
import { ServiceProvider } from './services/ServiceProvider';

// Import styles
import './styles/typography.css';

// Types for sidebar state
type SidebarState = 'expanded' | 'collapsed' | 'hidden';

function App() {
  const { settings } = useSettingsStore();
  // Sidebar can be in one of three states: 'expanded', 'collapsed', or 'hidden'
  const [sidebarState, setSidebarState] = useState<SidebarState>('expanded');
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [viewMode, setViewMode] = useState<'canvas' | 'file'>('canvas');
  const [isServiceInitialized, setServiceInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCanvasId, setCurrentCanvasId] = useState('default-canvas');
  
  // Initialize service provider
  useEffect(() => {
    const initializeServices = async () => {
      try {
        await ServiceProvider.initialize();
        setServiceInitialized(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize services:', error);
        setError('Failed to initialize application services');
        setIsLoading(false);
      }
    };
    
    initializeServices();
  }, []);
  
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
    setCurrentCanvasId(canvasId);
  }, []);
  
  // Sidebar state management
  const toggleSidebarVisibility = useCallback(() => {
    setSidebarState(prev => prev === 'hidden' ? 'expanded' : 'hidden');
  }, []);

  const toggleSidebarCollapse = useCallback(() => {
    setSidebarState(prev => prev === 'expanded' ? 'collapsed' : 'expanded');
  }, []);
  
  // Show the sidebar if it's hidden
  const showSidebar = useCallback(() => {
    if (sidebarState === 'hidden') {
      setSidebarState('expanded');
    }
  }, [sidebarState]);

  // Helper to determine if sidebar is visible (either expanded or collapsed)
  const isSidebarVisible = sidebarState !== 'hidden';

  return (
    <UIVisibilityProvider>
      <div className={`min-h-screen ${settings.ui.fadeInUiElements ? 'fade-ui-enabled' : ''}`}>
        {/* Dark overlay when sidebar is expanded */}
        <div 
          className={`absolute inset-0 bg-black/30 z-5 transition-opacity duration-300 ${sidebarState !== 'expanded' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          onClick={toggleSidebarVisibility}
        />
        
        {/* Sidebar container with absolute positioning */}
        <div className={`h-screen sidebar absolute top-0 left-0 z-10 transition-all duration-300 ${sidebarState === 'hidden' ? 'invisible opacity-0' : 'visible opacity-100'}`}>
          <Sidebar 
            onFileSelect={handleFileSelect} 
            onFileDrop={handleFileDrop}
            onCanvasSelect={handleCanvasSelect}
            onToggle={toggleSidebarCollapse}
            isCollapsed={sidebarState === 'collapsed'}
          />
        </div>
        
        {/* Sidebar toggle button - only visible when sidebar is hidden */}
        {sidebarState === 'hidden' && (
          <button 
            onClick={showSidebar}
            className="absolute top-4 left-4 p-2 bg-bg-secondary rounded-full shadow-lg z-20 hover:bg-bg-tertiary transition-colors"
            title="Open Sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-primary">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
              <line x1="9" x2="9" y1="3" y2="21"></line>
            </svg>
          </button>
        )}
        
        <div className="w-full h-screen relative">
          
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-xl text-text-secondary">Loading application...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-xl text-red-500">{error}</div>
            </div>
          ) : viewMode === 'canvas' ? (
            isServiceInitialized ? (
              <CanvasWithProvider 
                canvasId={currentCanvasId}
                onFileDrop={handleFileDrop} 
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-xl text-text-secondary">Services not initialized</div>
              </div>
            )
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
