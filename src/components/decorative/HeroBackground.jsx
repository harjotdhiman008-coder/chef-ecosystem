import React from 'react';
import CulinarySymbols from './CulinarySymbols';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 bg-[#171515] overflow-hidden -z-10">
      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(122,24,32,0.15)_0%,rgba(23,21,21,1)_70%)]" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(to right, #F5EBDD 1px, transparent 1px), linear-gradient(to bottom, #F5EBDD 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Abstract connections (SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <g stroke="#D6A84F" strokeWidth="0.5" fill="none">
          {/* Faint connecting lines */}
          <path d="M 100 200 C 300 150, 400 400, 700 300" className="animate-pulse-soft" />
          <path d="M 800 100 C 600 250, 900 500, 1100 400" className="animate-pulse-soft" style={{ animationDelay: '1s' }} />
          <path d="M 300 600 C 500 500, 600 800, 900 700" className="animate-pulse-soft" style={{ animationDelay: '2s' }} />
          
          {/* Abstract circular nodes */}
          <circle cx="100" cy="200" r="4" fill="#D6A84F" opacity="0.5" className="animate-pulse-soft" />
          <circle cx="400" cy="400" r="3" fill="#D6A84F" opacity="0.3" />
          <circle cx="700" cy="300" r="5" fill="#7A1820" opacity="0.7" className="animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
          <circle cx="800" cy="100" r="4" fill="#F5EBDD" opacity="0.4" />
          <circle cx="900" cy="500" r="3" fill="#D6A84F" opacity="0.5" />
          <circle cx="1100" cy="400" r="6" fill="#7A1820" opacity="0.6" className="animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
          <circle cx="300" cy="600" r="4" fill="#F5EBDD" opacity="0.4" />
          <circle cx="600" cy="800" r="5" fill="#D6A84F" opacity="0.5" className="animate-pulse-soft" />
          <circle cx="900" cy="700" r="4" fill="#F5EBDD" opacity="0.3" />
        </g>
      </svg>
      
      {/* Floating culinary symbols */}
      <CulinarySymbols count={15} />
    </div>
  );
};

export default React.memo(HeroBackground);
