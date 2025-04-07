import React, { useState } from 'react';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
  token: string;
}

export const ShareDialog: React.FC<ShareDialogProps> = ({
  isOpen,
  onClose,
  documentId,
  token
}) => {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;
  
  const shareUrl = `${window.location.origin}${window.location.pathname}?document=${documentId}&token=${token}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-white text-lg font-medium mb-4">Share Canvas</h2>
        
        <p className="text-gray-300 text-sm mb-2">
          Share this link with others to collaborate on this canvas:
        </p>
        
        <div className="flex mb-4">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-l text-sm"
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r text-sm"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        
        <div className="text-gray-400 text-xs mb-4">
          <p>Anyone with this link can access and edit this canvas.</p>
          <p className="mt-1">The token is used for simple authentication.</p>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
