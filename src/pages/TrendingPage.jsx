import React from 'react';
import { motion } from 'framer-motion';
import { Flame, TrendingUp, Hash, Users, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatNumber } from '../utils/helpers';
import useScrollReveal from '../hooks/useScrollReveal';
import { fadeInUp, staggerContainer, pageTransition } from '../utils/animations';

const TRENDING_TAGS = [
  { tag: 'PastaTok', count: 12400 },
  { tag: 'SundayBiryani', count: 8200 },
  { tag: 'VeganBaking', count: 5400 },
  { tag: 'MealPrep', count: 15600 },
  { tag: 'SourdoughFail', count: 3200 },
  { tag: 'ChefLife', count: 9100 },
  { tag: 'AirFryerRecipes', count: 21000 },
];

export default function TrendingPage() {
  const [ref, controls] = useScrollReveal();

  return (
    <motion.div 
      className="min-h-screen bg-cream pb-20 pt-24"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <div className="max-container px-4 mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal">What's Cooking</h1>
            <p className="text-lg text-soft-charcoal mt-1">The hottest trends, recipes, and discussions right now.</p>
          </div>
        </motion.div>
      </div>

      <div className="max-container px-4 space-y-16" ref={ref}>
        <motion.div variants={staggerContainer} initial="hidden" animate={controls}>
          
          {/* Trending Hashtags */}
          <motion.section variants={fadeInUp} className="bg-warm-ivory rounded-3xl p-8 border border-muted-cream/30 shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-6 flex items-center gap-2">
              <Hash className="w-6 h-6 text-deep-red" /> Trending Topics
            </h2>
            <div className="flex flex-wrap gap-3">
              {TRENDING_TAGS.map((t, i) => (
                <Link key={i} to={`/search?q=%23${t.tag}`} className="bg-white border border-muted-cream hover:border-deep-red px-5 py-3 rounded-full flex items-center gap-2 group transition-colors shadow-sm">
                  <span className="font-bold text-charcoal group-hover:text-deep-red transition-colors">#{t.tag}</span>
                  <span className="text-xs text-soft-charcoal bg-muted-cream/20 px-2 py-0.5 rounded-full">{formatNumber(t.count)} posts</span>
                </Link>
              ))}
            </div>
          </motion.section>

          {/* Trending Creators (Mock) */}
          <motion.section variants={fadeInUp}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold text-charcoal flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-deep-red" /> Rising Chefs
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white p-6 rounded-3xl text-center card-hover border border-muted-cream/20 shadow-sm">
                  <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=150`} alt="Chef" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-warm-ivory shadow-md" />
                  <h3 className="font-bold text-charcoal">Chef Name {i}</h3>
                  <p className="text-sm text-soft-charcoal mb-4">@chefname{i}</p>
                  <button className="w-full btn-secondary py-2 text-sm">Follow</button>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Hot Discussions (Mock) */}
          <motion.section variants={fadeInUp} className="bg-charcoal text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-deep-red/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <h2 className="text-2xl font-serif font-bold mb-8 flex items-center gap-2 relative z-10 text-warm-ivory">
              <MessageSquare className="w-6 h-6 text-gold" /> Hot Cook Threads
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white/10 backdrop-blur border border-white/20 p-6 rounded-2xl hover:bg-white/15 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">C</div>
                    <span className="text-sm font-medium text-muted-cream">r/BakingSecrets</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Why does my sourdough always come out flat? Help!</h3>
                  <p className="text-white/70 text-sm line-clamp-2 mb-4">I've been feeding my starter daily, keeping it at 78F, and following the tartine method perfectly but...</p>
                  <div className="flex items-center gap-4 text-xs font-bold text-gold">
                    <span>{124 * i} Replies</span>
                    <span>•</span>
                    <span>Active Now</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

        </motion.div>
      </div>
    </motion.div>
  );
}
