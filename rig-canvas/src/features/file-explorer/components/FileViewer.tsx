import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  X, BookOpen, Maximize2, 
  Bold, Italic, Heading1, Heading2, List, ListOrdered, 
  Quote, Code, Link, Save,
  MessageSquare, Send, User, Bot, Edit3
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { FileData } from '../../../types';
import { useFileSystem } from '../';
import { useSettingsStore } from '../../../store/settingsStore';
import { useUIVisibility } from '../../../context/UIVisibilityContext';
import { eventBus } from '../../../utils/eventBus';
import { applyMarkdownFormat } from '../../../utils/markdownUtils';
import { TypographyContainer } from '../../../components/Typography';
import { FileViewerProps } from '../types';
import { AIAssistant, ChatMessage } from '../../../features/ai-assistant';

// Import from the focus-mode feature
import { FocusMode } from '../../../features/focus-mode';

// Format button component
const FormatButton = ({ onClick, title, children }: { 
  onClick: () => void; 
  title: string; 
  children: React.ReactNode; 
}) => (
  <button
    onClick={onClick}
    className="file-viewer-format-button"
    title={title}
  >
    {children}
  </button>
);

export const FileViewer: React.FC<FileViewerProps> = ({ file, onClose }) => {
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectionStats, setSelectionStats] = useState({ start: 0, end: 0, selected: 0 });
  const [writingGoal, setWritingGoal] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // AI co-writer state
  const [showCowriter, setShowCowriter] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I'm your AI co-writer. Ask me questions or get writing help.",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Get hooks
  const { updateFileContent, getFile } = useFileSystem();
  const { settings, updateSetting } = useSettingsStore();
  const { isReadingMode, toggleReadingMode } = useUIVisibility();
  
  // Calculate word count
  useEffect(() => {
    const words = content.split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);
    eventBus.publish('document:contentChanged', content, words);
  }, [content]);

  // Load file content
  useEffect(() => {
    if (file) {
      const fetchLatestFile = async () => {
        try {
          const latestFile = await getFile(file.id);
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
    }
  }, [file, getFile]);

  // Focus mode handlers
  const enterFocusMode = useCallback(() => setIsFocusMode(true), []);
  
  const handleFocusModeSave = useCallback((newContent: string) => {
    setContent(newContent);
    if (file) updateFileContent(file.id, { content: newContent });
  }, [file, updateFileContent]);
  
  const handleFocusModeClose = useCallback(() => setIsFocusMode(false), []);

  // Toggle editing and save
  const toggleEdit = useCallback(() => setIsEditing(prev => !prev), []);
  
  const handleSave = useCallback(() => {
    if (file) {
      updateFileContent(file.id, { content });
      setIsEditing(false);
    }
  }, [file, content, updateFileContent]);

  // Handle text operations
  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => 
    setContent(e.target.value), []);

  const handleSelect = useCallback(() => {
    if (textareaRef.current) {
      const { selectionStart, selectionEnd } = textareaRef.current;
      const selectedText = content.substring(selectionStart, selectionEnd);
      const selectedWordCount = selectedText.split(/\s+/).filter(word => word.length > 0).length;
      
      setSelectionStats({
        start: selectionStart,
        end: selectionEnd,
        selected: selectedWordCount
      });
      
      eventBus.publish('document:selectionChanged', selectionStart, selectionEnd);
    }
  }, [content]);

  // Apply markdown formatting
  const handleFormatClick = useCallback((format: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const { selectionStart, selectionEnd } = textarea;
    
    const { text, cursorPosition } = applyMarkdownFormat(
      content,
      selectionStart,
      selectionEnd,
      format
    );
    
    setContent(text);
    
    setTimeout(() => {
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0);
  }, [content]);

  // Chat message handlers
  const sendMessage = useCallback(() => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Mock AI response
    setTimeout(() => {
      const lowerMessage = newMessage.toLowerCase();
      let aiResponse = "I understand you're working on this document. How can I help you?";
      
      if (lowerMessage.includes('help') || lowerMessage.includes('how to')) {
        aiResponse = "I'd be happy to help! What specifically do you need assistance with?";
      } else if (lowerMessage.includes('suggestion') || lowerMessage.includes('idea')) {
        aiResponse = "Here's a suggestion: try expanding on your main point with a specific example.";
      } else if (lowerMessage.includes('review') || lowerMessage.includes('feedback')) {
        aiResponse = "I'd suggest reviewing your text for clarity and conciseness.";
      }
      
      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date()
      }]);
    }, 1000);
  }, [newMessage]);
  
  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Render AI Co-writer panel using our new AIAssistant component
  const renderCowriterPanel = () => (
    <AIAssistant
      initialVisible={showCowriter}
      initialMessages={chatMessages}
      onVisibilityChange={setShowCowriter}
      width="18rem"
      title="AI Co-writer"
    />
  );

  // Format toolbar for editing mode
  const renderFormatToolbar = () => (
    <div className="file-viewer-format-toolbar">
      <FormatButton onClick={() => handleFormatClick('**')} title="Bold">
        <Bold size={16} />
      </FormatButton>
      <FormatButton onClick={() => handleFormatClick('*')} title="Italic">
        <Italic size={16} />
      </FormatButton>
      <div className="file-viewer-divider"></div>
      <FormatButton onClick={() => handleFormatClick('# ')} title="Heading 1">
        <Heading1 size={16} />
      </FormatButton>
      <FormatButton onClick={() => handleFormatClick('## ')} title="Heading 2">
        <Heading2 size={16} />
      </FormatButton>
      <div className="file-viewer-divider"></div>
      <FormatButton onClick={() => handleFormatClick('- ')} title="Bullet List">
        <List size={16} />
      </FormatButton>
      <FormatButton onClick={() => handleFormatClick('1. ')} title="Numbered List">
        <ListOrdered size={16} />
      </FormatButton>
      <div className="file-viewer-divider"></div>
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
  );

  // Render edit mode view (editor + co-writer)
  const renderEditMode = () => (
    <div className="file-viewer-editor">
      {renderFormatToolbar()}
      
      <div className="file-viewer-content">
        <div className="file-viewer-editor">
          <div className="flex justify-center w-full h-full">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleContentChange}
              onSelect={handleSelect}
              className="file-viewer-editor-textarea"
              style={{ 
                maxWidth: `min(100%, ${settings.typography.lineWidth * 0.6}rem)`,
              }}
              placeholder="Start writing here..."
            />
          </div>
        </div>
        
        {showCowriter && renderCowriterPanel()}
      </div>
    </div>
  );

  // Render read mode view
  const renderReadMode = () => (
    <div className="file-viewer-content">
      <div className="file-viewer-preview">
        <div className="flex justify-center w-full">
          <div style={{ 
            maxWidth: `min(100%, ${settings.typography.lineWidth * 0.6}rem)`,
          }}>
            <TypographyContainer 
              content={content} 
              id={`file-content-${file?.id}`}
              className={`prose prose-invert ${isReadingMode ? 'reading-mode' : ''}`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </TypographyContainer>
          </div>
        </div>
      </div>
      
      {showCowriter && renderCowriterPanel()}
    </div>
  );

  if (!file) return null;

  return (
    <>
      {isFocusMode && (
        <FocusMode
          initialContent={content}
          onSave={handleFocusModeSave}
          onClose={handleFocusModeClose}
        />
      )}
      
      <div className="file-viewer">
        {/* Header */}
        <div className="file-viewer-header">
          {/* File name */}
          <div className="file-viewer-title">
            {!isEditing && <h2>{file.name}</h2>}
          </div>
          
          {/* Toolbar buttons */}
          <div className="file-viewer-toolbar">
            {(file.type === 'note' || file.type === 'markdown') && !isEditing && (
              <button
                onClick={toggleReadingMode}
                className={`file-viewer-toolbar-button ${isReadingMode ? 'active' : ''}`}
                title={isReadingMode ? "Exit Reading Mode" : "Enter Reading Mode"}
              >
                <BookOpen size={18} />
              </button>
            )}
            
            {(file.type === 'note' || file.type === 'markdown') && (
              <button
                onClick={isEditing ? handleSave : toggleEdit}
                className={`file-viewer-toolbar-button ${isEditing ? 'active' : ''}`}
                title={isEditing ? "Save" : "Edit Mode"}
              >
                {isEditing ? <Save size={18} /> : <Edit3 size={18} />}
              </button>
            )}
            
            {(file.type === 'note' || file.type === 'markdown') && (
              <button
                onClick={() => setShowCowriter(!showCowriter)}
                className={`file-viewer-toolbar-button ${showCowriter ? 'active' : ''}`}
                title={showCowriter ? "Hide AI Co-writer" : "AI Co-writer Mode"}
              >
                <MessageSquare size={18} />
              </button>
            )}
            
            {(file.type === 'note' || file.type === 'markdown') && (
              <button
                onClick={enterFocusMode}
                className="file-viewer-toolbar-button"
                title="Focus Mode"
              >
                <Maximize2 size={18} />
              </button>
            )}
            
            <button
              onClick={onClose}
              className="file-viewer-toolbar-button"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="file-viewer-content">
          {isEditing ? renderEditMode() : renderReadMode()}
        </div>
      </div>
    </>
  );
};
