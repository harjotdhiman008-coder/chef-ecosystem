import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/helpers';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const moods = [
  { id: 'comfort', emoji: '😌', name: 'Comforted', color: 'bg-amber-100' },
  { id: 'adventurous', emoji: '🤠', name: 'Adventurous', color: 'bg-orange-100' },
  { id: 'healthy', emoji: '🥗', name: 'Healthy', color: 'bg-green-100' },
  { id: 'indulgent', emoji: '🤤', name: 'Indulgent', color: 'bg-pink-100' },
  { id: 'lazy', emoji: '🛋️', name: 'Lazy', color: 'bg-blue-100' },
  { id: 'celebratory', emoji: '🥳', name: 'Celebratory', color: 'bg-yellow-100' },
  { id: 'nostalgic', emoji: '🥺', name: 'Nostalgic', color: 'bg-purple-100' },
  { id: 'spicy', emoji: '🌶️', name: 'Spicy', color: 'bg-red-100' },
  { id: 'light', emoji: '🍃', name: 'Light', color: 'bg-teal-100' },
  { id: 'cozy', emoji: '☕', name: 'Cozy', color: 'bg-stone-200' },
  { id: 'romantic', emoji: '❤️', name: 'Romantic', color: 'bg-rose-100' },
  { id: 'energized', emoji: '⚡', name: 'Energized', color: 'bg-cyan-100' }
];

const mockResults = {
  comfort: [
    { id: 1, name: 'Classic Mac and Cheese', image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=500&h=400&fit=crop', reason: 'Warm, gooey cheese is scientifically proven to hug your soul.' },
    { id: 2, name: 'Creamy Tomato Soup', image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4859?w=500&h=400&fit=crop', reason: 'A classic that reminds you of childhood rainy days.' }
  ],
  adventurous: [
    { id: 3, name: 'Spicy Thai Green Curry', image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&h=400&fit=crop', reason: 'Complex flavors and a kick of heat to wake up your palate.' },
    { id: 4, name: 'Moroccan Tagine', image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=500&h=400&fit=crop', reason: 'Exotic spices and slow-cooked perfection.' }
  ]
  // Fallback for others
};

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectMood = (mood) => {
    setSelectedMood(mood);
    setLoading(true);
    // Simulate AI fetching
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const resetMood = () => setSelectedMood(null);

  const results = mockResults[selectedMood?.id] || [
    { id: 99, name: 'Surprise Chef Special', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=400&fit=crop', reason: 'A balanced dish perfectly suited for your current vibe.' },
    { id: 100, name: 'Artisan Pasta', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&h=400&fit=crop', reason: 'Because pasta makes everything better.' }
  ];

  return (
    <div className="bg-warm-ivory min-h-screen text-charcoal pb-24 pt-20">
      <div className="max-container section-padding">
        
        <AnimatePresence mode="wait">
          {!selectedMood ? (
            <motion.div key="selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} className="text-center">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-deep-red mb-4">What's your mood?</h1>
              <p className="text-xl text-soft-charcoal mb-12">Select how you feel and we'll find the perfect dish.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {moods.map(mood => (
                  <motion.button
                    key={mood.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectMood(mood)}
                    className={cn(
                      "flex flex-col items-center justify-center p-8 rounded-3xl transition-shadow shadow-sm hover:shadow-lg border-2 border-transparent hover:border-white/50",
                      mood.color
                    )}
                  >
                    <span className="text-5xl mb-4 block drop-shadow-sm">{mood.emoji}</span>
                    <span className="font-bold font-serif text-xl">{mood.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
              <button onClick={resetMood} className="flex items-center gap-2 text-gray-500 hover:text-deep-red transition font-medium mb-8">
                <ArrowLeft className="w-5 h-5" /> Try another mood
              </button>
              
              <div className="flex items-center gap-4 mb-10">
                <div className={cn("w-16 h-16 rounded-full flex items-center justify-center text-3xl", selectedMood.color)}>
                  {selectedMood.emoji}
                </div>
                <div>
                  <h2 className="text-3xl font-serif font-bold text-charcoal">Because you're feeling {selectedMood.name}...</h2>
                  <p className="text-gray-600">Here's what our culinary engine recommends.</p>
                </div>
              </div>

              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-4">
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  >
                    <ChefHat className="w-16 h-16 text-deep-red" />
                  </motion.div>
                  <p className="text-xl font-serif animate-pulse">Curating the perfect menu...</p>
                </div>
              ) : (
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {results.map(dish => (
                    <motion.div key={dish.id} variants={staggerItem} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-muted-cream flex flex-col">
                      <div className="h-64 overflow-hidden relative">
                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                          <Sparkles className="w-3 h-3 text-gold" /> AI Match
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-2xl font-serif font-bold mb-3">{dish.name}</h3>
                        <p className="text-gray-600 mb-6 italic border-l-4 border-gold pl-4 flex-1">"{dish.reason}"</p>
                        <Link to="/recipe/1" className="bg-deep-red hover:bg-dark-burgundy text-white font-bold py-3 px-6 rounded-xl text-center transition-colors w-full">
                          View Recipe
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
