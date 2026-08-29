import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, UserCheck, Star, Video, Grid, Users, MessageSquare, ShoppingBag, BadgeCheck, MapPin, Link as LinkIcon, Award, Heart, Bookmark } from 'lucide-react';
import { formatNumber, cn, getChefLevel } from '../utils/helpers';
import useScrollReveal from '../hooks/useScrollReveal';
import { fadeInUp, staggerContainer, staggerItem, pageTransition } from '../utils/animations';
import { recipes } from '../data/recipes';
import { creators } from '../data/creators';

const TABS = [
  { id: 'recipes', label: 'Recipes', icon: Grid },
  { id: 'videos', label: 'Videos', icon: Video },
  { id: 'threads', label: 'Cook Threads', icon: MessageSquare },
  { id: 'communities', label: 'Communities', icon: Users },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
];

export default function CreatorPage() {
  const { creatorId } = useParams();
  const [activeTab, setActiveTab] = useState('recipes');
  const [isFollowing, setIsFollowing] = useState(false);
  const [ref, controls] = useScrollReveal();
  
  // Find creator or use fallback
  const creator = creators?.find(c => c.id === creatorId) || {
    id: creatorId || '1',
    name: 'Chef Gordon',
    username: 'gordoncooks',
    avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=200&h=200',
    coverImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1600&h=400',
    bio: 'Multi-Michelin starred chef. Welcome to my digital kitchen. Follow for exclusive masterclasses and premium recipes.',
    level: 10,
    isVerified: true,
    chefCoinsEarned: 245000,
    followers: 1250000,
    following: 120,
    recipes: 342,
    videos: 156,
    impressions: 4500000,
    location: 'London, UK',
    website: 'gordonramsay.com'
  };

  const creatorRecipes = recipes?.slice(0, 6) || [];

  return (
    <motion.div 
      className="min-h-screen bg-cream pb-20"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {/* Cover Image */}
      <div className="h-64 md:h-80 w-full relative">
        <img src={creator.coverImage} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent"></div>
      </div>

      {/* Creator Header */}
      <section className="bg-warm-ivory border-b border-muted-cream/30 pb-12 relative z-10 -mt-20 rounded-t-3xl max-container mx-auto">
        <div className="px-6 md:px-12 pt-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-24 mb-6">
            {/* Avatar */}
            <div className="relative">
              <div className={cn(
                "w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-4 shadow-xl",
                creator.isVerified ? "border-gold" : "border-white"
              )}>
                <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover" />
              </div>
              {creator.isVerified && (
                <div className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-1 border-2 border-white shadow-md">
                  <BadgeCheck className="w-6 h-6" />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex-1 flex justify-end gap-3 w-full md:w-auto">
              <button 
                onClick={() => setIsFollowing(!isFollowing)}
                className={cn(
                  "px-6 py-2.5 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 shadow-sm",
                  isFollowing ? "bg-muted-cream text-charcoal hover:bg-muted-cream/80" : "btn-primary"
                )}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isFollowing ? 'following' : 'follow'}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    {isFollowing ? (
                      <><UserCheck className="w-5 h-5" /> Following</>
                    ) : (
                      <><UserPlus className="w-5 h-5" /> Follow</>
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
              <button className="btn-secondary">Subscribe $4.99/mo</button>
            </div>
          </div>

          <div className="max-w-3xl space-y-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-serif text-charcoal font-bold">{creator.name}</h1>
                <span className="bg-charcoal text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-gold fill-gold" /> Level {creator.level}
                </span>
              </div>
              <p className="text-soft-charcoal font-medium text-lg mt-1">@{creator.username}</p>
            </div>

            <p className="text-charcoal text-lg">{creator.bio}</p>

            <div className="flex flex-wrap items-center gap-5 text-sm text-soft-charcoal pt-2">
              <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {creator.location}</div>
              <div className="flex items-center gap-1.5"><LinkIcon className="w-4 h-4" /> <a href={`https://${creator.website}`} className="text-deep-red hover:underline font-medium">{creator.website}</a></div>
              <div className="flex items-center gap-1.5 text-gold font-semibold bg-gold/10 px-3 py-1 rounded-full"><Award className="w-4 h-4" /> {formatNumber(creator.chefCoinsEarned)} ChefCoins Earned</div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 pt-6 border-t border-muted-cream/30 mt-6">
              <div>
                <span className="block text-2xl font-bold text-charcoal">{formatNumber(creator.followers)}</span>
                <span className="text-xs text-soft-charcoal uppercase tracking-wider">Followers</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-charcoal">{formatNumber(creator.following)}</span>
                <span className="text-xs text-soft-charcoal uppercase tracking-wider">Following</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-charcoal">{formatNumber(creator.recipes)}</span>
                <span className="text-xs text-soft-charcoal uppercase tracking-wider">Recipes</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-charcoal">{formatNumber(creator.videos)}</span>
                <span className="text-xs text-soft-charcoal uppercase tracking-wider">Videos</span>
              </div>
              <div className="hidden md:block">
                <span className="block text-2xl font-bold text-charcoal">{formatNumber(creator.impressions)}</span>
                <span className="text-xs text-soft-charcoal uppercase tracking-wider">Impressions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-16 z-20 bg-warm-ivory/80 backdrop-blur-md border-b border-muted-cream/30 shadow-sm">
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
                    "flex items-center gap-2 px-6 py-5 text-sm font-semibold transition-colors relative whitespace-nowrap uppercase tracking-wider",
                    isActive ? "text-deep-red" : "text-soft-charcoal hover:text-charcoal"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {isActive && (
                    <motion.div 
                      layoutId="creatorTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-deep-red"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <section className="section-padding max-container px-4" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
        >
          {activeTab === 'recipes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {creatorRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}

          {activeTab !== 'recipes' && (
            <div className="py-32 text-center bg-white rounded-3xl border border-muted-cream/20 shadow-sm">
              <div className="w-24 h-24 bg-muted-cream/20 rounded-full flex items-center justify-center mx-auto mb-6 text-soft-charcoal">
                {React.createElement(TABS.find(t => t.id === activeTab).icon, { size: 40 })}
              </div>
              <h2 className="text-2xl font-serif text-charcoal mb-3">No {activeTab} yet</h2>
              <p className="text-soft-charcoal max-w-md mx-auto">This creator hasn't published any {activeTab} yet. Check back soon for new content!</p>
            </div>
          )}
        </motion.div>
      </section>
    </motion.div>
  );
}

// Internal Recipe Card
function RecipeCard({ recipe }) {
  if (!recipe) return null;
  return (
    <motion.div variants={staggerItem} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-muted-cream/20">
      <div className="relative h-56 overflow-hidden">
        <img src={recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2.5 rounded-full shadow-lg text-charcoal hover:text-deep-red transition-colors cursor-pointer z-10">
          <Bookmark className="w-5 h-5" />
        </div>
        {recipe.isPremium && (
          <div className="absolute top-4 left-4 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 z-10">
            <Star className="w-3 h-3 fill-white" /> Premium
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl text-charcoal line-clamp-1 mb-2 group-hover:text-deep-red transition-colors">{recipe.title || 'Delicious Recipe'}</h3>
        <div className="flex items-center gap-4 text-sm text-soft-charcoal mb-5">
          <span className="flex items-center gap-1 bg-warm-ivory px-2 py-1 rounded-md"><Star className="w-4 h-4 text-gold fill-gold" /> {recipe.rating || '4.8'}</span>
          <span className="bg-warm-ivory px-2 py-1 rounded-md">{recipe.time || '45 mins'}</span>
          <span className="bg-warm-ivory px-2 py-1 rounded-md">{recipe.difficulty || 'Medium'}</span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-muted-cream/30">
          <div className="flex items-center gap-2 text-soft-charcoal hover:text-deep-red transition-colors cursor-pointer">
            <Heart className="w-5 h-5" />
            <span className="font-medium">{formatNumber(recipe.likes || 120)}</span>
          </div>
          <Link to={`/recipes/${recipe.id}`} className="text-sm font-bold text-deep-red hover:text-dark-burgundy transition-colors flex items-center gap-1 uppercase tracking-wide">
            View Recipe
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
