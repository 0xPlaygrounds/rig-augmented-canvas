import React from 'react';
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
  Quote
} from 'lucide-react';

interface NoteToolbarProps {
  onFormatClick: (format: string) => void;
}

const NoteToolbar: React.FC<NoteToolbarProps> = ({ onFormatClick }) => {
  const tools = [
    { icon: <Bold size={16} />, format: '**', tooltip: 'Bold (Ctrl+B)' },
    { icon: <Italic size={16} />, format: '*', tooltip: 'Italic (Ctrl+I)' },
    { icon: <Heading1 size={16} />, format: '# ', tooltip: 'Heading 1' },
    { icon: <Heading2 size={16} />, format: '## ', tooltip: 'Heading 2' },
    { icon: <Heading3 size={16} />, format: '### ', tooltip: 'Heading 3' },
    { icon: <List size={16} />, format: '- ', tooltip: 'Bullet List' },
    { icon: <ListOrdered size={16} />, format: '1. ', tooltip: 'Numbered List' },
    { icon: <Code size={16} />, format: '`', tooltip: 'Inline Code' },
    { icon: <Link size={16} />, format: '[](url)', tooltip: 'Link' },
    { icon: <Image size={16} />, format: '![](url)', tooltip: 'Image' },
    { icon: <Quote size={16} />, format: '> ', tooltip: 'Quote' },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-1 bg-gray-100 rounded-md mb-2">
      {tools.map((tool, index) => (
        <button
          key={index}
          className="p-1.5 hover:bg-gray-200 rounded-md transition-colors"
          title={tool.tooltip}
          onClick={() => onFormatClick(tool.format)}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
};

export default NoteToolbar;
