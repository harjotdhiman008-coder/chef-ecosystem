import React from 'react';
import MasterChefCapIcon from '../decorative/MasterChefCapIcon';

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num ? num.toString() : '0';
};

const ChefCoinBadge = ({ amount = 0, size = 'md', animated = false, className = '' }) => {
  const sizes = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2 font-bold'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 26
  };

  return (
    <div className={`inline-flex items-center gap-1.5 bg-[#1E1A1A] border border-[#D6A84F]/50 text-[#D6A84F] rounded-full shadow-sm ${sizes[size]} ${className}`}>
      <MasterChefCapIcon size={iconSizes[size]} animated={animated} />
      <span className="font-extrabold text-white tracking-tight">{formatNumber(amount)}</span>
      <span className="text-[#D6A84F] font-bold text-[11px] hidden sm:inline">ChefCoins</span>
    </div>
  );
};

export default React.memo(ChefCoinBadge);
