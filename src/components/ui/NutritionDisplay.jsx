import React from 'react';

const NutritionDisplay = ({ 
  calories, 
  protein, 
  carbs, 
  fat, 
  fiber, 
  sugar, 
  variant = 'compact', 
  className = '' 
}) => {
  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap gap-4 text-sm ${className}`}>
        <div className="flex flex-col items-center">
          <span className="font-bold text-[#7A1820]">{calories}</span>
          <span className="text-gray-500 text-xs uppercase tracking-wider">Cal</span>
        </div>
        <div className="w-px h-8 bg-gray-200"></div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-blue-600">{protein}g</span>
          <span className="text-gray-500 text-xs uppercase tracking-wider">Pro</span>
        </div>
        <div className="w-px h-8 bg-gray-200"></div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-[#D6A84F]">{carbs}g</span>
          <span className="text-gray-500 text-xs uppercase tracking-wider">Carb</span>
        </div>
        <div className="w-px h-8 bg-gray-200"></div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-orange-500">{fat}g</span>
          <span className="text-gray-500 text-xs uppercase tracking-wider">Fat</span>
        </div>
      </div>
    );
  }

  // Detailed variant with circular progress
  const MacroCircle = ({ value, label, color, max = 100 }) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (Math.min(value, max) / max) * circumference;

    return (
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-14 h-14 flex items-center justify-center">
          <svg className="transform -rotate-90 w-14 h-14">
            <circle
              cx="28"
              cy="28"
              r={radius}
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-gray-100"
            />
            <circle
              cx="28"
              cy="28"
              r={radius}
              stroke={color}
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <span className="absolute text-sm font-bold">{value}g</span>
        </div>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</span>
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}>
      <h3 className="text-lg font-serif font-bold text-[#171515] mb-6">Nutrition per serving</h3>
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <span className="text-4xl font-bold text-[#7A1820]">{calories}</span>
          <span className="text-gray-500 font-medium">Calories</span>
        </div>
        <div className="text-right text-sm text-gray-500">
          <div>*Based on a 2000 calorie diet</div>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
        <MacroCircle value={protein} label="Protein" color="#2563eb" max={100} />
        <MacroCircle value={carbs} label="Carbs" color="#D6A84F" max={300} />
        <MacroCircle value={fat} label="Fat" color="#f97316" max={100} />
        {fiber !== undefined && <MacroCircle value={fiber} label="Fiber" color="#16a34a" max={50} />}
        {sugar !== undefined && <MacroCircle value={sugar} label="Sugar" color="#ec4899" max={100} />}
      </div>
    </div>
  );
};

export default React.memo(NutritionDisplay);
