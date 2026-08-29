import React from 'react';
import { X } from 'lucide-react';

const Tag = ({ 
  children, 
  variant = 'default', 
  removable = false, 
  onRemove, 
  className = '' 
}) => {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border bg-white';
  
  const variants = {
    default: 'border-gray-200 text-gray-700',
    cuisine: 'border-[#7A1820] text-[#7A1820]',
    diet: 'border-green-600 text-green-700',
    time: 'border-blue-500 text-blue-700'
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
      {removable && (
        <button 
          onClick={onRemove}
          className="ml-1.5 focus:outline-none hover:opacity-75 rounded-full p-0.5"
          aria-label="Remove tag"
        >
          <X size={14} />
        </button>
      )}
    </span>
  );
};

export default React.memo(Tag);
