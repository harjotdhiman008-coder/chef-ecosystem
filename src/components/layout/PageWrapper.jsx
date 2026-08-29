import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { cn } from '../../utils/helpers';
import { pageTransition } from '../../utils/animations';

const PageWrapper = ({ children, className }) => {
  const location = useLocation();
  
  // Use a fallback page transition if not available
  const defaultTransition = pageTransition || {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        variants={defaultTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className={cn('pt-20 pb-24 lg:pb-12 min-h-screen bg-warm-ivory', className)}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};

export default PageWrapper;
