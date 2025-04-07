import React, { useState, useEffect } from 'react';

interface UserNamePromptProps {
  isOpen: boolean;
  onSubmit: (username: string) => void;
  onClose: () => void;
}

export const UserNamePrompt: React.FC<UserNamePromptProps> = ({
  isOpen,
  onSubmit,
  onClose
}) => {
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    if (isOpen) {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, [isOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('username', username);
      onSubmit(username);
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-white text-xl font-medium mb-4">Welcome to Rig Canvas</h2>
        
        <p className="text-gray-300 mb-4">
          Please enter a display name to use for collaboration:
        </p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
            className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-4"
            autoFocus
          />
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!username.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
