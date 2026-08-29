import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Heart, MessageCircle, Share2, Bookmark, 
  Image as ImageIcon, Video, Smile, Hash, 
  TrendingUp, Award, MoreHorizontal, ChefHat, PlayCircle
} from 'lucide-react';
import { pageTransition, staggerContainer, staggerItem } from '../utils/animations';
import { cn, formatNumber, timeAgo } from '../utils/helpers';

import { posts as importedPosts } from '../data/posts';

const fallbackPosts = [
  {
    id: 'p-1',
    type: 'video',
    creator: { name: 'Chef Priya', handle: 'chefpriya', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=80', badge: 'Pro' },
    content: 'Just perfected my 24-hour slow cooked Dal Makhani with the dhungar (charcoal smoke) technique! Look at that velvet texture! 🍲✨ #DalMakhani #DhabaStyle #IndianFood',
    media: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    likes: 12400, comments: 342, shares: 120, saves: 890, coins: 50,
    timestamp: '2 hours ago',
    hashtags: ['DalMakhani', 'DhabaStyle', 'PureVegetarian']
  },
  {
    id: 'p-2',
    type: 'recipe',
    creator: { name: 'Marcus Chen', handle: 'marcuskitchen', avatar: 'https://i.pravatar.cc/150?u=marcus', badge: 'Creator' },
    content: 'My secret to the crispiest Tandoori Malai Paneer Tikka. The trick is double-roasting the besan and mustard oil before marinating! Full recipe linked below. 🧀🔥',
    media: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?auto=format&fit=crop&w=800&q=80',
    recipeInfo: { title: 'Ultimate Tandoori Paneer Tikka', time: '30m prep', rating: 4.9 },
    likes: 8900, comments: 215, shares: 450, saves: 3200, coins: 120,
    timestamp: '5 hours ago',
    hashtags: ['PaneerTikka', 'Tandoori', 'Vegetarian']
  },
  {
    id: 'p-3',
    type: 'tip',
    creator: { name: 'Preethi Reddy', handle: 'preethireddy', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format&q=80' },
    content: 'South Indian Dosa Tip: Add 1 teaspoon of fenugreek (methi) seeds and 2 tablespoons of soaked chana dal while grinding urad dal for that deep golden hotel-style crispness! 🥞🥥',
    likes: 4500, comments: 120, shares: 890, saves: 1500, coins: 10,
    timestamp: '8 hours ago',
    hashtags: ['DosaSecrets', 'SouthIndianCooking', 'KitchenTips']
  }
];

const posts = importedPosts.length > 0 ? importedPosts : fallbackPosts;
const tabs = ['All', 'Recipes', 'Videos', 'Tips', 'Experiments', 'Reviews'];

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());

  const handleLike = (id) => {
    const newSet = new Set(likedPosts);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setLikedPosts(newSet);
  };

  const handleSave = (id) => {
    const newSet = new Set(savedPosts);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSavedPosts(newSet);
  };

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Videos' && post.type === 'video') return true;
    if (activeTab === 'Recipes' && post.type === 'recipe') return true;
    if (activeTab === 'Tips' && post.type === 'tip') return true;
    return false;
  });

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit" className="bg-cream min-h-screen pb-20 pt-24">
      <div className="max-container flex gap-8">
        {/* Main Feed */}
        <div className="flex-1 max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-4xl text-dark-burgundy mb-2">The Table</h1>
            <p className="text-soft-charcoal">See what the world is cooking.</p>
          </div>

          {/* Create Post Box */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-soft-charcoal/5">
            <div className="flex gap-4">
              <img src="https://i.pravatar.cc/150?u=current" alt="You" className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="What's cooking?" 
                  className="w-full bg-soft-charcoal/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50 text-charcoal"
                />
                <div className="flex justify-between items-center mt-4 border-t border-soft-charcoal/5 pt-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-soft-charcoal hover:bg-soft-charcoal/5 rounded-full transition-colors flex items-center gap-2"><ImageIcon className="w-5 h-5 text-blue-500"/><span className="hidden sm:inline text-sm">Photo</span></button>
                    <button className="p-2 text-soft-charcoal hover:bg-soft-charcoal/5 rounded-full transition-colors flex items-center gap-2"><Video className="w-5 h-5 text-red-500"/><span className="hidden sm:inline text-sm">Video</span></button>
                    <button className="p-2 text-soft-charcoal hover:bg-soft-charcoal/5 rounded-full transition-colors flex items-center gap-2"><ChefHat className="w-5 h-5 text-gold"/><span className="hidden sm:inline text-sm">Recipe</span></button>
                  </div>
                  <button className="bg-dark-burgundy text-white px-6 py-2 rounded-full font-medium hover:bg-charcoal transition-colors">Post</button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
            {tabs.map(tab => (
              <button 
                key={tab} onClick={() => setActiveTab(tab)}
                className={cn("px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors", activeTab === tab ? "bg-charcoal text-white" : "bg-white text-soft-charcoal hover:bg-soft-charcoal/5 border border-soft-charcoal/10")}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {filteredPosts.map(post => (
              <motion.div key={post.id} variants={staggerItem} className="bg-white rounded-2xl shadow-sm border border-soft-charcoal/5 overflow-hidden">
                <div className="p-5 flex justify-between items-start">
                  <Link to={`/creator/${post.creator.handle}`} className="flex gap-3 items-center group">
                    <img src={post.creator.avatar} alt={post.creator.name} className="w-12 h-12 rounded-full group-hover:ring-2 ring-gold transition-all" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-charcoal group-hover:text-dark-burgundy">{post.creator.name}</span>
                        {post.creator.badge && <span className="bg-gold/20 text-gold-dark text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">{post.creator.badge}</span>}
                      </div>
                      <div className="text-sm text-soft-charcoal/70">{post.timestamp}</div>
                    </div>
                  </Link>
                  <button className="p-2 text-soft-charcoal hover:bg-soft-charcoal/5 rounded-full"><MoreHorizontal className="w-5 h-5" /></button>
                </div>

                <div className="px-5 pb-3">
                  <p className="text-charcoal whitespace-pre-wrap">{post.content}</p>
                </div>

                {post.media && (
                  <div className="relative w-full max-h-[500px] bg-black">
                    <img src={post.media} alt="Post media" className="w-full h-full object-cover max-h-[500px]" />
                    {post.type === 'video' && <div className="absolute inset-0 flex items-center justify-center"><PlayCircle className="w-16 h-16 text-white drop-shadow-lg opacity-80" /></div>}
                  </div>
                )}

                {post.recipeInfo && (
                  <div className="mx-5 my-4 p-4 border border-gold/30 bg-gold/5 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-gold/20 p-2 rounded-lg text-gold"><ChefHat className="w-6 h-6" /></div>
                      <div>
                        <div className="font-bold text-charcoal">{post.recipeInfo.title}</div>
                        <div className="text-sm text-soft-charcoal">Recipe • {post.recipeInfo.time}</div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-dark-burgundy text-white rounded-lg text-sm font-medium">View Recipe</button>
                  </div>
                )}

                <div className="p-5 border-t border-soft-charcoal/5 flex justify-between items-center">
                  <div className="flex gap-6">
                    <button onClick={() => handleLike(post.id)} className={cn("flex items-center gap-2 transition-colors", likedPosts.has(post.id) ? "text-red-500" : "text-soft-charcoal hover:text-red-500")}>
                      <Heart className={cn("w-6 h-6", likedPosts.has(post.id) && "fill-current")} /> 
                      <span className="font-medium">{formatNumber(post.likes + (likedPosts.has(post.id) ? 1 : 0))}</span>
                    </button>
                    <button className="flex items-center gap-2 text-soft-charcoal hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-6 h-6" /> <span className="font-medium">{formatNumber(post.comments)}</span>
                    </button>
                    <button className="flex items-center gap-2 text-soft-charcoal hover:text-green-500 transition-colors">
                      <Share2 className="w-6 h-6" /> <span className="font-medium">{formatNumber(post.shares)}</span>
                    </button>
                  </div>
                  <div className="flex gap-4 items-center">
                    {post.coins > 0 && <div className="flex items-center gap-1 text-gold bg-gold/10 px-3 py-1 rounded-full"><Award className="w-4 h-4"/> <span className="text-sm font-bold">+{post.coins}</span></div>}
                    <button onClick={() => handleSave(post.id)} className={cn("transition-colors", savedPosts.has(post.id) ? "text-dark-burgundy" : "text-soft-charcoal hover:text-dark-burgundy")}>
                      <Bookmark className={cn("w-6 h-6", savedPosts.has(post.id) && "fill-current")} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-80 sticky top-24 h-[calc(100vh-6rem)]">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-soft-charcoal/5 mb-6">
            <h3 className="font-serif text-xl text-dark-burgundy mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5"/> Trending Tags</h3>
            <div className="space-y-4">
              {['#sourdough', '#veganuary', '#mealprep', '#quickdinners', '#bakingtips'].map((tag, i) => (
                <div key={tag} className="flex justify-between items-center group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-soft-charcoal/5 flex items-center justify-center text-soft-charcoal font-bold">{i+1}</div>
                    <span className="font-medium text-charcoal group-hover:text-gold transition-colors">{tag}</span>
                  </div>
                  <span className="text-xs text-soft-charcoal">{(10 - i).toFixed(1)}k posts</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-soft-charcoal/5">
            <h3 className="font-serif text-xl text-dark-burgundy mb-4">Suggested Creators</h3>
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={`https://i.pravatar.cc/150?u=s${i}`} alt="Creator" className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="font-medium text-sm text-charcoal">Chef User {i}</div>
                      <div className="text-xs text-soft-charcoal">Master Chef</div>
                    </div>
                  </div>
                  <button className="text-sm font-bold text-dark-burgundy bg-dark-burgundy/10 px-3 py-1 rounded-full hover:bg-dark-burgundy hover:text-white transition-colors">Follow</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
