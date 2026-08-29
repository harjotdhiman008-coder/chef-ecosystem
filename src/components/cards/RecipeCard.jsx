import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Flame, Bookmark, Play, Star } from 'lucide-react';
import { formatNumber, cn } from '../../utils/helpers';
import { DIFFICULTY_LABELS } from '../../utils/constants';
import { cardHover } from '../../utils/animations';

const RecipeCard = ({ recipe, size = 'md', onSave, isSaved, className }) => {
  const {
    id, name, cuisine, image, prepTime, totalTime, difficulty,
    calories, protein, carbs, fat, rating, saves,
    creatorName, creatorAvatar, hasVideo, views
  } = recipe;

  const difficultyColor = DIFFICULTY_LABELS?.[difficulty]?.color || 'bg-gray-100 text-gray-800';
  const difficultyLabel = DIFFICULTY_LABELS?.[difficulty]?.label || difficulty;

  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className={cn('bg-white rounded-2xl shadow-sm card-hover flex flex-col overflow-hidden', className)}
    >
      <Link to={`/recipe/${id}`} className="block flex-1 flex flex-col">
        <div className="relative aspect-[4/3] rounded-t-2xl overflow-hidden group">
          <motion.img
            src={image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop'}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded-full ${difficultyColor}`}>
            {difficultyLabel}
          </div>
          {hasVideo && (
            <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1.5 text-white backdrop-blur-sm">
              <Play className="w-4 h-4 fill-current" />
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              onSave?.(id);
            }}
            className="absolute bottom-2 right-2 bg-white/90 p-2 rounded-full text-charcoal hover:text-deep-red transition-colors shadow-sm"
          >
            <Bookmark className={cn('w-4 h-4', isSaved && 'fill-deep-red text-deep-red')} />
          </button>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <span className="text-xs text-charcoal/60 uppercase tracking-wider font-semibold mb-1">{cuisine}</span>
          <h3 className="font-semibold text-charcoal text-lg line-clamp-2 mb-2 flex-1">{name}</h3>
          
          <div className="flex items-center gap-2 mb-3">
            <img src={creatorAvatar || 'https://i.pravatar.cc/150'} alt={creatorName} className="w-5 h-5 rounded-full object-cover" />
            <span className="text-sm text-charcoal/80 truncate">{creatorName}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-charcoal/70 mb-3 bg-cream/30 p-2 rounded-lg">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{totalTime}m</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-3 h-3" />
              <span>{calories}kcal</span>
            </div>
            <div className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
              {protein}g p
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto border-t border-gray-100 pt-3">
            <div className="flex items-center gap-1 text-sm font-medium">
              <Star className="w-4 h-4 fill-gold text-gold" />
              <span>{rating?.toFixed(1) || '4.5'}</span>
            </div>
            <div className="text-sm text-charcoal/60">
              {formatNumber ? formatNumber(saves || 0) : saves} saves
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;
