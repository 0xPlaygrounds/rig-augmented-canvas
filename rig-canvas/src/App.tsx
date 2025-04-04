import React from 'react';
import Canvas from './components/Canvas';
import { useCanvasPersistence } from './hooks/useCanvasPersistence';

function App() {
  const { isLoading, error } = useCanvasPersistence();

  return (
    <div className="min-h-screen bg-gray-100">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-xl text-gray-600">Loading canvas...</div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      ) : (
        <div className="w-full h-screen">
          <Canvas />
        </div>
      )}
    </div>
  );
}

export default App;
