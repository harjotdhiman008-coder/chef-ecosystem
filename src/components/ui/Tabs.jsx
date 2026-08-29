import React from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ tabs = [], activeTab, onTabChange, className = '' }) => {
  return (
    <div className={`flex items-center border-b border-gray-200 overflow-x-auto no-scrollbar ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors
              ${isActive ? 'text-[#7A1820]' : 'text-gray-500 hover:text-gray-700 hover:bg-[#D8CABB]/20'}
            `}
          >
            <div className="flex items-center gap-2">
              {tab.label}
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-[#7A1820]/10 text-[#7A1820]' : 'bg-gray-100 text-gray-600'}`}>
                  {tab.count}
                </span>
              )}
            </div>
            
            {isActive && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#7A1820]"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default React.memo(Tabs);
