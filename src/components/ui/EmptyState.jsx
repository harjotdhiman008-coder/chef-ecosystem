import React from 'react';
import { ChefHat } from 'lucide-react';
import Button from './Button';

const EmptyState = ({ 
  icon: Icon = ChefHat, 
  title = 'Nothing here yet', 
  description = 'Looks like this plate is empty. Time to cook something up!', 
  actionLabel, 
  actionPath, 
  onAction,
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border border-dashed border-[#D8CABB] ${className}`}>
      <div className="w-24 h-24 bg-[#FFF8EE] rounded-full flex items-center justify-center mb-6 animate-float text-[#D6A84F]">
        <Icon size={40} strokeWidth={1.5} />
      </div>
      
      <h3 className="text-2xl font-serif font-bold text-[#171515] mb-3">
        {title}
      </h3>
      
      <p className="text-gray-500 max-w-md mb-8">
        {description}
      </p>
      
      {actionLabel && (
        <Button 
          variant="primary" 
          onClick={onAction} 
          // If actionPath is provided and using router, you might wrap this in a Link or use navigate in onAction
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default React.memo(EmptyState);
