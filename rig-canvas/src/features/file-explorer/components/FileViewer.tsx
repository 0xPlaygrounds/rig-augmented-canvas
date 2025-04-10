import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  X, BookOpen, Type, BarChart, Maximize2, 
  Bold, Italic, Heading1, Heading2, List, ListOrdered, 
  Quote, Code, Link, ChevronDown, Target, 
  Edit3, ChevronsUp, Eye, Save, Clock,
  MessageSquare, Send, User, Bot
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

// Writing mode types
const WRITING_MODES = [
  { id: 'brainstorming', name: 'Brainstorming', icon: <Target size={16} /> },
  { id: 'drafting', name: 'Drafting', icon: <Edit3 size={16} /> },
  { id: 'editing', name: 'Editing', icon: <ChevronsUp size={16} /> },
  { id: 'reviewing', name: 'Reviewing', icon: <Eye size={16} /> }
];

// Format button component
const FormatButton = ({ onClick, title, children }: { 
  onClick: () => void; 
  title: string; 
  children: React.ReactNode; 
}) => (
  <button
    onClick={onClick}
    className="p-1 rounded hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors"
    title={title}
  >
    {children}
  </button>
);

export const FileViewer: React.FC<FileViewerProps> = ({ file, onClose }) => {
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectionStats, setSelectionStats] = useState({ start: 0, end: 0, selected: 0 });
  const [currentWritingMode, setCurrentWritingMode] = useState('drafting');
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
  const { isReadingMode, toggleReadingMode, estimatedReadingTime } = useUIVisibility();
  
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

  // Update writing mode
  const changeWritingMode = useCallback((mode: string) => {
    setCurrentWritingMode(mode);
    updateSetting('focus.writingMode', mode);
    eventBus.publish('focus:session:start', mode, writingGoal);
  }, [updateSetting, writingGoal]);

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
    <div className="flex gap-1 p-2 border-b border-border-primary bg-bg-tertiary overflow-x-auto">
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
  );

  // Render edit mode view (editor + co-writer)
  const renderEditMode = () => (
    <div className="flex flex-col flex-1 overflow-hidden">
      {renderFormatToolbar()}
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto bg-bg-primary">
          <div className="w-full h-full flex justify-center" style={{ paddingLeft: '16px' }}>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleContentChange}
              onSelect={handleSelect}
              className="w-full h-full p-4 bg-bg-primary text-text-primary border-none resize-none outline-none font-mono"
              style={{ 
                width: '100%',
                maxWidth: `min(100%, ${settings.typography.lineWidth * 0.6}rem)`,
                lineHeight: '1.6',
                overflowWrap: 'break-word',
                wordWrap: 'break-word'
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
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="p-4 h-full bg-bg-secondary">
          <div className="w-full" style={{ 
            maxWidth: '100%', 
            overflowWrap: 'break-word', 
            paddingLeft: '16px' 
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
      
      <div className="flex flex-col h-full bg-bg-secondary">
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b border-border-primary bg-bg-tertiary">
          {/* Title or writing mode selector */}
          {isEditing ? (
            <div className="flex items-center overflow-hidden flex-grow mr-4">
              <div className="mr-3 flex-shrink-0">
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  background: '#1f2937', 
                  padding: '6px 12px', 
                  borderRadius: '6px',
                  border: '1px solid #374151',
                  position: 'relative'
                }}>
                  {WRITING_MODES.find(m => m.id === currentWritingMode)?.icon}
                  <select 
                    value={currentWritingMode}
                    onChange={(e) => changeWritingMode(e.target.value)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#f3f4f6',
                      fontSize: '15px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      padding: '0',
                      appearance: 'none',
                      marginRight: '24px',
                      position: 'relative'
                    }}
                  >
                    {WRITING_MODES.map(mode => (
                      <option key={mode.id} value={mode.id}>{mode.name} Mode</option>
                    ))}
                  </select>
                  <ChevronDown size={14} style={{ position: 'absolute', right: '12px', color: '#9ca3af' }} />
                </div>
              </div>
              <div className="text-sm text-text-tertiary truncate">
                {currentWritingMode === 'brainstorming' && 'Free-form idea generation without judgment'}
                {currentWritingMode === 'drafting' && 'Focus on getting your thoughts down quickly'}
                {currentWritingMode === 'editing' && 'Refine and improve your existing content'}
                {currentWritingMode === 'reviewing' && 'Final review and polish before completion'}
              </div>
            </div>
          ) : (
            <h2 className="text-lg font-medium text-text-primary overflow-hidden text-ellipsis whitespace-nowrap flex-grow mr-4">{file.name}</h2>
          )}
          
          {/* Toolbar buttons */}
          <div className="flex items-center space-x-2">
            {(file.type === 'note' || file.type === 'markdown') && !isEditing && (
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1 rounded hover:bg-bg-primary ${showSettings ? 'text-accent-primary' : 'text-text-secondary'} hover:text-text-primary transition-colors`}
                title="Typography Settings"
              >
                <Type size={18} />
              </button>
            )}
            
            {(file.type === 'note' || file.type === 'markdown') && !isEditing && (
              <button
                onClick={toggleReadingMode}
                className={`p-1 rounded hover:bg-bg-primary ${isReadingMode ? 'text-accent-primary' : 'text-text-secondary'} hover:text-text-primary transition-colors`}
                title={isReadingMode ? "Exit Reading Mode" : "Enter Reading Mode"}
              >
                <BookOpen size={18} />
              </button>
            )}
            
            {(file.type === 'note' || file.type === 'markdown') && (
              <button
                onClick={() => setShowCowriter(!showCowriter)}
                className={`p-1 rounded hover:bg-bg-primary ${showCowriter ? 'text-accent-primary' : 'text-text-secondary'} hover:text-text-primary transition-colors`}
                title={showCowriter ? "Hide AI Co-writer" : "Show AI Co-writer"}
              >
                <MessageSquare size={18} />
              </button>
            )}
            
            {(file.type === 'note' || file.type === 'markdown') && (
              <button
                onClick={isEditing ? handleSave : toggleEdit}
                className="p-1 rounded hover:bg-bg-primary text-text-secondary hover:text-text-primary transition-colors"
                title={isEditing ? "Save" : "Edit"}
              >
                {isEditing ? <Save size={18} /> : <Edit3 size={18} />}
              </button>
            )}
            
            {(file.type === 'note' || file.type === 'markdown') && (
              <button
                onClick={enterFocusMode}
                className="p-1 rounded hover:bg-bg-primary text-text-secondary hover:text-text-primary transition-colors"
                title="Focus Mode"
              >
                <Maximize2 size={18} />
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

        {/* Typography settings panel */}
        {showSettings && !isEditing && (file.type === 'note' || file.type === 'markdown') && (
          <div className="border-b border-border-primary bg-bg-tertiary p-3">
            <div className="flex flex-col">
              <h3 className="text-sm font-medium mb-2 text-text-primary">Typography Settings</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-text-secondary mb-1">
                    Line Width: {settings.typography.lineWidth} chars
                  </label>
                  <input 
                    type="range" 
                    min="40" 
                    max="120" 
                    value={settings.typography.lineWidth} 
                    onChange={(e) => updateSetting('typography.lineWidth', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-text-secondary mb-1">
                    Paragraph Spacing: {settings.typography.paragraphSpacing}rem
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="3" 
                    step="0.1" 
                    value={settings.typography.paragraphSpacing} 
                    onChange={(e) => updateSetting('typography.paragraphSpacing', parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-bg-primary rounded border border-border-primary">
                <h4 className="text-sm font-medium mb-2 text-text-primary">Document Stats</h4>
                <ul className="grid gap-2 text-sm">
                  <li className="flex justify-between">
                    <span>Words</span>
                    <span>{wordCount}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Reading Time</span>
                    <span>{estimatedReadingTime} min</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Main content area */}
        <div className="flex-grow flex overflow-hidden">
          {isEditing ? renderEditMode() : renderReadMode()}
        </div>
      </div>
    </>
  );
};
