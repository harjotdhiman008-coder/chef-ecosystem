import React, { useMemo } from 'react';

const CulinarySymbols = ({ count = 5, className = '' }) => {
  const symbols = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const type = Math.floor(Math.random() * 5); // 0-4
      const size = Math.random() * 20 + 20; // 20-40px
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 5;
      const animationClass = ['animate-float', 'animate-float-delayed', 'animate-float-slow'][Math.floor(Math.random() * 3)];

      let path;
      if (type === 0) {
        // Fork
        path = <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2m-5 9v11M3 2l1.5 5M11 2l-1.5 5M7 2v5" />;
      } else if (type === 1) {
        // Spoon
        path = <path d="M5 2C3 2 2 3.5 2 5s1 3 3 3h4c2 0 3-1.5 3-3s-1-3-3-3H5zm2 6v11" />;
      } else if (type === 2) {
        // Knife
        path = <path d="M20 2H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h16m-6 0v14" />; // Abstracted knife/cleaver
      } else if (type === 3) {
        // Plate
        path = <circle cx="12" cy="12" r="10" />;
      } else {
        // Chef Hat
        path = <path d="M17 21a1 1 0 0 0 1-1v-4.5a3 3 0 0 0 .5-5.5v0a3 3 0 0 0-1-5.5h-1a3 3 0 0 0-6 0h-1a3 3 0 0 0-1 5.5v0a3 3 0 0 0 .5 5.5V20a1 1 0 0 0 1 1h8z" />;
      }

      return (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute text-white opacity-20 ${animationClass}`}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        >
          {path}
        </svg>
      );
    });
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {symbols}
    </div>
  );
};

export default React.memo(CulinarySymbols);
