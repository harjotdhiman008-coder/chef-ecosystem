import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const Rating = ({ 
  value = 0, 
  size = 'md', 
  showValue = false, 
  reviewCount, 
  className = '' 
}) => {
  const maxStars = 5;
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 24
  };

  const currentSize = iconSizes[size];

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center text-[#D6A84F]">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={currentSize} fill="currentColor" />
        ))}
        {hasHalfStar && (
          <StarHalf size={currentSize} fill="currentColor" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={currentSize} />
        ))}
      </div>
      
      {(showValue || reviewCount !== undefined) && (
        <div className={`ml-2 text-sm text-gray-600 flex items-center gap-1 ${size === 'lg' ? 'text-base' : ''}`}>
          {showValue && <span className="font-medium text-gray-900">{value.toFixed(1)}</span>}
          {reviewCount !== undefined && <span>({reviewCount})</span>}
        </div>
      )}
    </div>
  );
};

export default React.memo(Rating);
