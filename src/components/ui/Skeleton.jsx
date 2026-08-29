import React from 'react';

const shimmerClass = "relative overflow-hidden bg-[#F5EBDD] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const SkeletonText = ({ width = '100%', className = '' }) => (
  <div 
    className={`h-4 rounded ${shimmerClass} ${className}`} 
    style={{ width }} 
  />
);

export const SkeletonCircle = ({ size = 48, className = '' }) => (
  <div 
    className={`rounded-full ${shimmerClass} ${className}`} 
    style={{ width: size, height: size }} 
  />
);

export const SkeletonImage = ({ aspectRatio = '16/9', className = '' }) => (
  <div 
    className={`w-full rounded-2xl ${shimmerClass} ${className}`}
    style={{ aspectRatio }}
  />
);

export const SkeletonCard = () => (
  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-4 w-full">
    <SkeletonImage aspectRatio="4/3" />
    <div className="flex flex-col gap-2 px-1">
      <SkeletonText width="80%" className="h-6" />
      <SkeletonText width="60%" />
      <div className="flex items-center gap-3 mt-4">
        <SkeletonCircle size={32} />
        <SkeletonText width="40%" />
      </div>
    </div>
  </div>
);

// CSS animation required in global styles
// @keyframes shimmer {
//   100% { transform: translateX(100%); }
// }
