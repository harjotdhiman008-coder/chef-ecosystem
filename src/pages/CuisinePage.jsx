import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Search, MapPin, Clock, ChefHat, Flame, Star, Bookmark, PlayCircle, Heart } from 'lucide-react';
import { pageTransition, staggerContainer, staggerItem, cardHover, fadeInUp } from '../utils/animations';
import { cn, formatNumber, formatCurrency, getChefLevel } from '../utils/helpers';
import useScrollReveal from '../hooks/useScrollReveal';

let importedCuisines = [];
let importedRecipes = [];
try {
  const dataC = require('../data/cuisines');
  importedCuisines = dataC.cuisines || [];
  const dataR = require('../data/recipes');
  importedRecipes = dataR.recipes || [];
} catch (e) {}

const fallbackCuisine = { id: 'c-1', name: 'Italian', region: 'Europe', dishCount: 1240, image: 'https://images.unsplash.com/photo-1498579150354-9794781d4310?auto=format&fit=crop&w=1200&q=80', description: 'The heart of Mediterranean cooking, featuring fresh tomatoes, olive oil, and handmade pasta.' };

const fallbackRecipes = [
  { id: 'r-1', title: 'Classic Spaghetti Carbonara', image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?auto=format&fit=crop&w=800&q=80', prepTime: 20, difficulty: 'Medium', calories: 650, rating: 4.8, saves: 12400, hasVideo: true, creator: { name: 'Mario Rossi', avatar: 'https://i.pravatar.cc/150?u=1' }, tags: ['Popular', 'Under 30 min', 'High Protein'] },
  { id: 'r-2', title: 'Margherita Pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80', prepTime: 120, difficulty: 'Hard', calories: 850, rating: 4.9, saves: 34200, hasVideo: false, creator: { name: 'Luigi Verdi', avatar: 'https://i.pravatar.cc/150?u=2' }, tags: ['Vegetarian', 'Popular'] },
  { id: 'r-3', title: 'Pesto Pasta', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80', prepTime: 15, difficulty: 'Beginner', calories: 550, rating: 4.6, saves: 8900, hasVideo: true, creator: { name: 'Giulia Bianchi', avatar: 'https://i.pravatar.cc/150?u=3' }, tags: ['Vegetarian', 'Quick', 'Under 30 min', 'Beginner'] },
  { id: 'r-4', title: 'Vegan Lasagna', image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80', prepTime: 90, difficulty: 'Medium', calories: 480, rating: 4.5, saves: 5100, hasVideo: false, creator: { name: 'Ana Silva', avatar: 'https://i.pravatar.cc/150?u=4' }, tags: ['Vegan', 'Healthy'] }
];

const filters = ['Vegetarian', 'Vegan', 'High Protein', 'Low Carb', 'Quick', 'Beginner', 'Under 30 min', 'Popular', 'Trending', 'Creator Picks'];

export default function CuisinePage() {
  const { cuisineId } = useParams();
  const [activeFilters, setActiveFilters] = useState([]);
  const scrollRef = useScrollReveal();

  const cuisine = importedCuisines.find(c => c.id === cuisineId) || fallbackCuisine;
  
  // Get recipes for this cuisine
  let recipes = importedRecipes.filter(r => r.cuisineId === cuisineId || r.cuisine === cuisine.name);
  if (recipes.length === 0) recipes = fallbackRecipes;

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const filteredRecipes = useMemo(() => {
    if (activeFilters.length === 0) return recipes;
    return recipes.filter(recipe => 
      activeFilters.every(filter => recipe.tags?.includes(filter))
    );
  }, [recipes, activeFilters]);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-cream"
    >
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <div className="absolute inset-0">
          <img 
            src={cuisine.image} 
            alt={cuisine.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 max-container text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-3 text-gold">
              <MapPin className="w-5 h-5" />
              <span className="font-medium tracking-wide uppercase">{cuisine.region}</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl mb-4">{cuisine.name} Cuisine</h1>
            <p className="text-lg md:text-xl text-cream/90 mb-6">{cuisine.description || `Discover the authentic flavors and rich culinary heritage of ${cuisine.name}.`}</p>
            <div className="flex items-center gap-4 text-cream">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <ChefHat className="w-5 h-5 text-gold" />
                <span>{formatNumber(cuisine.dishCount || recipes.length)} Recipes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <main className="max-container section-padding">
        {/* Filter Bar */}
        <section className="mb-10" ref={scrollRef}>
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={cn(
                  "whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 snap-center border",
                  activeFilters.includes(filter)
                    ? "bg-dark-burgundy text-white border-dark-burgundy shadow-md"
                    : "bg-white text-soft-charcoal border-soft-charcoal/10 hover:border-gold hover:text-dark-burgundy"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* Recipe Grid */}
        <motion.section 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <motion.div 
                  key={recipe.id} 
                  variants={staggerItem}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/recipe/${recipe.id}`} className="block group h-full">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-soft-charcoal/5 h-full flex flex-col">
                      <div className="relative aspect-video overflow-hidden">
                        <img 
                          src={recipe.image} 
                          alt={recipe.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {recipe.hasVideo && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                            <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-lg" />
                          </div>
                        )}
                        <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-dark-burgundy transition-colors">
                          <Bookmark className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="p-5 flex-grow flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-serif text-2xl text-dark-burgundy group-hover:text-gold transition-colors line-clamp-2">{recipe.title}</h3>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-soft-charcoal/70 mb-4 mt-auto pt-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{recipe.prepTime}m</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ChefHat className="w-4 h-4" />
                            <span>{recipe.difficulty}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Flame className="w-4 h-4" />
                            <span>{recipe.calories} kcal</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-soft-charcoal/10">
                          <div className="flex items-center gap-2">
                            <img src={recipe.creator?.avatar || 'https://i.pravatar.cc/150'} alt="Creator" className="w-8 h-8 rounded-full" />
                            <span className="text-sm font-medium text-charcoal">{recipe.creator?.name || 'Chef'}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gold">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium text-charcoal">{recipe.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-soft-charcoal">
                <p className="text-xl">No recipes found matching these filters.</p>
                <button 
                  onClick={() => setActiveFilters([])}
                  className="mt-4 text-dark-burgundy font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </motion.section>
      </main>
    </motion.div>
  );
}
