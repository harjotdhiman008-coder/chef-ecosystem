import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, Eye } from 'lucide-react';
import { cn, timeAgo } from '../../utils/helpers';

const PostCard = ({ post, onLike, isLiked, onSave, isSaved, className }) => {
  const {
    id, creatorId, creatorName, creatorAvatar, creatorLevel, creatorBadge,
    type, content, image, recipeId, likes, comments, shares, saves, views,
    chefCoinsEarned, timestamp, hashtags
  } = post;

  const renderContent = () => {
    if (!content) return null;
    let text = content;
    if (hashtags && hashtags.length > 0) {
      hashtags.forEach(tag => {
        const regex = new RegExp(`(#${tag})`, 'gi');
        text = text.replace(regex, '<span class="text-deep-red font-medium">$1</span>');
      });
    }
    return <p className="text-charcoal/90 text-sm whitespace-pre-wrap mb-3" dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <div className={cn('bg-white rounded-2xl p-5 shadow-sm mb-4', className)}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <img src={creatorAvatar || 'https://i.pravatar.cc/150'} alt={creatorName} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-semibold text-charcoal">{creatorName}</h4>
              {creatorBadge && <span className="text-lg" title={creatorBadge}>{creatorBadge}</span>}
              <span className="text-xs bg-cream px-1.5 py-0.5 rounded text-charcoal/70">Lvl {creatorLevel}</span>
            </div>
            <p className="text-xs text-charcoal/50">{timeAgo ? timeAgo(timestamp) : timestamp}</p>
          </div>
        </div>
        
        {type && (
          <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full capitalize">
            {type}
          </span>
        )}
      </div>

      {renderContent()}

      {image && (
        <div className="rounded-xl overflow-hidden mb-4 max-h-96">
          <img src={image} alt="Post content" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex items-center justify-between border-t border-gray-50 pt-3">
        <div className="flex items-center gap-6">
          <button
            onClick={() => onLike?.(id)}
            className="flex items-center gap-1.5 text-charcoal/60 hover:text-deep-red transition-colors group"
          >
            <motion.div whileTap={{ scale: 0.8 }} animate={isLiked ? { scale: [1, 1.2, 1] } : {}}>
              <Heart className={cn("w-5 h-5", isLiked && "fill-deep-red text-deep-red")} />
            </motion.div>
            <span className="text-sm font-medium">{likes}</span>
          </button>
          
          <button className="flex items-center gap-1.5 text-charcoal/60 hover:text-charcoal transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{comments}</span>
          </button>
          
          <button className="flex items-center gap-1.5 text-charcoal/60 hover:text-charcoal transition-colors">
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-medium">{shares}</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          {chefCoinsEarned > 0 && (
            <span className="text-xs font-semibold bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md flex items-center gap-1">
              👨‍🍳 +{chefCoinsEarned}
            </span>
          )}
          
          <button
            onClick={() => onSave?.(id)}
            className="text-charcoal/50 hover:text-deep-red transition-colors"
          >
            <Bookmark className={cn("w-5 h-5", isSaved && "fill-deep-red text-deep-red")} />
          </button>
          
          <div className="flex items-center gap-1.5 text-charcoal/40 text-sm ml-2">
            <Eye className="w-4 h-4" />
            <span>{views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
