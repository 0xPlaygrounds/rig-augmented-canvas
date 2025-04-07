import React from 'react';

interface UserPresence {
  id: string;
  name: string;
  color: string;
}

interface CollaborationPanelProps {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  activeUsers: UserPresence[];
  documentId: string;
  onShareClick: () => void;
}

export const CollaborationPanel: React.FC<CollaborationPanelProps> = ({
  isConnected,
  isLoading,
  error,
  activeUsers,
  documentId,
  onShareClick
}) => {
  return (
    <div className="bg-gray-800 p-3 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-medium">Collaboration</h3>
        <div className="flex items-center">
          <div 
            className={`w-2 h-2 rounded-full mr-2 ${
              isLoading ? 'bg-yellow-400' : isConnected ? 'bg-green-400' : 'bg-red-400'
            }`} 
          />
          <span className="text-sm text-gray-300">
            {isLoading ? 'Connecting...' : isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-900 bg-opacity-50 p-2 rounded mb-2 text-sm text-red-200">
          {error}
        </div>
      )}
      
      <div className="mb-3">
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm w-full"
          onClick={onShareClick}
        >
          Share Canvas
        </button>
      </div>
      
      <div>
        <h4 className="text-gray-400 text-xs uppercase mb-1">Active Users</h4>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {activeUsers.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No active users</p>
          ) : (
            activeUsers.map(user => (
              <div key={user.id} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: user.color }}
                />
                <span className="text-sm text-gray-300">{user.name}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
