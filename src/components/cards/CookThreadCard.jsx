import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Heart, Eye } from 'lucide-react';
import { cn } from '../../utils/helpers';

const CookThreadCard = ({ thread, className }) => {
  const {
    id, title, originalCreatorName, originalCreatorAvatar, image,
    cuisine, cookTime, replies, likes, comments, views, timestamp
  } = thread;

  return (
    <div className={cn('bg-white rounded-2xl shadow-sm card-hover flex flex-col overflow-hidden', className)}>
      <div className="h-32 w-full relative">
        <img
          src={image || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=400&fit=crop'}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 flex gap-2">
          {cuisine && <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[10px] text-white font-medium">{cuisine}</span>}
          {cookTime && <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[10px] text-white font-medium">{cookTime}</span>}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-charcoal text-lg line-clamp-2 mb-3">{title}</h3>
        
        <div className="flex items-center gap-2 mb-4">
          <img src={originalCreatorAvatar || 'https://i.pravatar.cc/150'} alt={originalCreatorName} className="w-6 h-6 rounded-full object-cover" />
          <span className="text-sm text-charcoal/80 font-medium">Started by {originalCreatorName}</span>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-charcoal/60 font-medium">
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" /> {comments}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" /> {likes}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> {views}
            </div>
          </div>

          <div className="flex items-center -space-x-2">
             {/* Simulating reply avatars */}
             {[1, 2, 3].slice(0, replies?.length || 0).map(i => (
               <div key={i} className="w-6 h-6 rounded-full bg-cream border-2 border-white overflow-hidden">
                 <img src={`https://i.pravatar.cc/150?img=${i}`} alt="reply" className="w-full h-full object-cover" />
               </div>
             ))}
             {replies?.length > 3 && (
               <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-gray-600">
                 +{replies.length - 3}
               </div>
             )}
          </div>
        </div>
        
        <Link to={`/thread/${id}`} className="mt-3 block text-center text-sm font-medium text-deep-red hover:text-dark-burgundy transition-colors">
          View Thread
        </Link>
      </div>
    </div>
  );
};

export default CookThreadCard;
