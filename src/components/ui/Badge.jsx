import React from 'react';
import { CheckCircle, Flame } from 'lucide-react';

const Badge = ({ variant = 'default', children, className = '' }) => {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    creator: 'bg-[#7A1820] text-white',
    verified: 'bg-[#D6A84F] text-[#171515]',
    new: 'bg-blue-100 text-blue-800',
    trending: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {variant === 'verified' && <CheckCircle className="w-3 h-3 mr-1" />}
      {variant === 'trending' && <Flame className="w-3 h-3 mr-1 text-red-600" />}
      {children}
    </span>
  );
};

export default React.memo(Badge);
