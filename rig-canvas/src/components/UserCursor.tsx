import React from 'react';

interface UserCursorProps {
  x: number;
  y: number;
  color: string;
  name: string;
}

export const UserCursor: React.FC<UserCursorProps> = ({ x, y, color, name }) => {
  return (
    <div 
      className="absolute pointer-events-none z-50 flex flex-col items-start"
      style={{ 
        left: x, 
        top: y, 
        transform: 'translate(-2px, -2px)' 
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M1 1L8 14L10.5 8.5L16 6L1 1Z" 
          fill={color} 
          stroke="white" 
          strokeWidth="1.5"
        />
      </svg>
      <div 
        className="mt-1 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
    </div>
  );
};
