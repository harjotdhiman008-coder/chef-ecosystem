import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ 
  placeholder = 'Search recipes, chefs, ingredients...', 
  onSearch, 
  className = '', 
  expanded = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative flex items-center ${className}`}
    >
      <motion.div
        initial={false}
        animate={{
          width: isExpanded ? '100%' : '48px',
          backgroundColor: isExpanded ? '#FFF8EE' : 'transparent'
        }}
        className={`flex items-center rounded-xl overflow-hidden ${
          isExpanded ? 'border border-[#D8CABB] shadow-sm focus-within:border-[#7A1820] focus-within:ring-1 focus-within:ring-[#7A1820]' : ''
        } transition-colors duration-200`}
        style={{ minWidth: isExpanded ? '300px' : '48px', height: '48px' }}
      >
        <button
          type="button"
          onClick={() => !isExpanded && setIsExpanded(true)}
          className={`flex-shrink-0 flex items-center justify-center w-12 h-12 text-gray-500 hover:text-[#7A1820] transition-colors ${
            !isExpanded ? 'bg-[#F5EBDD] rounded-xl hover:bg-[#D8CABB]/50' : ''
          }`}
          aria-label="Search"
        >
          <Search size={20} />
        </button>
        
        {isExpanded && (
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 h-full bg-transparent border-none focus:outline-none text-[#171515] placeholder-gray-400 px-2"
          />
        )}
        
        <AnimatePresence>
          {isExpanded && query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={handleClear}
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 mr-1"
            >
              <X size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </form>
  );
};

export default React.memo(SearchBar);
