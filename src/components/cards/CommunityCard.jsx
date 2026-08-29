import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Check } from 'lucide-react';
import { cn, formatNumber } from '../../utils/helpers';

const CommunityCard = ({ community, isJoined, onJoin, className }) => {
  const { id, name, description, coverImage, icon, members, category } = community;

  return (
    <Link to={`/community/${id}`} className={cn('block bg-white rounded-2xl shadow-sm card-hover relative overflow-hidden', className)}>
      <div className="h-32 w-full">
        <img
          src={coverImage || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=400&fit=crop'}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="px-5 pb-5 relative">
        <div className="absolute -mt-8 left-5 w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-md border-4 border-white">
          {icon || '👥'}
        </div>
        
        <div className="pt-10 flex justify-between items-start gap-4">
          <div>
            <h3 className="font-semibold text-lg text-charcoal mb-1">{name}</h3>
            <p className="text-sm text-charcoal/60 line-clamp-2 mb-3">{description}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm font-medium text-charcoal/80">
              <Users className="w-4 h-4" />
              <span>{formatNumber ? formatNumber(members) : members}</span>
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-cream text-charcoal rounded-full">
              {category}
            </span>
          </div>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              onJoin?.(id);
            }}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1",
              isJoined 
                ? "bg-green-100 text-green-700" 
                : "bg-deep-red text-white hover:bg-dark-burgundy"
            )}
          >
            {isJoined ? (
              <>
                <Check className="w-4 h-4" /> Joined
              </>
            ) : (
              'Join'
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CommunityCard;
