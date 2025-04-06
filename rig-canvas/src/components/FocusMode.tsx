import React, { useRef, useEffect, useState } from 'react';
import { X, Check, Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote, Code, Link } from 'lucide-react';
import { applyMarkdownFormat } from '../utils/markdownUtils';
import ReactDOM from 'react-dom';

interface FocusModeProps {
  content: string;
  onSave: (content: string) => void;
  onClose: () => void;
}

/**
 * A completely isolated focus mode editor that renders directly to document.body
 * to avoid any interaction with ReactFlow or other components
 */
const FocusMode: React.FC<FocusModeProps> = ({ content, onSave, onClose }) => {
  const [editedContent, setEditedContent] = useState(content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [portalContainer] = useState(() => document.createElement('div'));

  // Setup the portal container when component mounts
  useEffect(() => {
    // Set up portal container styles
    portalContainer.style.position = 'fixed';
    portalContainer.style.top = '0';
    portalContainer.style.left = '0';
    portalContainer.style.width = '100vw';
    portalContainer.style.height = '100vh';
    portalContainer.style.zIndex = '10000'; // Higher than any other z-index
    portalContainer.style.pointerEvents = 'auto';
    
    // Add the portal to body
    document.body.appendChild(portalContainer);
    
    // Prevent scrolling on the main document
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    // Focus the textarea when the component mounts
    if (textareaRef.current) {
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          const length = textareaRef.current.value.length;
          textareaRef.current.setSelectionRange(length, length);
        }
      }, 0);
    }

    // Set up escape key handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.body.removeChild(portalContainer);
      document.body.style.overflow = originalStyle;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(cursorPosition, cursorPosition);
        }
      }, 0);
    }
  };

  // The actual modal content
  const modalContent = (
    <div 
      className="focus-mode-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        width: '100vw',
        height: '100vh',
      }}
      onClick={onClose} // Close when clicking the backdrop
    >
      {/* Modal container */}
      <div 
        style={{
          width: '90%',
          maxWidth: '900px',
          height: '80%',
          background: '#1f2937', // Dark mode background
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()} // Prevent click from reaching the backdrop
      >
        {/* Header */}
        <div 
          style={{
            borderBottom: '1px solid #374151',
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#111827'
          }}
        >
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 500, color: '#f3f4f6' }}>Edit Note</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '4px'
            }}
            title="Close (Esc)"
          >
            <X size={20} color="#d1d5db" />
          </button>
        </div>

        {/* Format toolbar */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            padding: '8px 16px',
            borderBottom: '1px solid #374151',
            background: '#1f2937',
            overflowX: 'auto'
          }}
        >
          <FormatButton onClick={() => handleFormatClick('**')} title="Bold">
            <Bold size={16} />
          </FormatButton>
          <FormatButton onClick={() => handleFormatClick('*')} title="Italic">
            <Italic size={16} />
          </FormatButton>
          <FormatButton onClick={() => handleFormatClick('# ')} title="Heading 1">
            <Heading1 size={16} />
          </FormatButton>
          <FormatButton onClick={() => handleFormatClick('## ')} title="Heading 2">
            <Heading2 size={16} />
          </FormatButton>
          <FormatButton onClick={() => handleFormatClick('- ')} title="Bullet List">
            <List size={16} />
          </FormatButton>
          <FormatButton onClick={() => handleFormatClick('1. ')} title="Numbered List">
            <ListOrdered size={16} />
          </FormatButton>
          <FormatButton onClick={() => handleFormatClick('> ')} title="Quote">
            <Quote size={16} />
          </FormatButton>
          <FormatButton onClick={() => handleFormatClick('`')} title="Code">
            <Code size={16} />
          </FormatButton>
          <FormatButton onClick={() => handleFormatClick('[](url)')} title="Link">
            <Link size={16} />
          </FormatButton>
        </div>

        {/* Content area */}
        <div
          style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto', // Enable vertical scrolling
            background: '#111827'
          }}
        >
          <textarea
            ref={textareaRef}
            value={editedContent}
            onChange={handleContentChange}
            style={{
              width: '100%',
              height: '100%',
              padding: '16px',
              border: '1px solid #374151',
              borderRadius: '4px',
              fontSize: '16px',
              lineHeight: 1.6,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              resize: 'none',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#1f2937',
              color: '#f3f4f6'
            }}
            placeholder="Write your note here..."
          />
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: '1px solid #374151',
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            background: '#111827',
            fontSize: '14px',
            color: '#9ca3af'
          }}
        >
          <div>Markdown supported</div>
          <div>Press Ctrl+S to save • Esc to cancel</div>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            width: '56px',
            height: '56px',
            borderRadius: '28px',
            background: '#3b82f6',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer'
          }}
          title="Save (Ctrl+S)"
        >
          <Check size={24} color="white" />
        </button>
      </div>
    </div>
  );

  // Use a portal to render the content to the body
  return ReactDOM.createPortal(modalContent, portalContainer);
};

// Helper component for formatting buttons
const FormatButton: React.FC<{
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ onClick, title, children }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '6px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#d1d5db',
        transition: 'all 0.2s ease',
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = '#374151';
        (e.currentTarget as HTMLElement).style.color = '#f3f4f6';
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
        (e.currentTarget as HTMLElement).style.color = '#d1d5db';
      }}
      title={title}
    >
      {children}
    </button>
  );
};

export default FocusMode;
