import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Home, UtensilsCrossed } from 'lucide-react';
import { pageTransition } from '../utils/animations';

export default function NotFoundPage() {
  return (
    <motion.div 
      className="min-h-screen bg-cream flex items-center justify-center p-4 relative overflow-hidden"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <UtensilsCrossed className="absolute top-1/4 left-1/4 w-32 h-32 text-charcoal animate-float" />
        <UtensilsCrossed className="absolute bottom-1/4 right-1/4 w-40 h-40 text-charcoal animate-float-delayed rotate-45" />
      </div>

      <div className="max-w-2xl w-full bg-white rounded-3xl p-12 text-center shadow-xl border border-muted-cream/30 relative z-10">
        <div className="text-9xl mb-6">🍳</div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
          Something went slightly off the stove.
        </h1>
        <p className="text-xl text-soft-charcoal mb-10 max-w-md mx-auto">
          The page you're looking for doesn't exist, has been moved, or maybe someone ate it.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-lg">
            <Home className="w-5 h-5" />
            Go Back Home
          </Link>
          <Link to="/search" className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-lg">
            <Search className="w-5 h-5" />
            Discover Recipes
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
