import React from 'react';

interface ResizeHandleProps {
  onResize: (deltaWidth: number, deltaHeight: number) => void;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ onResize }) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [startPos, setStartPos] = React.useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });

    // Add event listeners to document to handle mouse move and up
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const deltaWidth = e.clientX - startPos.x;
    const deltaHeight = e.clientY - startPos.y;

    onResize(deltaWidth, deltaHeight);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className="w-8 h-8 cursor-nwse-resize bg-gray-100 hover:bg-gray-200 rounded-bl-md flex items-center justify-center"
      onMouseDown={handleMouseDown}
      style={{
        border: '1px solid #aaa',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 10L7 7M10 10L4 10L4 4L7 7M10 10L10 4L7 7"
          stroke="#666"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default ResizeHandle;
