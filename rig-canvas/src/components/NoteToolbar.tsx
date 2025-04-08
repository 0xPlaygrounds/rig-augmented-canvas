import React, { useState } from 'react';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3,
  Code,
  Link,
  Image,
  Quote,
  AlignLeft,
  ChevronDown
} from 'lucide-react';

interface NoteToolbarProps {
  onFormatClick: (format: string) => void;
}

// Define toolbar sections for better organization
const formatTools = [
  { icon: <Bold size={16} />, format: '**', tooltip: 'Bold (Ctrl+B)' },
  { icon: <Italic size={16} />, format: '*', tooltip: 'Italic (Ctrl+I)' },
];

const headingTools = [
  { icon: <Heading1 size={16} />, format: '# ', tooltip: 'Heading 1' },
  { icon: <Heading2 size={16} />, format: '## ', tooltip: 'Heading 2' },
  { icon: <Heading3 size={16} />, format: '### ', tooltip: 'Heading 3' },
];

const listTools = [
  { icon: <List size={16} />, format: '- ', tooltip: 'Bullet List' },
  { icon: <ListOrdered size={16} />, format: '1. ', tooltip: 'Numbered List' },
];

const insertTools = [
  { icon: <Code size={16} />, format: '`', tooltip: 'Inline Code' },
  { icon: <Link size={16} />, format: '[](url)', tooltip: 'Link' },
  { icon: <Image size={16} />, format: '![](url)', tooltip: 'Image' },
  { icon: <Quote size={16} />, format: '> ', tooltip: 'Quote' },
];

const NoteToolbar: React.FC<NoteToolbarProps> = ({ onFormatClick }) => {
  const [activeMode, setActiveMode] = useState('drafting');
  const [modeDropdownOpen, setModeDropdownOpen] = useState(false);

  // Writing modes with descriptions
  const writingModes = [
    { id: 'brainstorming', name: 'Brainstorming', description: 'Free-form idea generation' },
    { id: 'drafting', name: 'Drafting', description: 'Creating initial content' },
    { id: 'editing', name: 'Editing', description: 'Refining and improving' },
    { id: 'reviewing', name: 'Reviewing', description: 'Final checks and revisions' }
  ];

  // Toggle the mode dropdown
  const toggleModeDropdown = () => {
    setModeDropdownOpen(!modeDropdownOpen);
  };

  // Change the active writing mode
  const changeMode = (modeId: string) => {
    setActiveMode(modeId);
    setModeDropdownOpen(false);
  };

  // Render a toolbar button
  const ToolbarButton = ({ tool }: { tool: { icon: JSX.Element, format: string, tooltip: string } }) => (
    <button
      className="p-1.5 hover:bg-gray-700 rounded-md transition-colors text-gray-300 hover:text-white"
      title={tool.tooltip}
      onClick={() => onFormatClick(tool.format)}
    >
      {tool.icon}
    </button>
  );

  // Render a toolbar divider
  const ToolbarDivider = () => (
    <div className="h-6 w-px bg-gray-600 mx-1"></div>
  );

  return (
    <div className="flex flex-col mb-2">
      {/* Mode selector */}
      <div className="flex justify-between items-center mb-2 px-1">
        <div className="relative">
          <button 
            className="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded-md text-sm text-gray-200 hover:bg-gray-600 transition-colors"
            onClick={toggleModeDropdown}
          >
            <AlignLeft size={14} />
            <span>{writingModes.find(mode => mode.id === activeMode)?.name || 'Mode'}</span>
            <ChevronDown size={14} />
          </button>
          
          {modeDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 rounded-md shadow-lg z-10 border border-gray-700">
              {writingModes.map(mode => (
                <button
                  key={mode.id}
                  className={`w-full text-left px-3 py-2 text-sm ${activeMode === mode.id ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                  onClick={() => changeMode(mode.id)}
                >
                  <div className="font-medium">{mode.name}</div>
                  <div className="text-xs text-gray-400">{mode.description}</div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="text-xs text-gray-400">
          {activeMode === 'brainstorming' && 'Focus on generating ideas'}
          {activeMode === 'drafting' && 'Focus on getting words down'}
          {activeMode === 'editing' && 'Focus on improving content'}
          {activeMode === 'reviewing' && 'Focus on final polish'}
        </div>
      </div>
      
      {/* Formatting toolbar */}
      <div className="flex items-center p-1 bg-gray-800 rounded-md border border-gray-700">
        {/* Text formatting section */}
        <div className="flex">
          {formatTools.map((tool, index) => (
            <ToolbarButton key={index} tool={tool} />
          ))}
        </div>
        
        <ToolbarDivider />
        
        {/* Headings section */}
        <div className="flex">
          {headingTools.map((tool, index) => (
            <ToolbarButton key={index} tool={tool} />
          ))}
        </div>
        
        <ToolbarDivider />
        
        {/* Lists section */}
        <div className="flex">
          {listTools.map((tool, index) => (
            <ToolbarButton key={index} tool={tool} />
          ))}
        </div>
        
        <ToolbarDivider />
        
        {/* Insert section */}
        <div className="flex">
          {insertTools.map((tool, index) => (
            <ToolbarButton key={index} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteToolbar;
