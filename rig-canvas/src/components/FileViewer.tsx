import React, { useState, useEffect } from 'react';
import { FileData } from '../types';
import { useFileSystem } from '../hooks/useFileSystem';
import { X, Edit, Save } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { applyMarkdownFormat } from '../utils/markdownUtils';

interface FileViewerProps {
  file: FileData | null;
  onClose: () => void;
}

const FileViewer: React.FC<FileViewerProps> = ({ file, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<string>('');
  const { updateFileContent, getFile } = useFileSystem();

  useEffect(() => {
    if (file) {
      console.log('FileViewer received file:', file);
      console.log('File ID:', file.id);
      console.log('File content:', file.content);
      
      // Get the latest file content from the file system
      const fetchLatestFile = async () => {
        try {
          const latestFile = await getFile(file.id);
          console.log('Latest file from file system:', latestFile);
          
          if (latestFile) {
            setContent(latestFile.content || '');
          } else {
            setContent(file.content || '');
          }
        } catch (error) {
          console.error('Error fetching latest file:', error);
          setContent(file.content || '');
        }
      };
      
      fetchLatestFile();
      
      // Only allow editing for text and markdown files
      setIsEditing(file.type === 'note' || file.type === 'markdown');
    }
  }, [file, getFile]);

  const handleSave = async () => {
    if (file) {
      await updateFileContent(file.id, { content });
      setIsEditing(false);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFormatClick = (format: string) => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (textarea) {
      const { selectionStart, selectionEnd } = textarea;
      
      const { text, cursorPosition } = applyMarkdownFormat(
        content,
        selectionStart,
        selectionEnd,
        format
      );
      
      setContent(text);
      
      // Set cursor position after state update
      setTimeout(() => {
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(cursorPosition, cursorPosition);
        }
      }, 0);
    }
  };

  if (!file) {
    return null;
  }

  const renderFileContent = () => {
    switch (file.type) {
      case 'note':
      case 'markdown':
        return isEditing ? (
          <div className="flex flex-col h-full">
            {/* Format toolbar */}
            <div className="flex gap-1 p-2 border-b border-border-primary bg-bg-tertiary overflow-x-auto">
              <FormatButton onClick={() => handleFormatClick('**')} title="Bold">
                <strong>B</strong>
              </FormatButton>
              <FormatButton onClick={() => handleFormatClick('*')} title="Italic">
                <em>I</em>
              </FormatButton>
              <FormatButton onClick={() => handleFormatClick('# ')} title="Heading 1">
                H1
              </FormatButton>
              <FormatButton onClick={() => handleFormatClick('## ')} title="Heading 2">
                H2
              </FormatButton>
              <FormatButton onClick={() => handleFormatClick('- ')} title="Bullet List">
                • List
              </FormatButton>
              <FormatButton onClick={() => handleFormatClick('1. ')} title="Numbered List">
                1. List
              </FormatButton>
              <FormatButton onClick={() => handleFormatClick('> ')} title="Quote">
                " Quote
              </FormatButton>
              <FormatButton onClick={() => handleFormatClick('`')} title="Code">
                {'<>'} Code
              </FormatButton>
              <FormatButton onClick={() => handleFormatClick('[](url)')} title="Link">
                🔗 Link
              </FormatButton>
            </div>
            
            <textarea
              id="content-editor"
              value={content}
              onChange={handleContentChange}
              className="flex-grow p-4 resize-none outline-none border-none bg-bg-secondary text-text-primary"
              placeholder="Write your content here..."
            />
            
            <div className="flex justify-between items-center p-2 border-t border-border-primary bg-bg-tertiary">
              <div className="text-sm text-text-tertiary">Markdown supported</div>
              <button
                onClick={handleSave}
                className="px-3 py-2 bg-accent-primary text-white rounded hover:bg-accent-hover flex items-center transition-colors"
              >
                <Save size={16} className="mr-1" />
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 overflow-auto h-full bg-bg-secondary">
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="flex items-center justify-center h-full p-4 bg-bg-primary">
            <img 
              src={file.url} 
              alt={file.name} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        );
      
      case 'pdf':
        return (
          <div className="h-full">
            <iframe 
              src={file.url} 
              title={file.name}
              className="w-full h-full border-none"
            />
          </div>
        );
      
      case 'audio':
        return (
          <div className="flex flex-col items-center justify-center h-full p-4 bg-bg-secondary">
            <div className="text-xl mb-4 text-text-primary">{file.name}</div>
            <audio controls src={file.url} className="w-full max-w-md">
              Your browser does not support the audio element.
            </audio>
          </div>
        );
      
      default:
        return (
          <div className="flex items-center justify-center h-full bg-bg-secondary">
            <div className="text-xl text-text-tertiary">
              No preview available for this file type
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-bg-secondary">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-border-primary bg-bg-tertiary">
        <h2 className="text-lg font-medium truncate text-text-primary">{file.name}</h2>
        <div className="flex items-center space-x-2">
          {(file.type === 'note' || file.type === 'markdown') && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-1 rounded hover:bg-bg-primary text-text-secondary hover:text-text-primary transition-colors"
              title={isEditing ? "View" : "Edit"}
            >
              <Edit size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-bg-primary text-text-secondary hover:text-text-primary transition-colors"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-grow overflow-hidden">
        {renderFileContent()}
      </div>
    </div>
  );
};

// Helper component for formatting buttons
const FormatButton: React.FC<{
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ onClick, title, children }) => {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 border border-border-secondary rounded text-sm text-text-primary hover:bg-bg-primary transition-colors"
      title={title}
    >
      {children}
    </button>
  );
};

export default FileViewer;
