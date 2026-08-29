import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Grid, Users, Video, ShoppingBag, MessageSquare } from 'lucide-react';
import { cn } from '../utils/helpers';
import useScrollReveal from '../hooks/useScrollReveal';
import { fadeInUp, staggerContainer, pageTransition } from '../utils/animations';

const TABS = [
  { id: 'all', label: 'All Results', icon: Search },
  { id: 'recipes', label: 'Recipes', icon: Grid },
  { id: 'creators', label: 'Creators', icon: Users },
  { id: 'communities', label: 'Communities', icon: MessageSquare },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
  { id: 'videos', label: 'Videos', icon: Video },
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('all');
  const [ref, controls] = useScrollReveal();

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
    }
  };

  const hasQuery = initialQuery.length > 0;

  return (
    <motion.div 
      className="min-h-screen bg-cream pb-20 pt-24"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {/* Search Header */}
      <div className="max-container px-4 mb-8">
        <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-soft-charcoal" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes, creators, communities..."
            className="w-full pl-14 pr-32 py-5 bg-white border-2 border-muted-cream rounded-full text-lg focus:outline-none focus:border-deep-red focus:ring-4 focus:ring-deep-red/10 transition-all text-charcoal shadow-sm placeholder:text-soft-charcoal/60"
          />
          <button 
            type="submit"
            className="absolute inset-y-2 right-2 bg-deep-red text-white px-6 rounded-full font-bold hover:bg-dark-burgundy transition-colors shadow-md"
          >
            Search
          </button>
        </form>
      </div>

      {!hasQuery ? (
        <div className="max-container px-4 text-center py-20">
          <div className="w-24 h-24 bg-warm-ivory rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-muted-cream" />
          </div>
          <h2 className="text-3xl font-serif text-charcoal mb-4">Discover the Culinary World</h2>
          <p className="text-soft-charcoal max-w-lg mx-auto text-lg">Search for your favorite recipes, discover new chefs, join communities, or find premium ingredients.</p>
          
          <div className="mt-12">
            <h3 className="text-sm font-bold text-soft-charcoal uppercase tracking-wider mb-4">Trending Searches</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {['Sourdough Bread', 'Gordon Ramsay', 'Vegan Desserts', 'Pasta Mastery', 'Quick Dinners', 'Baking Community'].map(term => (
                <button 
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    setSearchParams({ q: term });
                  }}
                  className="px-4 py-2 bg-white border border-muted-cream rounded-full text-sm font-medium text-charcoal hover:border-deep-red hover:text-deep-red transition-colors shadow-sm"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="border-b border-muted-cream/30 bg-warm-ivory sticky top-16 z-20 shadow-sm">
            <div className="max-container px-4 overflow-x-auto no-scrollbar">
              <div className="flex space-x-2">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors relative whitespace-nowrap",
                        isActive ? "text-deep-red" : "text-soft-charcoal hover:text-charcoal"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                      {isActive && (
                        <motion.div 
                          layoutId="searchTabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-deep-red"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="section-padding max-container px-4" ref={ref}>
            <motion.div variants={staggerContainer} initial="hidden" animate={controls}>
              
              <div className="mb-8">
                <h2 className="text-2xl font-serif text-charcoal">Results for "<span className="text-deep-red">{initialQuery}</span>"</h2>
                <p className="text-soft-charcoal">Showing top matches across the ecosystem.</p>
              </div>

              {/* Mock Results - Just displaying a generic empty/mock state for now */}
              <div className="py-20 text-center bg-white rounded-3xl border border-muted-cream/20 shadow-sm">
                <Grid className="w-16 h-16 text-muted-cream mx-auto mb-4" />
                <h3 className="text-xl font-bold text-charcoal mb-2">Simulated Search Results</h3>
                <p className="text-soft-charcoal max-w-md mx-auto">In a full application, this area would map over filtered data arrays based on the search query `{initialQuery}` and the active tab `{activeTab}`.</p>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
}
