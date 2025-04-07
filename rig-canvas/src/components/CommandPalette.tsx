import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Search, ArrowUp, ArrowDown, Command, Info } from 'lucide-react';
import { eventBus } from '../utils/eventBus';
import { useSettingsStore } from '../store/settingsStore';

interface Command {
  id: string;
  title: string;
  category?: string;
  shortcut?: string;
  handler: () => void;
  keywords?: string[];
}

/**
 * CommandPalette provides a keyboard-focused command interface
 * similar to VS Code's command palette (Ctrl+P)
 */
export const CommandPalette: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [commands, setCommands] = useState<Command[]>([]);
  const [filteredCommands, setFilteredCommands] = useState<Command[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { settings } = useSettingsStore();
  
  // Register default commands
  useEffect(() => {
    const defaultCommands: Command[] = [
      {
        id: 'toggle-reading-mode',
        title: 'Toggle Reading Mode',
        category: 'View',
        shortcut: 'Ctrl+R',
        handler: () => eventBus.publish('ui:readingMode:toggle', true),
        keywords: ['read', 'reading', 'view', 'mode', 'toggle'],
      },
      {
        id: 'toggle-settings',
        title: 'Show Settings',
        category: 'View',
        shortcut: 'Ctrl+,',
        handler: () => eventBus.publish('command:execute', 'toggle-settings'),
        keywords: ['settings', 'preferences', 'options', 'configure'],
      },
      {
        id: 'save-document',
        title: 'Save Document',
        category: 'File',
        shortcut: 'Ctrl+S',
        handler: () => eventBus.publish('document:saved', 'current'),
        keywords: ['save', 'store', 'document', 'file'],
      },
      // Typography commands
      {
        id: 'increase-line-width',
        title: 'Increase Line Width',
        category: 'Typography',
        handler: () => {
          const currentWidth = settings.typography.lineWidth;
          eventBus.publish('command:execute', 'update-setting', {
            path: 'typography.lineWidth',
            value: Math.min(120, currentWidth + 5),
          });
        },
        keywords: ['line', 'width', 'increase', 'typography', 'readability'],
      },
      {
        id: 'decrease-line-width',
        title: 'Decrease Line Width',
        category: 'Typography',
        handler: () => {
          const currentWidth = settings.typography.lineWidth;
          eventBus.publish('command:execute', 'update-setting', {
            path: 'typography.lineWidth',
            value: Math.max(40, currentWidth - 5),
          });
        },
        keywords: ['line', 'width', 'decrease', 'typography', 'readability'],
      },
      {
        id: 'increase-paragraph-spacing',
        title: 'Increase Paragraph Spacing',
        category: 'Typography',
        handler: () => {
          const currentSpacing = settings.typography.paragraphSpacing;
          eventBus.publish('command:execute', 'update-setting', {
            path: 'typography.paragraphSpacing',
            value: Math.min(3, currentSpacing + 0.1),
          });
        },
        keywords: ['paragraph', 'spacing', 'increase', 'typography'],
      },
      {
        id: 'decrease-paragraph-spacing',
        title: 'Decrease Paragraph Spacing',
        category: 'Typography',
        handler: () => {
          const currentSpacing = settings.typography.paragraphSpacing;
          eventBus.publish('command:execute', 'update-setting', {
            path: 'typography.paragraphSpacing',
            value: Math.max(1, currentSpacing - 0.1),
          });
        },
        keywords: ['paragraph', 'spacing', 'decrease', 'typography'],
      },
      // Focus mode commands
      {
        id: 'start-focus-session',
        title: 'Start Focus Session',
        category: 'Focus',
        handler: () => eventBus.publish('focus:session:start', settings.focus.writingMode),
        keywords: ['focus', 'session', 'pomodoro', 'timer', 'start'],
      },
      {
        id: 'toggle-do-not-disturb',
        title: 'Toggle Do Not Disturb',
        category: 'Focus',
        handler: () => eventBus.publish('focus:doNotDisturb', true),
        keywords: ['do not disturb', 'dnd', 'focus', 'notifications'],
      },
    ];
    
    setCommands(defaultCommands);
    setFilteredCommands(defaultCommands);
  }, [settings.typography.lineWidth, settings.typography.paragraphSpacing, settings.focus.writingMode]);
  
  // Listen for new command registrations
  useEffect(() => {
    const registerCommand = (command: { name: string, title: string, handler: () => void }) => {
      setCommands(prev => {
        // Check if command already exists
        if (prev.some(cmd => cmd.id === command.name)) {
          return prev;
        }
        
        // Add new command
        return [...prev, {
          id: command.name,
          title: command.title,
          handler: command.handler,
        }];
      });
    };
    
    return eventBus.subscribe('command:register', registerCommand);
  }, []);
  
  // Filter commands when search term changes
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCommands(commands);
      setSelectedIndex(0);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = commands.filter(cmd => {
      const titleMatch = cmd.title.toLowerCase().includes(term);
      const categoryMatch = cmd.category?.toLowerCase().includes(term) || false;
      const keywordMatch = cmd.keywords?.some(k => k.toLowerCase().includes(term)) || false;
      
      return titleMatch || categoryMatch || keywordMatch;
    });
    
    setFilteredCommands(filtered);
    setSelectedIndex(0);
  }, [searchTerm, commands]);
  
  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Escape':
        // Close command palette
        setIsVisible(false);
        break;
      case 'ArrowDown':
        // Navigate down
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        // Navigate up
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        // Execute selected command
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].handler();
          setIsVisible(false);
        }
        break;
    }
  }, [filteredCommands, selectedIndex]);
  
  // Set up global keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Ctrl+P to open command palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        setIsVisible(prev => !prev);
        setSearchTerm('');
        
        // Focus input after rendering
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 10);
      }
    };
    
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);
  
  // Auto-scroll to keep selected item in view
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`);
      
      if (selectedItem) {
        const containerRect = container.getBoundingClientRect();
        const selectedRect = selectedItem.getBoundingClientRect();
        
        // Check if item is outside visible area
        if (selectedRect.bottom > containerRect.bottom) {
          container.scrollTop += selectedRect.bottom - containerRect.bottom;
        } else if (selectedRect.top < containerRect.top) {
          container.scrollTop -= containerRect.top - selectedRect.top;
        }
      }
    }
  }, [selectedIndex]);
  
  // Reset search and selection when opened
  useEffect(() => {
    if (isVisible) {
      setSearchTerm('');
      setSelectedIndex(0);
    }
  }, [isVisible]);
  
  // If not visible, don't render
  if (!isVisible) return null;
  
  // Group commands by category
  const commandsByCategory: Record<string, Command[]> = {};
  filteredCommands.forEach(cmd => {
    const category = cmd.category || 'General';
    if (!commandsByCategory[category]) {
      commandsByCategory[category] = [];
    }
    commandsByCategory[category].push(cmd);
  });
  
  const modalContent = (
    <div 
      className="command-palette-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '100px 20px 20px 20px',
      }}
      onClick={() => setIsVisible(false)}
    >
      <div 
        className="command-palette-container"
        style={{
          width: '100%',
          maxWidth: '600px',
          background: '#1f2937',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid #374151',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Search size={18} color="#9ca3af" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search commands (Ctrl+P)"
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              color: '#f3f4f6',
              fontSize: '16px',
              outline: 'none',
            }}
            autoFocus
          />
          <div
            style={{
              background: '#374151',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#9ca3af',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Command size={14} />
            <span>P</span>
          </div>
        </div>
        
        {/* Command list */}
        <div
          ref={containerRef}
          style={{
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          {filteredCommands.length === 0 ? (
            <div
              style={{
                padding: '16px',
                color: '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Info size={16} />
              <span>No matching commands found</span>
            </div>
          ) : (
            Object.entries(commandsByCategory).map(([category, cmds]) => (
              <div key={category}>
                <div
                  style={{
                    padding: '8px 16px',
                    background: '#111827',
                    color: '#9ca3af',
                    fontSize: '12px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {category}
                </div>
                {cmds.map((command, index) => {
                  const commandIndex = filteredCommands.findIndex(c => c.id === command.id);
                  const isSelected = commandIndex === selectedIndex;
                  
                  return (
                    <div
                      key={command.id}
                      data-index={commandIndex}
                      onClick={() => {
                        command.handler();
                        setIsVisible(false);
                      }}
                      style={{
                        padding: '10px 16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: isSelected ? '#3b82f6' : 'transparent',
                        color: isSelected ? '#ffffff' : '#e5e7eb',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={() => setSelectedIndex(commandIndex)}
                    >
                      <div>{command.title}</div>
                      {command.shortcut && (
                        <div
                          style={{
                            fontSize: '12px',
                            color: isSelected ? '#e5e7eb' : '#9ca3af',
                            padding: '2px 6px',
                            background: isSelected ? 'rgba(255, 255, 255, 0.2)' : '#374151',
                            borderRadius: '4px',
                          }}
                        >
                          {command.shortcut}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
        
        {/* Command palette help */}
        <div
          style={{
            borderTop: '1px solid #374151',
            padding: '8px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            color: '#9ca3af',
            fontSize: '12px',
          }}
        >
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowUp size={14} />
              <ArrowDown size={14} />
              <span>Navigate</span>
            </div>
            <div>
              <span>Enter to execute</span>
            </div>
          </div>
          <div>
            <span>Esc to close</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Create a portal for the command palette
  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};

/**
 * Register a keyboard shortcut
 * @param shortcutKey Key name (e.g., 'p', 's')
 * @param modifiers Array of modifiers: 'ctrl', 'alt', 'shift', 'meta'
 * @param handler Function to execute when shortcut is triggered
 */
export const registerKeyboardShortcut = (
  shortcutKey: string,
  modifiers: string[],
  handler: () => void
): (() => void) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    
    // Check if key matches
    if (key !== shortcutKey.toLowerCase()) {
      return;
    }
    
    // Check modifiers
    const hasCtrl = modifiers.includes('ctrl') === e.ctrlKey;
    const hasAlt = modifiers.includes('alt') === e.altKey;
    const hasShift = modifiers.includes('shift') === e.shiftKey;
    const hasMeta = modifiers.includes('meta') === e.metaKey;
    
    if (hasCtrl && hasAlt && hasShift && hasMeta) {
      e.preventDefault();
      handler();
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  // Return unsubscribe function
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
};

export default CommandPalette;
