import React from 'react';

const Marquee = ({ 
  children, 
  speed = 'normal', 
  pauseOnHover = true, 
  direction = 'left', 
  className = '' 
}) => {
  const speeds = {
    slow: '60s',
    normal: '40s',
    fast: '20s'
  };

  return (
    <div className={`overflow-hidden whitespace-nowrap py-4 ${className}`}>
      <div 
        className={`inline-block ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: `marquee ${speeds[speed]} linear infinite ${direction === 'right' ? 'reverse' : ''}`,
        }}
      >
        <div className="flex items-center gap-8 px-4 hover:-translate-y-1 transition-transform duration-300">
          {children}
          {/* Duplicate children to create the infinite loop effect */}
          {children}
          {children}
          {children}
        </div>
      </div>
    </div>
  );
};

// Add this to global CSS or handle appropriately
// @keyframes marquee {
//   0% { transform: translateX(0%); }
//   100% { transform: translateX(-50%); }
// }

export default Marquee;
