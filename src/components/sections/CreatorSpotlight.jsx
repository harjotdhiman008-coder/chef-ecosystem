import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Award, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { formatNumber } from '../../utils/helpers';

const FEATURED_CREATORS = [
  {
    id: 'creator-1', name: 'Chef Priya', username: '@chefpriya', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format',
    bio: 'Cooking recipes passed down through three generations.', level: 6, levelName: 'Master Creator',
    chefCoins: 8420, followers: 45200, recipesCount: 128, rating: 4.9, verified: true,
    specialties: ['North Indian', 'South Indian', 'Desserts'],
    featured: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&auto=format&q=80',
  },
  {
    id: 'creator-3', name: 'Sakura Kitchen', username: '@sakurakitchen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format',
    bio: 'Bringing authentic Japanese flavors to your kitchen.', level: 5, levelName: 'Community Chef',
    chefCoins: 5640, followers: 32100, recipesCount: 87, rating: 4.8, verified: true,
    specialties: ['Japanese', 'Korean', 'Asian'],
    featured: 'https://images.unsplash.com/photo-1553621042-f16356401f0d?w=400&h=300&fit=crop&auto=format&q=80',
  },
  {
    id: 'creator-4', name: 'Marco DeLuca', username: '@marcodeluca', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format',
    bio: 'From Rome with love. Authentic Italian, always from scratch.', level: 5, levelName: 'Community Chef',
    chefCoins: 4890, followers: 28400, recipesCount: 96, rating: 4.8, verified: true,
    specialties: ['Italian', 'Mediterranean', 'French'],
    featured: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=400&h=300&fit=crop&auto=format&q=80',
  },
  {
    id: 'creator-5', name: 'Zara Patel', username: '@zarapatel', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format',
    bio: 'Making healthy food exciting. High-protein, low-effort.', level: 4, levelName: 'Food Creator',
    chefCoins: 3200, followers: 19800, recipesCount: 64, rating: 4.7, verified: false,
    specialties: ['Healthy', 'High Protein', 'Vegan'],
    featured: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&auto=format&q=80',
  },
];

function CreatorSpotCard({ creator, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/creator/${creator.id}`} className="group block">
        <div className={`relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}>
          {/* Featured image */}
          <div className={`relative overflow-hidden ${index === 0 ? 'h-[240px] sm:h-[320px]' : 'h-[200px]'}`}>
            <img src={creator.featured} alt={`${creator.name}'s cuisine`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Creator info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={creator.avatar} alt={creator.name} className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                  {creator.verified && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-gold rounded-full flex items-center justify-center border-2 border-white">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg leading-tight flex items-center gap-1.5">
                    {creator.name}
                  </h3>
                  <p className="text-white/60 text-sm">{creator.username}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-charcoal/60 text-sm line-clamp-2 mb-3">{creator.bio}</p>

            {/* Specialties */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {creator.specialties.slice(0, 3).map((s) => (
                <span key={s} className="px-2 py-0.5 rounded-full text-xs bg-cream text-charcoal/70 font-medium">
                  {s}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-charcoal/50 pt-3 border-t border-cream">
              <span className="font-semibold text-charcoal">{formatNumber(creator.followers)} followers</span>
              <span>{creator.recipesCount} recipes</span>
              <span className="flex items-center gap-0.5 ml-auto">
                <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                <span className="font-semibold text-charcoal">{creator.rating}</span>
              </span>
            </div>

            {/* Level */}
            <div className="flex items-center gap-1.5 mt-2 text-xs text-gold font-medium">
              <Award className="w-3.5 h-3.5" />
              {creator.levelName}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CreatorSpotlight() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-charcoal overflow-hidden">
      <div className="section-padding max-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-end justify-between mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-gold" />
                <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                  Creator Spotlight
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
                Meet the creators
              </h2>
              <p className="text-white/40 mt-2 text-lg">
                The people making the food world more delicious.
              </p>
            </div>
            <Link
              to="/discover"
              className="hidden sm:inline-flex items-center gap-2 text-gold font-semibold hover:text-yellow-400 transition-colors group"
            >
              See all creators
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Creator grid - asymmetric layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURED_CREATORS.map((creator, idx) => (
              <div key={creator.id} className={idx === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-1' : ''}>
                <CreatorSpotCard creator={creator} index={idx} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
