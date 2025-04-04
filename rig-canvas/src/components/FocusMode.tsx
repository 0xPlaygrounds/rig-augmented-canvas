import React, { useRef, useEffect } from 'react';
import { X, Check, Save, Info, Trash2, Download } from 'lucide-react';
import NoteToolbar from './NoteToolbar';
import { applyMarkdownFormat } from '../utils/markdownUtils';

interface FocusModeProps {
  content: string;
  onSave: (content: string) => void;
  onClose: () => void;
}

const FocusMode: React.FC<FocusModeProps> = ({ content, onSave, onClose }) => {
  const [editedContent, setEditedContent] = React.useState(content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log('FocusMode component mounted');
    // Focus the textarea when the component mounts
    if (textareaRef.current) {
      textareaRef.current.focus();
      // Place cursor at the end of the content
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }

    // Add escape key handler
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleSave = () => {
    onSave(editedContent);
    onClose();
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleFormatClick = (format: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const { selectionStart, selectionEnd } = textarea;
      
      const { text, cursorPosition } = applyMarkdownFormat(
        editedContent,
        selectionStart,
        selectionEnd,
        format
      );
      
      setEditedContent(text);
      
      // Set cursor position after state update
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(cursorPosition, cursorPosition);
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          handleFormatClick('**');
          break;
        case 'i':
          e.preventDefault();
          handleFormatClick('*');
          break;
        case 's':
          e.preventDefault();
          handleSave();
          break;
        case 'Enter':
          e.preventDefault();
          handleSave();
          break;
      }
    }
  };

  console.log('Rendering FocusMode component');
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      
      {/* Modal container */}
      <div className="relative w-4/5 h-4/5 max-w-5xl bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 text-white p-3 flex justify-between items-center">
          <h1 className="text-xl font-medium">Rig Augmented Canvas</h1>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="p-1 text-gray-300 hover:text-white rounded-full hover:bg-gray-700"
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Toolbar */}
        <div className="border-b border-gray-200 p-3 flex justify-between bg-gray-50">
          <div className="flex items-center">
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M8 8H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleSave}
              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded" 
              title="Save (Ctrl+S)"
            >
              <Save size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded" title="Export">
              <Download size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded" title="Info">
              <Info size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-auto bg-white p-4">
          <textarea
            ref={textareaRef}
            value={editedContent}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            className="w-full h-full p-6 resize-none focus:outline-none text-lg leading-relaxed border-0"
            placeholder="Write your note here..."
            style={{ maxWidth: '900px', margin: '0 auto', minHeight: '300px' }}
          />
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 p-3 flex justify-between text-sm text-gray-500 bg-gray-50">
          <div>Markdown supported</div>
          <div>Press Ctrl+S to save</div>
        </footer>

        {/* Save button (fixed position) */}
        <button
          onClick={handleSave}
          className="absolute bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-xl"
          title="Save (Ctrl+S)"
        >
          <Check size={28} />
        </button>
      </div>
    </div>
  );
};

export default FocusMode;
