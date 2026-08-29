import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SlidingPanel = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  width = 'md' 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const widths = {
    sm: 'max-w-[320px]',
    md: 'max-w-[420px]',
    lg: 'max-w-[560px]'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed inset-y-0 right-0 z-50 w-full ${widths[width]} bg-[#FFF8EE] shadow-2xl flex flex-col md:translate-x-0 md:!bottom-0`}
          >
            {/* Mobile handle & Header */}
            <div className="flex-none flex items-center justify-between p-6 border-b border-[#D8CABB]/30 bg-white">
              <h2 className="text-2xl font-serif font-bold text-[#171515]">{title}</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors focus-ring"
                aria-label="Close panel"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-6 scroll-container">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default React.memo(SlidingPanel);
