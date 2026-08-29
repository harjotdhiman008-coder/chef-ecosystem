import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, Check } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { formatNumber } from '../../utils/helpers';

const COMMUNITIES = [
  { id: 'comm-1', name: 'Midnight Bakers', icon: '🌙', description: 'For those who find peace in late-night baking sessions.', coverImage: 'https://images.unsplash.com/photo-1486427944544-d2c246c4df14?w=400&h=200&fit=crop&auto=format&q=80', members: 12400, category: 'Baking', recentActivity: '5 new posts today' },
  { id: 'comm-2', name: 'South Indian Home Chefs', icon: '🍛', description: 'Authentic recipes from kitchens across South India.', coverImage: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=200&fit=crop&auto=format&q=80', members: 8800, category: 'Regional', recentActivity: '12 new posts today' },
  { id: 'comm-3', name: 'Pasta Lovers', icon: '🍝', description: 'From fresh pasta to creative sauces — all things pasta.', coverImage: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=200&fit=crop&auto=format&q=80', members: 23200, category: 'Cuisine', recentActivity: '8 new posts today' },
  { id: 'comm-4', name: 'High Protein Kitchen', icon: '💪', description: 'Delicious high-protein recipes for fitness enthusiasts.', coverImage: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=200&fit=crop&auto=format&q=80', members: 18100, category: 'Lifestyle', recentActivity: '15 new posts today' },
  { id: 'comm-5', name: 'Street Food Explorers', icon: '🌮', description: 'Discovering and recreating the world\'s best street food.', coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=200&fit=crop&auto=format&q=80', members: 31000, category: 'Discovery', recentActivity: '20 new posts today' },
  { id: 'comm-6', name: 'Ramen Society', icon: '🍜', description: 'Perfecting the art of ramen, one bowl at a time.', coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=200&fit=crop&auto=format&q=80', members: 14600, category: 'Cuisine', recentActivity: '6 new posts today' },
];

function CommunityPreviewCard({ community }) {
  const [joined, setJoined] = useState(false);

  return (
    <Link to={`/community/${community.id}`} className="scroll-item group">
      <motion.div
        className="w-[280px] sm:w-[300px] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -5 }}
      >
        {/* Cover */}
        <div className="relative h-[120px] overflow-hidden">
          <img src={community.coverImage} alt={community.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Icon */}
        <div className="relative -mt-6 ml-4">
          <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-2xl border border-cream">
            {community.icon}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pt-2">
          <h3 className="font-semibold text-charcoal text-base group-hover:text-deep-red transition-colors">
            {community.name}
          </h3>
          <p className="text-sm text-charcoal/50 mt-1 line-clamp-2">
            {community.description}
          </p>

          <div className="flex items-center gap-2 mt-3 text-xs text-charcoal/40">
            <Users className="w-3.5 h-3.5" />
            <span className="font-medium text-charcoal/60">{formatNumber(community.members)}</span>
            <span>members</span>
            <span className="ml-auto text-green-600">{community.recentActivity}</span>
          </div>

          {/* Join button */}
          <button
            onClick={(e) => { e.preventDefault(); setJoined(!joined); }}
            className={`w-full mt-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              joined
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-deep-red text-white hover:bg-dark-burgundy'
            }`}
          >
            {joined ? (
              <span className="flex items-center justify-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Joined
              </span>
            ) : (
              'Join Community'
            )}
          </button>
        </div>
      </motion.div>
    </Link>
  );
}

export default function CommunitiesShowcase() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-warm-ivory overflow-hidden">
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-container"
        >
          {/* Header */}
          <div className="flex items-end justify-between mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-deep-red" />
                <span className="text-deep-red text-sm font-semibold tracking-widest uppercase">
                  Food Communities
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal">
                Find your food circle
              </h2>
              <p className="text-charcoal/50 mt-2 text-lg">
                Your people are probably cooking somewhere.
              </p>
            </div>
            <Link
              to="/communities"
              className="hidden sm:inline-flex items-center gap-2 text-deep-red font-semibold hover:text-dark-burgundy transition-colors group"
            >
              All communities
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Horizontal scroll */}
        <div className="scroll-container -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 gap-5 max-container">
          {COMMUNITIES.map((community) => (
            <CommunityPreviewCard key={community.id} community={community} />
          ))}
        </div>
      </div>
    </section>
  );
}
