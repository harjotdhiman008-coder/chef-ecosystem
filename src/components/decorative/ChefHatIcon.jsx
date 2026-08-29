import React from 'react';

const ChefHatIcon = ({ size = 24, className = '', variant = 'default' }) => {
  let fill = '#ffffff';
  let stroke = '#D6A84F'; // gold
  let strokeWidth = '1.5';

  if (variant === 'gold') {
    fill = '#D6A84F';
    stroke = '#B8860B'; // darker gold
  } else if (variant === 'white') {
    fill = '#ffffff';
    stroke = 'rgba(0,0,0,0.1)';
  }

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`lucide lucide-chef-hat ${variant === 'white' ? 'drop-shadow-sm' : ''} ${className}`}
    >
      <path d="M17 21a1 1 0 0 0 1-1v-4.5a3 3 0 0 0 .5-5.5v0a3 3 0 0 0-1-5.5h-1a3 3 0 0 0-6 0h-1a3 3 0 0 0-1 5.5v0a3 3 0 0 0 .5 5.5V20a1 1 0 0 0 1 1h8z"/>
      <path d="M14.5 17.5h-5"/>
      <path d="M14.5 13.5h-5"/>
    </svg>
  );
};

export default React.memo(ChefHatIcon);
