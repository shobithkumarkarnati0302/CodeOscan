import { useState } from 'react';

export function FloatingActionButton({ icon, onClick, tooltip, className = '' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          w-14 h-14 bg-gradient-to-r from-blue-600 to-emerald-600 
          hover:from-blue-700 hover:to-emerald-700 
          text-white rounded-full shadow-lg hover:shadow-xl 
          transform transition-all duration-300 
          hover:scale-110 active:scale-95
          flex items-center justify-center
          animate-bounce-gentle
          ${className}
        `}
      >
        {icon}
      </button>
      
      {tooltip && isHovered && (
        <div className="absolute bottom-16 right-0 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg whitespace-nowrap animate-fadeIn">
          {tooltip}
          <div className="absolute top-full right-4 w-0 h-0 border-4 border-l-transparent border-r-transparent border-t-gray-800 border-b-transparent"></div>
        </div>
      )}
    </div>
  );
}
