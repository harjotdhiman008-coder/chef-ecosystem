import React from 'react';

/**
 * MasterChef's Cap Icon in crisp White & Gold
 * Pure white puffed toque with elegant gold trim, folds, and band.
 */
export default function MasterChefCapIcon({ className = "w-5 h-5", size, animated = false }) {
  const dimension = size ? { width: size, height: size } : {};

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${animated ? 'animate-bounce-gentle' : ''} ${className}`}
      style={dimension}
    >
      {/* Outer subtle shadow/glow */}
      <filter id="gold-glow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#D6A84F" floodOpacity="0.4" />
      </filter>

      {/* Chef Cap Puffs (White fill with gold trim) */}
      <g filter="url(#gold-glow)">
        {/* Left Puff */}
        <path
          d="M17 38 C12 30, 14 18, 24 16 C27 15, 29 17, 30 20 C22 24, 18 30, 17 38 Z"
          fill="#FFFFFF"
          stroke="#D6A84F"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Right Puff */}
        <path
          d="M47 38 C52 30, 50 18, 40 16 C37 15, 35 17, 34 20 C42 24, 46 30, 47 38 Z"
          fill="#FFFFFF"
          stroke="#D6A84F"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Center Dominant Crown Puff */}
        <path
          d="M23 16 C25 8, 39 8, 41 16 C43 24, 38 38, 38 38 L26 38 C26 38, 21 24, 23 16 Z"
          fill="#FFFFFF"
          stroke="#D6A84F"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* White Body Base Filling */}
        <path
          d="M17 38 C17 38, 20 22, 32 20 C44 22, 47 38, 47 38 Z"
          fill="#FFFFFF"
        />

        {/* Golden Pleat Folds */}
        <path d="M26 22 C27 28, 27 34, 26 38" stroke="#D6A84F" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <path d="M32 20 C32 27, 32 33, 32 38" stroke="#D6A84F" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M38 22 C37 28, 37 34, 38 38" stroke="#D6A84F" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
      </g>

      {/* Cap Bottom Band (Gold Ribbed Trim with White Inner) */}
      <rect
        x="15"
        y="38"
        width="34"
        height="8"
        rx="2"
        fill="#FFFFFF"
        stroke="#D6A84F"
        strokeWidth="2"
      />
      <line x1="18" y1="42" x2="46" y2="42" stroke="#D6A84F" strokeWidth="1.2" strokeDasharray="2 2" />

      {/* Small Golden Star / Badge in center of headband */}
      <circle cx="32" cy="42" r="2" fill="#D6A84F" />
    </svg>
  );
}

export const MasterChefCoinBadge = ({ amount = 320, size = "md", onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all duration-200 border shadow-xs active:scale-95 ${
        size === 'sm' ? 'text-xs px-2.5 py-1' : size === 'lg' ? 'text-sm px-4 py-2' : 'text-xs px-3 py-1.5'
      } bg-[#1E1A1A] border-[#D6A84F]/60 text-[#D6A84F] hover:bg-[#D6A84F]/15 hover:border-[#D6A84F] ${className}`}
    >
      <MasterChefCapIcon className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-4.5 h-4.5'} />
      <span className="font-extrabold tracking-tight">{amount.toLocaleString()}</span>
    </button>
  );
};
