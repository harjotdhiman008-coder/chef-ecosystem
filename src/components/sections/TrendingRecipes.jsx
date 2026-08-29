import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Flame, Bookmark, Star, ArrowRight, Play, TrendingUp } from 'lucide-react';
import { staggerContainer, staggerItem } from '../../utils/animations';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { formatNumber } from '../../utils/helpers';

const TRENDING_RECIPES = [
  {
    id: 'recipe-1', name: 'Hyderabadi Dum Biryani', cuisine: 'North Indian', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f4?w=500&h=400&fit=crop&auto=format&q=80',
    totalTime: 90, calories: 650, protein: 34, rating: 4.9, saves: 15420, views: 89000, hasVideo: true,
    creatorName: 'Chef Priya', creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&auto=format',
    difficulty: 'hard', tags: ['#SundayBiryani', '#DumBiryani'],
  },
  {
    id: 'recipe-5', name: 'Dal Makhani (24-Hour Simmered)', cuisine: 'North Indian', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=400&fit=crop&auto=format&q=80',
    totalTime: 80, calories: 420, protein: 16, rating: 4.9, saves: 14200, views: 78000, hasVideo: true,
    creatorName: 'Ravi\'s Kitchen', creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&auto=format',
    difficulty: 'medium', tags: ['#DalMakhani', '#DhabaStyle'],
  },
  {
    id: 'recipe-6', name: 'Kashmiri Mutton Rogan Josh', cuisine: 'North Indian', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=400&fit=crop&auto=format&q=80',
    totalTime: 70, calories: 580, protein: 42, rating: 4.9, saves: 11500, views: 64000, hasVideo: true,
    creatorName: 'Chef Priya', creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&auto=format',
    difficulty: 'hard', tags: ['#RoganJosh', '#KashmiriFood'],
  },
  {
    id: 'recipe-7', name: 'Mumbai Chowpatty Pav Bhaji', cuisine: 'Street Food', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&h=400&fit=crop&auto=format&q=80',
    totalTime: 40, calories: 450, protein: 10, rating: 4.9, saves: 16800, views: 95000, hasVideo: true,
    creatorName: 'Ravi\'s Kitchen', creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&auto=format',
    difficulty: 'easy', tags: ['#PavBhaji', '#MumbaiStreetFood'],
  },
  {
    id: 'recipe-8', name: 'Kerala Malabar Prawn Curry', cuisine: 'South Indian', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=400&fit=crop&auto=format&q=80',
    totalTime: 35, calories: 380, protein: 28, rating: 4.8, saves: 8900, views: 48000, hasVideo: false,
    creatorName: 'Preethi Reddy', creatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format',
    difficulty: 'medium', tags: ['#KeralaPrawns', '#CoastalFood'],
  },
  {
    id: 'recipe-14', name: 'Amritsari Chole Bhature', cuisine: 'North Indian', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&h=400&fit=crop&auto=format&q=80',
    totalTime: 60, calories: 520, protein: 18, rating: 4.9, saves: 13900, views: 74000, hasVideo: true,
    creatorName: 'Ravi\'s Kitchen', creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&auto=format',
    difficulty: 'medium', tags: ['#CholeBhature', '#PunjabiDhaba'],
  },
];

const DIFFICULTY_COLORS = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-amber-100 text-amber-700',
  hard: 'bg-red-100 text-red-700',
};

function TrendingRecipeCard({ recipe, index }) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <Link to={`/recipe/${recipe.id}`}>
      <motion.div
        className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        whileHover={{ y: -5 }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${DIFFICULTY_COLORS[recipe.difficulty]}`}>
              {recipe.difficulty}
            </span>
            {index < 3 && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-deep-red text-white flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> #{index + 1}
              </span>
            )}
          </div>

          {/* Video indicator */}
          {recipe.hasVideo && (
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 text-charcoal fill-charcoal" />
            </div>
          )}

          {/* Save button */}
          <button
            onClick={(e) => { e.preventDefault(); setIsSaved(!isSaved); }}
            className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
            aria-label={isSaved ? 'Unsave recipe' : 'Save recipe'}
          >
            <Bookmark className={`w-4 h-4 transition-colors ${isSaved ? 'fill-deep-red text-deep-red' : 'text-charcoal'}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-deep-red font-semibold uppercase tracking-wider mb-1">
            {recipe.cuisine}
          </p>
          <h3 className="font-semibold text-charcoal text-base leading-snug mb-2 line-clamp-2 group-hover:text-deep-red transition-colors">
            {recipe.name}
          </h3>

          {/* Creator */}
          <div className="flex items-center gap-2 mb-3">
            <img src={recipe.creatorAvatar} alt={recipe.creatorName} className="w-5 h-5 rounded-full object-cover" />
            <span className="text-xs text-charcoal/60">{recipe.creatorName}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-charcoal/50">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {recipe.totalTime}m
            </span>
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> {recipe.calories} kcal
            </span>
            <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-medium">
              {recipe.protein}g protein
            </span>
          </div>

          {/* Rating & saves */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-cream">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              <span className="text-sm font-semibold text-charcoal">{recipe.rating}</span>
            </div>
            <span className="text-xs text-charcoal/40">
              {formatNumber(recipe.saves)} saves
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function TrendingRecipes() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-cream">
      <div className="section-padding max-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-end justify-between mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-deep-red" />
                <span className="text-deep-red text-sm font-semibold tracking-widest uppercase">
                  Trending
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal">
                What's Cooking
              </h2>
              <p className="text-charcoal/50 mt-2 text-lg">
                The most loved recipes this week.
              </p>
            </div>
            <Link
              to="/trending"
              className="hidden sm:inline-flex items-center gap-2 text-deep-red font-semibold hover:text-dark-burgundy transition-colors group"
            >
              See all
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Recipe grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRENDING_RECIPES.map((recipe, idx) => (
              <TrendingRecipeCard key={recipe.id} recipe={recipe} index={idx} />
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="sm:hidden mt-8 text-center">
            <Link
              to="/trending"
              className="inline-flex items-center gap-2 text-deep-red font-semibold"
            >
              See all trending
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
