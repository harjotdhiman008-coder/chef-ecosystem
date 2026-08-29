import React from 'react';
import ChefHatIcon from '../decorative/ChefHatIcon';

const ChefLevelBadge = ({ level = 1, levelName = 'Novice', size = 'md', className = '' }) => {
  const maxLevel = 7;
  const progressPercent = (level / maxLevel) * 100;

  const getVariant = (lvl) => {
    if (lvl >= 6) return 'gold';
    if (lvl >= 3) return 'default';
    return 'white'; // Though default has gold stroke
  };

  const sizes = {
    sm: 'p-2',
    md: 'p-3'
  };

  const iconSizes = {
    sm: 20,
    md: 28
  };

  return (
    <div className={`inline-flex flex-col items-center bg-[#171515] rounded-xl border border-[#242020] shadow-sm ${sizes[size]} ${className}`}>
      <div className="flex items-center gap-2 mb-1">
        <ChefHatIcon size={iconSizes[size]} variant={getVariant(level)} className={level >= 6 ? 'drop-shadow-[0_0_8px_rgba(214,168,79,0.5)]' : ''} />
        <div>
          <div className={`font-bold text-[#F5EBDD] ${size === 'sm' ? 'text-sm' : 'text-base'}`}>Level {level}</div>
          <div className={`text-[#D6A84F] ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>{levelName}</div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-[#242020] rounded-full overflow-hidden mt-1">
        <div 
          className="h-full bg-gradient-to-r from-[#7A1820] to-[#D6A84F] rounded-full transition-all duration-1000"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default React.memo(ChefLevelBadge);
