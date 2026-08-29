import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Shield, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/helpers';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const mockCommunities = [
  { id: '1', name: 'Sourdough Bakers', description: 'A community for sourdough enthusiasts to share tips, starters, and recipes.', members: 1240, category: 'Baking', cover: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop', icon: '🍞' },
  { id: '2', name: 'Vegan Delights', description: 'Plant-based recipes, swaps, and cruelty-free lifestyle discussions.', members: 892, category: 'Lifestyle', cover: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop', icon: '🥗' },
  { id: '3', name: 'Regional Indian', description: 'Explore authentic local cuisines from across the Indian subcontinent.', members: 3420, category: 'Cuisine', cover: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop', icon: '🍛' },
  { id: '4', name: 'Weekend Grilling', description: 'BBQ techniques, marinades, and everything related to cooking on fire.', members: 560, category: 'Discovery', cover: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&h=400&fit=crop', icon: '🔥' },
  { id: '5', name: 'Pasta Makers', description: 'From scratch pasta making, shaping techniques, and sauce pairings.', members: 2100, category: 'Cuisine', cover: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=400&fit=crop', icon: '🍝' },
  { id: '6', name: 'Keto Kitchen', description: 'Low carb, high fat recipes and meal prep ideas.', members: 1540, category: 'Lifestyle', cover: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop', icon: '🥑' }
];

const categories = ['All', 'Baking', 'Cuisine', 'Lifestyle', 'Regional', 'Discovery'];

export default function CommunitiesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCommunities = mockCommunities.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-warm-ivory min-h-screen text-charcoal font-sans pb-20">
      <div className="max-container section-padding">
        
        {/* Header */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-deep-red font-bold mb-4">Food Communities</h1>
          <p className="text-lg text-soft-charcoal">Find your food circle and share your passion.</p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6"
        >
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search communities..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-muted-cream bg-white focus:outline-none focus:border-deep-red focus-ring"
            />
          </div>
          
          <div className="flex overflow-x-auto w-full md:w-auto gap-2 pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "whitespace-nowrap px-6 py-2 rounded-full border transition-all font-medium text-sm",
                  activeCategory === cat 
                    ? "bg-deep-red text-white border-deep-red" 
                    : "bg-white text-charcoal border-muted-cream hover:border-deep-red"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-cream rounded-2xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center justify-between border border-muted-cream"
        >
          <div>
            <h3 className="text-xl font-bold font-serif text-deep-red mb-2">Can't find your circle?</h3>
            <p className="text-soft-charcoal">Start your own community and invite people who share your culinary interests.</p>
          </div>
          <Link to="/create-community" className="mt-4 md:mt-0 whitespace-nowrap bg-deep-red hover:bg-dark-burgundy text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors">
            <Plus className="w-5 h-5" /> Start a Food Circle
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCommunities.map(community => (
            <motion.div key={community.id} variants={staggerItem} className="card-hover">
              <Link to={`/community/${community.id}`} className="block bg-white rounded-2xl overflow-hidden border border-muted-cream h-full flex flex-col shadow-sm hover:shadow-lg transition-all">
                <div className="relative h-48">
                  <img src={community.cover} alt={community.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-deep-red">
                    {community.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{community.icon}</span>
                    <h2 className="text-xl font-bold font-serif text-charcoal">{community.name}</h2>
                  </div>
                  <p className="text-soft-charcoal text-sm mb-6 flex-1">{community.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-muted-cream/50 mt-auto">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                      <Users className="w-4 h-4" />
                      {community.members.toLocaleString()} members
                    </div>
                    <button className="text-deep-red hover:text-dark-burgundy font-bold text-sm flex items-center gap-1 group">
                      Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredCommunities.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-soft-charcoal">No communities found matching your search.</p>
          </div>
        )}

      </div>
    </div>
  );
}
