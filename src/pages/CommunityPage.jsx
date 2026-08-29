import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Users, Info, MessageSquare, Award, BookOpen, Share2, Plus, ShieldCheck } from 'lucide-react';
import { cn } from '../utils/helpers';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const mockCommunity = {
  id: '1',
  name: 'Sourdough Bakers',
  description: 'A community for sourdough enthusiasts to share tips, starters, and recipes. Whether you are a beginner or a seasoned pro, join us to perfect your crumb!',
  members: 1240,
  category: 'Baking',
  cover: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=400&fit=crop',
  icon: '🍞',
  created: 'Jan 2023',
  rules: [
    'Be kind and respectful to all bakers.',
    'Share your recipes when posting pictures of bread.',
    'No self-promotion without contributing.'
  ]
};

const mockPosts = [
  { id: 1, author: 'Alice M.', avatar: 'https://i.pravatar.cc/150?u=a', content: 'Just fed my starter "Dough Exotic". Look at those bubbles!', time: '2 hours ago', likes: 45, comments: 12, image: 'https://images.unsplash.com/photo-1589367920969-18341cc05221?w=400&h=300&fit=crop' },
  { id: 2, author: 'Chef Bob', avatar: 'https://i.pravatar.cc/150?u=b', content: 'What hydration is everyone using for their weekly loaf?', time: '5 hours ago', likes: 21, comments: 34 }
];

export default function CommunityPage() {
  const { communityId } = useParams();
  const [activeTab, setActiveTab] = useState('posts');
  const [isJoined, setIsJoined] = useState(false);

  const tabs = [
    { id: 'posts', label: 'Discussions', icon: MessageSquare },
    { id: 'recipes', label: 'Recipes', icon: BookOpen },
    { id: 'challenges', label: 'Challenges', icon: Award },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'about', label: 'About', icon: Info }
  ];

  return (
    <div className="bg-cream min-h-screen font-sans pb-20">
      {/* Hero Header */}
      <div className="relative h-64 md:h-80 w-full">
        <img src={mockCommunity.cover} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-container section-padding pb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl flex items-center justify-center text-5xl md:text-6xl shadow-xl border-4 border-white z-10 -mb-4">
                  {mockCommunity.icon}
                </div>
                <div className="text-white pb-2">
                  <span className="bg-deep-red/90 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block uppercase tracking-wider">{mockCommunity.category}</span>
                  <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">{mockCommunity.name}</h1>
                  <p className="text-warm-ivory flex items-center gap-2">
                    <Users className="w-4 h-4" /> {mockCommunity.members.toLocaleString()} members
                  </p>
                </div>
              </div>
              <div className="flex gap-3 pb-2 z-10">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-xl text-white transition">
                  <Share2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsJoined(!isJoined)}
                  className={cn(
                    "px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2",
                    isJoined ? "bg-white text-charcoal border border-gray-200" : "bg-deep-red text-white hover:bg-dark-burgundy"
                  )}
                >
                  {isJoined ? "Joined" : <><Plus className="w-5 h-5" /> Join Community</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-container section-padding mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex overflow-x-auto gap-2 border-b border-muted-cream pb-px mb-8 scrollbar-hide">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap",
                      activeTab === tab.id 
                        ? "border-deep-red text-deep-red" 
                        : "border-transparent text-soft-charcoal hover:text-charcoal hover:border-gray-300"
                    )}
                  >
                    <Icon className="w-4 h-4" /> {tab.label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'posts' && (
                <motion.div key="posts" variants={staggerContainer} initial="hidden" animate="visible" exit={{ opacity: 0 }}>
                  
                  {/* Create Post Input */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-muted-cream mb-8 flex gap-4 items-start">
                    <img src="https://i.pravatar.cc/150?u=user" alt="You" className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <input type="text" placeholder="Share something with the community..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-deep-red focus-ring" />
                      <div className="flex justify-end mt-3">
                        <button className="bg-charcoal text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-black transition">Post</button>
                      </div>
                    </div>
                  </div>

                  {mockPosts.map(post => (
                    <motion.div key={post.id} variants={staggerItem} className="bg-white p-6 rounded-2xl shadow-sm border border-muted-cream mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="font-bold text-charcoal">{post.author}</div>
                          <div className="text-xs text-gray-500">{post.time}</div>
                        </div>
                      </div>
                      <p className="text-soft-charcoal mb-4">{post.content}</p>
                      {post.image && (
                        <div className="mb-4 rounded-xl overflow-hidden max-h-96">
                          <img src={post.image} alt="Post attachment" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex gap-6 text-sm text-gray-500 font-medium pt-4 border-t border-gray-100">
                        <button className="flex items-center gap-2 hover:text-deep-red transition"><Award className="w-4 h-4" /> {post.likes} Likes</button>
                        <button className="flex items-center gap-2 hover:text-charcoal transition"><MessageSquare className="w-4 h-4" /> {post.comments} Comments</button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'about' && (
                <motion.div key="about" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white p-8 rounded-2xl shadow-sm border border-muted-cream">
                  <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">About {mockCommunity.name}</h2>
                  <p className="text-soft-charcoal leading-relaxed mb-8">{mockCommunity.description}</p>
                  
                  <h3 className="text-lg font-bold text-charcoal flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-5 h-5 text-deep-red" /> Community Rules
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {mockCommunity.rules.map((rule, idx) => (
                      <li key={idx} className="flex gap-3 text-soft-charcoal bg-gray-50 p-4 rounded-xl">
                        <span className="font-bold text-deep-red">{idx + 1}.</span> {rule}
                      </li>
                    ))}
                  </ul>

                  <div className="text-sm text-gray-500 flex gap-4 pt-6 border-t border-gray-100">
                    <span>Created {mockCommunity.created}</span>
                    <span>•</span>
                    <span>{mockCommunity.members.toLocaleString()} Members</span>
                  </div>
                </motion.div>
              )}

              {/* Other tabs would follow similar pattern... */}
              {['recipes', 'challenges', 'members'].includes(activeTab) && (
                <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-20 bg-white rounded-2xl border border-muted-cream shadow-sm">
                  <h3 className="text-xl font-serif text-charcoal mb-2">Content coming soon!</h3>
                  <p className="text-soft-charcoal">This section is being prepared for you.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 hidden lg:block space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-muted-cream">
              <h3 className="font-bold text-charcoal mb-2">About Us</h3>
              <p className="text-sm text-soft-charcoal mb-4 line-clamp-3">{mockCommunity.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Users className="w-4 h-4" /> {mockCommunity.members} Members
              </div>
              <button 
                onClick={() => setActiveTab('about')}
                className="w-full text-center text-sm font-semibold text-deep-red hover:bg-red-50 py-2 rounded-lg transition"
              >
                Read full rules
              </button>
            </div>

            <div className="bg-gradient-to-br from-gold to-yellow-500 p-6 rounded-2xl text-white shadow-md">
              <Award className="w-8 h-8 mb-3" />
              <h3 className="font-bold mb-2">Weekly Challenge</h3>
              <p className="text-sm mb-4 text-white/90">Show us your best 80% hydration whole wheat loaf.</p>
              <button className="bg-white text-yellow-600 font-bold text-sm px-4 py-2 rounded-lg w-full">Join Challenge</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
