import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, ArrowRight, ChefHat } from 'lucide-react';
import { pageTransition, staggerContainer, staggerItem, cardHover } from '../utils/animations';
import { cn } from '../utils/helpers';
import { cuisines as rawCuisines } from '../data/cuisines';
import { CloverIcon } from '../components/layout/Navbar';

const fallbackCuisines = [
  { id: 'italian', name: 'Italian', region: 'Europe', dishCount: 248, image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=800&q=80', description: 'Pasta, pizza, and regional specialties.' },
  { id: 'japanese', name: 'Japanese', region: 'Asia', dishCount: 312, image: 'https://images.unsplash.com/photo-1553621042-f16356401f0d?auto=format&fit=crop&w=800&q=80', description: 'Sushi, ramen, and delicate flavors.' },
  { id: 'mexican', name: 'Mexican', region: 'Americas', dishCount: 189, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80', description: 'Tacos, moles, and vibrant spices.' },
  { id: 'north-indian', name: 'North Indian', region: 'South Asia', dishCount: 456, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80', description: 'Curries, tandoori, and rich aromas.' },
  { id: 'french', name: 'French', region: 'Europe', dishCount: 267, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80', description: 'Baking, sauces, and culinary arts.' },
  { id: 'thai', name: 'Thai', region: 'Southeast Asia', dishCount: 178, image: 'https://images.unsplash.com/photo-1562565652-7bc1c3da3c04?auto=format&fit=crop&w=800&q=80', description: 'Sweet, sour, salty, and spicy.' },
  { id: 'mediterranean', name: 'Mediterranean', region: 'Europe', dishCount: 234, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80', description: 'Olive oil, fresh vegetables, and grains.' },
  { id: 'korean', name: 'Korean', region: 'Asia', dishCount: 203, image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80', description: 'Kimchi, bibimbap, and Korean fried chicken.' }
];

const cuisinesList = rawCuisines && rawCuisines.length > 0 ? rawCuisines : fallbackCuisines;
const categories = ['All', 'Asia', 'Europe', 'Americas', 'Middle East', 'Healthy'];

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCuisines = useMemo(() => {
    return cuisinesList.filter((cuisine) => {
      const matchesSearch =
        cuisine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cuisine.region?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategory === 'All' ||
        cuisine.region?.toLowerCase().includes(activeCategory.toLowerCase()) ||
        (activeCategory === 'Healthy' && (cuisine.dishCount > 200 || cuisine.name === 'Healthy'));
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-warm-ivory text-charcoal pt-24 pb-20"
    >
      <main className="max-container section-padding">
        {/* Header Section */}
        <section className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <CloverIcon className="w-5 h-5 text-gold" />
            <span className="text-gold text-xs font-bold tracking-widest uppercase">
              Global Flavours
            </span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal font-bold mb-3"
          >
            Where are we eating today?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-charcoal/60 max-w-2xl mx-auto"
          >
            One world. Thousands of flavours. Explore authentic recipes and culinary cultures across the globe.
          </motion.p>
        </section>

        {/* Search and Filter */}
        <section className="mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full md:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-charcoal/40" />
              </div>
              <input
                type="text"
                placeholder="Search cuisines or regions..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-cream bg-white text-sm focus:outline-none focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F]/30 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200",
                    activeCategory === cat
                      ? "bg-[#D6A84F] text-[#141212] shadow-sm font-extrabold"
                      : "bg-white text-charcoal/70 hover:bg-cream border border-cream"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Cuisines Grid */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredCuisines.length > 0 ? (
            filteredCuisines.map((cuisine) => (
              <motion.div key={cuisine.id} variants={staggerItem}>
                <Link to={`/discover/${cuisine.id}`} className="block group">
                  <motion.div
                    variants={cardHover}
                    whileHover="hover"
                    className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl bg-white aspect-[4/5] border border-cream/80"
                  >
                    <div className="absolute inset-0">
                      <img
                        src={cuisine.image}
                        alt={cuisine.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-transparent" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end text-white">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gold" />
                        <span className="text-xs font-medium text-cream">{cuisine.region}</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-1 text-white group-hover:text-gold transition-colors">
                        {cuisine.name}
                      </h3>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/15">
                        <div className="flex items-center gap-1.5 text-xs text-cream/90">
                          <ChefHat className="w-3.5 h-3.5 text-gold" />
                          <span>{cuisine.dishCount} Dishes</span>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#D6A84F] group-hover:text-[#141212] flex items-center justify-center transition-colors">
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-charcoal/60">
              <CloverIcon className="w-10 h-10 mx-auto opacity-30 mb-3" />
              <p className="text-lg font-medium">No cuisines found matching your search.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                }}
                className="mt-3 text-deep-red font-semibold hover:underline text-sm"
              >
                Clear filters
              </button>
            </div>
          )}
        </motion.section>
      </main>
    </motion.div>
  );
}
