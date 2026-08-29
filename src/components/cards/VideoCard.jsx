import React from 'react';
import { Play, Heart, Eye } from 'lucide-react';
import { cn } from '../../utils/helpers';

const VideoCard = ({ video, className }) => {
  const { title, thumbnail, image, creatorName, creatorAvatar, views, likes, duration, cuisine } = video;
  const thumb = thumbnail || image || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=450&fit=crop';

  return (
    <div className={cn('group cursor-pointer card-hover flex flex-col', className)}>
      <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
        <img
          src={thumb}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
            <Play className="w-5 h-5 fill-charcoal text-charcoal ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-[10px] font-medium rounded">
          {duration}
        </div>
      </div>
      
      <div className="flex items-start gap-3 px-1">
        <img src={creatorAvatar || 'https://i.pravatar.cc/150'} alt={creatorName} className="w-9 h-9 rounded-full object-cover mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-charcoal text-sm line-clamp-2 mb-1 group-hover:text-deep-red transition-colors">
            {title}
          </h3>
          <p className="text-xs text-charcoal/60 mb-1">{creatorName}</p>
          <div className="flex items-center gap-3 text-[10px] text-charcoal/50 font-medium">
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {views}</span>
            <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
