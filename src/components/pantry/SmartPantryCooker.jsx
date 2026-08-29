import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Plus, X, Check, ShoppingBag, Clock, Flame, 
  ChefHat, ArrowRight, Filter, AlertCircle, RefreshCw, Zap
} from 'lucide-react';
import { recipes } from '../../data/recipes';
import { useTheme } from '../../contexts/ThemeContext';
import MasterChefCapIcon from '../decorative/MasterChefCapIcon';
import { CloverIcon } from '../layout/Navbar';

// Common Indian & global kitchen ingredients for 1-click adding
const POPULAR_PANTRY_STAPLES = [
  'Onion', 'Tomato', 'Paneer', 'Rice', 'Ginger Garlic Paste', 
  'Curd (Dahi)', 'Chicken', 'Potatoes', 'Desi Ghee', 'Eggs', 
  'Butter', 'Heavy Cream', 'Mustard Seeds', 'Curry Leaves', 
  'Pasta', 'Coconut Milk', 'Garlic', 'Chana Dal / Chickpeas'
];

import { fetchUserPantry, syncUserPantry } from '../../services/supabaseService';

export default function SmartPantryCooker() {
  const { isDark } = useTheme();
  const [selectedIngredients, setSelectedIngredients] = useState([
    'Rice', 'Onion', 'Tomato', 'Ginger Garlic Paste', 'Desi Ghee'
  ]);
  const [inputValue, setInputValue] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'ready' | 'veg' | 'quick'

  // Load from Supabase or localStorage on mount
  useEffect(() => {
    fetchUserPantry().then(items => {
      if (items && items.length > 0) {
        setSelectedIngredients(items);
      }
    });
  }, []);

  const handleAddIngredient = (item) => {
    const trimmed = item.trim();
    if (trimmed && !selectedIngredients.some(i => i.toLowerCase() === trimmed.toLowerCase())) {
      const updated = [...selectedIngredients, trimmed];
      setSelectedIngredients(updated);
      syncUserPantry('current-user', updated);
      setInputValue('');
    }
  };

  const handleRemoveIngredient = (item) => {
    const updated = selectedIngredients.filter(i => i.toLowerCase() !== item.toLowerCase());
    setSelectedIngredients(updated);
    syncUserPantry('current-user', updated);
  };

  const handleClearAll = () => {
    setSelectedIngredients([]);
    syncUserPantry('current-user', []);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient(inputValue);
    }
  };

  // Recipe Matching Logic
  const matchedRecipes = useMemo(() => {
    if (selectedIngredients.length === 0) return [];

    const lowerSelected = selectedIngredients.map(i => i.toLowerCase());

    return recipes.map(recipe => {
      const recipeIngredients = recipe.ingredients || [];
      const totalCount = recipeIngredients.length;
      if (totalCount === 0) return null;

      const matchingList = [];
      const missingList = [];

      recipeIngredients.forEach(ing => {
        const ingName = ing.name.toLowerCase();
        // Check if any selected ingredient is contained in the recipe ingredient name or vice versa
        const isMatched = lowerSelected.some(sel => 
          ingName.includes(sel) || sel.includes(ingName) || 
          (sel === 'rice' && ingName.includes('rice')) ||
          (sel === 'chicken' && ingName.includes('chicken')) ||
          (sel === 'paneer' && ingName.includes('paneer')) ||
          (sel === 'ghee' && ingName.includes('ghee')) ||
          (sel === 'curd' && ingName.includes('dahi'))
        );

        if (isMatched) {
          matchingList.push(ing.name);
        } else {
          missingList.push(ing.name);
        }
      });

      const matchPercent = Math.round((matchingList.length / totalCount) * 100);
      const isVeg = recipe.tags?.some(t => t.toLowerCase().includes('vegetarian') || t.toLowerCase().includes('veg')) || recipe.cuisineId === 'cuisine-20' || recipe.name.toLowerCase().includes('paneer') || recipe.name.toLowerCase().includes('dosa') || recipe.name.toLowerCase().includes('khichdi') || recipe.name.toLowerCase().includes('dal');

      return {
        ...recipe,
        matchPercent,
        matchingList,
        missingList,
        missingCount: missingList.length,
        isVeg
      };
    })
    .filter(Boolean)
    .filter(recipe => {
      if (activeFilter === 'ready') return recipe.missingCount <= 1 || recipe.matchPercent >= 75;
      if (activeFilter === 'veg') return recipe.isVeg;
      if (activeFilter === 'quick') return recipe.totalTime <= 35;
      return true;
    })
    .sort((a, b) => b.matchPercent - a.matchPercent);
  }, [selectedIngredients, activeFilter]);

  return (
    <div className={`rounded-3xl p-6 sm:p-8 md:p-10 border transition-all duration-300 shadow-2xl relative overflow-hidden ${
      isDark 
        ? 'bg-[#181515] border-[#D6A84F]/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)]' 
        : 'bg-white border-[#EADECB] shadow-[0_20px_50px_rgba(214,168,79,0.12)]'
    }`}>
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D6A84F]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#7A1820]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D6A84F]/15 border border-[#D6A84F]/40 text-xs font-bold text-[#D6A84F]">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>SMART PANTRY AI COOKER</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            <span>Zero Food Waste Engine</span>
          </div>
        </div>

        <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 ${
          isDark ? 'text-white' : 'text-[#1E1B18]'
        }`}>
          What's in your kitchen right now?
        </h2>
        <p className={`text-sm sm:text-base max-w-2xl leading-relaxed mb-6 ${
          isDark ? 'text-[#D8CABB]/70' : 'text-[#5C5248]'
        }`}>
          Type or tap the ingredients sitting in your fridge or pantry. We'll instantly match recipes you can cook with little or <strong>zero extra shopping</strong>!
        </p>

        {/* Input Bar */}
        <div className={`p-2 rounded-2xl border flex flex-col sm:flex-row items-center gap-2 mb-4 transition-all shadow-inner ${
          isDark ? 'bg-[#121010] border-[#332A2A] focus-within:border-[#D6A84F]' : 'bg-[#FAF6F0] border-[#E2D4C0] focus-within:border-[#D6A84F]'
        }`}>
          <div className="flex-1 flex items-center gap-3 px-3 w-full">
            <ChefHat className="w-5 h-5 text-gold shrink-0" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type an ingredient (e.g. Paneer, Potatoes, Curd, Rice, Ghee...)"
              className={`w-full bg-transparent text-sm sm:text-base focus:outline-none placeholder:text-xs sm:placeholder:text-sm ${
                isDark ? 'text-white placeholder-[#786D62]' : 'text-charcoal placeholder-[#9C8F80]'
              }`}
            />
          </div>
          <button
            type="button"
            onClick={() => handleAddIngredient(inputValue)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D6A84F] text-[#141212] font-bold text-sm hover:bg-yellow-400 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-md shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add to Pantry</span>
          </button>
        </div>

        {/* Quick Click Popular Staples */}
        <div className="mb-6">
          <p className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
            isDark ? 'text-[#D8CABB]/50' : 'text-[#8A7C6E]'
          }`}>
            <Zap className="w-3.5 h-3.5 text-gold" /> Tap to add popular staples:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_PANTRY_STAPLES.map(staple => {
              const isSelected = selectedIngredients.some(i => i.toLowerCase() === staple.toLowerCase());
              return (
                <button
                  key={staple}
                  onClick={() => isSelected ? handleRemoveIngredient(staple) : handleAddIngredient(staple)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#D6A84F] text-[#141212] font-bold shadow-sm'
                      : isDark
                        ? 'bg-[#221D1D] hover:bg-[#2C2525] text-[#D8CABB] border border-[#3A3131]'
                        : 'bg-white hover:bg-[#EFE8DC] text-[#4A4036] border border-[#E2D6C5]'
                  }`}
                >
                  {isSelected ? <Check className="w-3 h-3 stroke-[3]" /> : <Plus className="w-3 h-3" />}
                  <span>{staple}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Ingredients Chips Bar */}
        <div className={`p-4 rounded-2xl border mb-8 ${
          isDark ? 'bg-[#1E1919] border-[#2E2626]' : 'bg-[#F5EDE0] border-[#DFD1BD]'
        }`}>
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              Your Active Pantry ({selectedIngredients.length} items)
            </span>
            {selectedIngredients.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-[11px] font-semibold text-red-400 hover:text-red-300 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Clear all
              </button>
            )}
          </div>

          {selectedIngredients.length === 0 ? (
            <p className={`text-xs italic ${isDark ? 'text-[#D8CABB]/40' : 'text-[#8A7C6E]'}`}>
              No ingredients selected. Tap items above or type ingredients to find matching recipes!
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map(ing => (
                <span
                  key={ing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#D6A84F]/15 border border-[#D6A84F]/50 text-gold shadow-sm animate-scale-in"
                >
                  <span>{ing}</span>
                  <button
                    onClick={() => handleRemoveIngredient(ing)}
                    className="hover:bg-[#D6A84F]/30 p-0.5 rounded-full transition-colors"
                    aria-label={`Remove ${ing}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Filter Tabs for Results */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pt-4 border-t border-[#D6A84F]/20">
          <div className="flex items-center gap-2">
            <h3 className={`font-serif text-xl sm:text-2xl font-bold ${
              isDark ? 'text-[#F7EEDB]' : 'text-[#1E1B18]'
            }`}>
              Suggested Recipes ({matchedRecipes.length})
            </h3>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All Matches' },
              { id: 'ready', label: '✨ 100% Ready (≤1 missing)' },
              { id: 'veg', label: '🌱 Pure Veg' },
              { id: 'quick', label: '⚡ Under 35 mins' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-[#D6A84F] text-[#141212] shadow-sm font-extrabold'
                    : isDark
                      ? 'bg-[#1E1A1A] text-[#D8CABB]/70 hover:text-white border border-[#332A2A]'
                      : 'bg-white text-[#5C5248] hover:bg-[#EAE0D2] border border-[#DECFC0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Matched Recipe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {matchedRecipes.slice(0, 6).map((recipe, idx) => {
              const isHighMatch = recipe.matchPercent >= 60;
              const isZeroMissing = recipe.missingCount === 0;

              return (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col ${
                    isDark 
                      ? 'bg-[#1F1A1A] border-[#382E2E] hover:border-[#D6A84F]/60' 
                      : 'bg-white border-[#E8DCcb] hover:border-[#D6A84F]'
                  }`}
                >
                  {/* Image & Match Banner */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Match Badge Tag */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 shadow-lg ${
                        isZeroMissing 
                          ? 'bg-green-500 text-white' 
                          : isHighMatch 
                            ? 'bg-[#D6A84F] text-[#141212]' 
                            : 'bg-amber-600 text-white'
                      }`}>
                        <Sparkles className="w-3 h-3" />
                        {isZeroMissing ? '100% READY TO COOK' : `${recipe.matchPercent}% INGREDIENTS READY`}
                      </span>
                    </div>

                    {/* Cuisine & Time */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="font-semibold text-gold bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                        {recipe.cuisine}
                      </span>
                      <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                        <Clock className="w-3 h-3" /> {recipe.totalTime}m
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className={`font-serif text-lg font-bold mb-1 leading-snug hover:text-gold transition-colors ${
                        isDark ? 'text-white' : 'text-[#1E1B18]'
                      }`}>
                        <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                      </h4>
                      <p className={`text-xs line-clamp-2 mb-3 ${
                        isDark ? 'text-[#D8CABB]/60' : 'text-[#6B5F54]'
                      }`}>
                        {recipe.description}
                      </p>

                      {/* What you have vs Missing */}
                      <div className="space-y-2 mb-4 text-xs">
                        {recipe.matchingList.length > 0 && (
                          <div className="flex items-start gap-1.5 text-green-500">
                            <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 stroke-[2.5]" />
                            <span className="line-clamp-1">
                              <strong>You have:</strong> {recipe.matchingList.slice(0, 3).join(', ')}
                              {recipe.matchingList.length > 3 ? ` +${recipe.matchingList.length - 3} more` : ''}
                            </span>
                          </div>
                        )}

                        {recipe.missingList.length > 0 ? (
                          <div className={`flex items-start gap-1.5 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">
                              <strong>Missing ({recipe.missingList.length}):</strong> {recipe.missingList.slice(0, 2).join(', ')}
                            </span>
                          </div>
                        ) : (
                          <div className="text-green-400 font-bold flex items-center gap-1">
                            <span>🎉 Zero shopping needed! You have everything.</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom CTA Actions */}
                    <div className="pt-3 border-t border-[#D6A84F]/15 flex items-center justify-between gap-2">
                      <Link
                        to={`/recipe/${recipe.id}`}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#D6A84F] text-[#141212] font-bold text-xs hover:bg-yellow-400 transition-colors text-center flex items-center justify-center gap-1 shadow-sm"
                      >
                        <ChefHat className="w-3.5 h-3.5" />
                        <span>Cook Recipe</span>
                      </Link>

                      {recipe.missingCount > 0 && (
                        <Link
                          to="/grocery"
                          title="Get missing items delivered in 10 mins"
                          className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center transition-colors ${
                            isDark ? 'border-[#3A3232] hover:bg-[#282222] text-[#D8CABB]' : 'border-[#D9CABA] hover:bg-[#F2E8DA] text-[#4A3F33]'
                          }`}
                        >
                          <ShoppingBag className="w-4 h-4 text-gold" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {matchedRecipes.length === 0 && (
          <div className="text-center py-12 text-[#D8CABB]/60">
            <CloverIcon className="w-12 h-12 mx-auto mb-2 opacity-30 text-gold" />
            <p className="text-base font-bold">No exact matches found for these ingredients</p>
            <p className="text-xs mt-1">Try selecting basic staples like Rice, Tomato, Onion, Paneer, or Ghee above!</p>
          </div>
        )}
      </div>
    </div>
  );
}
