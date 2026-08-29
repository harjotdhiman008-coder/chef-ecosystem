import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Settings, Edit3, Grid, Bookmark, Video, Users, ShoppingBag, Star, Award, MapPin, Link as LinkIcon, Calendar, Heart, MessageCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { formatNumber, cn, getChefLevel } from '../utils/helpers';
import useScrollReveal from '../hooks/useScrollReveal';
import { fadeInUp, staggerContainer, staggerItem, pageTransition } from '../utils/animations';
import { recipes } from '../data/recipes';

const TABS = [
  { id: 'recipes', label: 'Recipes', icon: Grid },
  { id: 'posts', label: 'Posts', icon: MessageCircle },
  { id: 'videos', label: 'Videos', icon: Video },
  { id: 'communities', label: 'Communities', icon: Users },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'achievements', label: 'Achievements', icon: Award },
];

export default function ProfilePage() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState('recipes');
  const [ref, controls] = useScrollReveal();
  
  // Fallback user if not in context
  const profileUser = user || {
    name: 'Alex Johnson',
    username: 'alexcooks',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
    bio: 'Self-taught home chef. Obsessed with pasta and sourdough. Creating recipes that bring people together.',
    level: 4,
    chefCoins: 1250,
    followers: 12400,
    following: 342,
    recipes: 45,
    posts: 128,
    location: 'San Francisco, CA',
    website: 'alexcooks.com',
    joined: 'Jan 2023'
  };

  const userRecipes = recipes?.slice(0, 4) || [];
  const savedRecipes = recipes?.slice(4, 8) || [];

  return (
    <motion.div 
      className="min-h-screen bg-cream pb-20"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {/* Profile Header */}
      <section className="bg-warm-ivory border-b border-muted-cream/30 pt-8 pb-12">
        <div className="max-container px-4">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src={profileUser.avatar} alt={profileUser.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border-2 border-white">
                Lvl {profileUser.level}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-serif text-charcoal font-bold">{profileUser.name}</h1>
                  <p className="text-soft-charcoal font-medium">@{profileUser.username}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="btn-secondary flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button className="p-3 bg-white text-charcoal rounded-xl shadow-sm hover:shadow-md transition-shadow border border-muted-cream/20">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <p className="text-charcoal max-w-2xl">{profileUser.bio}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-soft-charcoal">
                <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {profileUser.location}</div>
                <div className="flex items-center gap-1"><LinkIcon className="w-4 h-4" /> <a href={`https://${profileUser.website}`} className="text-deep-red hover:underline">{profileUser.website}</a></div>
                <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined {profileUser.joined}</div>
                <div className="flex items-center gap-1 text-gold font-semibold"><Award className="w-4 h-4" /> {formatNumber(profileUser.chefCoins)} ChefCoins</div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 pt-2">
                <div className="text-center">
                  <span className="block text-xl font-bold text-charcoal">{formatNumber(profileUser.followers)}</span>
                  <span className="text-xs text-soft-charcoal uppercase tracking-wider">Followers</span>
                </div>
                <div className="text-center">
                  <span className="block text-xl font-bold text-charcoal">{formatNumber(profileUser.following)}</span>
                  <span className="text-xs text-soft-charcoal uppercase tracking-wider">Following</span>
                </div>
                <div className="text-center">
                  <span className="block text-xl font-bold text-charcoal">{formatNumber(profileUser.recipes)}</span>
                  <span className="text-xs text-soft-charcoal uppercase tracking-wider">Recipes</span>
                </div>
                <div className="text-center">
                  <span className="block text-xl font-bold text-charcoal">{formatNumber(profileUser.posts)}</span>
                  <span className="text-xs text-soft-charcoal uppercase tracking-wider">Posts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-16 z-20 bg-warm-ivory/80 backdrop-blur-md border-b border-muted-cream/30">
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
                    "flex items-center gap-2 px-5 py-4 text-sm font-medium transition-colors relative whitespace-nowrap",
                    isActive ? "text-deep-red" : "text-soft-charcoal hover:text-charcoal"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {isActive && (
                    <motion.div 
                      layoutId="profileTabIndicator"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['First Recipe', '100 Likes', 'Community Builder', 'Master Baker', 'Trendsetter', 'Perfect Plating'].map((badge, i) => (
                <motion.div key={badge} variants={fadeInUp} className="bg-white p-6 rounded-2xl shadow-sm text-center card-hover flex flex-col items-center gap-3 border border-muted-cream/20">
                  <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-charcoal">{badge}</h3>
                  <p className="text-xs text-soft-charcoal">Unlocked {i + 1} months ago</p>
                </motion.div>
              ))}
            </div>
          )}
          
          {['posts', 'videos', 'communities', 'orders', 'reviews'].includes(activeTab) && (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-muted-cream/20 rounded-full flex items-center justify-center mx-auto mb-4 text-soft-charcoal">
                {React.createElement(TABS.find(t => t.id === activeTab).icon, { size: 32 })}
              </div>
              <h2 className="text-xl font-serif text-charcoal mb-2">No {activeTab} yet</h2>
              <p className="text-soft-charcoal">Check back later when {profileUser.name} adds more content.</p>
            </div>
          )}
        </motion.div>
      </section>
    </motion.div>
  );
}

// Simple internal recipe card
function RecipeCard({ recipe }) {
  if (!recipe) return null;
  return (
    <motion.div variants={staggerItem} className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover group border border-muted-cream/20">
      <div className="relative h-48 overflow-hidden">
        <img src={recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm text-charcoal hover:text-deep-red transition-colors cursor-pointer">
          <Bookmark className="w-4 h-4" />
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-charcoal line-clamp-1">{recipe.title || 'Delicious Recipe'}</h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-soft-charcoal mb-4">
          <span className="flex items-center gap-1"><Star className="w-4 h-4 text-gold fill-gold" /> {recipe.rating || '4.8'}</span>
          <span>{recipe.time || '45 mins'}</span>
          <span>{recipe.difficulty || 'Medium'}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-deep-red" />
            <span className="text-sm font-medium">{formatNumber(recipe.likes || 120)}</span>
          </div>
          <Link to={`/recipes/${recipe.id}`} className="text-sm font-medium text-deep-red hover:underline">View Recipe</Link>
        </div>
      </div>
    </motion.div>
  );
}
