import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { cn, formatNumber } from '../../utils/helpers';

const CreatorCard = ({ creator, className }) => {
  const {
    id, name, username, avatar, level, levelName,
    chefCoins, followers, recipesCount, rating, verified, specialties
  } = creator;

  return (
    <Link to={`/creator/${id}`} className={cn('block bg-white rounded-2xl p-5 shadow-sm card-hover text-center', className)}>
      <div className="relative inline-block mb-3">
        <img
          src={avatar || 'https://i.pravatar.cc/150'}
          alt={name}
          className={cn("w-16 h-16 rounded-full object-cover mx-auto", verified && "ring-2 ring-gold ring-offset-2")}
        />
        {verified && (
          <CheckCircle className="w-5 h-5 text-gold bg-white rounded-full absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4" />
        )}
      </div>
      
      <h3 className="font-semibold text-charcoal text-lg">{name}</h3>
      <p className="text-charcoal/50 text-sm mb-2">@{username}</p>
      
      <div className="flex justify-center items-center gap-2 mb-4">
        <span className="text-xs font-semibold px-2 py-1 bg-charcoal text-white rounded-md">
          Lvl {level} {levelName}
        </span>
        <span className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md flex items-center gap-1">
          🪙 {chefCoins}
        </span>
      </div>

      <div className="flex justify-center gap-4 text-center mb-4">
        <div>
          <p className="text-sm font-bold text-charcoal">{formatNumber ? formatNumber(followers) : followers}</p>
          <p className="text-xs text-charcoal/60">Followers</p>
        </div>
        <div>
          <p className="text-sm font-bold text-charcoal">{recipesCount}</p>
          <p className="text-xs text-charcoal/60">Recipes</p>
        </div>
        <div>
          <p className="text-sm font-bold text-charcoal">{rating?.toFixed(1)}</p>
          <p className="text-xs text-charcoal/60">Rating</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5 mb-5">
        {specialties?.slice(0, 3).map((spec, i) => (
          <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-cream rounded-full text-charcoal/70">
            {spec}
          </span>
        ))}
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          // Add follow logic
        }}
        className="w-full py-2 bg-deep-red text-white text-sm font-medium rounded-xl hover:bg-dark-burgundy transition-colors"
      >
        Follow
      </button>
    </Link>
  );
};

export default CreatorCard;
