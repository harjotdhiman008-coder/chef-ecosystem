import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, MessageCircle, Share2, GitBranch, 
  Clock, ChefHat, ArrowLeft, MoreHorizontal,
  Camera, Utensils
} from 'lucide-react';
import { pageTransition, staggerContainer, staggerItem, fadeInUp } from '../utils/animations';
import { cn, formatNumber, timeAgo } from '../utils/helpers';

let importedThreads = [];
try {
  const data = require('../data/cookThreads');
  importedThreads = data.cookThreads || [];
} catch (e) {}

const fallbackThread = {
  id: 't-1',
  title: 'The Perfect Chocolate Chip Cookie',
  originalPost: {
    creator: { name: 'Sarah Baker', handle: 'sarahbakes', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    content: "I've finally nailed it. Brown butter is the absolute key, plus chilling the dough for 48 hours. Here's my base recipe, I'd love to see your variations!",
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
    recipe: 'Brown Butter CCC',
    timestamp: '3 days ago',
    likes: 1205,
    views: 15400
  },
  replies: [
    {
      id: 'r-1',
      creator: { name: 'Dave Cook', handle: 'davecooks', avatar: 'https://i.pravatar.cc/150?u=dave' },
      content: "I took your base and added toasted pecans and a sprinkle of flaky sea salt on top. The sweet/salty combo is insane! I also only chilled for 24h because I was impatient lol.",
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
      timestamp: '2 days ago',
      likes: 450,
      changes: ['Added Pecans', 'Added Sea Salt', '24h Chill']
    },
    {
      id: 'r-2',
      creator: { name: 'Vegan Eats', handle: 'veganeats', avatar: 'https://i.pravatar.cc/150?u=vegan' },
      content: "Veganized this! Subbed brown butter with vegan block butter (browned slightly) and used flax egg. Still incredibly chewy and delicious.",
      image: 'https://images.unsplash.com/photo-1615486171448-472e3ea722bc?auto=format&fit=crop&w=800&q=80',
      timestamp: '1 day ago',
      likes: 320,
      changes: ['Vegan Butter', 'Flax Egg']
    }
  ],
  stats: { variations: 12, totalLikes: 2500 }
};

export default function CookThreadPage() {
  const { threadId } = useParams();
  const thread = importedThreads.find(t => t.id === threadId) || fallbackThread;
  const [liked, setLiked] = useState(new Set());

  const toggleLike = (id) => {
    const newSet = new Set(liked);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setLiked(newSet);
  };

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit" className="bg-cream min-h-screen pb-20 pt-24">
      <div className="max-container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link to="/feed" className="inline-flex items-center gap-2 text-soft-charcoal hover:text-dark-burgundy font-medium transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" /> Back to Feed
          </Link>
          <div className="flex items-center gap-3 mb-2 text-gold font-medium">
            <GitBranch className="w-5 h-5" /> Cook Thread
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-dark-burgundy mb-4">{thread.title}</h1>
          <div className="flex gap-6 text-soft-charcoal text-sm font-medium">
            <span>{thread.stats.variations} Variations</span>
            <span>{formatNumber(thread.stats.totalLikes)} Total Likes</span>
            <span>{formatNumber(thread.originalPost.views)} Views</span>
          </div>
        </div>

        {/* Original Post */}
        <div className="bg-white rounded-3xl shadow-md border-2 border-gold/30 overflow-hidden mb-12 relative">
          <div className="absolute top-0 right-0 bg-gold text-white font-bold text-xs uppercase tracking-wider py-1 px-4 rounded-bl-xl">Original Recipe</div>
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <Link to={`/creator/${thread.originalPost.creator.handle}`} className="flex items-center gap-4 group">
                <img src={thread.originalPost.creator.avatar} alt={thread.originalPost.creator.name} className="w-14 h-14 rounded-full group-hover:ring-2 ring-gold transition-all" />
                <div>
                  <div className="font-bold text-xl text-charcoal group-hover:text-dark-burgundy">{thread.originalPost.creator.name}</div>
                  <div className="text-soft-charcoal">{thread.originalPost.timestamp}</div>
                </div>
              </Link>
              <button className="p-2 text-soft-charcoal hover:bg-soft-charcoal/10 rounded-full"><MoreHorizontal className="w-6 h-6" /></button>
            </div>
            
            <p className="text-xl text-charcoal leading-relaxed mb-6">{thread.originalPost.content}</p>
            
            {thread.originalPost.image && (
              <div className="rounded-2xl overflow-hidden mb-6 aspect-video bg-black/5">
                <img src={thread.originalPost.image} alt="Original dish" className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="flex items-center gap-4 bg-soft-charcoal/5 p-4 rounded-xl mb-6">
              <div className="bg-white p-3 rounded-lg shadow-sm text-dark-burgundy"><Utensils className="w-6 h-6" /></div>
              <div>
                <div className="text-sm text-soft-charcoal font-medium">Base Recipe</div>
                <div className="font-bold text-charcoal text-lg">{thread.originalPost.recipe}</div>
              </div>
              <button className="ml-auto bg-dark-burgundy text-white px-6 py-2 rounded-lg font-medium hover:bg-charcoal transition-colors">View Recipe</button>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-soft-charcoal/10">
              <div className="flex gap-6">
                <button onClick={() => toggleLike('orig')} className={cn("flex items-center gap-2 text-lg transition-colors", liked.has('orig') ? "text-red-500" : "text-soft-charcoal hover:text-red-500")}>
                  <Heart className={cn("w-6 h-6", liked.has('orig') && "fill-current")} /> {formatNumber(thread.originalPost.likes + (liked.has('orig') ? 1 : 0))}
                </button>
                <button className="flex items-center gap-2 text-lg text-soft-charcoal hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-6 h-6" /> Reply
                </button>
                <button className="flex items-center gap-2 text-lg text-soft-charcoal hover:text-green-500 transition-colors">
                  <Share2 className="w-6 h-6" /> Share
                </button>
              </div>
              <button className="bg-gold text-charcoal px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white border-2 border-transparent hover:border-gold transition-all shadow-md">
                <GitBranch className="w-5 h-5" /> Add Your Version
              </button>
            </div>
          </div>
        </div>

        {/* Thread Connector Line */}
        <div className="w-1 h-12 bg-gradient-to-b from-gold/50 to-soft-charcoal/20 ml-16 -mt-12 mb-2 relative z-0"></div>

        {/* Replies */}
        <div className="space-y-8 pl-4 md:pl-12">
          {thread.replies.map((reply, index) => (
            <div key={reply.id} className="relative">
              {/* Branch Line */}
              <div className="absolute -left-8 md:-left-12 top-10 w-8 md:w-12 h-px bg-soft-charcoal/20"></div>
              {index !== thread.replies.length - 1 && <div className="absolute -left-8 md:-left-12 top-10 bottom-[-32px] w-px bg-soft-charcoal/20"></div>}

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-soft-charcoal/5">
                <div className="flex justify-between items-start mb-4">
                  <Link to={`/creator/${reply.creator.handle}`} className="flex items-center gap-3">
                    <img src={reply.creator.avatar} alt={reply.creator.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="font-bold text-charcoal">{reply.creator.name}</div>
                      <div className="text-sm text-soft-charcoal">{reply.timestamp}</div>
                    </div>
                  </Link>
                </div>
                
                {reply.changes && reply.changes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {reply.changes.map(change => (
                      <span key={change} className="bg-blue-500/10 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/20 flex items-center gap-1">
                        <GitBranch className="w-3 h-3" /> {change}
                      </span>
                    ))}
                  </div>
                )}
                
                <p className="text-charcoal mb-4">{reply.content}</p>
                
                {reply.image && (
                  <div className="rounded-xl overflow-hidden mb-4">
                    <img src={reply.image} alt="Variation" className="w-full h-auto max-h-96 object-cover" />
                  </div>
                )}

                <div className="flex gap-6 pt-4 border-t border-soft-charcoal/5">
                  <button onClick={() => toggleLike(reply.id)} className={cn("flex items-center gap-1.5 transition-colors", liked.has(reply.id) ? "text-red-500" : "text-soft-charcoal hover:text-red-500")}>
                    <Heart className={cn("w-5 h-5", liked.has(reply.id) && "fill-current")} /> {reply.likes + (liked.has(reply.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 text-soft-charcoal hover:text-blue-500 transition-colors"><MessageCircle className="w-5 h-5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
